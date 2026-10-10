type DocEntry = { slug: string; file: DocFile; title: string };
type DocFile =
  "index" | "react" | "styles" | "svg" | "accessibility" | "design" | "roadmap";

export const DOC_GROUPS: { label: string; pages: DocEntry[] }[] = [
  {
    label: "Get started",
    pages: [{ slug: "", file: "index", title: "Introduction" }],
  },
  {
    label: "Guides",
    pages: [
      { slug: "react", file: "react", title: "React" },
      { slug: "styles", file: "styles", title: "Line, Fill and Duo" },
      { slug: "svg", file: "svg", title: "SVG" },
      { slug: "accessibility", file: "accessibility", title: "Accessibility" },
      { slug: "design", file: "design", title: "Design" },
    ],
  },
  {
    label: "Project",
    pages: [{ slug: "roadmap", file: "roadmap", title: "Roadmap" }],
  },
];

export const DOCS = DOC_GROUPS.flatMap((g) => g.pages).map((p) => ({
  ...p,
  href: p.slug ? `/docs/${p.slug}` : "/docs",
}));
export type Doc = (typeof DOCS)[number];

export const findDoc = (slug: string[] | undefined) =>
  DOCS.find((d) => d.slug === (slug ?? []).join("/"));

export function neighbours(doc: Doc) {
  const i = DOCS.indexOf(doc);
  return { previous: DOCS[i - 1], next: DOCS[i + 1] };
}
