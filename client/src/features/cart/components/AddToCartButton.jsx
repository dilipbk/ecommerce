import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/auth-context";
import { useToast } from "../../../app/providers/toast-context";
import { PATHS } from "../../../app/routes/paths";
import { useCart } from "../hooks/useCart";
import { useAddToCart } from "../hooks/useAddToCart";

export function AddToCartButton({ productId, productName, disabled }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: cart } = useCart();
  const { mutate, isPending } = useAddToCart();

  function handleClick() {
    if (!isAuthenticated) {
      navigate(PATHS.login);
      return;
    }
    // Backend replaces the quantity, so send current + 1 to increment.
    const current =
      cart?.items.find((item) => item.product_id === productId)?.quantity ?? 0;
    mutate(
      { productId, quantity: current + 1 },
      {
        onSuccess: () => toast.success(`${productName ?? "Item"} added to cart`),
        onError: (err) => toast.error(err.message),
      },
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isPending}
      className="w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
    >
      {isPending ? "Adding…" : "Add to cart"}
    </button>
  );
}
