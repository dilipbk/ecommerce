import { api } from "../../../shared/lib/api";

/** GET /api/categories — all categories (public). */
export const getCategories = () => api.get("/api/categories");
