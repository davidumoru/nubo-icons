import { DownloadIcon } from "@nubo-icons/react";
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Browser } from "@/components/browser";
import { SiteFooter } from "@/components/site-footer";
import { StyleSpecimen } from "@/components/style-specimen";
import { getIcon } from "@/lib/icons";
import {
  pageMetadata,
  REPO_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  codeRepository: REPO_URL,
  license: "https://opensource.org/licenses/MIT",
  programmingLanguage: ["TypeScript", "SVG"],
  runtimePlatform: "React",
  author: {
    "@type": "Person",
    name: "David Umoru",
    description: "Creator of Nubo.",
    url: "https://x.com/theumoru",
    sameAs: ["https://x.com/theumoru", "https://github.com/davidumoru"],
  },
};

export async function generateMetadata({
  searchParams,
}: PageProps<"/">): Promise<Metadata> {
  const { icon: name } = await searchParams;
  const icon = typeof name === "string" ? getIcon(name) : undefined;
  if (!icon)
    return pageMetadata({
      description: SITE_DESCRIPTION,
      path: "/",
      image: "/og/home",
    });
  return pageMetadata({
    title: icon.name,
    description: `The ${icon.name} icon from Nubo, as SVG or React (${icon.component}Icon).`,
    path: `/?icon=${icon.name}`,
    canonical: "/",
    image: `/og/icon/${icon.name}`,
  });
}

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
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
        <StyleSpecimen className="max-lg:hidden" />
      </section>
      <main className="pb-24">
        <Browser />
      </main>
      <SiteFooter />
      <Suspense>
        <RequestTime />
      </Suspense>
    </div>
  );
}

// Shared icon links (/?icon=heart) get their own title and preview image, which needs the request; marking the
// page as request-time lets Next stream that metadata and still prerender the rest.
async function RequestTime() {
  await connection();
  return null;
}
