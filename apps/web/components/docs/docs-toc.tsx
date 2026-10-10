"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpIcon, PencilIcon, TextAlignLeftIcon } from "@nubo-icons/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function useActiveItem(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "0% 0% -80% 0%" },
    );
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    elements.forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const linkClass =
  "inline-flex items-center gap-2 text-[0.8rem] text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-3.5";

export function DocsTableOfContents({
  toc,
  editUrl,
  className,
}: {
  toc: { title: string; url: string; depth: number }[];
  editUrl: string;
  className?: string;
}) {
  const ids = useMemo(() => toc.map((t) => t.url.slice(1)), [toc]);
  const active = useActiveItem(ids) ?? ids[0];
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {toc.length > 0 && (
        <nav aria-label="On this page" className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-xs font-medium text-foreground [&_svg]:size-3.5">
            <TextAlignLeftIcon />
            On this page
          </p>
          <ul className="flex flex-col border-l">
            {toc.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  data-active={item.url === `#${active}`}
                  data-depth={item.depth}
                  className="-ml-px block border-l border-transparent py-1 pl-3 text-[0.8rem] text-muted-foreground transition-colors hover:text-foreground data-[active=true]:border-foreground data-[active=true]:font-medium data-[active=true]:text-foreground data-[depth=3]:pl-6"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <Separator />
      <div className="flex flex-col gap-2">
        <a
          href={editUrl}
          target="_blank"
          rel="noreferrer"
          className={linkClass}
        >
          <PencilIcon />
          Edit this page
        </a>
        <a href="#" className={linkClass}>
          <ArrowUpIcon />
          Back to top
        </a>
      </div>
    </div>
  );
}
