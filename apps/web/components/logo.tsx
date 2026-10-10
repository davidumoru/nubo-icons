import { cn } from "@/lib/utils";

// The nubo wordmark: each letter built from circles, half circles and bars, softened like the icons.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.75 -8.75 77 25.5"
      role="img"
      aria-label="Nubo"
      className={cn("h-5 w-auto", className)}
    >
      <path
        d="M0 8A8 8 0 0 1 16 8zM0 10.5H6V16H0zM10 10.5H16V16H10zM20 0H26V5.5H20zM30 0H36V5.5H30zM20 8A8 8 0 0 0 36 8zM40 -8H46V16H40zM48.5 0A8 8 0 0 1 48.5 16zM66.75 0A6.25 8 0 0 0 66.75 16zM69.25 0A6.25 8 0 0 1 69.25 16z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
    </svg>
  );
}
