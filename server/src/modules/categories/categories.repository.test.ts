import { describe, it, expect } from "vitest";
import { makeTestDb } from "../../test/db.js";
import { categoriesRepository } from "./categories.repository.js";

describe("categoriesRepository", () => {
  it("lists categories", () => {
    const db = makeTestDb();
    db.prepare("INSERT INTO categories (name, slug) VALUES (?, ?)").run("Books", "books");
    const repo = categoriesRepository(db);
    expect(repo.all().map((c) => c.slug)).toContain("books");
  });
});
