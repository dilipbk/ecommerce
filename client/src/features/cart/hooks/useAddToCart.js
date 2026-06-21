import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../api/cart";
import { cartKeys } from "../api/queryKeys";

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    // The response is the updated cart — write it straight into the cache.
    onSuccess: (cart) => queryClient.setQueryData(cartKeys.all, cart),
  });
}
