import { Link, useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { formatPrice } from "../../../shared/lib/formatPrice";
import { Skeleton } from "../../../shared/components/Skeleton";
import { RowsSkeleton } from "../../../shared/components/RowsSkeleton";
import { PATHS } from "../../../app/routes/paths";

export function OrderDetailPage() {
  const { id } = useParams();
  const { data: order, isPending, isError, error } = useOrder(Number(id));

  const backLink = (
    <Link to={PATHS.orders} className="text-sm text-gray-500 hover:text-gray-900">
      ← Back to orders
    </Link>
  );

  if (isPending) {
    return (
      <section className="max-w-2xl space-y-4">
        {backLink}
        <Skeleton className="h-8 w-40" />
        <RowsSkeleton />
      </section>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error.message}</p>
        {backLink}
      </div>
    );
  }

  return (
    <section className="max-w-2xl space-y-4">
      {backLink}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Order #{order.id}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {order.created_at} · {order.status}
        </p>
      </div>
      <ul>
        {order.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b border-gray-200 py-3"
          >
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">
                {formatPrice(item.unit_price_cents)} × {item.quantity}
              </p>
            </div>
            <span className="font-semibold text-gray-900">
              {formatPrice(item.unit_price_cents * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-lg font-semibold text-gray-900">
          {formatPrice(order.total_cents)}
        </span>
      </div>
    </section>
  );
}
