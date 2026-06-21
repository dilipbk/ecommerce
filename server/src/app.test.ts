import { describe, it, expect } from "vitest";
import { createApp } from "./app.js";

describe("app", () => {
  it("responds to health check", async () => {
    const app = createApp();
    const res = await app.request("/api/health");
    expect(res.status).toBe(200);
  });

  it("returns 401 for protected route without token", async () => {
    const app = createApp();
    const res = await app.request("/api/cart");
    expect(res.status).toBe(401);
  });
});
