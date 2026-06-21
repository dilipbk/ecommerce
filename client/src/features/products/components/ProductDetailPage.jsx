import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { formatPrice } from "../../../shared/lib/formatPrice";
import { Skeleton } from "../../../shared/components/Skeleton";
import { AddToCartButton } from "../../cart/components/AddToCartButton";
import { PATHS } from "../../../app/routes/paths";

export function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isPending, isError, error } = useProduct(Number(id));

  const backLink = (
    <Link to={PATHS.products} className="text-sm text-gray-500 hover:text-gray-900">
      ← Back to products
    </Link>
  );

  if (isPending) {
    return (
      <section className="max-w-2xl space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-9 w-40" />
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

  const inStock = product.stock > 0;

  return (
    <section className="max-w-2xl space-y-4">
      {backLink}
      <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-2xl font-semibold text-gray-900">
        {formatPrice(product.price_cents)}
      </p>
      <p className={inStock ? "text-sm text-gray-500" : "text-sm text-red-500"}>
        {inStock ? `${product.stock} in stock` : "Out of stock"}
      </p>
      <div className="max-w-xs pt-2">
        <AddToCartButton
          productId={product.id}
          productName={product.name}
          disabled={!inStock}
        />
      </div>
    </section>
  );
}
