import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/getCategories";
import { categoryKeys } from "../api/queryKeys";

/** Categories rarely change, so keep them fresh for the whole session. */
export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
    staleTime: Infinity,
  });
}
