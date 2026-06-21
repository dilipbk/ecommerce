import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/auth-context";
import { PATHS } from "../../../app/routes/paths";
import { useCart } from "../hooks/useCart";
import { useAddToCart } from "../hooks/useAddToCart";

export function AddToCartButton({ productId, disabled }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: cart } = useCart();
  const { mutate, isPending } = useAddToCart();

  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef(null);
  useEffect(() => () => clearTimeout(timerRef.current), []);

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
        onSuccess: () => {
          setJustAdded(true);
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => setJustAdded(false), 1500);
        },
      },
    );
  }

  const label = isPending ? "Adding…" : justAdded ? "Added ✓" : "Add to cart";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isPending}
      className={`w-full rounded-md px-3 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 ${
        justAdded ? "bg-green-600" : "bg-gray-900 hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
