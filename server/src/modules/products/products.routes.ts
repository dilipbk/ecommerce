import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../../db/connection.js";
import { productsService } from "./products.service.js";
import { listQuerySchema } from "./products.schema.js";

export const productsRoutes = new Hono();
const service = productsService(db);

productsRoutes.get("/", zValidator("query", listQuerySchema), (c) => {
  const { categoryId } = c.req.valid("query");
  return c.json(service.list({ categoryId }));
});

productsRoutes.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  return c.json(service.getById(id));
});
