import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
// Composition point: the products list injects the cart's add-to-cart action.
import { AddToCartButton } from "../../cart/components/AddToCartButton";

const gridClass = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export function ProductList({ categoryId }) {
  const { data: products, isPending, isError, error } = useProducts({ categoryId });

  if (isPending) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-600">Failed to load products: {error.message}</p>
    );
  }

  if (products.length === 0) {
    return <p className="text-gray-500">No products yet.</p>;
  }

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          action={
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              disabled={product.stock === 0}
            />
          }
        />
      ))}
    </div>
  );
}
