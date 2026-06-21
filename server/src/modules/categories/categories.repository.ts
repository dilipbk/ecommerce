import type { Database } from "better-sqlite3";

export interface CategoryRow {
  id: number;
  name: string;
  slug: string;
}

export function categoriesRepository(db: Database) {
  return {
    all(): CategoryRow[] {
      return db.prepare("SELECT * FROM categories ORDER BY name").all() as CategoryRow[];
    },
    findById(id: number): CategoryRow | undefined {
      return db.prepare("SELECT * FROM categories WHERE id = ?").get(id) as CategoryRow | undefined;
    },
  };
}
