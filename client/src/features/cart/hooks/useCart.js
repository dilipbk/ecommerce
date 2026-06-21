import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/cart";
import { cartKeys } from "../api/queryKeys";
import { useAuth } from "../../../app/providers/auth-context";

/** The cart only exists for a logged-in user, so the query is gated on auth. */
export function useCart() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: getCart,
    enabled: isAuthenticated,
  });
}
