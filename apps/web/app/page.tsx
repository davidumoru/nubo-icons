import { DownloadIcon } from "@nubo-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Browser } from "@/components/browser";
import { SiteFooter } from "@/components/site-footer";
import { StyleSpecimen } from "@/components/style-specimen";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
      <section className="grid items-start gap-12 py-16 lg:grid-cols-[1fr_30rem] lg:gap-16 lg:py-24">
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:leading-[1.1] text-balance [text-box:trim-both_cap_alphabetic] sm:text-5xl">
              Nubo is an open‑source icon family for apps, sites, docs and
              slides.
            </h1>
            <p className="max-w-lg text-pretty text-muted-foreground sm:text-lg">
              Every icon comes in Line, Fill and Duo, for React or plain SVG.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/docs" />}
            >
              Get started
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href="/nubo-icons.zip" download />}
            >
              <DownloadIcon data-icon="inline-start" />
              Download all
            </Button>
          </div>
        </div>
        <StyleSpecimen />
      </section>
      <main className="pb-24">
        <Browser />
      </main>
      <SiteFooter />
    </div>
  );
}
