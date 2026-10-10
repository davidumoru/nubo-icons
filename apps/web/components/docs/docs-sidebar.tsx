"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DOC_GROUPS } from "@/lib/docs";

export function DocsSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-6 hidden h-[calc(100svh-6rem)] bg-transparent lg:flex"
    >
      {/* Shifted left by the items' inner padding, so their text lines up with the logo and the
          highlight hangs outside that edge. */}
      <SidebarContent className="-ml-3 pt-6 pr-6">
        {DOC_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="font-medium text-muted-foreground">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.pages.map((page) => {
                  const href = page.slug ? `/docs/${page.slug}` : "/docs";
                  return (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton
                        isActive={pathname === href}
                        render={<Link href={href} />}
                        className="h-8 w-full text-[0.8rem] font-medium data-active:bg-accent"
                      >
                        {page.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

// Below lg the sidebar is hidden; the pages are a row of links instead.
export function DocsMobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Docs"
      className="flex gap-1 overflow-x-auto px-2 pt-4 lg:hidden [&>a:first-child]:-ml-2.5"
    >
      {DOC_GROUPS.flatMap((g) => g.pages).map((page) => {
        const href = page.slug ? `/docs/${page.slug}` : "/docs";
        return (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className="shrink-0 rounded-md border border-transparent px-2.5 py-1 text-[0.8rem] font-medium text-muted-foreground aria-[current=page]:border-accent aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
          >
            {page.title}
          </Link>
        );
      })}
    </nav>
  );
}
