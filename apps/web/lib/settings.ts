import type { Customization, Style } from "@/lib/icons";

export type Settings = Customization & { iconStyle: Style };

export const DEFAULT_SETTINGS: Settings = {
  iconStyle: "line",
  size: 24,
  strokeWidth: 1.5,
  color: "currentColor",
};

// Large enough for any UI use, small enough to stay inside the smallest grid tile.
export const SIZE_RANGE = { min: 12, max: 64 };

export const clampSize = (size: number) =>
  Math.min(SIZE_RANGE.max, Math.max(SIZE_RANGE.min, Math.round(size)));

// Fill and Duo are drawn for the 1.5px stroke; a different weight would close their holes and gaps.
export const effectiveStroke = (s: Settings) =>
  s.iconStyle === "line" ? s.strokeWidth : 1.5;
