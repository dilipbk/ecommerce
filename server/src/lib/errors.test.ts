import { describe, it, expect } from "vitest";
import { NotFoundError, UnauthorizedError, AppError, BadRequestError, ConflictError } from "./errors.js";

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

  it("BadRequestError carries status 400 and code", () => {
    const e = new BadRequestError();
    expect(e.status).toBe(400);
    expect(e.code).toBe("BAD_REQUEST");
  });

  it("ConflictError carries status 409 and code", () => {
    const e = new ConflictError();
    expect(e.status).toBe(409);
    expect(e.code).toBe("CONFLICT");
  });

  it("UnauthorizedError has UNAUTHORIZED code and default message", () => {
    const e = new UnauthorizedError();
    expect(e.code).toBe("UNAUTHORIZED");
    expect(e.message).toBe("Unauthorized");
  });
});
