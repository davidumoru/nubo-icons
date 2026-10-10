import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

// Rendered once in the root layout, so it stays in place when moving between pages.
export function SiteHeader() {
  return (
    <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-8">
      <Link href="/" className="rounded-md">
        <Logo />
      </Link>
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/docs" />}
        >
          Docs
        </Button>
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/showcase" />}
        >
          Showcase
        </Button>
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <a
              href="https://github.com/davidumoru/nubo-icons"
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          GitHub
        </Button>
        <ThemeToggle />
      </nav>
    </header>
  );
}
