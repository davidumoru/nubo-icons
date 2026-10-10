import { DOCS } from "@/lib/docs";
import { docMeta } from "@/lib/docs-source";
import { icons, type Style } from "@/lib/icons";
import { renderOg, type OgContent } from "@/lib/og";

const SAMPLE: { name: string; style: Style }[] = [
  { name: "heart", style: "line" },
  { name: "bell", style: "fill" },
  { name: "cloud", style: "duo" },
  { name: "camera", style: "line" },
  { name: "sparkle", style: "fill" },
  { name: "chat", style: "duo" },
  { name: "house", style: "line" },
  { name: "star", style: "fill" },
];

function content(path: string[]): OgContent | null {
  const [kind, name] = path;
  if (kind === "home")
    return {
      title:
        "Nubo is an open-source icon family for apps, sites, docs and slides.",
      icons: SAMPLE,
    };
  if (kind === "showcase")
    return {
      title: "Showcase",
      description: "Nubo in the places icons usually live.",
      icons: SAMPLE,
    };
  if (kind === "docs") {
    const doc = DOCS.find((d) => d.file === name);
    if (!doc) return null;
    return {
      eyebrow: "Docs",
      title: doc.title,
      description: docMeta(doc).description,
      icons: SAMPLE,
    };
  }
  if (kind === "icon") {
    const icon = icons.find((i) => i.name === name);
    if (!icon) return null;
    return {
      eyebrow: `${icon.component}Icon`,
      title: icon.name,
      description: icon.tags.join(", "),
      icons: (["line", "fill", "duo"] as const).map((style) => ({
        name: icon.name,
        style,
      })),
      iconSize: 112,
    };
  }
  return null;
}

export function generateStaticParams() {
  return [
    { path: ["home"] },
    { path: ["showcase"] },
    ...DOCS.map((d) => ({ path: ["docs", d.file] })),
    ...icons.map((i) => ({ path: ["icon", i.name] })),
  ];
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/og/[...path]">,
) {
  const page = content((await params).path);
  if (!page) return new Response("Not found", { status: 404 });
  return renderOg(page);
}
