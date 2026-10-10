"use client";

import { usePathname } from "next/navigation";

export function HideOn({
  paths,
  children,
}: {
  paths: string[];
  children: React.ReactNode;
}) {
  return paths.includes(usePathname()) ? null : children;
}
