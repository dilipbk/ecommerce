import { Link } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import { formatPrice } from "../../../shared/lib/formatPrice";
import { PATHS } from "../../../app/routes/paths";

export function OrdersPage() {
  const { data: orders, isPending, isError, error } = useOrders();

  if (isPending) {
    return <p className="text-gray-500">Loading orders…</p>;
  }

  if (isError) {
    return <p className="text-red-600">Failed to load orders: {error.message}</p>;
  }

  if (orders.length === 0) {
    return (
      <section>
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">Your orders</h1>
        <p className="text-gray-500">
          You have no orders yet.{" "}
          <Link to={PATHS.products} className="text-gray-900 underline">
            Browse products
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Your orders</h1>
      <ul>
        {orders.map((order) => (
          <li
            key={order.id}
            className="flex items-center justify-between border-b border-gray-200 py-3"
          >
            <div>
              <p className="font-medium text-gray-900">Order #{order.id}</p>
              <p className="text-sm text-gray-500">
                {order.created_at} · {order.status}
              </p>
            </div>
            <span className="font-semibold text-gray-900">
              {formatPrice(order.total_cents)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
