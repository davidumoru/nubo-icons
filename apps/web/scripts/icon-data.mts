import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { strToU8, zipSync } from "fflate";

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

// Everything in public/ is generated, so a fresh clone has no public/ folder to write into.
const PUBLIC = join(import.meta.dirname, "../public");
mkdirSync(PUBLIC, { recursive: true });

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
writeFileSync(join(PUBLIC, "nubo-icons.zip"), zipSync(files, { level: 9 }));

console.log(`icon data: ${icons.length} icons`);
