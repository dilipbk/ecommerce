/** Format an integer number of cents as a USD price string, e.g. 2599 -> "$25.99". */
export function formatPrice(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
