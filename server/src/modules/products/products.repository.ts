import type { Database } from "better-sqlite3";

export interface ProductRow {
  id: number;
  name: string;
  description: string;
  price_cents: number;
  stock: number;
  category_id: number | null;
  created_at: string;
}

export function productsRepository(db: Database) {
  return {
    all(filter?: { categoryId?: number }): ProductRow[] {
      if (filter?.categoryId != null) {
        return db
          .prepare("SELECT * FROM products WHERE category_id = ? ORDER BY id")
          .all(filter.categoryId) as ProductRow[];
      }
      return db.prepare("SELECT * FROM products ORDER BY id").all() as ProductRow[];
    },
    findById(id: number): ProductRow | undefined {
      return db.prepare("SELECT * FROM products WHERE id = ?").get(id) as ProductRow | undefined;
    },
  };
}
