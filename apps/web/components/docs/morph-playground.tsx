"use client";

import { useEffect, useState } from "react";
import { PauseIcon, PlayIcon } from "@nubo-icons/react";
import { MorphIcon, type MorphIconName } from "@nubo-icons/react/morph";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { cn } from "@/lib/utils";

const ROWS: MorphIconName[][] = [
  ["menu", "x", "plus", "minus", "check"],
  ["arrow-right", "arrow-down", "arrow-left", "arrow-up"],
  ["chevron-right", "chevron-down", "chevron-left", "chevron-up"],
];

export function MorphPlayground() {
  const [sequence, setSequence] = useState<MorphIconName[]>([
    "menu",
    "x",
    "plus",
    "arrow-right",
  ]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const still = useReducedMotion();
  const name = sequence[step];
  const next = sequence[(step + 1) % sequence.length];

  useEffect(() => {
    if (!playing || still) return;
    const timer = setInterval(
      () => setStep((s) => (s + 1) % sequence.length),
      1600,
    );
    return () => clearInterval(timer);
  }, [playing, still, sequence.length]);

  function toggle(icon: MorphIconName) {
    const index = sequence.indexOf(icon);
    if (index === -1) {
      setSequence([...sequence, icon]);
      return;
    }
    if (sequence.length === 1) return;
    setSequence(sequence.filter((n) => n !== icon));
    setStep((s) => (index < s || s === sequence.length - 1 ? s - 1 : s));
  }

  return (
    <Card className="relative mt-[1.25em] items-center gap-0 py-10">
      {!still && (
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </Button>
      )}
      <button
        type="button"
        aria-label={`Morph to ${next}`}
        onClick={() => {
          setPlaying(false);
          setStep((step + 1) % sequence.length);
        }}
        className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-[0.97]"
      >
        <MorphIcon name={name} size={36} />
      </button>
      <div aria-hidden className="mt-5 flex gap-1.5">
        {sequence.map((n, i) => (
          <span
            key={n}
            className={cn(
              "size-1.5 rounded-full transition-colors",
              i === step ? "bg-foreground" : "bg-foreground/15",
            )}
          />
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center gap-1.5">
        {ROWS.map((row) => (
          <div key={row[0]} className="flex gap-1.5">
            {row.map((icon) => (
              <button
                key={icon}
                type="button"
                aria-label={icon}
                aria-pressed={sequence.includes(icon)}
                onClick={() => toggle(icon)}
                className="flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground aria-pressed:border-foreground aria-pressed:text-foreground"
              >
                <MorphIcon name={icon} size={16} />
              </button>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
