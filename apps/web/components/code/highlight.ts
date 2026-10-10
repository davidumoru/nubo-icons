import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export type Lang = "tsx" | "xml";

// One small highlighter for code built in the browser (the icon drawer). Docs code is highlighted at build
// time with the same two themes, so both look identical.
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

// The highlighted lines only, to drop into our own <pre><code>.
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
