"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/components/use-copy";
import { highlight, type Lang } from "@/components/code/highlight";
import { SwapIcon } from "@/components/swap-icon";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  lang,
  wrapperClassName,
  ...props
}: React.ComponentProps<"pre"> & {
  code?: string;
  lang?: Lang;
  wrapperClassName?: string;
}) {
  const ref = useRef<HTMLPreElement>(null);
  const { copied, copy } = useCopy();
  const html = useHighlighted(code, lang);

  return (
    // The wrapper takes the block's spacing from typeset, so the button lines up with the code itself.
    <div className={cn("relative mt-[1.25em]", wrapperClassName)}>
      <pre ref={ref} {...props} className={cn(props.className, "mt-0!")}>
        {code === undefined ? (
          props.children
        ) : html ? (
          <code data-highlighted dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <code>{code}</code>
        )}
      </pre>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label={copied === "code" ? "Copied" : "Copy code"}
        onClick={() => copy("code", code ?? ref.current?.innerText ?? "")}
        className="absolute top-1 right-1 size-7 bg-muted text-muted-foreground hover:text-foreground [&_svg]:size-3.5!"
      >
        <SwapIcon
          on={copied === "code"}
          from={<CopyIcon />}
          to={<CheckIcon />}
        />
      </Button>
    </div>
  );
}

export function useHighlighted(
  code: string | undefined,
  lang: Lang | undefined,
) {
  const [result, setResult] = useState<{ code: string; html: string } | null>(
    null,
  );
  useEffect(() => {
    if (code === undefined || !lang) return;
    let live = true;
    highlight(code, lang).then((html) => live && setResult({ code, html }));
    return () => {
      live = false;
    };
  }, [code, lang]);
  return result && result.code === code ? result.html : null;
}
