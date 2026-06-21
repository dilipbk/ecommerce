import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/getProducts";
import { productKeys } from "../api/queryKeys";

/** React Query hook for the product list. */
export function useProducts(filters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => getProducts(filters),
  });
}
