import data from "./icon-data.json";

export const STYLES = ["line", "fill", "duo"] as const;
export type Style = (typeof STYLES)[number];

export type IconData = {
  name: string;
  component: string;
  tags: string[];
  categories: string[];
  aliases: string[];
  rtl: string;
  svg: Record<Style, string>;
};

export const icons = data as IconData[];

export const getIcon = (name: string) => icons.find((i) => i.name === name);

export function searchIcons(list: IconData[], query: string): IconData[] {
  const q = query.trim().toLowerCase().replace(/\s+/g, "-");
  if (!q) return list;
  const words = q.split("-");
  const score = (icon: IconData) => {
    if (icon.name === q) return 0;
    if (icon.name.startsWith(q)) return 1;
    if (icon.name.includes(q)) return 2;
    if (icon.aliases.some((a) => a.includes(q))) return 3;
    const haystack = [...icon.tags, ...icon.categories].join(" ");
    if (words.every((w) => haystack.includes(w))) return 4;
    return -1;
  };
  return list
    .map((icon) => ({ icon, s: score(icon) }))
    .filter(({ s }) => s >= 0)
    .sort((a, b) => a.s - b.s)
    .map(({ icon }) => icon);
}

export type Customization = {
  size: number;
  strokeWidth: number;
  color: string;
};

export function svgFor(icon: IconData, style: Style, c: Customization) {
  return icon.svg[style]
    .replace(/width="24" height="24"/, `width="${c.size}" height="${c.size}"`)
    .replace(/stroke-width="1.5"/, `stroke-width="${c.strokeWidth}"`)
    .replace(/<g data-tone="secondary">/g, '<g opacity=".3">')
    .replaceAll(
      "currentColor",
      c.color === "currentColor" ? "currentColor" : c.color,
    );
}

export function jsxFor(icon: IconData, c: Customization) {
  const props = [
    c.size !== 24 && `size={${c.size}}`,
    c.strokeWidth !== 1.5 && `strokeWidth={${c.strokeWidth}}`,
    c.color !== "currentColor" && `color="${c.color}"`,
  ].filter(Boolean);
  return `<${icon.component}Icon${props.length ? " " + props.join(" ") : ""} />`;
}
