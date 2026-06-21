import { useCategories } from "../hooks/useCategories";

function pillClass(active) {
  return active
    ? "rounded-full bg-gray-900 px-3 py-1 text-sm font-medium text-white"
    : "rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-600 transition-colors hover:border-gray-400";
}

export function CategoryFilter({ selected, onSelect }) {
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={pillClass(selected == null)}
      >
        All
      </button>
      {categories?.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className={pillClass(selected === category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
