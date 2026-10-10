import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export type Lang = "tsx" | "xml";

// Keep these themes in step with rehype-pretty-code in next.config.ts, so drawer and docs code look the same.
let highlighter: Promise<HighlighterCore> | undefined;
const getHighlighter = () =>
  (highlighter ??= createHighlighterCore({
    themes: [
      import("shiki/themes/github-light.mjs"),
      import("shiki/themes/github-dark.mjs"),
    ],
    langs: [import("shiki/langs/tsx.mjs"), import("shiki/langs/xml.mjs")],
    engine: createJavaScriptRegexEngine(),
  }));

export async function highlight(code: string, lang: Lang) {
  const html = (await getHighlighter()).codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
  return html
    .replace(/^[\s\S]*?<code[^>]*>/, "")
    .replace(/<\/code>[\s\S]*$/, "");
}
