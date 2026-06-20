import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "./password.js";

describe("password", () => {
  it("hashes and verifies a matching password", () => {
    const hash = hashPassword("hunter2");
    expect(hash).toContain(":");
    expect(verifyPassword("hunter2", hash)).toBe(true);
  });

  it("rejects a wrong password", () => {
    const hash = hashPassword("hunter2");
    expect(verifyPassword("wrong", hash)).toBe(false);
  });
});
