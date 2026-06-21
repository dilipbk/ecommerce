import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../api/orders";
import { orderKeys } from "../api/queryKeys";
import { useAuth } from "../../../app/providers/auth-context";

/** React Query hook for a single order with its line items. */
export function useOrder(id) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => getOrder(id),
    enabled: isAuthenticated && id != null && !Number.isNaN(id),
  });
}
