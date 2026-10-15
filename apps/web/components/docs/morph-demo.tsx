"use client";

import { useState } from "react";
import { MorphIcon, type MorphIconName } from "@nubo-icons/react/morph";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TOGGLES: [MorphIconName, MorphIconName, string, string][] = [
  ["menu", "x", "Open menu", "Close menu"],
  ["plus", "x", "Add", "Cancel"],
  ["chevron-down", "chevron-up", "Expand", "Collapse"],
  ["arrow-right", "check", "Continue", "Done"],
];

export function MorphDemo() {
  return (
    <Card className="mt-[1.25em] flex-row flex-wrap justify-center gap-3 py-8">
      {TOGGLES.map(([off, on, offLabel, onLabel]) => (
        <Toggle
          key={off + on}
          off={off}
          on={on}
          offLabel={offLabel}
          onLabel={onLabel}
        />
      ))}
    </Card>
  );
}

function Toggle({
  off,
  on,
  offLabel,
  onLabel,
}: {
  off: MorphIconName;
  on: MorphIconName;
  offLabel: string;
  onLabel: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <Button
      variant="outline"
      size="icon-lg"
      aria-label={active ? onLabel : offLabel}
      onClick={() => setActive((a) => !a)}
    >
      <MorphIcon name={active ? on : off} />
    </Button>
  );
}
