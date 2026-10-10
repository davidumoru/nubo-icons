import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader({
  className,
  logoClassName,
}: {
  className?: string;
  logoClassName?: string;
}) {
  return (
    <header className={cn("flex h-16 items-center justify-between", className)}>
      <Link href="/" className={cn("rounded-md", logoClassName)}>
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
          render={<a href="https://github.com/davidumoru/nubo-icons" />}
        >
          GitHub
        </Button>
        <ThemeToggle />
      </nav>
    </header>
  );
}
