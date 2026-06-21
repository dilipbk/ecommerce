import { DatabaseSync } from "node:sqlite";
import { env } from "../config/env.js";

// Shared database type used across repositories and services.
export type Db = DatabaseSync;

export function createDb(path: string): Db {
  const database = new DatabaseSync(path);
  database.exec("PRAGMA journal_mode = WAL");
  database.exec("PRAGMA foreign_keys = ON");
  return database;
}

// node:sqlite has no db.transaction() helper (unlike better-sqlite3), so we
// provide a small wrapper: run fn inside BEGIN/COMMIT, rolling back on throw.
export function transaction<T>(database: Db, fn: () => T): T {
  database.exec("BEGIN");
  try {
    const result = fn();
    database.exec("COMMIT");
    return result;
  } catch (err) {
    database.exec("ROLLBACK");
    throw err;
  }
}

export const db = createDb(env.DB_PATH);
