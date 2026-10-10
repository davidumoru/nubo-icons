import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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

const llms = [
  "# Nubo",
  "",
  "> Soft, open-source icons on a 24px grid with a 1.5px stroke, in three styles: Line, Fill and Duo (a line drawing with a 30% tint).",
  "",
  'React: `import { HeartIcon } from "@nubo-icons/react"` for Line, or from `@nubo-icons/react/fill` and `@nubo-icons/react/duo`. Every icon takes `size`, `strokeWidth`, `color` and `title`; icons are decorative (aria-hidden) unless given a `title` or `aria-label`.',
  "",
  "## Icons",
  "",
  ...icons.map(
    (i) =>
      `- ${i.name} (${i.component}Icon)${i.aliases.length ? ` — aliases: ${i.aliases.join(", ")}` : ""} — ${i.tags.join(", ")}`,
  ),
  "",
].join("\n");
writeFileSync(join(import.meta.dirname, "../public/llms.txt"), llms);

console.log(`icon data: ${icons.length} icons`);
