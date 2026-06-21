import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/getProducts";
import { productKeys } from "../api/queryKeys";

/** React Query hook for a single product by id. */
export function useProduct(id) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
    enabled: id != null && !Number.isNaN(id),
  });
}
