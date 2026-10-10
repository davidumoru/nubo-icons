"use client";

import { CheckIcon, CopyIcon } from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/components/use-copy";

export function DocsCopyPage({ page }: { page: string }) {
  const { copied, copy } = useCopy();
  return (
    <Button variant="secondary" size="sm" onClick={() => copy("page", page)}>
      {copied === "page" ? (
        <CheckIcon data-icon="inline-start" />
      ) : (
        <CopyIcon data-icon="inline-start" />
      )}
      Copy page
    </Button>
  );
}
