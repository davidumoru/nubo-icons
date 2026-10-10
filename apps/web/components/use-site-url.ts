"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { clampSize, DEFAULT_SETTINGS, type Settings } from "@/lib/settings";
import { STYLES, type Style } from "@/lib/icons";

const EVENT = "nubo:url";
const SETTING_KEYS = ["style", "size", "stroke", "color"];

const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
};
const readSearch = () => window.location.search;

const replaceUrl = (url: URL) => {
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(EVENT));
};

function settingsParams(s: Settings) {
  const params = new URLSearchParams();
  if (s.iconStyle !== DEFAULT_SETTINGS.iconStyle)
    params.set("style", s.iconStyle);
  if (s.size !== DEFAULT_SETTINGS.size) params.set("size", String(s.size));
  if (s.iconStyle === "line" && s.strokeWidth !== DEFAULT_SETTINGS.strokeWidth)
    params.set("stroke", String(s.strokeWidth));
  if (s.color !== DEFAULT_SETTINGS.color)
    params.set("color", s.color.replace("#", ""));
  return params;
}

function linkedSettings(search: string): Partial<Settings> | null {
  const params = new URLSearchParams(search);
  const out: Partial<Settings> = {};
  const style = params.get("style");
  if (STYLES.includes(style as Style)) out.iconStyle = style as Style;
  const size = Number(params.get("size"));
  if (size > 0) out.size = clampSize(size);
  const stroke = Number(params.get("stroke"));
  if (stroke >= 1 && stroke <= 2.5) out.strokeWidth = stroke;
  const color = params.get("color");
  if (color && /^[0-9a-f]{6}$/i.test(color)) out.color = `#${color}`;
  return Object.keys(out).length ? out : null;
}

export const shareLink = (settings: Settings, iconName?: string) => {
  const query = [
    iconName && `icon=${iconName}`,
    settingsParams(settings).toString(),
  ]
    .filter(Boolean)
    .join("&");
  return `${window.location.origin}/${query ? `?${query}` : ""}`;
};

// The History API directly, not the router: a router navigation would re-render the page for no reason.
export function useSiteUrl(
  onLinkedSettings: (linked: Partial<Settings>) => void,
) {
  const search = useSyncExternalStore(subscribe, readSearch, () => "");
  const name = new URLSearchParams(search).get("icon");

  // A shared link's settings are applied once on arrival and then dropped from the address, so the toolbar
  // is in charge from then on and the address never shows settings that are out of date.
  useEffect(() => {
    const linked = linkedSettings(search);
    if (!linked) return;
    onLinkedSettings(linked);
    const url = new URL(window.location.href);
    SETTING_KEYS.forEach((k) => url.searchParams.delete(k));
    replaceUrl(url);
  }, [search, onLinkedSettings]);

  const openIcon = useCallback((next: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("icon", next);
    window.history.pushState({ nuboIcon: true }, "", url);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const closeIcon = useCallback(() => {
    // Opened from this page: step back, so back and forward stay in step with the drawer. Opened from a shared
    // link: there's nothing of ours to go back to, so just drop the parameter.
    if (window.history.state?.nuboIcon) window.history.back();
    else {
      const url = new URL(window.location.href);
      url.searchParams.delete("icon");
      replaceUrl(url);
    }
  }, []);

  return { name, openIcon, closeIcon };
}
