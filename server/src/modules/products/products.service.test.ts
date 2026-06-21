import { describe, it, expect } from "vitest";
import { makeTestDb } from "../../test/db.js";
import { productsService } from "./products.service.js";

function seedProduct(db: any, name: string, categoryId: number | null) {
  db.prepare(
    "INSERT INTO products (name, description, price_cents, stock, category_id) VALUES (?, '', 100, 5, ?)",
  ).run(name, categoryId);
}

describe("productsService", () => {
  it("lists all products and filters by category", () => {
    const db = makeTestDb();
    db.prepare("INSERT INTO categories (name, slug) VALUES ('A','a')").run();
    seedProduct(db, "P1", 1);
    seedProduct(db, "P2", null);
    const service = productsService(db);
    expect(service.list()).toHaveLength(2);
    expect(service.list({ categoryId: 1 }).map((p) => p.name)).toEqual(["P1"]);
  });

  it("getById throws NotFoundError for unknown id", () => {
    const db = makeTestDb();
    expect(() => productsService(db).getById(999)).toThrow();
  });
});
