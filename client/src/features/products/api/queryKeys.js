// Co-located query keys for the products feature — makes caching & invalidation explicit.
export const productKeys = {
  all: ["products"],
  list: (filters = {}) => ["products", "list", filters],
  detail: (id) => ["products", "detail", id],
};
