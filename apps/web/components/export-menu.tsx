"use client";

import { useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  DownloadIcon,
  ImageIcon,
  LinkIcon,
} from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SwapIcon } from "@/components/swap-icon";
import { cn } from "@/lib/utils";
import { saveFile, svgDataUri, svgToPng, withColor } from "@/lib/export";

const SCALES = [1, 2, 3];

// `svg` already carries the chosen size, stroke and color.
export function ExportMenu({
  svg,
  baseName,
  size,
  color,
}: {
  svg: string;
  baseName: string;
  size: number;
  color: string;
}) {
  const [done, setDone] = useState<string | null>(null);
  // PNGs and data URIs need a real color; the default follows the site's text color at the time.
  const solid = () =>
    withColor(
      svg,
      color === "currentColor" ? getComputedStyle(document.body).color : color,
    );
  const flash = (key: string) => {
    setDone(key);
    setTimeout(() => setDone(null), 1500);
  };

  const actions = {
    svg: () =>
      saveFile(new Blob([svg], { type: "image/svg+xml" }), `${baseName}.svg`),
    png: async (scale: number) =>
      saveFile(
        await svgToPng(solid(), size * scale),
        `${baseName}${scale > 1 ? `@${scale}x` : ""}.png`,
      ),
    copyPng: async () => {
      // Safari needs the ClipboardItem built from a promise inside the click.
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": svgToPng(solid(), size * 2) }),
      ]);
      flash("copyPng");
    },
    copyUri: async () => {
      await navigator.clipboard.writeText(svgDataUri(solid()));
      flash("copyUri");
    },
  };

  return (
    <ButtonGroup className="rounded-4xl bg-secondary">
      <Button variant="secondary" size="sm" onClick={actions.svg}>
        <DownloadIcon data-icon="inline-start" />
        Download SVG
      </Button>
      {/* A short divider on the group's own fill, so the two halves read as one button with no seam. */}
      <ButtonGroupSeparator className="my-auto! h-4! self-center! bg-foreground/15" />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="secondary"
              size="icon-sm"
              aria-label="More download and copy options"
            />
          }
        >
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        {/* A fixed width: the menu never resizes, so it can't shift under the pointer when a hint changes to "Copied". */}
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={actions.svg}>
              <DownloadIcon />
              SVG
              <Hint>vector</Hint>
            </DropdownMenuItem>
            {SCALES.map((scale) => (
              <DropdownMenuItem key={scale} onClick={() => actions.png(scale)}>
                <ImageIcon />
                PNG {scale}x<Hint>{`${size * scale}px`}</Hint>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem closeOnClick={false} onClick={actions.copyPng}>
              <SwapIcon
                on={done === "copyPng"}
                from={<CopyIcon />}
                to={<CheckIcon />}
              />
              Copy PNG
              <Hint done={done === "copyPng"}>for Figma, docs</Hint>
            </DropdownMenuItem>
            <DropdownMenuItem closeOnClick={false} onClick={actions.copyUri}>
              <SwapIcon
                on={done === "copyUri"}
                from={<LinkIcon />}
                to={<CheckIcon />}
              />
              Copy data URI
              <Hint done={done === "copyUri"}>for CSS</Hint>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}

function Hint({
  children,
  done = false,
}: {
  children: React.ReactNode;
  done?: boolean;
}) {
  return (
    <span
      className={cn(
        "ml-auto min-w-0 truncate pl-4 text-xs",
        done ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {done ? "Copied" : children}
    </span>
  );
}
