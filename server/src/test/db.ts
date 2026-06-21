import { createDb, type Db } from "../db/connection.js";
import { runMigrations } from "../db/migrate.js";

export function makeTestDb(): Db {
  const db = createDb(":memory:");
  runMigrations(db);
  return db;
}
