"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = useCallback(async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1500);
  }, []);
  return { copied, copy };
}
