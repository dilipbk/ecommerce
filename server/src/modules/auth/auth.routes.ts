import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../../db/connection.js";
import { loginSchema } from "./auth.schema.js";
import { authService } from "./auth.service.js";

export const authRoutes = new Hono();
const service = authService(db);

authRoutes.post("/login", zValidator("json", loginSchema), async (c) => {
  const { email, password } = c.req.valid("json");
  const result = await service.login(email, password);
  return c.json(result);
});
