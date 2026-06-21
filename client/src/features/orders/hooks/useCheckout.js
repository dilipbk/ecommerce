import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../api/orders";
import { orderKeys } from "../api/queryKeys";
import { cartKeys } from "../../cart/api/queryKeys";

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      // Checkout empties the cart and creates an order — refresh both.
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}
