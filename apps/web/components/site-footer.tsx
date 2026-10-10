import Link from "next/link";
import {
  ArrowUpIcon,
  CodeIcon,
  FileTextIcon,
  HeartIcon,
  MapIcon,
  PlusIcon,
} from "@nubo-icons/react/duo";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { REPO_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const PROJECT = [
  { label: "GitHub", href: REPO_URL, icon: CodeIcon },
  { label: "Roadmap", href: "/docs/roadmap", icon: MapIcon, internal: true },
  { label: "Request an icon", href: `${REPO_URL}/issues/new`, icon: PlusIcon },
  { label: "llms.txt", href: "/llms.txt", icon: FileTextIcon },
];

export function SiteFooter() {
  return (
    <footer>
      <Separator />
      <div className="flex flex-col gap-8 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link href="/" className="rounded-md">
              <Logo />
            </Link>
            <BackToTop className="sm:hidden" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <ButtonGroup
              aria-label="Project"
              className="max-sm:contents max-sm:*:rounded-4xl! max-sm:*:border!"
            >
              {PROJECT.map(({ label, href, icon: LinkIcon, internal }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={
                    internal ? (
                      <Link href={href} />
                    ) : (
                      <a href={href} target="_blank" rel="noreferrer" />
                    )
                  }
                >
                  <LinkIcon data-icon="inline-start" />
                  {label}
                </Button>
              ))}
            </ButtonGroup>
            <Button
              variant="outline"
              size="sm"
              className="max-sm:col-span-2"
              nativeButton={false}
              render={
                <a
                  href="https://buymeacoffee.com/theumoru"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              <HeartIcon data-icon="inline-start" />
              Buy me a coffee
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="max-sm:w-full max-sm:text-center">
            Drawn by{" "}
            <a
              href="https://x.com/theumoru"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              David Umoru
            </a>
            . MIT licensed.
          </p>
          <BackToTop className="max-sm:hidden" />
        </div>
      </div>
    </footer>
  );
}

function BackToTop({ className }: { className?: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-mr-3 shrink-0 text-muted-foreground", className)}
      nativeButton={false}
      render={<a href="#top" />}
    >
      <ArrowUpIcon data-icon="inline-start" />
      Back to top
    </Button>
  );
}
