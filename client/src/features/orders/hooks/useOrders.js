import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/orders";
import { orderKeys } from "../api/queryKeys";
import { useAuth } from "../../../app/providers/auth-context";

/** Orders belong to a logged-in user, so the query is gated on auth. */
export function useOrders() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: getOrders,
    enabled: isAuthenticated,
  });
}
