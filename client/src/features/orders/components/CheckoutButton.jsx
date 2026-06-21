import { useNavigate } from "react-router-dom";
import { useCheckout } from "../hooks/useCheckout";
import { PATHS } from "../../../app/routes/paths";

export function CheckoutButton({ disabled }) {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useCheckout();

  function handleClick() {
    mutate(undefined, {
      onSuccess: () => navigate(PATHS.orders),
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isPending}
        className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
      >
        {isPending ? "Placing order…" : "Checkout"}
      </button>
      {isError && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
