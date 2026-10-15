"use client";

import { useEffect, useState } from "react";
import { MorphIcon, type MorphIconName } from "@nubo-icons/react/morph";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAMES: MorphIconName[] = [
  "menu",
  "x",
  "plus",
  "minus",
  "check",
  "arrow-right",
  "arrow-down",
  "arrow-left",
  "arrow-up",
  "chevron-right",
  "chevron-down",
  "chevron-left",
  "chevron-up",
];

const PAIRS = NAMES.flatMap((a) =>
  NAMES.filter((b) => b !== a).map((b) => [a, b] as const),
);

export function MorphLab() {
  const [name, setName] = useState<MorphIconName>("menu");
  const [pair, setPair] = useState<number | null>(null);

  useEffect(() => {
    if (pair === null) return;
    const [a, b] = PAIRS[pair];
    const back = setTimeout(() => setName(a));
    const there = setTimeout(() => setName(b), 700);
    const next = setTimeout(
      () => setPair((p) => (p === null ? null : (p + 1) % PAIRS.length)),
      1800,
    );
    return () => {
      clearTimeout(back);
      clearTimeout(there);
      clearTimeout(next);
    };
  }, [pair]);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex gap-10">
        <MorphIcon name={name} size={128} />
        <MorphIcon name={name} size={48} />
        <MorphIcon name={name} size={24} />
      </div>
      <p className="h-5 font-mono text-sm text-muted-foreground">
        {pair === null ? name : `${PAIRS[pair][0]} → ${PAIRS[pair][1]}`}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {NAMES.map((n) => (
          <Button
            key={n}
            variant="outline"
            size="sm"
            className={cn("font-mono", n === name && "bg-muted")}
            onClick={() => {
              setPair(null);
              setName(n);
            }}
          >
            {n}
          </Button>
        ))}
      </div>
      <Button onClick={() => setPair((p) => (p === null ? 0 : null))}>
        {pair === null ? "Play every pair" : "Stop"}
      </Button>
    </div>
  );
}
