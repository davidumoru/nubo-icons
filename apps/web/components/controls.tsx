"use client";

import {
  ArrowCounterClockwiseIcon,
  CheckIcon,
  ShareIcon,
  HeartIcon as HeartLineIcon,
  SparklesIcon,
} from "@nubo-icons/react";
import { HeartIcon as HeartFillIcon } from "@nubo-icons/react/fill";
import { HeartIcon as HeartDuoIcon } from "@nubo-icons/react/duo";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { STYLES, type Style } from "@/lib/icons";
import {
  DEFAULT_SETTINGS,
  effectiveStroke,
  type Settings,
} from "@/lib/settings";
import { shareLink } from "@/components/use-site-url";
import { useCopy } from "@/components/use-copy";
import { SwapIcon } from "@/components/swap-icon";

const STYLE_ICONS = {
  line: HeartLineIcon,
  fill: HeartFillIcon,
  duo: HeartDuoIcon,
};

export function StyleToggle({
  value,
  onChange,
  className,
}: {
  value: Style;
  onChange: (style: Style) => void;
  className?: string;
}) {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(v) => v[0] && onChange(v[0] as Style)}
      aria-label="Style"
      variant="outline"
      spacing={0}
      className={className}
    >
      {STYLES.map((s) => {
        const StyleIcon = STYLE_ICONS[s];
        return (
          <ToggleGroupItem key={s} value={s} className="flex-1 capitalize">
            <StyleIcon data-icon="inline-start" />
            {s}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}

export function Controls({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (settings: Settings) => void;
}) {
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    onChange({ ...settings, [key]: value });
  const lineOnly = settings.iconStyle !== "line";
  const { copied, copy } = useCopy();

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <StyleToggle
        value={settings.iconStyle}
        onChange={(s) => set("iconStyle", s)}
      />

      <Field orientation="horizontal" className="w-auto">
        <FieldLabel htmlFor="icon-size">Size</FieldLabel>
        <div className="w-24 shrink-0">
          <Slider
            min={16}
            max={48}
            step={2}
            value={[Math.min(48, Math.max(16, settings.size))]}
            onValueChange={(v) => set("size", first(v))}
            aria-label="Size"
          />
        </div>
        <Input
          id="icon-size"
          type="number"
          min={8}
          max={256}
          value={settings.size}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > 0) set("size", v);
          }}
          className="w-16 shrink-0 text-center tabular-nums"
        />
      </Field>

      <Field
        orientation="horizontal"
        data-disabled={lineOnly || undefined}
        className="w-auto"
      >
        <FieldLabel>Stroke</FieldLabel>
        <div className="w-24 shrink-0">
          <Slider
            min={1}
            max={2.5}
            step={0.25}
            value={[effectiveStroke(settings)]}
            onValueChange={(v) => set("strokeWidth", first(v))}
            disabled={lineOnly}
            aria-label="Stroke width"
          />
        </div>
        <span className="w-8 text-sm tabular-nums">
          {effectiveStroke(settings)}
        </span>
      </Field>

      <Field orientation="horizontal" className="w-auto">
        <FieldLabel htmlFor="icon-color">Color</FieldLabel>
        <Input
          id="icon-color"
          type="color"
          value={settings.color === "currentColor" ? "#171717" : settings.color}
          onChange={(e) => set("color", e.target.value)}
          className="w-12 shrink-0 cursor-pointer p-1 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0"
        />
      </Field>

      <div className="flex items-center gap-1 md:ml-auto">
        <Button
          variant="outline"
          onClick={() => onChange(randomSettings(settings))}
        >
          <SparklesIcon data-icon="inline-start" />
          Random
        </Button>
        <Button
          variant="ghost"
          onClick={() => onChange(DEFAULT_SETTINGS)}
          disabled={isDefault(settings)}
        >
          <ArrowCounterClockwiseIcon data-icon="inline-start" />
          Reset
        </Button>
        <Separator orientation="vertical" className="mx-1 h-5! self-center!" />
        <Button
          variant="outline"
          onClick={() => copy("share", shareLink(settings))}
          title="Copy a link to the site with these settings"
        >
          <SwapIcon
            data-icon="inline-start"
            on={copied === "share"}
            from={<ShareIcon />}
            to={<CheckIcon />}
          />
          Share
        </Button>
      </div>
    </div>
  );
}

const first = (v: number | readonly number[]) =>
  typeof v === "number" ? v : v[0];

const isDefault = (s: Settings) =>
  (Object.keys(DEFAULT_SETTINGS) as (keyof Settings)[]).every(
    (k) => s[k] === DEFAULT_SETTINGS[k],
  );

const pick = <T,>(items: readonly T[]) =>
  items[Math.floor(Math.random() * items.length)];

function hslToHex(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
}

// Always lands somewhere visibly different, so a click never looks like it did nothing.
function randomSettings(current: Settings): Settings {
  let next: Settings;
  do {
    next = {
      iconStyle: pick(STYLES),
      size: pick([20, 24, 28, 32, 36, 40]),
      strokeWidth: pick([1.25, 1.5, 1.75, 2]),
      color: hslToHex(Math.floor(Math.random() * 360), 0.7, 0.55),
    };
  } while (next.iconStyle === current.iconStyle && next.size === current.size);
  return next;
}
