import { DOCS } from "@/lib/docs";
import { notFoundMarkdown, pageMarkdown } from "@/lib/markdown";

const HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
};

export function generateStaticParams() {
  return [
    { path: [] },
    { path: ["showcase"] },
    ...DOCS.map((d) => ({
      path: ["docs", ...d.slug.split("/").filter(Boolean)],
    })),
  ];
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/md/[[...path]]">,
) {
  const path = (await params).path ?? [];
  const markdown = pageMarkdown(path);
  if (markdown) return new Response(markdown, { headers: HEADERS });
  return new Response(notFoundMarkdown(`/${path.join("/")}`), {
    status: 404,
    headers: HEADERS,
  });
}
