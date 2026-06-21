import { api } from "../../../shared/lib/api";

/** Fetch the product list, optionally filtered by category. */
export function getProducts(filters = {}) {
  const query = filters.categoryId ? `?categoryId=${filters.categoryId}` : "";
  return api.get(`/api/products${query}`);
}

/** Fetch a single product by id. */
export function getProduct(id) {
  return api.get(`/api/products/${id}`);
}
