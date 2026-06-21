import { Hono } from "hono";
import { db } from "../../db/connection.js";
import { categoriesService } from "./categories.service.js";

export const categoriesRoutes = new Hono();
const service = categoriesService(db);

categoriesRoutes.get("/", (c) => c.json(service.list()));
