import { NextResponse, type NextRequest } from "next/server";

// AI tools ask for pages as Markdown, with `Accept: text/markdown` or a `.md` suffix.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const suffixed = pathname.endsWith(".md");
  if (suffixed || request.headers.get("accept")?.includes("text/markdown")) {
    const page = (suffixed ? pathname.slice(0, -3) : pathname)
      .replace(/\/index$/, "")
      .replace(/\/$/, "");
    return NextResponse.rewrite(new URL(`/md${page}`, request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/|_vercel/|md/|og/|llms\\.txt|robots\\.txt|sitemap\\.xml|icon\\.svg|nubo-icons\\.zip).*)",
  ],
};
