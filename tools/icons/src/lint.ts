import { readdirSync } from "node:fs";
import { join } from "node:path";
import {
  ICONS_DIR,
  STYLES,
  iconNames,
  loadIcon,
  measure,
  parseSvg,
  type Node,
  type Style,
} from "./icons";

const errors: string[] = [];
const warnings: string[] = [];

const ROOT_ATTRS: Record<Style, Record<string, string>> = {
  line: {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  },
  fill: {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  },
  duo: {} as Record<string, string>,
};
ROOT_ATTRS.duo = ROOT_ATTRS.fill;

const SHAPE_ATTRS: Record<string, string[]> = {
  path: ["d"],
  circle: ["cx", "cy", "r"],
  rect: ["x", "y", "width", "height", "rx", "ry"],
};
const PAINT_ATTRS = ["fill", "fill-rule"];
const META_KEYS = ["tags", "categories", "aliases", "rtl", "added", "status"];

const tooPrecise = (value: string) => /\d\.\d{3,}/.test(value);

function checkShape(where: string, style: Style, node: Node) {
  const allowed = [...SHAPE_ATTRS[node.name], ...PAINT_ATTRS];
  for (const [attr, value] of Object.entries(node.attrs)) {
    if (!allowed.includes(attr))
      errors.push(
        `${where}: <${node.name}> has disallowed attribute "${attr}"`,
      );
    if (tooPrecise(value))
      errors.push(`${where}: <${node.name} ${attr}> uses more than 2 decimals`);
  }
  const { fill, "fill-rule": fillRule } = node.attrs;
  if (fill !== undefined && fill !== "none")
    errors.push(`${where}: fill must be "none" or inherited, got "${fill}"`);
  if (fillRule !== undefined && fillRule !== "evenodd")
    errors.push(`${where}: fill-rule must be "evenodd"`);
}

function checkSvg(where: string, style: Style, source: string) {
  let root: Node;
  try {
    root = parseSvg(source);
  } catch (e) {
    errors.push(`${where}: invalid SVG (${(e as Error).message})`);
    return;
  }
  if (root.name !== "svg")
    return errors.push(`${where}: root element must be <svg>`);
  const expected = ROOT_ATTRS[style];
  for (const [attr, value] of Object.entries(expected))
    if (root.attrs[attr] !== value)
      errors.push(
        `${where}: root ${attr} must be "${value}", got "${root.attrs[attr] ?? "(missing)"}"`,
      );
  for (const attr of Object.keys(root.attrs))
    if (!(attr in expected))
      errors.push(`${where}: root has unexpected attribute "${attr}"`);
  if (root.children.length === 0) errors.push(`${where}: empty icon`);

  const groups = root.children.filter((c) => c.name === "g");
  if (groups.length > 0) {
    if (style !== "duo") errors.push(`${where}: <g> is only allowed in Duo`);
    if (groups.length > 1)
      errors.push(`${where}: Duo has at most one secondary group`);
    if (root.children[0].name !== "g")
      errors.push(
        `${where}: the secondary group must come first so the primary draws on top`,
      );
  }
  for (const child of root.children) {
    if (child.name === "g") {
      const attrs = Object.entries(child.attrs);
      if (attrs.length !== 1 || child.attrs["data-tone"] !== "secondary")
        errors.push(`${where}: <g> may only carry data-tone="secondary"`);
      if (child.children.length === 0)
        errors.push(`${where}: empty secondary group`);
      for (const grandchild of child.children) {
        if (!(grandchild.name in SHAPE_ATTRS))
          errors.push(`${where}: <${grandchild.name}> is not allowed`);
        else checkShape(where, style, grandchild);
      }
    } else if (!(child.name in SHAPE_ATTRS))
      errors.push(`${where}: <${child.name}> is not allowed`);
    else checkShape(where, style, child);
  }
}

function checkMeta(where: string, meta: Record<string, unknown>) {
  for (const key of Object.keys(meta))
    if (!META_KEYS.includes(key)) errors.push(`${where}: unknown key "${key}"`);
  const strings = (v: unknown) =>
    Array.isArray(v) && v.every((s) => typeof s === "string");
  if (!strings(meta.tags) || (meta.tags as string[]).length === 0)
    errors.push(`${where}: tags must be a non-empty string array`);
  if (!strings(meta.categories) || (meta.categories as string[]).length === 0)
    errors.push(`${where}: categories must be a non-empty string array`);
  if (!strings(meta.aliases))
    errors.push(`${where}: aliases must be a string array`);
  if (meta.rtl !== "mirror" && meta.rtl !== "none")
    errors.push(`${where}: rtl must be "mirror" or "none"`);
  if (typeof meta.added !== "string" || !/^\d+\.\d+\.\d+$/.test(meta.added))
    errors.push(`${where}: added must be a version like 0.1.0`);
  if (meta.status !== "draft" && meta.status !== "approved")
    errors.push(`${where}: status must be "draft" or "approved"`);
}

const names = iconNames();
const fmt = (n: number) => n.toFixed(2);

for (const name of names) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name))
    errors.push(`${name}: name must be kebab-case`);
  const files = readdirSync(join(ICONS_DIR, name)).sort();
  const expectedFiles = [...STYLES.map((s) => `${s}.svg`), "meta.json"].sort();
  if (files.join() !== expectedFiles.join()) {
    errors.push(
      `${name}: expected exactly ${expectedFiles.join(", ")}, found ${files.join(", ") || "nothing"}`,
    );
    continue;
  }
  const icon = loadIcon(name);
  checkMeta(`${name}/meta.json`, icon.meta);

  const bounds: Partial<Record<Style, Awaited<ReturnType<typeof measure>>>> =
    {};
  for (const style of STYLES) {
    const where = `${name}/${style}.svg`;
    checkSvg(where, style, icon.svg[style]);
    const m = (bounds[style] = await measure(icon.svg[style]));
    const extent = [m.left, m.top, 24 - m.right, 24 - m.bottom];
    const tightest = Math.min(...extent);
    if (tightest < 1 - 0.05)
      errors.push(
        `${where}: ink reaches ${fmt(tightest)}px from the edge (minimum 1px)`,
      );
    else if (tightest < 2 - 0.05)
      warnings.push(
        `${where}: pushes into the padding (${fmt(tightest)}px from the edge)`,
      );
  }

  const differs = (a: Style, b: Style) => {
    const [x, y] = [bounds[a]!, bounds[b]!];
    return Math.max(
      Math.abs(x.left - y.left),
      Math.abs(x.top - y.top),
      Math.abs(x.right - y.right),
      Math.abs(x.bottom - y.bottom),
    );
  };
  for (const [a, b] of [
    ["line", "fill"],
    ["fill", "duo"],
  ] as const) {
    const d = differs(a, b);
    if (d > 0.1)
      warnings.push(
        `${name}: ${a} and ${b} silhouettes differ by up to ${fmt(d)}px`,
      );
  }
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(
  `\n${names.length} icons, ${errors.length} errors, ${warnings.length} warnings`,
);
if (errors.length > 0) process.exit(1);
