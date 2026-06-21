import { api } from "../../../shared/lib/api";

/** POST /api/orders/checkout — turns the current cart into an order. */
export const checkout = () => api.post("/api/orders/checkout");

/** GET /api/orders — the current user's orders, newest first. */
export const getOrders = () => api.get("/api/orders");
