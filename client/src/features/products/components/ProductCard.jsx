import { formatPrice } from "../../../shared/lib/formatPrice";

// `action` is an optional slot (e.g. an Add-to-cart button) so this card stays
// decoupled from the cart feature — the caller decides what action to inject.
export function ProductCard({ product, action }) {
  const inStock = product.stock > 0;

  return (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
      <h3 className="font-medium text-gray-900">{product.name}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm text-gray-500">
        {product.description}
      </p>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-lg font-semibold text-gray-900">
          {formatPrice(product.price_cents)}
        </span>
        <span className={inStock ? "text-xs text-gray-400" : "text-xs text-red-500"}>
          {inStock ? `${product.stock} left` : "Out of stock"}
        </span>
      </div>
      {action && <div className="mt-4">{action}</div>}
    </article>
  );
}
