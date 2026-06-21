import { api } from "../../../shared/lib/api";

// All three endpoints return the full cart view: { items, totalCents }.
export const getCart = () => api.get("/api/cart");

export const addToCart = ({ productId, quantity }) =>
  api.post("/api/cart/items", { productId, quantity });

export const removeFromCart = (productId) =>
  api.del(`/api/cart/items/${productId}`);
