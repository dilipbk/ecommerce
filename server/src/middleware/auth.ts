import { createMiddleware } from "hono/factory";
import { UnauthorizedError } from "../lib/errors.js";
import { verifyToken } from "../lib/jwt.js";

export interface AuthUser {
  id: number;
  role: string;
}

export const authMiddleware = createMiddleware<{
  Variables: { user: AuthUser };
}>(async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) throw new UnauthorizedError("Missing bearer token");
  try {
    const payload = await verifyToken(header.slice(7));
    c.set("user", { id: payload.sub, role: payload.role });
  } catch {
    throw new UnauthorizedError("Invalid token");
  }
  await next();
});
