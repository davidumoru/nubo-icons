import type { Customization, Style } from "@/lib/icons";

export type Settings = Customization & { iconStyle: Style };

export const DEFAULT_SETTINGS: Settings = {
  iconStyle: "line",
  size: 24,
  strokeWidth: 1.5,
  color: "currentColor",
};

// Fill and Duo are drawn for the 1.5px stroke; a different weight would close their holes and gaps.
export const effectiveStroke = (s: Settings) =>
  s.iconStyle === "line" ? s.strokeWidth : 1.5;
