import { transaction, type Db } from "../../db/connection.js";
import { BadRequestError, NotFoundError } from "../../lib/errors.js";
import { cartRepository } from "../cart/cart.repository.js";
import {
  ordersRepository,
  type OrderItemRow,
  type OrderRow,
} from "./orders.repository.js";
import { productsService } from "../products/products.service.js";

export interface OrderWithItems extends OrderRow {
  items: OrderItemRow[];
}

export function ordersService(db: Db) {
  const orders = ordersRepository(db);
  const cart = cartRepository(db);
  const products = productsService(db);

  return {
    checkout(userId: number): OrderRow {
      const items = cart.itemsForUser(userId);
      if (items.length === 0) throw new BadRequestError("Cart is empty");

      return transaction(db, () => {
        // Check stock sufficiency for all items before any mutations
        for (const item of items) {
          const product = products.getById(item.product_id);
          if (product.stock < item.quantity) {
            throw new BadRequestError(`Insufficient stock for product ${item.product_id}`);
          }
        }
        const totalCents = items.reduce((s, i) => s + i.price_cents * i.quantity, 0);
        const orderId = orders.create(
          userId,
          totalCents,
          items.map((i) => ({
            productId: i.product_id,
            quantity: i.quantity,
            unitPriceCents: i.price_cents,
          })),
        );
        for (const i of items) orders.decrementStock(i.product_id, i.quantity);
        cart.clear(userId);
        const created = orders.findById(orderId);
        if (!created) throw new NotFoundError("Order");
        return created;
      });
    },
    listForUser(userId: number): OrderRow[] {
      return orders.findByUser(userId);
    },
    getById(userId: number, orderId: number): OrderWithItems {
      const order = orders.findById(orderId);
      // Treat another user's order as not found — don't leak its existence.
      if (!order || order.user_id !== userId) throw new NotFoundError("Order");
      return { ...order, items: orders.itemsForOrder(orderId) };
    },
  };
}
