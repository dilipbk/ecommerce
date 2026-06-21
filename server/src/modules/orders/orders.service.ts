import type { Database } from "better-sqlite3";
import { BadRequestError, NotFoundError } from "../../lib/errors.js";
import { cartRepository } from "../cart/cart.repository.js";
import { ordersRepository, type OrderRow } from "./orders.repository.js";

export function ordersService(db: Database) {
  const orders = ordersRepository(db);
  const cart = cartRepository(db);

  return {
    checkout(userId: number): OrderRow {
      const items = cart.itemsForUser(userId);
      if (items.length === 0) throw new BadRequestError("Cart is empty");

      const tx = db.transaction(() => {
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
