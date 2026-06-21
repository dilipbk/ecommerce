import { Skeleton } from "../../../shared/components/Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-4/5" />
      <Skeleton className="mt-4 h-6 w-1/3" />
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
}
