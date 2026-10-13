import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  STYLES,
  iconNames,
  loadIcon,
  toRenderable,
} from "@nubo-icons/tools/icons";

const PKG = new URL("..", import.meta.url).pathname;

const minify = (svg: string) => svg.replace(/>\s+</g, "><").trim() + "\n";

const icons = iconNames().map(loadIcon);
for (const style of STYLES) {
  const dir = join(PKG, style);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir);
  for (const icon of icons)
    writeFileSync(
      join(dir, `${icon.name}.svg`),
      minify(toRenderable(icon.svg[style])),
    );
}

const data = Object.fromEntries(
  icons.map(({ name, meta }) => [
    name,
    {
      aliases: meta.aliases,
      tags: meta.tags,
      categories: meta.categories,
      rtl: meta.rtl,
      added: meta.added,
    },
  ]),
);
writeFileSync(join(PKG, "icons.json"), JSON.stringify(data, null, 2) + "\n");

console.log(`Built ${icons.length} icons × ${STYLES.length} styles.`);
