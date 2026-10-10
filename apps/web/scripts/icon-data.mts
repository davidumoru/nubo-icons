import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { strToU8, zipSync } from "fflate";
import { DOCS } from "../lib/docs.ts";
import { REPO_URL, SITE_URL } from "../lib/site.ts";

const ROOT = join(import.meta.dirname, "../../..");
const ICONS = join(ROOT, "icons");
const STYLES = ["line", "fill", "duo"] as const;

const pascal = (slug: string) =>
  slug.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());

const icons = readdirSync(ICONS)
  .sort()
  .filter(
    (name) =>
      JSON.parse(readFileSync(join(ICONS, name, "meta.json"), "utf8"))
        .status === "approved",
  )
  .map((name) => {
    const meta = JSON.parse(
      readFileSync(join(ICONS, name, "meta.json"), "utf8"),
    );
    const svg = Object.fromEntries(
      STYLES.map((style) => [
        style,
        readFileSync(join(ICONS, name, `${style}.svg`), "utf8")
          .replace(/>\s+</g, "><")
          .trim(),
      ]),
    );
    return {
      name,
      component: pascal(name),
      tags: meta.tags,
      categories: meta.categories,
      aliases: meta.aliases,
      rtl: meta.rtl,
      svg,
    };
  });

writeFileSync(
  join(import.meta.dirname, "../lib/icon-data.json"),
  JSON.stringify(icons),
);

const description = (file: string) =>
  readFileSync(
    join(import.meta.dirname, `../content/docs/${file}.mdx`),
    "utf8",
  ).match(/description: "([^"]*)"/)?.[1];

const url = (path: string) => new URL(path, SITE_URL).href;

const llms = [
  "# Nubo",
  "",
  "> Soft, open-source icons on a 24px grid with a 1.5px stroke, in three styles: Line, Fill and Duo (a line drawing with a 30% tint).",
  "",
  'React: `import { HeartIcon } from "@nubo-icons/react"` for Line, or from `@nubo-icons/react/fill` and `@nubo-icons/react/duo`. Every icon takes `size`, `strokeWidth`, `color` and `title`; icons are decorative (aria-hidden) unless given a `title` or `aria-label`.',
  "",
  "## Docs",
  "",
  ...DOCS.map((d) => `- [${d.title}](${url(d.href)}): ${description(d.file)}`),
  "",
  "## Icons",
  "",
  ...icons.map(
    (i) =>
      `- [${i.name}](${url(`/?icon=${i.name}`)}): ${i.component}Icon${i.aliases.length ? `, aliases: ${i.aliases.join(", ")}` : ""}. ${i.tags.join(", ")}`,
  ),
  "",
  "## Optional",
  "",
  `- [Source on GitHub](${REPO_URL}): icons, packages and this site`,
  `- [All icons as SVG](${url("/nubo-icons.zip")}): every icon in every style, with the license`,
  "",
].join("\n");
writeFileSync(join(import.meta.dirname, "../public/llms.txt"), llms);

// Duo's tint group gets its 30% opacity written in: a plain SVG file has nothing else to apply it.
const files: Record<string, Uint8Array> = {
  "LICENSE.txt": strToU8(readFileSync(join(ROOT, "LICENSE"), "utf8")),
};
for (const icon of icons)
  for (const style of STYLES)
    files[`nubo-icons/${style}/${icon.name}.svg`] = strToU8(
      readFileSync(join(ICONS, icon.name, `${style}.svg`), "utf8").replace(
        '<g data-tone="secondary">',
        '<g data-tone="secondary" opacity=".3">',
      ),
    );
writeFileSync(
  join(import.meta.dirname, "../public/nubo-icons.zip"),
  zipSync(files, { level: 9 }),
);

console.log(`icon data: ${icons.length} icons`);
