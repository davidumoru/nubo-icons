import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { ROOT, STYLES, iconNames, loadIcon, measure, toRenderable, withColor, type Icon } from "./icons";

const OUT = join(ROOT, "tools/icons/out");
mkdirSync(OUT, { recursive: true });

const SIZES = [16, 20, 24, 32];
const all = iconNames().map(loadIcon);
const requested = process.argv.slice(2);
const unknown = requested.filter((n) => !all.some((i) => i.name === n));
if (unknown.length) throw new Error(`unknown icons: ${unknown.join(", ")}`);

const batch = requested.length ? all.filter((i) => requested.includes(i.name)) : all.filter((i) => i.meta.status === "draft");
const approved = all.filter((i) => i.meta.status === "approved" && !batch.includes(i));

const inner = (svg: string) => svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const rootAttrs = (svg: string) => svg.match(/<svg([^>]*)>/)![1].replace(/\s(xmlns|width|height|viewBox)="[^"]*"/g, "");

function placed(source: string, x: number, y: number, size: number, color: string) {
  const svg = toRenderable(source);
  return `<g transform="translate(${x} ${y}) scale(${size / 24})" color="${color}"><g${rootAttrs(svg)}>${inner(svg)}</g></g>`;
}

const LABEL_W = 110;
const CELL = 40;
const GROUP_GAP = 24;
const ROW_H = 46;
const groupW = SIZES.length * CELL;
const sheetW = LABEL_W + STYLES.length * (groupW + GROUP_GAP);

async function realSheet(file: string, fg: string, bg: string, muted: string) {
  const rows = [...batch, ...approved];
  const dividerY = 30 + batch.length * ROW_H + (approved.length ? 14 : 0);
  const height = 30 + rows.length * ROW_H + (approved.length ? 28 : 0) + 10;
  const parts: string[] = [];
  STYLES.forEach((style, s) => {
    const gx = LABEL_W + s * (groupW + GROUP_GAP);
    parts.push(`<text x="${gx}" y="18" font-size="11" fill="${muted}" font-family="sans-serif">${style}  ·  ${SIZES.join(" / ")}</text>`);
  });
  if (approved.length) parts.push(`<path d="M10 ${dividerY}H${sheetW - 10}" stroke="${muted}" stroke-opacity=".4" stroke-dasharray="3 3"/>`);
  rows.forEach((icon, r) => {
    const y = 30 + r * ROW_H + (r >= batch.length && approved.length ? 28 : 0);
    parts.push(`<text x="10" y="${y + 22}" font-size="11" fill="${muted}" font-family="sans-serif">${icon.name}</text>`);
    STYLES.forEach((style, s) => {
      SIZES.forEach((size, z) => {
        const x = LABEL_W + s * (groupW + GROUP_GAP) + z * CELL + (CELL - size) / 2;
        parts.push(placed(icon.svg[style], x, y + (32 - size) / 2, size, fg));
      });
    });
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sheetW}" height="${height}"><rect width="100%" height="100%" fill="${bg}"/>${parts.join("")}</svg>`;
  await sharp(Buffer.from(svg), { density: 144 }).png().toFile(join(OUT, file));
}

async function zoomSheet(file: string) {
  const z = 6;
  const box = 24 * z;
  const pad = 20;
  const grid = Array.from({ length: 25 }, (_, k) => `M${k * z} 0V${box}M0 ${k * z}H${box}`).join("");
  const guides = `<path d="${grid}" stroke="#eee" stroke-width=".6"/>
    <circle cx="${12 * z}" cy="${12 * z}" r="${10 * z}" fill="none" stroke="#9cf" stroke-width=".8"/>
    <rect x="${3 * z}" y="${3 * z}" width="${18 * z}" height="${18 * z}" fill="none" stroke="#9cf" stroke-width=".8"/>
    <rect x="${2 * z}" y="${2 * z}" width="${20 * z}" height="${20 * z}" fill="none" stroke="#f39" stroke-width=".8" stroke-dasharray="3 3"/>`;
  const cells = batch.flatMap((icon, r) =>
    STYLES.map((style, s) => {
      const x = pad + s * (box + pad);
      const y = pad + r * (box + pad + 16);
      return `<g transform="translate(${x} ${y})">${guides}${placed(icon.svg[style], 0, 0, box, "#111")}
        <text x="${box / 2}" y="${box + 13}" font-size="11" text-anchor="middle" fill="#666" font-family="sans-serif">${icon.name} · ${style}</text></g>`;
    }),
  );
  const width = pad + STYLES.length * (box + pad);
  const height = pad + batch.length * (box + pad + 16);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#fff"/>${cells.join("")}</svg>`;
  await sharp(Buffer.from(svg), { density: 144 }).png().toFile(join(OUT, file));
}

function html() {
  const row = (icon: Icon) => `<tr><th>${icon.name}</th>${STYLES.map(
    (style) => `<td>${SIZES.map((size) => withColor(icon.svg[style], "currentColor").replace(/width="24" height="24"/, `width="${size}" height="${size}"`)).join("")}</td>`,
  ).join("")}</tr>`;
  return `<!doctype html><meta charset="utf-8"><title>Nubo review</title>
<style>
  :root { color-scheme: light dark; --fg:#111; --bg:#fff; --muted:#888; --line:#e5e5e5 }
  @media (prefers-color-scheme: dark) { :root { --fg:#eee; --bg:#151515; --muted:#777; --line:#2a2a2a } }
  :root[data-theme=light] { --fg:#111; --bg:#fff; --muted:#888; --line:#e5e5e5 }
  :root[data-theme=dark] { --fg:#eee; --bg:#151515; --muted:#777; --line:#2a2a2a }
  body { margin:0; padding:24px 16px; background:var(--bg); color:var(--fg); font:13px/1.4 system-ui, sans-serif }
  .wrap { overflow-x:auto }
  table { border-collapse:collapse }
  th { text-align:left; font-weight:400; color:var(--muted); padding-right:24px; white-space:nowrap }
  thead th { font-size:11px; padding-bottom:8px }
  td { padding:10px 20px 10px 0; border-top:1px solid var(--line); white-space:nowrap }
  td svg { vertical-align:middle; margin-right:14px }
  tr.divider td, tr.divider th { padding-top:28px; font-size:11px; color:var(--muted) }
  button { font:inherit; margin-bottom:16px; padding:6px 12px; border-radius:8px; border:1px solid var(--line); background:none; color:var(--fg); cursor:pointer }
</style>
<button onclick="document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'">Toggle light / dark</button>
<div class="wrap"><table>
  <thead><tr><th></th>${STYLES.map((s) => `<th>${s} · ${SIZES.join(" / ")}</th>`).join("")}</tr></thead>
  <tbody>${batch.map(row).join("")}
  ${approved.length ? `<tr class="divider"><th>approved</th><td colspan="${STYLES.length}"></td></tr>${approved.map(row).join("")}` : ""}</tbody>
</table></div>`;
}

if (batch.length === 0) {
  console.log("Nothing to review: no draft icons and none named.");
  process.exit(0);
}

await realSheet("review-light.png", "#111", "#fff", "#888");
await realSheet("review-dark.png", "#eee", "#151515", "#888");
await zoomSheet("review-zoom.png");
writeFileSync(join(OUT, "review.html"), html());

const fmt = (n: number) => n.toFixed(2);
const table = [];
for (const icon of [...batch, ...approved])
  for (const style of STYLES) {
    const m = await measure(icon.svg[style]);
    table.push({
      icon: icon.name,
      style,
      bounds: `${fmt(m.left)} ${fmt(m.top)} → ${fmt(m.right)} ${fmt(m.bottom)}`,
      size: `${fmt(m.right - m.left)} × ${fmt(m.bottom - m.top)}`,
      mass: `${fmt(m.massX)}, ${fmt(m.massY)}`,
      ink: `${(m.ink * 100).toFixed(1)}%`,
    });
  }
console.table(table);
console.log(`Review sheets in ${OUT}`);
