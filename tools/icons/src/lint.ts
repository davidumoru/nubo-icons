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
import { MAX_LINES, morphLines, morphShapes } from "./morph";

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
const META_KEYS = [
  "tags",
  "categories",
  "aliases",
  "rtl",
  "added",
  "status",
  "exceptions",
  "morph",
];
const EXCEPTIONS = ["thin-fill-outline", "miter-cutout"];

const tooPrecise = (value: string) => /\d\.\d{3,}/.test(value);

function checkShape(
  where: string,
  style: Style,
  node: Node,
  exceptions: string[],
) {
  const thinOutline =
    style === "fill" && exceptions.includes("thin-fill-outline");
  const miterCutout = style === "fill" && exceptions.includes("miter-cutout");
  const allowed = [
    ...SHAPE_ATTRS[node.name],
    ...PAINT_ATTRS,
    ...(thinOutline ? ["stroke-width"] : []),
    ...(miterCutout ? ["stroke-linejoin"] : []),
  ];
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
  const strokeWidth = node.attrs["stroke-width"];
  if (thinOutline && strokeWidth !== undefined) {
    const width = Number(strokeWidth);
    if (!(width > 0 && width < 1.5) || fill === "none")
      errors.push(
        `${where}: a thin outline must be thinner than 1.5 and on a solid shape`,
      );
  }
  const join = node.attrs["stroke-linejoin"];
  if (join !== undefined && (join !== "miter" || fill === "none"))
    errors.push(`${where}: only a solid shape may switch to a miter join`);
}

function checkSvg(
  where: string,
  style: Style,
  source: string,
  exceptions: string[],
) {
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
        else checkShape(where, style, grandchild, exceptions);
      }
    } else if (!(child.name in SHAPE_ATTRS))
      errors.push(`${where}: <${child.name}> is not allowed`);
    else checkShape(where, style, child, exceptions);
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
  if (
    meta.exceptions !== undefined &&
    (!strings(meta.exceptions) ||
      !(meta.exceptions as string[]).every((e) => EXCEPTIONS.includes(e)))
  )
    errors.push(
      `${where}: exceptions must be a subset of ${EXCEPTIONS.join(", ")}`,
    );
  const morph = meta.morph as Record<string, unknown> | undefined;
  if (morph === undefined) return;
  if (typeof morph !== "object" || morph === null)
    return errors.push(`${where}: morph must be an object`);
  for (const key of Object.keys(morph))
    if (key !== "rotation" && key !== "angle")
      errors.push(`${where}: unknown morph key "${key}"`);
  if (morph.rotation !== undefined && typeof morph.rotation !== "string")
    errors.push(`${where}: morph.rotation must be a string`);
  if (
    morph.angle !== undefined &&
    (morph.rotation === undefined ||
      typeof morph.angle !== "number" ||
      morph.angle % 45 !== 0)
  )
    errors.push(
      `${where}: morph.angle must be a multiple of 45, set alongside morph.rotation`,
    );
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

  if (icon.meta.morph) {
    try {
      const lines = morphLines(icon.svg.line);
      if (lines.length > MAX_LINES)
        errors.push(
          `${name}/line.svg: morphing icons have at most ${MAX_LINES} straight lines, found ${lines.length}`,
        );
    } catch (error) {
      errors.push(`${name}/line.svg: ${(error as Error).message}`);
    }
  }

  const bounds: Partial<Record<Style, Awaited<ReturnType<typeof measure>>>> =
    {};
  for (const style of STYLES) {
    const where = `${name}/${style}.svg`;
    checkSvg(where, style, icon.svg[style], icon.meta.exceptions ?? []);
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
    // Pieces cut through the outline (thin-fill-outline) dip the silhouette at each gap by design.
    const tolerance = icon.meta.exceptions?.includes("thin-fill-outline")
      ? 0.5
      : 0.1;
    if (d > tolerance)
      warnings.push(
        `${name}: ${a} and ${b} silhouettes differ by up to ${fmt(d)}px`,
      );
  }
}

try {
  morphShapes(names.map(loadIcon));
} catch (error) {
  errors.push(`morph: ${(error as Error).message}`);
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(
  `\n${names.length} icons, ${errors.length} errors, ${warnings.length} warnings`,
);
if (errors.length > 0) process.exit(1);
