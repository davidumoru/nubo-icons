"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

const INTERACTIVE =
  "a, button, input, textarea, select, label, [role=slider], [role=switch], [role=checkbox], [role=combobox], [contenteditable]";

export function Canvas({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const drag = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      tabIndex={0}
      className={cn(
        "cursor-grab overflow-auto overscroll-contain bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[24px_24px] bg-local focus-visible:outline-none data-dragging:cursor-grabbing data-dragging:select-none",
        className,
      )}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        if ((e.target as Element).closest(INTERACTIVE)) return;
        drag.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.dataset.dragging = "";
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        e.currentTarget.scrollBy(
          drag.current.x - e.clientX,
          drag.current.y - e.clientY,
        );
        drag.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        drag.current = null;
        delete e.currentTarget.dataset.dragging;
      }}
      onPointerCancel={(e) => {
        drag.current = null;
        delete e.currentTarget.dataset.dragging;
      }}
      {...props}
    >
      {children}
    </div>
  );
}
