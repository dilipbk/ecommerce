import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../api/cart";
import { cartKeys } from "../api/queryKeys";

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: (cart) => queryClient.setQueryData(cartKeys.all, cart),
  });
}
