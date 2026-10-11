"use client";

import { CheckIcon, CopyIcon } from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCopy } from "@/components/use-copy";
import { useHighlighted } from "@/components/code/code-block";
import { useStoredChoice } from "@/components/code/use-stored-choice";
import type { Lang } from "@/components/code/highlight";
import { SwapIcon } from "@/components/swap-icon";
import { cn } from "@/lib/utils";

type CodeTab = {
  value: string;
  label: string;
  code: string;
  lang?: Lang;
  // Other versions this tab can switch to (an icon's other styles), measured so swapping them doesn't resize the block.
  reserve?: string[];
};

// Variants of the same code get pill tabs inside the block's header, like shadcn's; underline tabs above a
// block are kept for switching between different kinds of content.
export function CodeTabsBlock({
  tabs,
  storageKey,
  icon,
  actions,
  className,
  preClassName,
}: {
  tabs: CodeTab[];
  storageKey: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  preClassName?: string;
}) {
  const values = tabs.map((t) => t.value);
  const [value, choose] = useStoredChoice(storageKey, values, values[0]);
  const active = tabs.find((t) => t.value === value) ?? tabs[0];
  const { copied, copy } = useCopy();

  return (
    <Tabs
      value={active.value}
      onValueChange={(v) => choose(v as string)}
      className={cn(
        "mt-[1.25em] gap-0 overflow-hidden rounded-(--radius) bg-muted",
        className,
      )}
    >
      <div className="flex items-center gap-1 border-b border-border/50 p-1">
        {icon && (
          <span className="flex size-7 items-center justify-center text-muted-foreground [&_svg]:size-3.5">
            {icon}
          </span>
        )}
        <TabsList className="h-auto rounded-none bg-transparent p-0 group-data-horizontal/tabs:h-auto">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              // Concentric with the block: its radius minus the header's 4px padding.
              className="h-7 rounded-[calc(var(--radius)-4px)] border border-transparent px-2.5 font-mono text-[0.8125rem] data-active:border-input data-active:bg-background"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="ml-auto flex items-center">
          {actions}
          <Button
            variant="ghost"
            size="icon"
            aria-label={copied === "code" ? "Copied" : `Copy ${active.label}`}
            onClick={() => copy("code", active.code)}
            className="size-7 text-muted-foreground hover:text-foreground [&_svg]:size-3.5!"
          >
            <SwapIcon
              on={copied === "code"}
              from={<CopyIcon />}
              to={<CheckIcon />}
            />
          </Button>
        </div>
      </div>
      {/* Invisible copies of every tab share the active panel's grid cell, so the block is always as tall as its
          longest tab and switching never resizes what's around it. */}
      <div className="grid">
        {tabs.flatMap((t) =>
          [t.code, ...(t.reserve ?? [])].map((code, i) => (
            <div
              key={`${t.value}-${i}`}
              aria-hidden
              inert
              className="invisible col-start-1 row-start-1 min-w-0 text-sm"
            >
              <HighlightedPre
                code={code}
                lang={t.lang}
                className={preClassName}
              />
            </div>
          )),
        )}
        {tabs.map((t) => (
          <TabsContent
            key={t.value}
            value={t.value}
            className="col-start-1 row-start-1 min-w-0"
          >
            <HighlightedPre
              code={t.code}
              lang={t.lang}
              className={preClassName}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

function HighlightedPre({
  code,
  lang,
  className,
}: {
  code: string;
  lang?: Lang;
  className?: string;
}) {
  const html = useHighlighted(code, lang);
  return (
    <pre
      className={cn(
        "mt-0! rounded-none! bg-transparent! px-4! py-3.5!",
        className,
      )}
    >
      {html ? (
        <code data-highlighted dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <code>{code}</code>
      )}
    </pre>
  );
}
