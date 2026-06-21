import { Hono } from "hono";
import { db } from "../../db/connection.js";
import { authMiddleware, type AuthUser } from "../../middleware/auth.js";
import { ordersService } from "./orders.service.js";

export const ordersRoutes = new Hono<{ Variables: { user: AuthUser } }>();
const service = ordersService(db);

ordersRoutes.use("*", authMiddleware);

ordersRoutes.post("/checkout", (c) => c.json(service.checkout(c.get("user").id), 201));
ordersRoutes.get("/", (c) => c.json(service.listForUser(c.get("user").id)));
ordersRoutes.get("/:id", (c) =>
  c.json(service.getById(c.get("user").id, Number(c.req.param("id")))),
);
