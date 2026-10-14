"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { STYLES, type Style } from "@/lib/icons";
import { cn } from "@/lib/utils";

const COLUMNS = 6;
const SPECIMEN = [
  "Heart",
  "Bell",
  "Cloud",
  "Camera",
  "Sparkle",
  "Chat",
  "House",
  "Star",
  "Folder",
  "Gift",
  "Lock",
  "Mail",
  "MapPin",
  "Microphone",
  "Moon",
  "Phone",
  "Bookmark",
  "Building",
  "Calendar",
  "Smiley",
  "ShoppingBag",
  "Sun",
  "Image",
  "Gear",
];

const reducedMotion = {
  subscribe(onChange: () => void) {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  },
  get: () => matchMedia("(prefers-reduced-motion: reduce)").matches,
};

export function StyleSpecimen() {
  const [style, setStyle] = useState<Style>("line");
  const still = useSyncExternalStore(
    reducedMotion.subscribe,
    reducedMotion.get,
    () => true,
  );

  useEffect(() => {
    if (still) return;
    const timer = setInterval(
      () => setStyle((s) => STYLES[(STYLES.indexOf(s) + 1) % STYLES.length]),
      2800,
    );
    return () => clearInterval(timer);
  }, [still]);

  return (
    <Card className="mt-[1.25em] gap-0 p-0">
      <div
        className="grid p-3"
        style={{ gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))` }}
      >
        {SPECIMEN.map((name, i) => (
          <div
            key={name}
            className="grid h-16 place-items-center"
            // A diagonal stagger, so a style change reads as one sweep across the set.
            style={{
              transitionDelay: `${((i % COLUMNS) + Math.floor(i / COLUMNS)) * 45}ms`,
            }}
          >
            {STYLES.map((s) => (
              <Icon
                key={s}
                component={`${name}Icon`}
                iconStyle={s}
                size={28}
                aria-hidden
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity,filter,scale] delay-[inherit] duration-500 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:scale-100! motion-reduce:blur-none!",
                  s === style
                    ? "scale-100 opacity-100 blur-none"
                    : "scale-75 opacity-0 blur-[3px]",
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 pb-5 text-xs capitalize">
        {STYLES.map((s) => (
          <span
            key={s}
            className={cn(
              "transition-colors duration-300",
              s === style ? "text-foreground" : "text-muted-foreground/60",
            )}
          >
            {s}
          </span>
        ))}
      </div>
    </Card>
  );
}
