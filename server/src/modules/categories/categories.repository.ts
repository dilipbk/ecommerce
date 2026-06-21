import type { Db } from "../../db/connection.js";

export interface CategoryRow {
  id: number;
  name: string;
  slug: string;
}

export function categoriesRepository(db: Db) {
  return {
    all(): CategoryRow[] {
      return db.prepare("SELECT * FROM categories ORDER BY name").all() as unknown as CategoryRow[];
    },
    findById(id: number): CategoryRow | undefined {
      return db.prepare("SELECT * FROM categories WHERE id = ?").get(id) as CategoryRow | undefined;
    },
  };
}
