import { QueryClient } from "@tanstack/react-query";

/**
 * Single shared QueryClient for the app.
 * Defaults tuned for a typical CRUD UI; override per-query as needed.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // data is "fresh" for 1 min before refetching
      gcTime: 5 * 60_000, // cache kept 5 min after a query goes unused
      retry: 1, // retry a failed request once
      refetchOnWindowFocus: false, // don't refetch just because the tab regained focus
    },
    mutations: {
      retry: 0,
    },
  },
});
