"use client";

import { useRef } from "react";
import { CheckIcon, CopyIcon } from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/components/use-copy";

export function CodeBlock(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const { copied, copy } = useCopy();
  return (
    <div className="group/code relative">
      <pre ref={ref} {...props} />
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={copied === "code" ? "Copied" : "Copy code"}
        onClick={() => copy("code", ref.current?.innerText ?? "")}
        className="absolute top-2 right-2 bg-muted opacity-0 transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100"
      >
        {copied === "code" ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}
