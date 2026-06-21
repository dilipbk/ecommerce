import type { Database } from "better-sqlite3";

export interface OrderRow {
  id: number;
  user_id: number;
  total_cents: number;
  status: string;
  created_at: string;
}

export interface OrderItemRow {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price_cents: number;
}

export interface OrderLine {
  productId: number;
  quantity: number;
  unitPriceCents: number;
}

export function ordersRepository(db: Database) {
  return {
    create(userId: number, totalCents: number, lines: OrderLine[]): number {
      const info = db
        .prepare("INSERT INTO orders (user_id, total_cents, status) VALUES (?, ?, 'pending')")
        .run(userId, totalCents);
      const orderId = Number(info.lastInsertRowid);
      const insertItem = db.prepare(
        "INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents) VALUES (?, ?, ?, ?)",
      );
      for (const l of lines) insertItem.run(orderId, l.productId, l.quantity, l.unitPriceCents);
      return orderId;
    },
    decrementStock(productId: number, qty: number): void {
      db.prepare("UPDATE products SET stock = stock - ? WHERE id = ?").run(qty, productId);
    },
    findById(id: number): OrderRow | undefined {
      return db.prepare("SELECT * FROM orders WHERE id = ?").get(id) as OrderRow | undefined;
    },
    findByUser(userId: number): OrderRow[] {
      return db
        .prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC")
        .all(userId) as OrderRow[];
    },
    itemsForOrder(orderId: number): OrderItemRow[] {
      return db
        .prepare("SELECT * FROM order_items WHERE order_id = ?")
        .all(orderId) as OrderItemRow[];
    },
  };
}
