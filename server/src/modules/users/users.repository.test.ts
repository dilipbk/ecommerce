import { describe, it, expect } from "vitest";
import { makeTestDb } from "../../test/db.js";
import { usersRepository } from "./users.repository.js";

describe("usersRepository", () => {
  it("inserts and finds a user by email and id", () => {
    const db = makeTestDb();
    const repo = usersRepository(db);
    const id = repo.insert({
      email: "a@b.com",
      password_hash: "x:y",
      name: "Ann",
      role: "customer",
    });
    expect(id).toBeGreaterThan(0);
    expect(repo.findByEmail("a@b.com")?.name).toBe("Ann");
    expect(repo.findById(id)?.email).toBe("a@b.com");
  });
});
