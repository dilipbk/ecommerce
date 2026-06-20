import type { Database } from "better-sqlite3";
import { createDb } from "../db/connection.js";
import { runMigrations } from "../db/migrate.js";

export function makeTestDb(): Database {
  const db = createDb(":memory:");
  runMigrations(db);
  return db;
}
