import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Database } from "better-sqlite3";
import { db as defaultDb } from "./connection.js";

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "migrations");

export function runMigrations(database: Database): void {
  database.exec(
    "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime('now')))",
  );
  const applied = new Set(
    database.prepare("SELECT name FROM _migrations").all().map((r: any) => r.name),
  );
  const files = readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();

  const record = database.prepare("INSERT INTO _migrations (name) VALUES (?)");
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = readFileSync(join(migrationsDir, file), "utf8");
    const tx = database.transaction(() => {
      database.exec(sql);
      record.run(file);
    });
    tx();
    console.log(`Applied migration: ${file}`);
  }
}

// Allow running directly: `pnpm db:migrate`
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations(defaultDb);
  console.log("Migrations complete.");
}
