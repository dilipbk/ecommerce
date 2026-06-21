import { formatPrice } from "../../../shared/lib/formatPrice";

export function ProductCard({ product }) {
  const inStock = product.stock > 0;

  return (
    <article className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm">
      <h3 className="font-medium text-gray-900">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm text-gray-500">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold text-gray-900">
          {formatPrice(product.price_cents)}
        </span>
        <span className={inStock ? "text-xs text-gray-400" : "text-xs text-red-500"}>
          {inStock ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>
    </article>
  );
}
