"use client";

import { useState } from "react";
import Link from "next/link";
import { MorphIcon } from "@nubo-icons/react/morph";

export function MorphPill() {
  const [active, setActive] = useState(false);
  return (
    <Link
      href="/docs/morphing"
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group inline-flex h-7 items-center gap-2 rounded-full bg-foreground/5 pr-3 pl-1 text-[0.8125rem] font-medium transition-colors hover:bg-foreground/10"
    >
      <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
        New
      </span>
      Morphing icons
      <MorphIcon
        name={active ? "arrow-right" : "chevron-right"}
        size={14}
        className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
