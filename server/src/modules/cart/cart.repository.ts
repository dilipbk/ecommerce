import type { Db } from "../../db/connection.js";

export interface CartItemRow {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  name: string;
  price_cents: number;
}

export function cartRepository(db: Db) {
  return {
    itemsForUser(userId: number): CartItemRow[] {
      return db
        .prepare(
          `SELECT ci.id, ci.user_id, ci.product_id, ci.quantity, p.name, p.price_cents
           FROM cart_items ci JOIN products p ON p.id = ci.product_id
           WHERE ci.user_id = ? ORDER BY ci.id`,
        )
        .all(userId) as unknown as CartItemRow[];
    },
    upsert(userId: number, productId: number, quantity: number): void {
      db.prepare(
        `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)
         ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = excluded.quantity`,
      ).run(userId, productId, quantity);
    },
    remove(userId: number, productId: number): void {
      db.prepare("DELETE FROM cart_items WHERE user_id = ? AND product_id = ?").run(userId, productId);
    },
    clear(userId: number): void {
      db.prepare("DELETE FROM cart_items WHERE user_id = ?").run(userId);
    },
  };
}
