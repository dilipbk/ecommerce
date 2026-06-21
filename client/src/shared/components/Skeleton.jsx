/** A pulsing placeholder block. Pass sizing via className (e.g. "h-4 w-2/3"). */
export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}
