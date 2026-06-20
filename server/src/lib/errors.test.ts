import { describe, it, expect } from "vitest";
import { NotFoundError, UnauthorizedError, AppError } from "./errors";

describe("errors", () => {
  it("NotFoundError carries status 404 and code", () => {
    const e = new NotFoundError("product");
    expect(e).toBeInstanceOf(AppError);
    expect(e.status).toBe(404);
    expect(e.code).toBe("NOT_FOUND");
    expect(e.message).toContain("product");
  });

  it("UnauthorizedError carries status 401", () => {
    expect(new UnauthorizedError().status).toBe(401);
  });
});
