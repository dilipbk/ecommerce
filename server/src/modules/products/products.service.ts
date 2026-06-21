import type { Database } from "better-sqlite3";
import { NotFoundError } from "../../lib/errors.js";
import { productsRepository, type ProductRow } from "./products.repository.js";

export function productsService(db: Database) {
  const repo = productsRepository(db);
  return {
    list(filter?: { categoryId?: number }): ProductRow[] {
      return repo.all(filter);
    },
    getById(id: number): ProductRow {
      const p = repo.findById(id);
      if (!p) throw new NotFoundError("Product");
      return p;
    },
  };
}
