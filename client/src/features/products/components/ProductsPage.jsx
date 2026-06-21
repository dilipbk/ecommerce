import { useState } from "react";
import { ProductList } from "./ProductList";
import { CategoryFilter } from "../../categories/components/CategoryFilter";

export function ProductsPage() {
  const [categoryId, setCategoryId] = useState(null);

  return (
    <section>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Products</h1>
      <div className="mb-6">
        <CategoryFilter selected={categoryId} onSelect={setCategoryId} />
      </div>
      <ProductList categoryId={categoryId} />
    </section>
  );
}
