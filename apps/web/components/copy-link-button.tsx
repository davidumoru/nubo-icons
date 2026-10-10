"use client";

import { CheckIcon, LinkIcon } from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import { SwapIcon } from "@/components/swap-icon";
import { useCopy } from "@/components/use-copy";
import { shareLink } from "@/components/use-site-url";
import type { Settings } from "@/lib/settings";

export function CopyLinkButton({
  iconName,
  settings,
}: {
  iconName: string;
  settings: Settings;
}) {
  const { copied, copy } = useCopy();
  const done = copied === "link";
  return (
    <Button
      variant="secondary"
      size="icon-sm"
      aria-label={done ? "Link copied" : `Copy link to ${iconName}`}
      title="Copy link"
      onClick={() => copy("link", shareLink(settings, iconName))}
    >
      <SwapIcon on={done} from={<LinkIcon />} to={<CheckIcon />} />
    </Button>
  );
}
