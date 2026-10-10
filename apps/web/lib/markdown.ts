import "server-only";
import { DOCS, findDoc } from "@/lib/docs";
import { docMeta, markdownFor } from "@/lib/docs-source";
import { icons } from "@/lib/icons";
import { REPO_URL, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

const url = (path: string) => new URL(path, SITE_URL).href;

export function homeMarkdown() {
  return [
    "# Nubo",
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Every icon is drawn on a 24px grid with a 1.5px stroke. Line is an outline, Fill is solid, and Duo is a line drawing with a 30% tint.",
    "",
    'React: `import { HeartIcon } from "@nubo-icons/react"` for Line, or from `@nubo-icons/react/fill` and `@nubo-icons/react/duo`. Every icon takes `size`, `strokeWidth`, `color` and `title`; icons are decorative (aria-hidden) unless given a `title` or `aria-label`.',
    "",
    "## Docs",
    "",
    ...DOCS.map(
      (d) => `- [${d.title}](${url(d.href)}): ${docMeta(d).description}`,
    ),
    "",
    "## Icons",
    "",
    ...icons.map(
      (i) =>
        `- [${i.name}](${url(`/?icon=${i.name}`)}): ${i.component}Icon${i.aliases.length ? `, aliases: ${i.aliases.join(", ")}` : ""}. ${i.tags.join(", ")}`,
    ),
    "",
    "## Optional",
    "",
    `- [Showcase](${url("/showcase")}): interface examples built with Nubo and shadcn/ui`,
    `- [Source on GitHub](${REPO_URL}): icons, packages and this site`,
    `- [All icons as SVG](${url("/nubo-icons.zip")}): every icon in every style, with the license`,
    "",
  ].join("\n");
}

const showcaseMarkdown = () =>
  [
    "# Showcase",
    "",
    "Nubo in the places icons usually live: a canvas of interface examples built with Nubo icons and shadcn/ui components, including a sign-up form, tab bar, inbox, command menu, music player, payment form, sidebar, settings, file uploads, cart, video call controls and alerts.",
    "",
    `Open it in a browser to pan around and try them: ${url("/showcase")}`,
    "",
  ].join("\n");

export function pageMarkdown(path: string[]): string | null {
  const [section, ...rest] = path;
  if (!section) return homeMarkdown();
  if (section === "showcase" && !rest.length) return showcaseMarkdown();
  if (section === "docs") {
    const doc = findDoc(rest);
    if (!doc) return null;
    const { title, description } = docMeta(doc);
    return markdownFor(doc, title, description);
  }
  return null;
}

export const notFoundMarkdown = (path: string) =>
  [
    "# Page not found",
    "",
    `Nothing lives at \`${path}\`. These are good places to start:`,
    "",
    `- [Icons](${url("/")}): every Nubo icon, with search`,
    `- [Docs](${url("/docs")}): install Nubo and render your first icon`,
    `- [llms.txt](${url("/llms.txt")}): the whole site as one Markdown file`,
    "",
  ].join("\n");
