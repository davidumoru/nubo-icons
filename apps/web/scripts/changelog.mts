import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const source = readFileSync(
  join(import.meta.dirname, "../../../packages/react/CHANGELOG.md"),
  "utf8",
);

// Changelog entries are prose, but a stray { or < would be read as JSX by MDX. Code spans are left alone.
const escapeMdx = (line: string) =>
  line
    .split(/(`[^`]*`)/)
    .map((part, i) => (i % 2 ? part : part.replace(/([{}<>])/g, "\\$1")))
    .join("");

const body = source
  .split("\n")
  .filter((line) => !line.startsWith("# "))
  .map((line) => {
    const kind = line.match(/^### (Major|Minor|Patch) Changes$/);
    if (kind) return `**${kind[1]} changes**`;
    return escapeMdx(line.replace(/^- [0-9a-f]{7,}: /, "- "));
  })
  .join("\n")
  .trim();

writeFileSync(
  join(import.meta.dirname, "../content/docs/changelog.mdx"),
  `export const metadata = {
  title: "Changelog",
  description: "Every release of @nubo-icons/react.",
};

Versions follow semver. Before 1.0, a minor release can include breaking changes, and its entry says so. Install the latest from [npm](https://www.npmjs.com/package/@nubo-icons/react).

${body}
`,
);

console.log("changelog: written");
