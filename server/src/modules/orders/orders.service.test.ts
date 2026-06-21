import { describe, it, expect } from "vitest";
import { makeTestDb } from "../../test/db.js";
import { cartService } from "../cart/cart.service.js";
import { ordersService } from "./orders.service.js";

function seed(db: any) {
  db.prepare("INSERT INTO users (email, password_hash, name) VALUES ('u@e.com','x:y','U')").run();
  db.prepare(
    "INSERT INTO products (name, description, price_cents, stock) VALUES ('P','',250,10)",
  ).run();
}

describe("ordersService.checkout", () => {
  it("creates an order from the cart and clears it", () => {
    const db = makeTestDb();
    seed(db);
    cartService(db).addItem(1, 1, 2);
    const order = ordersService(db).checkout(1);
    expect(order.total_cents).toBe(500);
    expect(cartService(db).get(1).items).toHaveLength(0);
    const stock = (db.prepare("SELECT stock FROM products WHERE id = 1").get() as any).stock;
    expect(stock).toBe(8);
  });

  it("throws when the cart is empty", () => {
    const db = makeTestDb();
    seed(db);
    expect(() => ordersService(db).checkout(1)).toThrow();
  });
});
