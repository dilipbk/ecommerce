import Database from "better-sqlite3";
import type { Database as DB } from "better-sqlite3";
import { env } from "../config/env.js";

export function createDb(path: string): DB {
  const database = new Database(path);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  return database;
}

export const db = createDb(env.DB_PATH);
