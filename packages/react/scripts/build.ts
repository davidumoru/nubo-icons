import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  STYLES,
  iconNames,
  loadIcon,
  parseSvg,
  type Node,
} from "@nubo-icons/tools/icons";
import { morphShapes } from "@nubo-icons/tools/morph";

const PKG = new URL("..", import.meta.url).pathname;
const DIST = join(PKG, "dist");
const tsc = join(PKG, "node_modules/.bin/tsc");

const pascal = (slug: string) =>
  slug.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());

const camelAttr = (name: string) =>
  name.startsWith("data-")
    ? name
    : name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

type IconNode = [string, Record<string, string>, IconNode[]?];

const toNode = (node: Node): IconNode => {
  const attrs = Object.fromEntries(
    Object.entries(node.attrs).map(([k, v]) => [camelAttr(k), v]),
  );
  return node.children.length
    ? [node.name, attrs, node.children.map(toNode)]
    : [node.name, attrs];
};

rmSync(DIST, { recursive: true, force: true });

const compile = (module: string, outDir: string, extra: string[] = []) =>
  execFileSync(
    tsc,
    [
      "src/create-icon.ts",
      "src/morph-icon.ts",
      "--outDir",
      outDir,
      "--module",
      module,
      "--moduleResolution",
      module === "commonjs" ? "node10" : "bundler",
      "--target",
      "es2020",
      "--strict",
      "--skipLibCheck",
      ...extra,
    ],
    { cwd: PKG, stdio: "inherit" },
  );
compile("esnext", join(DIST, "esm"), [
  "--declaration",
  "--declarationDir",
  join(DIST, "types"),
]);
compile("commonjs", join(DIST, "cjs"), ["--declaration"]);
writeFileSync(
  join(DIST, "cjs/package.json"),
  JSON.stringify({ type: "commonjs" }) + "\n",
);

const icons = iconNames().map(loadIcon);
const exportNames = new Map<string, string>();
for (const icon of icons) {
  for (const name of [icon.name, ...icon.meta.aliases].map(pascal)) {
    if (exportNames.has(name))
      throw new Error(
        `export ${name} is claimed by both ${exportNames.get(name)} and ${icon.name}`,
      );
    exportNames.set(name, icon.name);
  }
}

for (const style of STYLES) {
  const esm = join(DIST, "esm", style);
  const cjs = join(DIST, "cjs", style);
  const types = join(DIST, "types", style);
  for (const dir of [esm, cjs, types]) mkdirSync(dir, { recursive: true });

  const esmIndex: string[] = [];
  const cjsIndex: string[] = ['"use strict";'];
  const dts: string[] = [
    'import type { NuboIcon } from "../create-icon.js";',
    'export type { IconProps, NuboIcon } from "../create-icon.js";',
  ];

  for (const icon of icons) {
    const name = pascal(icon.name);
    const nodes = JSON.stringify(
      parseSvg(icon.svg[style]).children.map(toNode),
    );
    const mirror = icon.meta.rtl === "mirror" ? ", true" : "";
    const call = `createIcon(${JSON.stringify(name)}, ${JSON.stringify(icon.name)}, ${JSON.stringify(style)}, ${nodes}${mirror})`;
    writeFileSync(
      join(esm, `${icon.name}.js`),
      `import { createIcon } from "../create-icon.js";\nexport const ${name} = ${call};\n`,
    );
    writeFileSync(
      join(cjs, `${icon.name}.js`),
      `"use strict";\nconst { createIcon } = require("../create-icon.js");\nexports.${name} = ${call};\n`,
    );

    const names = [name, ...icon.meta.aliases.map(pascal)].flatMap((n) => [
      n,
      `${n}Icon`,
    ]);
    esmIndex.push(
      `export { ${names.map((n) => (n === name ? n : `${name} as ${n}`)).join(", ")} } from "./${icon.name}.js";`,
    );
    cjsIndex.push(
      `const ${name} = require("./${icon.name}.js").${name};`,
      ...names.map((n) => `exports.${n} = ${name};`),
    );
    dts.push(...names.map((n) => `export declare const ${n}: NuboIcon;`));
  }

  writeFileSync(join(esm, "index.js"), esmIndex.join("\n") + "\n");
  writeFileSync(join(cjs, "index.js"), cjsIndex.join("\n") + "\n");
  // CommonJS consumers need their own copy: next to dist/cjs/package.json, TypeScript reads it as CJS.
  for (const dir of [types, cjs])
    writeFileSync(join(dir, "index.d.ts"), dts.join("\n") + "\n");
}

const morphDirs = ["esm", "cjs", "types"].map((d) => join(DIST, d, "morph"));
for (const dir of morphDirs) mkdirSync(dir, { recursive: true });
const shapes = JSON.stringify(morphShapes(icons));
// Next.js and other RSC frameworks need the directive on the module that creates the component.
writeFileSync(
  join(DIST, "esm/morph/index.js"),
  `"use client";\nimport { createMorphIcon } from "../morph-icon.js";\nexport const MorphIcon = createMorphIcon(${shapes});\n`,
);
writeFileSync(
  join(DIST, "cjs/morph/index.js"),
  `"use client";\n"use strict";\nconst { createMorphIcon } = require("../morph-icon.js");\nexports.MorphIcon = createMorphIcon(${shapes});\n`,
);
const morphDts = [
  'import type { ForwardRefExoticComponent, RefAttributes } from "react";',
  'import type { MorphIconProps as Props } from "../morph-icon.js";',
  `export type MorphIconName = ${Object.keys(JSON.parse(shapes))
    .map((n) => JSON.stringify(n))
    .join(" | ")};`,
  "export type MorphIconProps = Props<MorphIconName>;",
  "export declare const MorphIcon: ForwardRefExoticComponent<MorphIconProps & RefAttributes<SVGSVGElement>>;",
];
for (const dir of [morphDirs[1], morphDirs[2]])
  writeFileSync(join(dir, "index.d.ts"), morphDts.join("\n") + "\n");

console.log(
  `Built ${icons.length} icons × ${STYLES.length} styles (${exportNames.size} names, each also as …Icon).`,
);
