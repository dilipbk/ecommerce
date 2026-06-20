import type { Context } from "hono";
import { AppError } from "../lib/errors";

export function errorHandler(err: Error, c: Context) {
  if (err instanceof AppError) {
    return c.json({ error: { message: err.message, code: err.code } }, err.status as 400);
  }
  console.error(err);
  return c.json({ error: { message: "Internal server error", code: "INTERNAL" } }, 500);
}
