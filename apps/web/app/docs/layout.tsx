import { SiteHeader } from "@/components/site-header";
import { DocsMobileNav, DocsSidebar } from "@/components/docs/docs-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-2 sm:px-6">
      <SiteHeader className="px-2" />
      <DocsMobileNav />
      <SidebarProvider
        className="min-h-min flex-1 items-start lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]"
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 60)",
          } as React.CSSProperties
        }
      >
        <DocsSidebar />
        <div className="h-full w-full">{children}</div>
      </SidebarProvider>
    </div>
  );
}
