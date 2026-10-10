"use client";

import { CheckIcon, CopyIcon } from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import { SwapIcon } from "@/components/swap-icon";
import { useCopy } from "@/components/use-copy";

export function DocsCopyPage({ page }: { page: string }) {
  const { copied, copy } = useCopy();
  return (
    <Button variant="secondary" size="sm" onClick={() => copy("page", page)}>
      <SwapIcon
        data-icon="inline-start"
        on={copied === "page"}
        from={<CopyIcon />}
        to={<CheckIcon />}
      />
      Copy page
    </Button>
  );
}
