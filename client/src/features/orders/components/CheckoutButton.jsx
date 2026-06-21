import { useNavigate } from "react-router-dom";
import { useCheckout } from "../hooks/useCheckout";
import { useToast } from "../../../app/providers/toast-context";
import { PATHS } from "../../../app/routes/paths";

export function CheckoutButton({ disabled }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate, isPending } = useCheckout();

  function handleClick() {
    mutate(undefined, {
      onSuccess: () => {
        toast.success("Order placed");
        navigate(PATHS.orders);
      },
      onError: (err) => toast.error(err.message),
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isPending}
      className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
    >
      {isPending ? "Placing order…" : "Checkout"}
    </button>
  );
}
