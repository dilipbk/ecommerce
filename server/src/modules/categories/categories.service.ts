import type { Database } from "better-sqlite3";
import { categoriesRepository, type CategoryRow } from "./categories.repository.js";

export function categoriesService(db: Database) {
  const repo = categoriesRepository(db);
  return {
    list(): CategoryRow[] {
      return repo.all();
    },
  };
}
