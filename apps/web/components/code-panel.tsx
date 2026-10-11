"use client";

import { CodeIcon } from "@nubo-icons/react";
import { CodeTabsBlock } from "@/components/code/code-tabs-block";

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
  styleSvgs,
  jsx,
}: {
  svg: string;
  styleSvgs: string[];
  jsx: string;
}) {
  return (
    <div className="typeset typeset-docs">
      <CodeTabsBlock
        storageKey="nubo:format"
        icon={<CodeIcon />}
        className="mt-0"
        preClassName="max-h-80"
        tabs={[
          {
            value: "svg",
            label: "SVG",
            code: prettySvg(svg),
            lang: "xml",
            reserve: styleSvgs.map(prettySvg),
          },
          { value: "react", label: "React", code: jsx, lang: "tsx" },
        ]}
      />
    </div>
  );
}
