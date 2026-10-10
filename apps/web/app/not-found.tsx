import type { Metadata } from "next";
import Link from "next/link";
import { CloudIcon } from "@nubo-icons/react/duo";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-24 sm:px-8">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CloudIcon />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            This page doesn&apos;t exist or has moved. Check the address, or
            pick up from one of these.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button nativeButton={false} render={<Link href="/" />}>
            Browse icons
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/docs" />}
          >
            Read the docs
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
