import { formatPrice } from "../../../shared/lib/formatPrice";
import { useToast } from "../../../app/providers/toast-context";
import { useAddToCart } from "../hooks/useAddToCart";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";

export function CartItem({ item }) {
  const toast = useToast();
  // addToCart sets the quantity, so we reuse it to step the count up/down.
  const setQuantity = useAddToCart();
  const remove = useRemoveFromCart();
  const busy = setQuantity.isPending || remove.isPending;

  function decrement() {
    if (item.quantity > 1) {
      setQuantity.mutate({ productId: item.product_id, quantity: item.quantity - 1 });
    } else {
      remove.mutate(item.product_id);
    }
  }

  function increment() {
    setQuantity.mutate(
      { productId: item.product_id, quantity: item.quantity + 1 },
      { onError: (err) => toast.error(err.message) },
    );
  }

  return (
    <li className="border-b border-gray-200 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-medium text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500">{formatPrice(item.price_cents)} each</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-md border border-gray-300">
            <button
              type="button"
              onClick={decrement}
              disabled={busy}
              aria-label="Decrease quantity"
              className="px-2.5 py-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              −
            </button>
            <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
            <button
              type="button"
              onClick={increment}
              disabled={busy}
              aria-label="Increase quantity"
              className="px-2.5 py-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              +
            </button>
          </div>

          <span className="w-20 text-right font-semibold text-gray-900">
            {formatPrice(item.price_cents * item.quantity)}
          </span>

          <button
            type="button"
            onClick={() => remove.mutate(item.product_id)}
            disabled={busy}
            className="text-sm text-red-600 transition-colors hover:text-red-700 disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
