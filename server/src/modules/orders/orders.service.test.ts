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

  it("throws when an item exceeds available stock", () => {
    const db = makeTestDb();
    db.prepare("INSERT INTO users (email, password_hash, name) VALUES ('u@e.com','x:y','U')").run();
    db.prepare("INSERT INTO products (name, description, price_cents, stock) VALUES ('P','',250,1)").run();
    // bypass cartService stock guard by inserting the cart row directly
    db.prepare("INSERT INTO cart_items (user_id, product_id, quantity) VALUES (1, 1, 5)").run();
    expect(() => ordersService(db).checkout(1)).toThrow();
  });
});

describe("ordersService.getById", () => {
  it("returns the order with its line items (incl. product name)", () => {
    const db = makeTestDb();
    seed(db);
    cartService(db).addItem(1, 1, 2);
    const created = ordersService(db).checkout(1);

    const detail = ordersService(db).getById(1, created.id);
    expect(detail.id).toBe(created.id);
    expect(detail.total_cents).toBe(500);
    expect(detail.items).toHaveLength(1);
    expect(detail.items[0]).toMatchObject({
      product_id: 1,
      quantity: 2,
      unit_price_cents: 250,
      name: "P",
    });
  });

  it("throws for another user's order (no cross-user access)", () => {
    const db = makeTestDb();
    seed(db);
    db.prepare("INSERT INTO users (email, password_hash, name) VALUES ('b@e.com','x:y','B')").run();
    cartService(db).addItem(1, 1, 1);
    const created = ordersService(db).checkout(1);

    // user 2 must not be able to read user 1's order
    expect(() => ordersService(db).getById(2, created.id)).toThrow();
  });
});
