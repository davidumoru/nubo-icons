import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@nubo-icons/react";
import { Button } from "@/components/ui/button";
import { DocsCopyPage } from "@/components/docs/docs-copy-page";
import { DocsTableOfContents } from "@/components/docs/docs-toc";
import { DOCS, findDoc, neighbours, type Doc } from "@/lib/docs";
import { markdownFor, tocFor } from "@/lib/docs-source";

import * as Index from "@/content/docs/index.mdx";
import * as ReactDoc from "@/content/docs/react.mdx";
import * as Styles from "@/content/docs/styles.mdx";
import * as Svg from "@/content/docs/svg.mdx";
import * as Accessibility from "@/content/docs/accessibility.mdx";
import * as Design from "@/content/docs/design.mdx";

type Mdx = {
  default: React.ComponentType;
  metadata: { title: string; description: string };
};
const PAGES = {
  index: Index,
  react: ReactDoc,
  styles: Styles,
  svg: Svg,
  accessibility: Accessibility,
  design: Design,
} as unknown as Record<Doc["file"], Mdx>;
const load = async (doc: Doc) => PAGES[doc.file];

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug ? d.slug.split("/") : [] }));
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/[[...slug]]">): Promise<Metadata> {
  "use cache";
  const doc = findDoc((await params).slug);
  if (!doc) return {};
  const { metadata } = await load(doc);
  return { title: metadata.title, description: metadata.description };
}

export default async function DocPage({
  params,
}: PageProps<"/docs/[[...slug]]">) {
  "use cache";
  const doc = findDoc((await params).slug);
  if (!doc) notFound();
  const { default: Content, metadata } = await load(doc);
  const { previous, next } = neighbours(doc);
  const toc = tocFor(doc);

  return (
    <div className="flex items-stretch text-[15px] xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-6 px-2 py-6 md:px-0 lg:py-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between md:items-start">
              <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
                {metadata.title}
              </h1>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <DocsCopyPage
                    page={markdownFor(
                      doc,
                      metadata.title,
                      metadata.description,
                    )}
                  />
                </div>
                {previous && (
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    nativeButton={false}
                    render={<Link href={previous.href} />}
                  >
                    <ArrowLeftIcon />
                    <span className="sr-only">Previous: {previous.title}</span>
                  </Button>
                )}
                {next && (
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    nativeButton={false}
                    render={<Link href={next.href} />}
                  >
                    <span className="sr-only">Next: {next.title}</span>
                    <ArrowRightIcon />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-base text-balance text-muted-foreground md:max-w-[80%]">
              {metadata.description}
            </p>
          </div>
          <div className="typeset typeset-docs w-full flex-1">
            <Content />
          </div>
          <div className="mt-8 flex items-center gap-2">
            {previous && (
              <Button
                variant="secondary"
                size="sm"
                nativeButton={false}
                render={<Link href={previous.href} />}
              >
                <ArrowLeftIcon data-icon="inline-start" />
                {previous.title}
              </Button>
            )}
            {next && (
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto"
                nativeButton={false}
                render={<Link href={next.href} />}
              >
                {next.title}
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <aside className="sticky top-0 hidden max-h-svh w-56 shrink-0 self-start overflow-y-auto pt-12 pb-8 pl-8 xl:block">
        <DocsTableOfContents
          toc={toc}
          editUrl={`https://github.com/davidumoru/nubo-icons/edit/main/apps/web/content/docs/${doc.file}.mdx`}
        />
      </aside>
    </div>
  );
}
