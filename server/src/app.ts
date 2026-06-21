import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { errorHandler } from "./middleware/error-handler.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";
import { productsRoutes } from "./modules/products/products.routes.js";
import { categoriesRoutes } from "./modules/categories/categories.routes.js";
import { cartRoutes } from "./modules/cart/cart.routes.js";
import { ordersRoutes } from "./modules/orders/orders.routes.js";

export function createApp(): Hono {
  const app = new Hono();

  app.use("*", logger());
  app.use("*", cors());

  app.get("/api/health", (c) => c.json({ status: "ok" }));
  app.route("/api/auth", authRoutes);
  app.route("/api/users", usersRoutes);
  app.route("/api/products", productsRoutes);
  app.route("/api/categories", categoriesRoutes);
  app.route("/api/cart", cartRoutes);
  app.route("/api/orders", ordersRoutes);

  app.onError(errorHandler);
  return app;
}
