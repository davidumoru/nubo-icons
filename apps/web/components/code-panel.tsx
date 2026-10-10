"use client";

import type React from "react";
import { useSyncExternalStore } from "react";
import { CheckIcon, CopyIcon, DownloadIcon } from "@nubo-icons/react";
import { useCopy } from "@/components/use-copy";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FORMATS = ["svg", "react"] as const;
type Format = (typeof FORMATS)[number];
const LABELS: Record<Format, string> = { svg: "SVG", react: "React" };
const STORAGE_KEY = "nubo:format";

// Kept in memory too, so the tab still switches when storage is blocked.
let current: Format = "svg";
const readFormat = (): Format => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "svg" || saved === "react") current = saved;
  } catch {}
  return current;
};
const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(STORAGE_KEY, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(STORAGE_KEY, onChange);
  };
};

const choose = (f: Format) => {
  current = f;
  try {
    localStorage.setItem(STORAGE_KEY, f);
  } catch {}
  window.dispatchEvent(new Event(STORAGE_KEY));
};

function prettySvg(svg: string) {
  let depth = 0;
  return svg
    .replace(/></g, ">\n<")
    .split("\n")
    .map((line) => {
      if (line.startsWith("</")) depth--;
      const out = "  ".repeat(Math.max(0, depth)) + line;
      if (!line.startsWith("</") && !line.endsWith("/>")) depth++;
      return out;
    })
    .join("\n");
}

export function CodePanel({
  svg,
  fileName,
  jsx,
}: {
  svg: string;
  fileName: string;
  jsx: string;
}) {
  const format = useSyncExternalStore(
    subscribe,
    readFormat,
    (): Format => "svg",
  );
  const { copied, copy } = useCopy();
  const code = format === "svg" ? prettySvg(svg) : jsx;

  return (
    // Concentric with the 36px pill tabs and buttons in the header: 18px radius + 6px padding.
    <Card className="gap-0 rounded-[24px] py-0">
      <Tabs value={format} onValueChange={(v) => choose(v as Format)}>
        <div className="flex items-center justify-between p-1.5">
          <TabsList aria-label="Code format">
            {FORMATS.map((f) => (
              <TabsTrigger key={f} value={f}>
                {LABELS[f]}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center">
            <IconButton
              label={`Download ${fileName}`}
              onClick={() => download(svg, fileName)}
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              label={copied === "all" ? "Copied" : `Copy ${LABELS[format]}`}
              onClick={() => copy("all", format === "svg" ? svg : jsx)}
            >
              {copied === "all" ? <CheckIcon /> : <CopyIcon />}
            </IconButton>
          </div>
        </div>
      </Tabs>
      <Separator />
      <pre className="max-h-72 overflow-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]">
        {code}
      </pre>
    </Card>
  );
}

function download(svg: string, fileName: string) {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            aria-label={label}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
