import { api } from "../../../shared/lib/api";

/** POST /api/orders/checkout — turns the current cart into an order. */
export const checkout = () => api.post("/api/orders/checkout");

/** GET /api/orders — the current user's orders, newest first. */
export const getOrders = () => api.get("/api/orders");

/** GET /api/orders/:id — a single order with its line items. */
export const getOrder = (id) => api.get(`/api/orders/${id}`);
