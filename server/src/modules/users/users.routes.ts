import { Hono } from "hono";
import { db } from "../../db/connection.js";
import { authMiddleware, type AuthUser } from "../../middleware/auth.js";
import { usersService } from "./users.service.js";

export const usersRoutes = new Hono<{ Variables: { user: AuthUser } }>();
const service = usersService(db);

usersRoutes.get("/me", authMiddleware, (c) => {
  const user = c.get("user");
  return c.json(service.getById(user.id));
});
