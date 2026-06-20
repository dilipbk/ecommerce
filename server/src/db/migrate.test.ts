import { describe, it, expect } from "vitest";
import { createDb } from "./connection.js";
import { runMigrations } from "./migrate.js";

describe("runMigrations", () => {
  it("creates all tables in a fresh in-memory db", () => {
    const db = createDb(":memory:");
    runMigrations(db);
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all()
      .map((r: any) => r.name);
    for (const t of ["users", "categories", "products", "cart_items", "orders", "order_items"]) {
      expect(tables).toContain(t);
    }
  });

  it("is idempotent (running twice does not throw)", () => {
    const db = createDb(":memory:");
    runMigrations(db);
    expect(() => runMigrations(db)).not.toThrow();
  });
});
