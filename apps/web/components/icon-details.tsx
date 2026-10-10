"use client";

import { CheckIcon, CopyIcon } from "@nubo-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DrawerTitle } from "@/components/ui/drawer";
import { CodePanel } from "@/components/code-panel";
import {
  StyleToggle,
  effectiveStroke,
  type Settings,
} from "@/components/controls";
import { Icon } from "@/components/icon";
import { useCopy } from "@/components/use-copy";
import { jsxFor, svgFor, type IconData } from "@/lib/icons";
import { cn } from "@/lib/utils";

const SIZES = [16, 20, 24, 32, 48];

export function IconDetails({
  icon,
  settings,
  onSettingsChange,
}: {
  icon: IconData;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}) {
  const { copied, copy } = useCopy();
  const custom = { ...settings, strokeWidth: effectiveStroke(settings) };
  const svg = svgFor(icon, settings.iconStyle, custom);
  const jsx = jsxFor(icon, custom);
  const iconProps = {
    component: icon.component,
    iconStyle: settings.iconStyle,
    strokeWidth: custom.strokeWidth,
    color: custom.color === "currentColor" ? undefined : custom.color,
  };
  const sizes = [...new Set([...SIZES, settings.size])].sort((a, b) => a - b);

  return (
    <div className="flex flex-col gap-6">
      <DrawerTitle
        render={
          <Button
            variant="ghost"
            size="lg"
            onClick={() => copy("name", icon.name)}
            aria-label={`Copy name ${icon.name}`}
          />
        }
        className="group/title -ml-4 self-start text-2xl font-semibold tracking-tight"
      >
        {icon.name}
        {copied === "name" ? (
          <CheckIcon data-icon="inline-end" />
        ) : (
          <CopyIcon
            data-icon="inline-end"
            className="opacity-0 transition-opacity group-hover/title:opacity-100 group-focus-visible/title:opacity-100"
          />
        )}
      </DrawerTitle>

      <div className="grid gap-8 md:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-4">
          <Card className="aspect-video items-center justify-center">
            <Icon {...iconProps} size={128} />
          </Card>
          <Card size="sm" className="flex-row items-end justify-around px-4">
            {sizes.map((s) => (
              <div
                key={s}
                className={cn(
                  "flex flex-col items-center gap-3 text-xs tabular-nums",
                  s === settings.size
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <Icon
                  {...iconProps}
                  size={s}
                  className={cn(!iconProps.color && "text-foreground")}
                />
                {s}px
              </div>
            ))}
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <StyleToggle
            value={settings.iconStyle}
            onChange={(iconStyle) =>
              onSettingsChange({ ...settings, iconStyle })
            }
            className="w-full"
          />
          <CodePanel
            svg={svg}
            fileName={`${icon.name}-${settings.iconStyle}.svg`}
            jsx={jsx}
          />
          <div className="flex flex-wrap gap-1">
            {icon.aliases.map((a) => (
              <Badge key={a} variant="secondary">
                {a}
              </Badge>
            ))}
            {icon.tags.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
