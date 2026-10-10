"use client";

import type React from "react";
import { CodeIcon, DownloadIcon } from "@nubo-icons/react";
import { CodeTabsBlock } from "@/components/code/code-tabs-block";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Formatter-style layout: the root tag's attributes one per line, each element on its own line.
function prettySvg(svg: string) {
  const rootEnd = svg.indexOf(">");
  const [tag, ...attrs] =
    svg.slice(1, rootEnd).match(/[^\s"=]+(?:="[^"]*")?/g) ?? [];
  const root = [`<${tag}`, ...attrs.map((a) => `  ${a}`), ">"].join("\n");
  let depth = 1;
  const body = svg
    .slice(rootEnd + 1)
    .replace(/></g, ">\n<")
    .split("\n")
    .map((line) => {
      if (line.startsWith("</")) depth--;
      const out = "  ".repeat(Math.max(0, depth)) + line;
      if (!line.startsWith("</") && !line.endsWith("/>")) depth++;
      return out;
    });
  return [root, ...body].join("\n");
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
  return (
    // The same code block, and the same typeset code styling, as the docs.
    <div className="typeset typeset-docs">
      <CodeTabsBlock
        storageKey="nubo:format"
        icon={<CodeIcon />}
        className="mt-0"
        preClassName="max-h-80"
        tabs={[
          { value: "svg", label: "SVG", code: prettySvg(svg), lang: "xml" },
          { value: "react", label: "React", code: jsx, lang: "tsx" },
        ]}
        actions={
          <IconButton
            label={`Download ${fileName}`}
            onClick={() => download(svg, fileName)}
          >
            <DownloadIcon />
          </IconButton>
        }
      />
    </div>
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
            className="size-7 text-muted-foreground hover:text-foreground [&_svg]:size-3.5!"
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
