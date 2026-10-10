"use client";

import { useCallback, useSyncExternalStore } from "react";

// Kept in memory too, so a choice still sticks for the visit when storage is blocked.
const memory = new Map<string, string>();

// A choice remembered across pages and visits, like the package manager or the code format.
export function useStoredChoice<T extends string>(
  key: string,
  options: readonly T[],
  fallback: T,
) {
  const read = useCallback((): T => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) memory.set(key, saved);
    } catch {}
    const value = memory.get(key);
    return options.includes(value as T) ? (value as T) : fallback;
  }, [key, options, fallback]);
  const subscribe = useCallback(
    (onChange: () => void) => {
      window.addEventListener("storage", onChange);
      window.addEventListener(key, onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(key, onChange);
      };
    },
    [key],
  );
  const value = useSyncExternalStore(subscribe, read, () => fallback);
  const choose = useCallback(
    (next: T) => {
      memory.set(key, next);
      try {
        localStorage.setItem(key, next);
      } catch {}
      window.dispatchEvent(new Event(key));
    },
    [key],
  );
  return [value, choose] as const;
}
