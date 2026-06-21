import type { Database } from "better-sqlite3";
import { BadRequestError, NotFoundError } from "../../lib/errors.js";
import { cartRepository } from "../cart/cart.repository.js";
import { ordersRepository, type OrderRow } from "./orders.repository.js";
import { productsService } from "../products/products.service.js";

export function ordersService(db: Database) {
  const orders = ordersRepository(db);
  const cart = cartRepository(db);
  const products = productsService(db);

  return {
    checkout(userId: number): OrderRow {
      const items = cart.itemsForUser(userId);
      if (items.length === 0) throw new BadRequestError("Cart is empty");

      const tx = db.transaction(() => {
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

      return tx();
    },
    listForUser(userId: number): OrderRow[] {
      return orders.findByUser(userId);
    },
  };
}
