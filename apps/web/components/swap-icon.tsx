import { cn } from "@/lib/utils";

// Both icons stay mounted and cross-fade, so the swap and the swap back are interruptible CSS transitions.
export function SwapIcon({
  on,
  from,
  to,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  on: boolean;
  from: React.ReactNode;
  to: React.ReactNode;
}) {
  const layer =
    "col-start-1 row-start-1 flex items-center justify-center transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:scale-100! motion-reduce:blur-none!";
  const hidden = "scale-[0.25] opacity-0 blur-[4px]";
  const shown = "scale-100 opacity-100 blur-none";
  return (
    <span className={cn("inline-grid shrink-0", className)} {...props}>
      <span aria-hidden className={cn(layer, on ? hidden : shown)}>
        {from}
      </span>
      <span aria-hidden className={cn(layer, on ? shown : hidden)}>
        {to}
      </span>
    </span>
  );
}
