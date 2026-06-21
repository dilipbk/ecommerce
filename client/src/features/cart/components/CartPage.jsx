import { useCart } from "../hooks/useCart";
import { CartItem } from "./CartItem";
import { formatPrice } from "../../../shared/lib/formatPrice";
import { RowsSkeleton } from "../../../shared/components/RowsSkeleton";
// Composition seam: the cart page hosts the orders feature's checkout action.
import { CheckoutButton } from "../../orders/components/CheckoutButton";

export function CartPage() {
  const { data: cart, isPending, isError, error } = useCart();

  if (isPending) {
    return (
      <section className="max-w-2xl">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">Your cart</h1>
        <RowsSkeleton />
      </section>
    );
  }

  if (isError) {
    return <p className="text-red-600">Failed to load cart: {error.message}</p>;
  }

  if (cart.items.length === 0) {
    return (
      <section>
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">Your cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Your cart</h1>
      <ul>
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-lg font-semibold text-gray-900">
          {formatPrice(cart.totalCents)}
        </span>
      </div>
      <div className="mt-6">
        <CheckoutButton />
      </div>
    </section>
  );
}
