import { describe, it, expect } from "vitest";
import { makeTestDb } from "../../test/db.js";
import { cartService } from "./cart.service.js";

function seed(db: any) {
  db.prepare("INSERT INTO users (email, password_hash, name) VALUES ('u@e.com','x:y','U')").run();
  db.prepare(
    "INSERT INTO products (name, description, price_cents, stock) VALUES ('P','',250,10)",
  ).run();
}

describe("cartService", () => {
  it("adds an item and computes total", () => {
    const db = makeTestDb();
    seed(db);
    const service = cartService(db);
    const cart = service.addItem(1, 1, 2);
    expect(cart.items).toHaveLength(1);
    expect(cart.totalCents).toBe(500);
  });

  it("rejects quantity beyond stock", () => {
    const db = makeTestDb();
    seed(db);
    expect(() => cartService(db).addItem(1, 1, 999)).toThrow();
  });

  it("removes an item", () => {
    const db = makeTestDb();
    seed(db);
    const service = cartService(db);
    service.addItem(1, 1, 1);
    const cart = service.removeItem(1, 1);
    expect(cart.items).toHaveLength(0);
  });
});
