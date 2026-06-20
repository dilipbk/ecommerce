import { describe, it, expect } from "vitest";
import { signToken, verifyToken } from "./jwt.js";

describe("jwt", () => {
  it("signs and verifies a token round-trip", async () => {
    const token = await signToken({ sub: 1, role: "customer" });
    const payload = await verifyToken(token);
    expect(payload.sub).toBe(1);
    expect(payload.role).toBe("customer");
  });
});
