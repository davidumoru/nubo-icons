"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MagnifyingGlassIcon, XIcon } from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Controls } from "@/components/controls";
import {
  DEFAULT_SETTINGS,
  effectiveStroke,
  type Settings,
} from "@/lib/settings";
import { Icon } from "@/components/icon";
import { IconDetails } from "@/components/icon-details";
import { useSiteUrl } from "@/components/use-site-url";
import { icons, searchIcons, type IconData } from "@/lib/icons";

export function Browser() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const { name, openIcon, closeIcon } = useSiteUrl(
    useCallback(
      (linked: Partial<Settings>) => setSettings((s) => ({ ...s, ...linked })),
      [],
    ),
  );
  const current = name ? (icons.find((i) => i.name === name) ?? null) : null;
  // Kept after closing so the drawer still has content while it animates out.
  const [selected, setSelected] = useState<IconData | null>(current);
  if (current && current !== selected) setSelected(current);
  const search = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => searchIcons(icons, deferredQuery),
    [deferredQuery],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== search.current) {
        e.preventDefault();
        search.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (icon: IconData) => openIcon(icon.name);

  return (
    <div className="flex flex-col gap-6">
      {/* Concentric with the pills inside: 20px search radius + 8px padding at the top, 18px toggle radius + 10px gap at the bottom. */}
      <Card className="sticky top-3 z-20 gap-3 rounded-[28px] bg-background/80 p-2 shadow-sm backdrop-blur-md">
        <Input
          ref={search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${icons.length} icons…  ( / )`}
          aria-label="Search icons"
          className="h-10"
        />
        <div className="px-0.5 pb-0.5">
          <Controls settings={settings} onChange={setSettings} />
        </div>
      </Card>

      <p className="text-xs text-muted-foreground" aria-live="polite">
        {results.length === icons.length
          ? `${icons.length} icons`
          : `${results.length} of ${icons.length} icons`}
      </p>

      {results.length ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-2">
          {results.map((icon) => (
            <li key={icon.name}>
              <Button
                variant="secondary"
                onClick={() => open(icon)}
                aria-label={icon.name}
                className="group/tile relative aspect-square h-auto w-full rounded-2xl hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <Icon
                  component={icon.component}
                  iconStyle={settings.iconStyle}
                  // The tile is a Button, which sizes its icons to 16px; the grid shows the chosen size.
                  style={{ width: settings.size, height: settings.size }}
                  strokeWidth={effectiveStroke(settings)}
                  color={
                    settings.color === "currentColor"
                      ? undefined
                      : settings.color
                  }
                  className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/tile:scale-110 group-active/tile:scale-95"
                />
                <span className="absolute inset-x-2 bottom-2 translate-y-1 truncate text-center text-[11px] font-normal text-muted-foreground opacity-0 transition duration-200 group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-visible/tile:translate-y-0 group-focus-visible/tile:opacity-100">
                  {icon.name}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MagnifyingGlassIcon />
            </EmptyMedia>
            <EmptyTitle>No icon for “{query}” yet</EmptyTitle>
            <EmptyDescription>
              Try another word, or ask for it to be drawn.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a href="https://github.com/davidumoru/nubo-icons/issues/new" />
              }
            >
              Request an icon
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <Drawer
        open={current !== null}
        onOpenChange={(isOpen) => !isOpen && closeIcon()}
        showSwipeHandle
      >
        <DrawerContent>
          <DrawerClose
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close"
                className="absolute top-4 right-4"
              />
            }
          >
            <XIcon />
          </DrawerClose>
          <div className="overflow-y-auto">
            {selected && (
              <div className="mx-auto w-full max-w-5xl px-4 pt-2 pb-8 sm:px-8">
                <IconDetails
                  icon={selected}
                  settings={settings}
                  onSettingsChange={setSettings}
                />
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
