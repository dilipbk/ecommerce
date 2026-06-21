import { formatPrice } from "../../../shared/lib/formatPrice";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";

export function CartItem({ item }) {
  const { mutate, isPending } = useRemoveFromCart();

  return (
    <li className="flex items-center justify-between border-b border-gray-200 py-3">
      <div>
        <p className="font-medium text-gray-900">{item.name}</p>
        <p className="text-sm text-gray-500">
          {formatPrice(item.price_cents)} × {item.quantity}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-900">
          {formatPrice(item.price_cents * item.quantity)}
        </span>
        <button
          type="button"
          onClick={() => mutate(item.product_id)}
          disabled={isPending}
          className="text-sm text-red-600 transition-colors hover:text-red-700 disabled:opacity-50"
        >
          Remove
        </button>
      </div>
    </li>
  );
}
