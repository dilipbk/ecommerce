import { describe, it, expect } from "vitest";
import { env } from "./env";

describe("env", () => {
  it("provides defaults when vars are unset", () => {
    expect(env.PORT).toBeTypeOf("number");
    expect(env.JWT_SECRET).toBeTypeOf("string");
    expect(env.DB_PATH).toBeTypeOf("string");
  });
});
