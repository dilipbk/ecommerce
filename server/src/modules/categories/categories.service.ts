import type { Db } from "../../db/connection.js";
import { categoriesRepository, type CategoryRow } from "./categories.repository.js";

export function categoriesService(db: Db) {
  const repo = categoriesRepository(db);
  return {
    list(): CategoryRow[] {
      return repo.all();
    },
  };
}
