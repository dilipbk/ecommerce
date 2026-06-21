import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../../db/connection.js";
import { authMiddleware, type AuthUser } from "../../middleware/auth.js";
import { cartService } from "./cart.service.js";
import { addItemSchema } from "./cart.schema.js";

export const cartRoutes = new Hono<{ Variables: { user: AuthUser } }>();
const service = cartService(db);

cartRoutes.use("*", authMiddleware);

cartRoutes.get("/", (c) => c.json(service.get(c.get("user").id)));

cartRoutes.post("/items", zValidator("json", addItemSchema), (c) => {
  const { productId, quantity } = c.req.valid("json");
  return c.json(service.addItem(c.get("user").id, productId, quantity));
});

cartRoutes.delete("/items/:productId", (c) => {
  const productId = Number(c.req.param("productId"));
  return c.json(service.removeItem(c.get("user").id, productId));
});
