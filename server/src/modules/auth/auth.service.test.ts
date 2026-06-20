import { describe, it, expect } from "vitest";
import { makeTestDb } from "../../test/db.js";
import { usersRepository } from "../users/users.repository.js";
import { hashPassword } from "../../lib/password.js";
import { authService } from "./auth.service.js";
import { verifyToken } from "../../lib/jwt.js";

describe("authService.login", () => {
  it("returns a valid token for correct credentials", async () => {
    const db = makeTestDb();
    usersRepository(db).insert({
      email: "u@e.com",
      password_hash: hashPassword("pw"),
      name: "U",
      role: "customer",
    });
    const { token, user } = await authService(db).login("u@e.com", "pw");
    expect(user.email).toBe("u@e.com");
    expect((await verifyToken(token)).sub).toBe(user.id);
  });

  it("throws on wrong password", async () => {
    const db = makeTestDb();
    usersRepository(db).insert({
      email: "u@e.com",
      password_hash: hashPassword("pw"),
      name: "U",
      role: "customer",
    });
    await expect(authService(db).login("u@e.com", "nope")).rejects.toThrow();
  });
});
