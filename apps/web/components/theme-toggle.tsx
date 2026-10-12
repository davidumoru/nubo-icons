"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@nubo-icons/react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      <span
        data-swap
        className="theme-toggle-icon grid *:col-start-1 *:row-start-1"
      >
        <SunIcon className="scale-25 opacity-0 blur-[4px] dark:scale-100 dark:opacity-100 dark:blur-none" />
        <MoonIcon className="dark:scale-25 dark:opacity-0 dark:blur-[4px]" />
      </span>
    </Button>
  );
}
