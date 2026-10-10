import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import GithubSlugger from "github-slugger";
import type { Doc } from "@/lib/docs";

const source = (doc: Doc) =>
  readFileSync(join(process.cwd(), "content/docs", `${doc.file}.mdx`), "utf8");

export function docMeta(doc: Doc) {
  const field = (name: string) =>
    source(doc).match(new RegExp(`${name}: "([^"]*)"`))?.[1] ?? "";
  return { title: field("title"), description: field("description") };
}

export function markdownFor(doc: Doc, title: string, description: string) {
  const body = source(doc)
    .replace(/^export const metadata = \{[\s\S]*?\};\n/m, "")
    .replace(/^import .*\n/gm, "")
    .replace(/^<[A-Z][^\n]*\/>\n/gm, "")
    .trim();
  return `# ${title}\n\n${description}\n\n${body}\n`;
}

// The ids must match the ones rehype-slug gives the rendered headings.
export function tocFor(doc: Doc) {
  const slugger = new GithubSlugger();
  const fence = /^```/;
  let inCode = false;
  const toc: { title: string; url: string; depth: number }[] = [];
  for (const line of source(doc).split("\n")) {
    if (fence.test(line)) inCode = !inCode;
    const m = !inCode && /^(##|###) (.+)$/.exec(line);
    if (m) {
      const title = m[2].replace(/`/g, "");
      toc.push({ title, url: `#${slugger.slug(m[2])}`, depth: m[1].length });
    }
  }
  return toc;
}
