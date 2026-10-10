"use client";

import { useState } from "react";
import {
  ArrowCounterClockwiseIcon,
  CheckIcon,
  LinkIcon,
  SlidersHorizontalIcon,
  HeartIcon as HeartLineIcon,
  SparklesIcon,
} from "@nubo-icons/react";
import { HeartIcon as HeartFillIcon } from "@nubo-icons/react/fill";
import { HeartIcon as HeartDuoIcon } from "@nubo-icons/react/duo";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { STYLES, type Style } from "@/lib/icons";
import {
  clampSize,
  DEFAULT_SETTINGS,
  effectiveStroke,
  SIZE_RANGE,
  type Settings,
} from "@/lib/settings";
import { shareLink } from "@/components/use-site-url";
import { useCopy } from "@/components/use-copy";
import { SwapIcon } from "@/components/swap-icon";
import { cn } from "@/lib/utils";

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
  const { copied, copy } = useCopy();

  return (
    <div className="flex items-center gap-2">
      <StyleToggle
        value={settings.iconStyle}
        onChange={(iconStyle) => onChange({ ...settings, iconStyle })}
        className="max-md:flex-1"
      />
      <Customize settings={settings} onChange={onChange} />
      <Button
        variant="outline"
        size="icon"
        onClick={() => copy("share", shareLink(settings))}
        aria-label={
          copied === "share" ? "Link copied" : "Copy a link with these settings"
        }
        title="Copy a link with these settings"
      >
        <SwapIcon
          on={copied === "share"}
          from={<LinkIcon />}
          to={<CheckIcon />}
        />
      </Button>
    </div>
  );
}

const SIZES = [16, 20, 24, 32, 48];

const SWATCHES = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

function Customize({
  settings,
  onChange,
}: {
  settings: Settings;
  onChange: (settings: Settings) => void;
}) {
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    onChange({ ...settings, [key]: value });
  const lineOnly = settings.iconStyle !== "line";
  const auto = settings.color === "currentColor";

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" className="relative" />}
      >
        <SlidersHorizontalIcon data-icon="inline-start" />
        <span className="max-sm:sr-only">Customize</span>
        {!isDefault(settings) && (
          <span
            aria-label="Changed"
            className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary"
          />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 gap-5">
        <FieldGroup className="gap-5">
          <Field className="gap-2.5">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="icon-size">Size</FieldLabel>
              <InputGroup className="h-8 w-20">
                <SizeInput
                  id="icon-size"
                  value={settings.size}
                  onCommit={(size) => set("size", size)}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <ToggleGroup
              value={
                SIZES.includes(settings.size) ? [String(settings.size)] : []
              }
              onValueChange={(v) => v[0] && set("size", Number(v[0]))}
              aria-label="Size presets"
              variant="outline"
              size="sm"
              spacing={0}
              className="w-full"
            >
              {SIZES.map((s) => (
                <ToggleGroupItem
                  key={s}
                  value={String(s)}
                  className="flex-1 tabular-nums"
                >
                  {s}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Field>

          <Field data-disabled={lineOnly || undefined} className="gap-2.5">
            <div className="flex items-center justify-between">
              <FieldLabel>Stroke</FieldLabel>
              <span className="text-sm text-muted-foreground tabular-nums">
                {effectiveStroke(settings)}px
              </span>
            </div>
            <Slider
              min={1}
              max={2.5}
              step={0.25}
              value={[effectiveStroke(settings)]}
              onValueChange={(v) => set("strokeWidth", first(v))}
              disabled={lineOnly}
              aria-label="Stroke width"
            />
          </Field>

          <Field className="gap-2.5">
            <FieldLabel htmlFor="icon-color">Color</FieldLabel>
            <ToggleGroup
              value={[settings.color]}
              onValueChange={(v) => v[0] && set("color", v[0])}
              aria-label="Color"
              spacing={1}
              className="w-full justify-between"
            >
              <ToggleGroupItem
                value="currentColor"
                aria-label="Auto, follows the text color"
                title="Auto"
                className="size-8 min-w-8 rounded-full p-0"
              >
                <span className="size-5 rounded-full bg-[conic-gradient(var(--foreground)_0_50%,var(--background)_0)] ring-1 ring-foreground/20" />
              </ToggleGroupItem>
              {SWATCHES.map((c) => (
                <ToggleGroupItem
                  key={c}
                  value={c}
                  aria-label={c}
                  title={c}
                  className="size-8 min-w-8 rounded-full p-0"
                >
                  <span
                    className="size-5 rounded-full"
                    style={{ backgroundColor: c }}
                  />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <InputGroup className="h-8">
              <InputGroupAddon>
                <label className="relative grid size-5 cursor-pointer place-items-center">
                  <span
                    className={cn(
                      "size-4 rounded-full ring-1 ring-foreground/20",
                      auto && "bg-foreground",
                    )}
                    style={
                      auto ? undefined : { backgroundColor: settings.color }
                    }
                  />
                  <input
                    type="color"
                    aria-label="Pick a color"
                    value={auto ? "#171717" : settings.color}
                    onChange={(e) => set("color", e.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </label>
              </InputGroupAddon>
              <HexInput
                id="icon-color"
                value={auto ? "" : settings.color}
                onCommit={(hex) => set("color", hex)}
              />
            </InputGroup>
          </Field>
        </FieldGroup>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onChange(randomSettings(settings))}
          >
            <SparklesIcon data-icon="inline-start" />
            Random
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => onChange(DEFAULT_SETTINGS)}
            disabled={isDefault(settings)}
          >
            <ArrowCounterClockwiseIcon data-icon="inline-start" />
            Reset
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Clamping on every keystroke would turn a half-typed "24" into 12.
function SizeInput({
  id,
  value,
  onCommit,
}: {
  id: string;
  value: number;
  onCommit: (size: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const [synced, setSynced] = useState(value);
  if (value !== synced) {
    setSynced(value);
    setDraft(String(value));
  }
  const commit = () => {
    const size = clampSize(Number(draft) || value);
    setDraft(String(size));
    onCommit(size);
  };
  return (
    <InputGroupInput
      id={id}
      type="number"
      inputMode="numeric"
      min={SIZE_RANGE.min}
      max={SIZE_RANGE.max}
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value);
        const v = Number(e.target.value);
        if (v >= SIZE_RANGE.min && v <= SIZE_RANGE.max) onCommit(v);
      }}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
      }}
      className="[appearance:textfield] text-right tabular-nums [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}

// Keeps its own draft so a half-typed value isn't rejected mid-keystroke; only a complete hex reaches the icons.
function HexInput({
  id,
  value,
  onCommit,
}: {
  id: string;
  value: string;
  onCommit: (hex: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [synced, setSynced] = useState(value);
  if (value !== synced) {
    setSynced(value);
    setDraft(value);
  }
  return (
    <InputGroupInput
      id={id}
      value={draft}
      placeholder="Auto"
      spellCheck={false}
      onChange={(e) => {
        const next = e.target.value.trim();
        setDraft(next);
        const hex = next.startsWith("#") ? next : `#${next}`;
        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex))
          onCommit(hex.toLowerCase());
      }}
      className="font-mono text-xs"
    />
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
