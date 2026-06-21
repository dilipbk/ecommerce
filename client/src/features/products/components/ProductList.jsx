import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";

export function ProductList() {
  const { data: products, isPending, isError, error } = useProducts();

  if (isPending) {
    return <p className="text-gray-500">Loading products…</p>;
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
