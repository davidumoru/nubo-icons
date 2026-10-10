import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { XMLParser } from "fast-xml-parser";
import sharp from "sharp";

export const ROOT = new URL("../../../", import.meta.url).pathname;
export const ICONS_DIR = join(ROOT, "icons");
export const STYLES = ["line", "fill", "duo"] as const;
export type Style = (typeof STYLES)[number];

export const SECONDARY_OPACITY = 0.3;

export type Meta = {
  tags: string[];
  categories: string[];
  aliases: string[];
  rtl: "mirror" | "none";
  added: string;
  status: "draft" | "approved";
};

export type Icon = {
  name: string;
  meta: Meta;
  svg: Record<Style, string>;
};

export type Node = {
  name: string;
  attrs: Record<string, string>;
  children: Node[];
};

export function iconNames(): string[] {
  if (!existsSync(ICONS_DIR)) return [];
  return readdirSync(ICONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

export function loadIcon(name: string): Icon {
  const dir = join(ICONS_DIR, name);
  const svg = Object.fromEntries(
    STYLES.map((s) => [s, readFileSync(join(dir, `${s}.svg`), "utf8")]),
  ) as Record<Style, string>;
  return {
    name,
    meta: JSON.parse(readFileSync(join(dir, "meta.json"), "utf8")),
    svg,
  };
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  preserveOrder: true,
});

export function parseSvg(source: string): Node {
  const toNode = (raw: Record<string, unknown>): Node => {
    const name = Object.keys(raw).find((k) => k !== ":@")!;
    const children = (raw[name] as Record<string, unknown>[])
      .filter((c) => !("#text" in c))
      .map(toNode);
    return {
      name,
      attrs: (raw[":@"] as Record<string, string>) ?? {},
      children,
    };
  };
  const roots = (parser.parse(source) as Record<string, unknown>[]).filter(
    (n) => !("#text" in n) && !("?xml" in n),
  );
  if (roots.length !== 1)
    throw new Error(`expected one root element, found ${roots.length}`);
  return toNode(roots[0]);
}

// The source marks Duo's light layer semantically; renderers need real opacity.
export function toRenderable(source: string): string {
  return source.replace(
    /data-tone="secondary"/g,
    `opacity="${SECONDARY_OPACITY}"`,
  );
}

export function withColor(source: string, color: string): string {
  return toRenderable(source).replace("<svg ", `<svg color="${color}" `);
}

export type Metrics = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  massX: number;
  massY: number;
  ink: number;
};

export async function measure(source: string): Promise<Metrics> {
  const px = 480;
  const k = px / 24;
  const svg = withColor(source, "#000").replace(
    /width="24" height="24"/,
    `width="${px}" height="${px}"`,
  );
  const { data } = await sharp(Buffer.from(svg))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let minX = px,
    minY = px,
    maxX = -1,
    maxY = -1,
    ink = 0,
    sx = 0,
    sy = 0;
  for (let y = 0; y < px; y++)
    for (let x = 0; x < px; x++) {
      const a = data[(y * px + x) * 4 + 3] / 255;
      if (a > 0.1) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      ink += a;
      sx += a * (x + 0.5);
      sy += a * (y + 0.5);
    }
  return {
    left: minX / k,
    top: minY / k,
    right: (maxX + 1) / k,
    bottom: (maxY + 1) / k,
    massX: sx / ink / k,
    massY: sy / ink / k,
    ink: ink / (px * px),
  };
}
