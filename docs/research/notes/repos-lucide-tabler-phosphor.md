# Repository architecture teardown: Lucide, Tabler Icons, Phosphor

Method note: findings come from shallow clones of each repo's default branch taken on 2026-10-09, plus the npm registry. Snapshots: lucide-icons/lucide @ `70562c1` (2026-10-09), tabler/tabler-icons @ `a4ce140` (2026-10-05), phosphor-icons/core @ `2b75f3a` (2026-01-06), phosphor-icons/react @ `81ac06f` (2026-01-06), phosphor-icons/vue @ `702cff3` (2026-01-06), phosphor-icons/web @ `3d40a3e` (2026-01-06), phosphor-icons/homepage @ `7a57592` (2026-08-25). Links point to `main`, so line-level details can drift after this date.

Short URLs used below:

- L = https://github.com/lucide-icons/lucide/blob/main
- T = https://github.com/tabler/tabler-icons/blob/main
- PC = https://github.com/phosphor-icons/core/blob/main, PR = https://github.com/phosphor-icons/react/blob/main, PV = https://github.com/phosphor-icons/vue/blob/main, PW = https://github.com/phosphor-icons/web/blob/main

---

## 1. Top-level layout (source SVGs, packages, tools/scripts, docs site)

### Takeaway

Lucide and Tabler are single pnpm monorepos: the SVG sources sit at the root, one generated package per framework lives in `packages/`, and the build tooling sits beside them. Lucide splits that tooling into `tools/` workspace packages plus `scripts/`. Tabler keeps it in one hidden `.build/` folder. Phosphor is split across many repos. `core` holds the SVGs and the TypeScript catalog, and each framework repo pulls `core` in as a git submodule.

### Cited Findings

**Lucide**

- Root contains `icons/` (flat dir of `<name>.svg` + `<name>.json` pairs; 3,754 files ≈ 1,877 icons), `categories/` (42 category JSON files), `lab/` (710 files, experimental icons staged before promotion), `packages/`, `tools/`, `scripts/`, `docs/`, `integrations/`, plus `icon.schema.json`, `category.schema.json`, `brand-stopwords.json`, `prettier-plugin-lucide-svg.mjs` — [L/](https://github.com/lucide-icons/lucide)
- `packages/`: `angular`, `astro`, `icons`, `lab`, `lucide` (vanilla), `lucide-preact`, `lucide-react`, `lucide-react-native`, `lucide-solid`, `lucide-static`, `shared`, `solid` (Solid 2), `svelte`, `vue` — [L/packages](https://github.com/lucide-icons/lucide/tree/main/packages)
- `tools/`: `build-icons` (codegen CLI, published as workspace pkg `@lucide/build-icons`), `build-helpers` (`@lucide/helpers`: readSvg, toPascalCase, minifySvg, etc.), `build-font`, `rollup-plugins` (`@lucide/rollup-plugins`) — [L/tools](https://github.com/lucide-icons/lucide/tree/main/tools)
- `scripts/`: optimizeSvgs, optimizeStagedSvgs, addMissingIconJsonFiles, checkIconsAndCategories, checkLabIcons, lintFilenames, lintSpelling, generateChangedIconsCommentMarkup, suggestMetaData (OpenAI), updateContributors, rename/renameIcon, generateNextJSAliases — [L/scripts](https://github.com/lucide-icons/lucide/tree/main/scripts)
- `docs/` is a VitePress site (`vitepress build`) with a Nitro API (`nitropack build`), deployed to Vercel; many `prebuild:*` scripts generate icon nodes, metadata index, categories, related icons, release metadata and popularity data — [L/docs/package.json](https://github.com/lucide-icons/lucide/blob/main/docs/package.json)
- `integrations/` contains real-app smoke tests: `lucide-react/{nextjs,react-router,tanstack-router,tanstack-start,vite}`, `lucide-solid`, `lucide-solid-2`, `lucide-vue` — [L/integrations](https://github.com/lucide-icons/lucide/tree/main/integrations)

**Tabler**

- Root: `icons/outline/*.svg` (5,184) and `icons/filled/*.svg` (1,054), `aliases.json` (renames per style), `.build/` (all build scripts), `.changeset/`, `packages/`, `test/` (demo apps per framework), and an Astro site at the root (`astro.config.mjs`, `src/pages`, `docs/icons/*.mdx`) — [T/](https://github.com/tabler/tabler-icons)
- `packages/`: `icons` (raw SVG + JSON), `icons-angular`, `icons-astro`, `icons-eps`, `icons-pdf`, `icons-png`, `icons-preact`, `icons-react`, `icons-react-native`, `icons-solidjs`, `icons-sprite`, `icons-svelte`, `icons-svelte-runes`, `icons-vue`, `icons-webfont` — [T/packages](https://github.com/tabler/tabler-icons/tree/main/packages)
- `.build/` holds `build-icons.mjs` (shared codegen), `helpers.mjs`, `validate-icons.mjs`, `optimize.mjs` (+ `optimize.test.mjs`), `dashes.mjs`, `import.mjs`, `update-icons.mjs`, `rollup-plugins.mjs`, changelog/release-notes/preview-image scripts, `zip-files.mjs` — [T/.build](https://github.com/tabler/tabler-icons/tree/main/.build)
- `test/`: `test-angular`, `test-astro`, `test-preact`, `test-react`, `test-react-native`, `test-react-rsc`, `test-react-types`, `test-svelte`, `test-vue` — [T/test](https://github.com/tabler/tabler-icons/tree/main/test)

**Phosphor**

- The org (github.com/phosphor-icons) has separate repos: `core`, `react`, `vue`, `web`, `webcomponents`, `react-native`, `flutter`, `swift`, `android`, `phosphor-elm`, `figma`, `figma-library-generator`, `sketch`, `penpot`, `uxp`, `unplugin`, `pack`, `server`, `homepage`, `theme`, `testbed`, `demo-app` — [github.com/orgs/phosphor-icons/repositories](https://github.com/orgs/phosphor-icons/repositories)
- `core`: `raw/<weight>/*.svg` (Figma-export form, stroked, with a 256×256 bounding rect), `assets/<weight>/*.svg` (flattened, fill-only), `src/icons.ts` (generated catalog), `src/types.ts`, `scripts/{catalog,collate,verify,index}.ts`; 1,512 icons per weight × 6 weights — [PC/](https://github.com/phosphor-icons/core)
- `react`: `core` is a git submodule (`.gitmodules` → `https://github.com/phosphor-icons/core`, branch main); `src/defs/*.tsx` (per-icon weight maps), `src/csr/*.tsx` (client components), `src/ssr/*.tsx` (server components), `src/lib/` (IconBase, SSRBase, context, types), `scripts/assemble.ts` — [PR/.gitmodules](https://github.com/phosphor-icons/react/blob/main/.gitmodules)
- `vue`: also a `core` submodule; generates `src/icons/Ph<Name>.vue` SFCs via `bin/assemble.ts` — [PV/](https://github.com/phosphor-icons/vue)
- `homepage` is a Vite + React app that depends on the published `@phosphor-icons/react` — [homepage/package.json](https://github.com/phosphor-icons/homepage/blob/main/package.json)

### Inferences

- Lucide's split is the most reusable model for nubo-icons. The codegen CLI is generic (`build-icons --templateSrc=...`), so each framework package only provides a template file and a Rollup config.
- Phosphor's per-repo-plus-submodule model makes it easy to add a third-party port, but versions drift between repos (see section 7).

### Gaps

- I did not inspect the Phosphor `figma`, `figma-library-generator`, `flutter`, `swift`, or `react-native` repos file by file. The GitHub API was rate-limited, so I could not pull their pushed-at dates either.

---

## 2. Monorepo tooling, Node version, TypeScript setup

### Takeaway

Lucide runs plain pnpm workspaces with no task runner (`pnpm -r --filter`), very recent pnpm/Node/TS, and no changesets; a GitHub workflow drives versioning. Tabler runs pnpm workspaces with Turborepo for cached builds, pnpm catalogs to pin shared dependency versions, and Changesets with all packages in one fixed version group. Phosphor's repos are each a standalone pnpm (or npm/yarn) package built with Vite library mode.

### Cited Findings

- Lucide root `package.json`: `"packageManager": "pnpm@11.22.0"`, `"engines": {"node": ">=24.11.1"}`, `typescript ^6.0.3`, `vitest 5.0.3`, `svgo ^4.1.0`, `svgson`, `husky` + `lint-staged`, `cspell`, `ajv`, `zod`, `openai`. Build = `pnpm -r --filter './packages/**' build` — [L/package.json](https://github.com/lucide-icons/lucide/blob/main/package.json)
- Lucide `pnpm-workspace.yaml` globs: `packages/*`, `tools/*`, `docs`, `integrations/*/*`; uses `allowBuilds` to block install scripts (esbuild, sharp, etc.) — [L/pnpm-workspace.yaml](https://github.com/lucide-icons/lucide/blob/main/pnpm-workspace.yaml)
- Lucide CI reads the Node version from `package.json` (`node-version-file: 'package.json'`) and pins every action to a full commit SHA — [L/.github/workflows/lucide-react.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/lucide-react.yml)
- Lucide internal packages ship raw TS: `@lucide/shared` exports `"./src/index.ts"` and is bundled into each framework package by `nodeResolve({ resolveOnly: [/^@lucide\/.*$/] })` — [L/tools/rollup-plugins/plugins.js](https://github.com/lucide-icons/lucide/blob/main/tools/rollup-plugins/plugins.js)
- Tabler root: `"packageManager": "pnpm@10.30.3"`, `turbo ^2.11.4`, `@changesets/cli ^3.0.3`, `@changesets/changelog-github`; `build:packages` = `turbo run build --filter='./packages/*'` — [T/package.json](https://github.com/tabler/tabler-icons/blob/main/package.json)
- Tabler `pnpm-workspace.yaml` uses `catalog:` (typescript 5.9.3, rollup 4.63.5, vitest ^5.0.2, react 18.3.1, etc.) and `minimumReleaseAge: 10080` (refuses deps published <7 days ago) — [T/pnpm-workspace.yaml](https://github.com/tabler/tabler-icons/blob/main/pnpm-workspace.yaml)
- Tabler `turbo.json`: the `build` task's inputs include `../../icons/**`, `../../aliases.json` and `../../.build/**`, and its outputs include `dist/**`, `src/icons/**` and `icons.json`. `globalEnv: ["ICONS_LIMIT","SOURCE_DATE_EPOCH"]`. `test`, `typecheck` and `imports-check` all depend on `build` — [T/turbo.json](https://github.com/tabler/tabler-icons/blob/main/turbo.json)
- Tabler CI uses Node 22 — [T/.github/workflows/build.yml](https://github.com/tabler/tabler-icons/blob/main/.github/workflows/build.yml)
- Tabler `tsconfig.base.json`: `strict`, `target/module: ESNext`, `moduleResolution: bundler`, `isolatedModules`, `noEmit` — [T/tsconfig.base.json](https://github.com/tabler/tabler-icons/blob/main/tsconfig.base.json)
- Phosphor core: `packageManager: pnpm@9`, `typescript ^4.9.4`, `vite ^5.2.11`, build = `vite build && tsc --emitDeclarationOnly` — [PC/package.json](https://github.com/phosphor-icons/core/blob/main/package.json)
- Phosphor react: `pnpm@10.6.3`, `typescript ^5.8.3`, `vite ^6.3.5`, `vite-plugin-dts`, `vitest ^3.1.3`; CI on Node 18 / pnpm 8 — [PR/package.json](https://github.com/phosphor-icons/react/blob/main/package.json), [PR/.github/workflows/main.yml](https://github.com/phosphor-icons/react/blob/main/.github/workflows/main.yml)
- Phosphor vue has both `package-lock.json` and `yarn.lock`, plus pinned older tooling (vite 4.3.8, TS 5.0.4, vue 3.3.4) — [PV/package.json](https://github.com/phosphor-icons/vue/blob/main/package.json)

### Inferences

- For nubo-icons, Tabler's Turborepo cache keyed on `icons/**` and `.build/**` matters once the set grows to thousands of icons. Its CI also builds with `ICONS_LIMIT=100` to keep PR builds fast.
- Phosphor's tooling is uneven from repo to repo, which is the cost of the multi-repo model.

### Gaps

- Lucide's `tsconfig.json` and Tabler's per-package tsconfigs were not inspected line-by-line.

---

## 3. Source of truth and metadata (SVG conventions, per-icon JSON, categories, naming)

### Takeaway

- **Lucide:** one SVG and one JSON-Schema-validated JSON file per icon. Categories are separate JSON files, and aliases with deprecation data live in the icon JSON.
- **Tabler:** metadata sits in YAML front matter inside an HTML comment at the top of each SVG (tags, category, version, unicode), with aliases in one root `aliases.json`.
- **Phosphor:** metadata lives in an external database/API (`api.phosphoricons.com`) and is snapshotted into a generated `src/icons.ts` catalog.

### Cited Findings

**Lucide**

- SVG convention: 24×24 viewBox, `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`, pretty-printed multi-line root, children use primitives (`path`, `circle`, `rect`, `line`...) — [L/icons/house.svg](https://github.com/lucide-icons/lucide/blob/main/icons/house.svg)
- Per-icon JSON (`icons/house.json`): `$schema`, `contributors` (GitHub handles), `use-cases`, `tags`, `categories`, `aliases: [{name:"home", deprecated:true, deprecationReason:"alias.name"}]` — [L/icons/house.json](https://github.com/lucide-icons/lucide/blob/main/icons/house.json)
- `icon.schema.json` (draft 2020-12): required `$schema, contributors, categories, tags, use-cases`; `additionalProperties:false`; aliases items support `deprecated`, `deprecationReason`, `toBeRemovedInVersion`, enforced via `dependentRequired`; `categories` is an enum of 42 slugs; `contributors` `minItems: 1` — [L/icon.schema.json](https://github.com/lucide-icons/lucide/blob/main/icon.schema.json)
- Category file format: `{ "$schema": "../category.schema.json", "title": "Arrows", "description": "...", "icon": "arrow-left-right" }` — [L/categories/arrows.json](https://github.com/lucide-icons/lucide/blob/main/categories/arrows.json)
- `checkIconsAndCategories.mts` verifies every SVG has a JSON, every JSON has an SVG, every category referenced exists, and every category has an icon — [L/scripts/checkIconsAndCategories.mts](https://github.com/lucide-icons/lucide/blob/main/scripts/checkIconsAndCategories.mts)
- CI rejects duplicate alias names, meaning an alias that collides with another icon's filename or alias, using a `jq` one-liner — [L/.github/workflows/linting-icons.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/linting-icons.yml)
- Naming: kebab-case filename → PascalCase component (`toPascalCase`), with prefixed and suffixed export variants (`lucide-react.prefixed.ts`, `lucide-react.suffixed.ts`, i.e. `LucideHouse` / `HouseIcon`) — [L/packages/lucide-react/src](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react/src)
- A `suggest:metadata` script calls OpenAI with structured (zod) output to suggest tags/categories on PRs touching `icons/*.json`, run via `pull_request_target` — [L/scripts/suggestMetaData.mts](https://github.com/lucide-icons/lucide/blob/main/scripts/suggestMetaData.mts), [L/.github/workflows/pull-request-metadata-suggestions.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/pull-request-metadata-suggestions.yml)

**Tabler**

- Outline SVG begins with `<!-- tags: [...] category: Buildings version: "1.0" unicode: "eac1" -->`, then a 24×24 stroke-2 round-cap svg; filled icons use `fill="currentColor"` with no stroke attrs. Filled filenames are the same name in `icons/filled/` and get a `-filled` suffix on export (e.g. `IconHomeFilled`) — [T/icons/outline/home.svg](https://github.com/tabler/tabler-icons/blob/main/icons/outline/home.svg), [T/icons/filled/home.svg](https://github.com/tabler/tabler-icons/blob/main/icons/filled/home.svg)
- Front matter is parsed with `gray-matter` using `<!--`/`-->` as delimiters — [T/.build/helpers.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/helpers.mjs)
- Categories are a hard-coded list of 41 names (Animals, Arrows, Badges, Brand, ... Zodiac) in `helpers.mjs`; stroke presets `{200:1, 300:1.5, 400:2}` — [T/.build/helpers.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/helpers.mjs)
- `aliases.json` maps old→new names per style (`{"outline": {"code-asterix":"code-asterisk", ...}}`) — [T/aliases.json](https://github.com/tabler/tabler-icons/blob/main/aliases.json)
- `update-icons.mjs` auto-assigns the next free hex `unicode` and writes `version: "<major.minor>"` into icons lacking them — [T/.build/update-icons.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/update-icons.mjs)

**Phosphor**

- Six weights: thin, light, regular, bold, fill, duotone; filenames `<name>-<weight>.svg` (regular has no suffix); 256×256 viewBox — [PC/src/types.ts](https://github.com/phosphor-icons/core/blob/main/src/types.ts)
- `raw/` SVGs keep strokes (`stroke-width="16"`, round caps/joins) plus a transparent `<rect width="256" height="256" fill="none"/>`; `assets/` SVGs are outlined to filled paths with `fill="currentColor"`; duotone uses a second path with `opacity="0.2"` — [PC/raw/regular/house.svg](https://github.com/phosphor-icons/core/blob/main/raw/regular/house.svg), [PC/assets/duotone/house-duotone.svg](https://github.com/phosphor-icons/core/blob/main/assets/duotone/house-duotone.svg)
- `IconEntry`: `name`, `pascal_name`, optional `alias {name, pascal_name}`, `categories` (IconCategory enum, 18 values), `figma_category` (FigmaCategory enum, 18 values with different groupings), `tags` (prefixed with `*new*`/`*updated*`), stable `codepoint`, `published_in`, `updated_in` — [PC/src/types.ts](https://github.com/phosphor-icons/core/blob/main/src/types.ts), [PC/src/icons.ts](https://github.com/phosphor-icons/core/blob/main/src/icons.ts)
- `scripts/catalog.ts` fetches `https://api.phosphoricons.com` and code-generates `src/icons.ts`; `scripts/collate.ts` sorts exported Figma SVGs/PNGs from `./SVGs` into weight folders by filename suffix — [PC/scripts/catalog.ts](https://github.com/phosphor-icons/core/blob/main/scripts/catalog.ts), [PC/scripts/collate.ts](https://github.com/phosphor-icons/core/blob/main/scripts/collate.ts)

### Inferences

- Lucide's sidecar-JSON-plus-JSON-Schema model is the easiest to lint, diff and edit through PRs. Tabler's front matter keeps each icon in one file but needs custom parsing. Phosphor's API is the right fit for a designer-led team but closed to outside contributors.
- Each project needs stable codepoints: Tabler stores them in the SVG, Phosphor in the catalog, and Lucide added stable code points in v1 (section 5). nubo-icons should store a codepoint per icon from day one.

### Gaps

- The Phosphor metadata API's source and schema are not public in these repos.

---

## 4. Build pipeline: optimization, validation, codegen, bundling, output formats, base component

### Takeaway

All three generate one module per icon from an intermediate "icon node" representation and wrap it with a small shared base component.

- **Lucide:** `[tag, attrs]` arrays inside an `IconData` object, a framework-agnostic `@lucide/shared` builder, and Rollup + esbuild output to ESM (preserveModules) and CJS. UMD was dropped in v1.
- **Tabler:** the same Rollup/esbuild pattern, with a `createXComponent(type, name, pascal, iconNode)` factory per framework.
- **Phosphor:** generated JSX/Vue per weight, built with Vite library mode to ES (preserveModules), CJS and UMD.

### Cited Findings

**SVG optimization and validation**

- Lucide `processSvg.mts`: SVGO `preset-default` with `convertShapeToPath:false`, `mergePaths:false`, and `removeAttrs` for `(fill|stroke.*)`. It then re-applies default attrs from `default-attrs.json` via svgson and formats with Prettier — [L/scripts/render/processSvg.mts](https://github.com/lucide-icons/lucide/blob/main/scripts/render/processSvg.mts)
- Lucide also has a custom Prettier plugin for `icons/*.svg` that runs SVGO (`multipass`, `floatPrecision: 3`) with a per-element attribute allowlist (path: only `d`; circle: `cx|cy|r|fill`; rect: `x|y|width|height|rx|ry`; etc.) and rewrites the root `<svg>` to the canonical header. `lint:icons` = `prettier "icons/*.svg" --check` — [L/prettier-plugin-lucide-svg.mjs](https://github.com/lucide-icons/lucide/blob/main/prettier-plugin-lucide-svg.mjs)
- Lucide's lint-staged runs optimizeStagedSvgs + Prettier on SVGs, and eslint (JSON schema plugin) + cspell + Prettier on JSON — [L/lint-staged.config.mjs](https://github.com/lucide-icons/lucide/blob/main/lint-staged.config.mjs)
- Lucide default attrs: `{xmlns, width:24, height:24, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", "stroke-width":2, "stroke-linecap":"round", "stroke-linejoin":"round"}` — [L/tools/build-icons/render/default-attrs.json](https://github.com/lucide-icons/lucide/blob/main/tools/build-icons/render/default-attrs.json)
- Tabler `validate-icons.mjs` checks:
  - only `.svg` files in the icon folders, an exact root-template match, and metadata present;
  - no `M0 0h24v24H0z` placeholder;
  - no `<circle|rect|ellipse|line|polygon|polyline>`, since everything must be a `<path>`, and no `<g>`;
  - `stroke-width` only on the root;
  - none of these path patterns: rectangle paths ending in `z`, `z` followed by h/v, relative `m` after `M`, `Z` in outline icons, empty `d`, `h0`/`v0`, or M-only paths;
  - unicode must be unique and 4–5 hex digits, and is required in `--hard` mode.
    Source: [T/.build/validate-icons.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/validate-icons.mjs)
- Tabler `optimize.mjs` converts primitives to paths with regex rewriters (line/circle/ellipse/rect/polyline → path), strips closepath from outline icons, and normalizes formatting; it has a `node --test` suite (`optimize.test.mjs`, `dashes.test.mjs`) — [T/.build/optimize.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/optimize.mjs)
- Tabler `import.mjs` ingests designer exports from `new/<type>/*.svg`, runs `optimizeSVG` and `convertDashesToPaths` (dashed strokes become separate paths), rejects `transform=` and spaces in names, and strips Figma/Sketch artifacts (`fill="#D8D8D8"`, red guide paths, etc.) — [T/.build/import.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/import.mjs)
- Phosphor's `verify.ts` is called by `catalog.ts` (`assertValidAssets`, `assertValidApiResponse`); react's `assemble.ts` calls `verifyIcons` before codegen — [PC/scripts/catalog.ts](https://github.com/phosphor-icons/core/blob/main/scripts/catalog.ts), [PR/scripts/assemble.ts](https://github.com/phosphor-icons/react/blob/main/scripts/assemble.ts)

**Code generation**

- Lucide `build-icons` CLI flags: `--templateSrc`, `--renderUniqueKey`, `--withAliases`, `--withDynamicImports`, `--separateAliasesFile`, `--aliasesFileExtension`, `--iconFileExtension`, `--exportFileName`, `--exportModuleNameCasing camel|pascal`, `--useDefaultExports`. Each package's `scripts/exportTemplate.mts` is a `defineExportTemplate(({componentName, iconName, iconData, getSvg, deprecated, deprecationReason}) => string)` — [L/tools/build-icons/cli.ts](https://github.com/lucide-icons/lucide/blob/main/tools/build-icons/cli.ts), [L/packages/lucide-react/scripts/exportTemplate.mts](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/scripts/exportTemplate.mts)
- The generated Lucide React icon module exports `__iconData: LucideIconData = {...}` and a deprecated `__iconNode`. It includes a JSDoc `@preview ![img](data:image/svg+xml;base64,...)` for IDE hover previews, plus `@deprecated` when the icon is deprecated, and ends with `const X = createLucideIcon(__iconData)` — [L/packages/lucide-react/scripts/exportTemplate.mts](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/scripts/exportTemplate.mts)
- Lucide icon-node types: `LucideIconNode = [name, attributes] | [name, attributes, children[]]`; `LucideIconData = { name?, node: LucideIconNode[], aliases?, size? | width?/height? }` — [L/packages/shared/src/build/types.ts](https://github.com/lucide-icons/lucide/blob/main/packages/shared/src/build/types.ts)
- `@lucide/shared` holds framework-agnostic builders: `buildLucideIconNode`, `buildLucideIconElement`, `buildLucideIconForReact`, `buildLucideSvg`, `buildLucideDataUri`, `defaultAttributes`, `hasA11yProp`, `mergeClasses`, `toLucideIconData` — [L/packages/shared/src](https://github.com/lucide-icons/lucide/tree/main/packages/shared/src)
- Tabler's shared `buildJsIcons({name, componentTemplate, indexItemTemplate, aliasTemplate, extension, key, pascalCase, pascalName, indexFile, dtsEntry})`. It turns svgson children into `[tag, attrs]` (adding `key: svg-N` and converting `stroke-width` to `strokeWidth` for JSX), drops the blank-square path, and writes `src/icons/Icon<Pascal>.ts`. It also emits `icons-list.ts` and `dynamic-imports.ts` — [T/.build/build-icons.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/build-icons.mjs), [T/packages/icons-react/build.mjs](https://github.com/tabler/tabler-icons/blob/main/packages/icons-react/build.mjs)
- Tabler's declaration-bundle trick: the `iconsDts()` Rollup plugin redirects the icons index to a generated single `src/icons-dts` module, so `rollup-plugin-dts` emits one declaration file instead of thousands — [T/.build/rollup-plugins.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/rollup-plugins.mjs)
- Phosphor react generates three files per icon: `defs/X.tsx` (a `Map<IconWeight, ReactElement>` for all 6 weights), `csr/X.tsx` (wraps `IconBase`) and `ssr/X.tsx` (wraps `SSRBase`, no context). Exports are `XIcon`, plus a deprecated unsuffixed `X`. JSDoc carries base64 previews of every weight — [PR/src/csr/House.tsx](https://github.com/phosphor-icons/react/blob/main/src/csr/House.tsx), [PR/src/defs/House.tsx](https://github.com/phosphor-icons/react/blob/main/src/defs/House.tsx)
- Phosphor vue generates `Ph<Name>.vue` SFCs with `v-if/v-else-if` per weight `<g>`, and reads context via `inject("weight"|"size"|"color"|"mirrored")`. It also ships a `./compact` export — [PV/src/icons/PhHouse.vue](https://github.com/phosphor-icons/vue/blob/main/src/icons/PhHouse.vue), [PV/package.json](https://github.com/phosphor-icons/vue/blob/main/package.json)

**Base component and default props**

- Lucide React `Icon`: props `color, size, width, height, strokeWidth, absoluteStrokeWidth` (deprecated), `nonScalingStroke, className, children, iconNode | icon`. Context defaults are `size 24, strokeWidth 2, color 'currentColor', absoluteStrokeWidth false, nonScalingStroke false`. `aria-hidden` is added unless an a11y prop or children are present (`hasA11yProp`). The file is marked `'use client'` — [L/packages/lucide-react/src/Icon.ts](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/src/Icon.ts), [L/packages/shared/src/build/types.ts](https://github.com/lucide-icons/lucide/blob/main/packages/shared/src/build/types.ts)
- `nonScalingStroke` adds `vector-effect="non-scaling-stroke"` to child elements and supersedes `absoluteStrokeWidth` — [L/packages/shared/src/build/types.ts](https://github.com/lucide-icons/lucide/blob/main/packages/shared/src/build/types.ts)
- `LucideProvider` (React context) sets defaults for `size, color, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className` — [L/packages/lucide-react/src/context.ts](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/src/context.ts)
- `createLucideIcon(iconData)`, or the legacy `(name, iconNode, aliases)` signature, returns `forwardRef` wrapping `Icon` with `displayName = PascalCase(name)` — [L/packages/lucide-react/src/createLucideIcon.ts](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/src/createLucideIcon.ts)
- Tabler React `createReactComponent(type, iconName, iconNamePascal, iconNode)`: props `color='currentColor', size=24, stroke=2, title, className`. Outline icons set `stroke` and `strokeWidth`; filled icons set `fill`. The class is `tabler-icon tabler-icon-<name>`, and `title` is rendered as `<title>` — [T/packages/icons-react/src/createReactComponent.ts](https://github.com/tabler/tabler-icons/blob/main/packages/icons-react/src/createReactComponent.ts), [T/packages/icons-react/src/defaultAttributes.ts](https://github.com/tabler/tabler-icons/blob/main/packages/icons-react/src/defaultAttributes.ts)
- Phosphor React `IconBase`: props `alt` (renders `<title>`), `color, size, weight, mirrored` (`transform="scale(-1, 1)"`). The `IconContext` defaults are `color currentColor, size "1em", weight "regular", mirrored false`, and the viewBox is `0 0 256 256` — [PR/src/lib/IconBase.tsx](https://github.com/phosphor-icons/react/blob/main/src/lib/IconBase.tsx), [PR/src/lib/context.ts](https://github.com/phosphor-icons/react/blob/main/src/lib/context.ts)

**Bundlers, formats, tree-shaking, dynamic icons**

- Lucide React Rollup config: CJS single file `dist/cjs/lucide-react.js`; ESM `preserveModules` into `dist/esm/**.mjs`; separate ESM entries for `dynamicIconImports`, `DynamicIcon` and alias files; `dynamic.mjs` at the package root; `rollup-plugin-dts` for `.d.ts`/`.d.mts`; `rollup-plugin-preserve-directives` keeps `'use client'` — [L/packages/lucide-react/rollup.config.mjs](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/rollup.config.mjs)
- Shared Lucide Rollup plugins: `rollup-plugin-esbuild` (transpile and optional minify), `@rollup/plugin-node-resolve` (inline only `@lucide/*`), `rollup-plugin-license` (banner `@license <name> v<version> - ISC`), `rollup-plugin-visualizer` (writes `stats/*.html`) — [L/tools/rollup-plugins/plugins.js](https://github.com/lucide-icons/lucide/blob/main/tools/rollup-plugins/plugins.js)
- Lucide v1 removed UMD (except the vanilla `lucide` package), giving "11.4 MB → 1 MB gzipped" for lucide-react. The page labels this a 32.3% reduction; the two figures don't agree, which is a discrepancy in the source — [L/docs/guide/version-1.md](https://github.com/lucide-icons/lucide/blob/main/docs/guide/version-1.md)
- Lucide dynamic icons: the generated `dynamicIconImports` map of `'name': () => import('./icons/name')`, with aliases included; `DynamicIcon` (in `lucide-react/dynamic`) resolves the import and reads `__iconData` — [L/tools/build-icons/building/generateDynamicImports.ts](https://github.com/lucide-icons/lucide/blob/main/tools/build-icons/building/generateDynamicImports.ts), [L/packages/lucide-react/src/DynamicIcon.ts](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/src/DynamicIcon.ts)
- Tabler React Rollup: CJS (`.cjs`), ESM `preserveModules` (`.mjs`), plus a separate ESM entry for `dynamic-imports.ts` with `src/icons` external. Sourcemaps are disabled because they would be ~70% of package size — [T/packages/icons-react/rollup.config.mjs](https://github.com/tabler/tabler-icons/blob/main/packages/icons-react/rollup.config.mjs), [T/.build/rollup-plugins.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/rollup-plugins.mjs)
- Phosphor React uses Vite lib mode with `rollupOptions.output` = ES (`preserveModules`, `preserveModulesRoot: "src"`), CJS and UMD; `target: "ES2018"`; `vite-plugin-dts` — [PR/vite.config.ts](https://github.com/phosphor-icons/react/blob/main/vite.config.ts)
- Phosphor core is built with Vite lib mode to `dist/index.mjs` and `dist/index.umd.js` — [PC/vite.config.ts](https://github.com/phosphor-icons/core/blob/main/vite.config.ts)

**Framework coverage**

- Lucide release matrix: `lucide`, `lucide-react`, `lucide-react-native`, `lucide-preact`, `lucide-solid`, `@lucide/angular`, `@lucide/astro`, `@lucide/icons`, `@lucide/solid`, `@lucide/svelte`, `@lucide/vue`, plus `lucide-static` (SVG files, sprite, font, node strings) — [L/.github/workflows/release.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/release.yml)
- Tabler: React, React Native, Preact, SolidJS, Vue, Svelte (legacy and runes), Angular, Astro, plus static `@tabler/icons`, sprite, webfont, PNG, PDF and EPS — [T/package.json](https://github.com/tabler/tabler-icons/blob/main/package.json)
- Phosphor: separate repos for React, Vue, web (font), webcomponents, react-native, Flutter, Swift, Android, Elm, plus `unplugin` and `pack` (font subsetter) — [github.com/orgs/phosphor-icons/repositories](https://github.com/orgs/phosphor-icons/repositories)

### Inferences

- Recommended nubo pattern, synthesizing all three:
  - a canonical `IconNode` array format, as in Lucide and Tabler;
  - one shared framework-agnostic builder package, like `@lucide/shared`;
  - a codegen CLI driven by per-framework template files;
  - Rollup + esbuild, ESM `preserveModules` + CJS, and no UMD;
  - a `/dynamic` subpath with a lazy-import map;
  - `'use client'` preserved on context-using files;
  - auto `aria-hidden`;
  - a context provider for defaults.
- If nubo-icons ships multiple weights, Phosphor's per-icon `Map<weight, element>` puts every weight into each icon module. Lucide and Tabler instead put variants in separate icons (Tabler `-filled`) or set stroke weight at runtime.

### Gaps

- Angular, Svelte and Solid implementation details in Lucide and Tabler were not read line by line.
- Lucide's Svelte package uses `svelte-package` (inferred from the `build:package` script name); not verified.

---

## 5. Icon fonts, sprites, static assets, Figma, PNG

### Takeaway

- **Lucide:** builds its font with `svgtofont` after outlining strokes, with stable codepoints (new in v1). `lucide-static` ships SVG files, a sprite and string exports.
- **Tabler:** builds fonts from strokes outlined with `unstroke`, at three stroke weights (200/300/400 → 1/1.5/2), using svgicons2svgfont, svg2ttf, ttf2woff and wawoff2 with SCSS output. It also ships PNG/PDF/EPS packages rendered with `rsvg-convert`, plus a Figma community plugin.
- **Phosphor:** produces fonts through IcoMoon project JSON (`selection.json`) and keeps Figma as the design source, with dedicated `figma` and `figma-library-generator` repos.

### Cited Findings

- Lucide `tools/build-font` depends on `svgtofont ^6.5.3` and `oslllo-svg-fixer` (outlining strokes), plus `@vercel/blob` (codepoint storage/upload); `svgtofont` is configured with `addLigatures: true` and `fontHeight: 1000` — [L/tools/build-font/package.json](https://github.com/lucide-icons/lucide/blob/main/tools/build-font/package.json), [L/tools/build-font/src/buildFont.ts](https://github.com/lucide-icons/lucide/blob/main/tools/build-font/src/buildFont.ts)
- Lucide has `allocateCodepoints.ts` with a spec test; v1 notes "Stable code points for Lucide font" — [L/tools/build-font/src](https://github.com/lucide-icons/lucide/tree/main/tools/build-font/src), [L/docs/guide/version-1.md](https://github.com/lucide-icons/lucide/blob/main/docs/guide/version-1.md)
- In the Lucide release workflow, the font is built in its own job (`pnpm build:font --saveCodePoints`, using `BLOB_READ_WRITE_TOKEN`). The output is passed as an artifact into the `lucide-static` publish and zipped with `icons/` as GitHub Release assets — [L/.github/workflows/release.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/release.yml)
- `lucide-static` scripts: `generateSprite.mts`, `generateIconNodes.mts`, `copyIcons.mts`, `buildLib.mts`, `migrateIconsToTags.mts` — [L/packages/lucide-static/scripts](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-static/scripts)
- Tabler webfont: `build-webfont.mjs` runs `outlineSvg` from `unstroke` for each stroke preset, then `generateFont`; dependencies are `svgicons2svgfont`, `svg2ttf`, `ttf2woff`, `wawoff2` and `eta`, and CSS is compiled with `sass` into `tabler-icons{,-200,-300,-filled}{.css,.min.css}` — [T/packages/icons-webfont/.build/build-webfont.mjs](https://github.com/tabler/tabler-icons/blob/main/packages/icons-webfont/.build/build-webfont.mjs), [T/packages/icons-webfont/package.json](https://github.com/tabler/tabler-icons/blob/main/packages/icons-webfont/package.json)
- Tabler sprite: concatenates `<symbol id="tabler-<name>">` (and `tabler-filled-<name>`) into `tabler-sprite.svg`, `tabler-sprite-filled.svg` and `tabler-sprite-nostroke.svg` — [T/packages/icons-sprite/build.mjs](https://github.com/tabler/tabler-icons/blob/main/packages/icons-sprite/build.mjs)
- Tabler PNG/PDF/EPS packages call `convertIconsToImages(dir, format)`; CI installs `librsvg2-bin` (`rsvg-convert`) and runs a `check` script on the image packages — [T/packages/icons-png/build.mjs](https://github.com/tabler/tabler-icons/blob/main/packages/icons-png/build.mjs), [T/.github/workflows/build.yml](https://github.com/tabler/tabler-icons/blob/main/.github/workflows/build.yml)
- Tabler `@tabler/icons` publishes `icons/*`, `icons.json`, `tabler-nodes-outline.json`, `tabler-nodes-filled.json`, `categories/*` and `docs/*`, with exports `"./*": ["./icons/*"]` — [T/packages/icons/package.json](https://github.com/tabler/tabler-icons/blob/main/packages/icons/package.json)
- Tabler Figma plugin: Figma Community plugin 1169807996149376642 — [T/docs/icons/figma.mdx](https://github.com/tabler/tabler-icons/blob/main/docs/icons/figma.mdx)
- Tabler sync workflow: on push to main touching `icons/**`, it copies `icons/` to an orphan `icons` branch and tags `icons-v<version>` for CDN use — [T/.github/workflows/sync-icons.yml](https://github.com/tabler/tabler-icons/blob/main/.github/workflows/sync-icons.yml)
- Phosphor web: per-weight folders (`src/<weight>/Phosphor-<Weight>.{svg,ttf,woff,woff2}`, `selection.json`, `style.css`). Exports are `./regular`, `./bold`, etc., mapped to CSS. The CSS uses ligatures and `.ph` classes, and duotone uses both `:before` and `:after`. `scripts/icomoon.ts` builds an IcoMoon project from core SVGs (duotone colors and opacity 0.2) — [PW/package.json](https://github.com/phosphor-icons/web/blob/main/package.json), [PW/src/regular/style.css](https://github.com/phosphor-icons/web/blob/main/src/regular/style.css), [PW/scripts/icomoon.ts](https://github.com/phosphor-icons/web/blob/main/scripts/icomoon.ts)
- Phosphor's README warns that loading all weights pulls in ~3 MB of fonts and CSS, and points to `@phosphor-icons/pack` for subsetting — [PW/README.md](https://github.com/phosphor-icons/web/blob/main/README.md)
- Phosphor core `collate.ts` accepts `svg` or `png` input and a `raw|flat` mode, which implies a Figma export → collate → `raw/` and `assets/` flow — [PC/scripts/collate.ts](https://github.com/phosphor-icons/core/blob/main/scripts/collate.ts)

### Inferences

- Stroke-based sets must outline strokes before font generation. Lucide uses oslllo-svg-fixer and Tabler uses unstroke. That outlining step is required for nubo-icons if it is stroke-based.
- Tabler's single-source Figma flow runs: designers export to `new/`, `pnpm import` normalizes, then validation runs. That is a pragmatic manual pipeline. Phosphor appears to maintain the reverse direction, generating the Figma library from code (`figma-library-generator`).

### Gaps

- I did not read the Lucide Figma plugin repo or Phosphor's `figma` / `figma-library-generator` internals. Whether Lucide's Figma plugin lives in a separate repo was not verified.
- Lucide's sprite format (symbol IDs) was not read.

---

## 6. CI/CD: PR checks, icon preview comments, release automation, provenance, versioning

### Takeaway

- **Lucide:** auto-releases a new **minor** version whenever icon SVGs have changed since the last tag. A daily cron or a push to main triggers it, behind a GitHub Environment approval gate. Every package is published at the same version through a matrix job, with npm OIDC provenance. Current versions are 1.x (1.54.0 on 2026-10-09).
- **Tabler:** uses Changesets with a fixed version group, and an auto-generated changeset turns any new icon into a minor bump. A "Release" PR publishes on merge, using npm trusted publishing (OIDC).
- **Phosphor:** minimal CI (test+build on push) and manual publishing.

### Cited Findings

**Lucide**

- `ci.yml` triggers on push to main touching `icons/*.svg`, a daily cron (`0 6 * * *`), or `workflow_dispatch` (version plus npm tag latest/next/beta/alpha). Its jobs:
  - a `release-gate` job running in an environment ("Icon Release" / "Icon Release Gated");
  - finding the latest `^\d+\.\d+\.\d+$` tag and skipping if `git diff` shows no `icons/*.svg` changes;
  - computing `semver -i minor` and creating a GitHub Release with `generate_release_notes`;
  - calling the reusable `release.yml`;
  - dispatching `post_release` to a separate `lucide-icons/post-release` repo.
    Source: [L/.github/workflows/ci.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/ci.yml)
- `release.yml` is restricted to actors ericfennis, karsa-mistmere and jguddas. It runs a matrix over packages: `pnpm version <v> --filter <pkg> --no-git-tag-version` → build → test → `pnpm publish --access public --no-git-checks --ignore-scripts --tag <tag>` with `NPM_CONFIG_PROVENANCE: true` and `id-token: write`. Package versions in git stay at `0.0.1`, and the real version is injected at release time — [L/.github/workflows/release.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/release.yml), [L/packages/lucide-react/package.json](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/package.json)
- Version history: tags `v0.x` ran to `v0.265.0`; un-prefixed tags `1.x` now run to `1.54.0`. npm `lucide-react@1.54.0` was published 2026-10-09 — [git ls-remote of lucide-icons/lucide](https://github.com/lucide-icons/lucide/tags), [npm registry lucide-react](https://registry.npmjs.org/lucide-react)
- Per-package PR workflows (e.g. `lucide-react.yml`) are path-filtered and run build, test, integration (Playwright Chromium against `integrations/lucide-react/*`) and typecheck — [L/.github/workflows/lucide-react.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/lucide-react.yml)
- Icon PR checks (`linting-icons.yml`): filename lint on changed files via `tj-actions/changed-files`, lab-icon duplicate check, and alias uniqueness — [L/.github/workflows/linting-icons.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/linting-icons.yml)
- The visual preview comment uses a two-workflow split. The unprivileged `pull-request-icon-preview.yml` generates markdown and uploads it as an artifact; `comment-icon-preview.yml` (`workflow_run`) posts it. Image URLs are `https://lucide.dev/api/gh-icon/<base64-svg>.svg`, and links open the icon in `studio.lucide.dev` — [L/.github/workflows/pull-request-icon-preview.yml](https://github.com/lucide-icons/lucide/blob/main/.github/workflows/pull-request-icon-preview.yml), [L/scripts/generateChangedIconsCommentMarkup.mts](https://github.com/lucide-icons/lucide/blob/main/scripts/generateChangedIconsCommentMarkup.mts)
- Other workflows: `lint-pr-title.yml`, `labeler.yml`, `close-stale-prs.yml`, `close-issue-with-banned-phrases.yml`, `request-review.yml`, `docs.yml`, `release-lab.yml`, `lucide-font.yml` — [L/.github/workflows](https://github.com/lucide-icons/lucide/tree/main/.github/workflows)

**Tabler**

- `release.yml` (push to main):
  1. `node .build/release-changeset.mjs` adds a changeset for unreleased new icons;
  2. `changesets/action@v1` runs with `version: pnpm run version-packages` and `publish: pnpm run release` (`build:packages && changeset publish`);
  3. the release PR body is replaced with generated release notes plus a new-icons preview image;
  4. a GitHub release `v<version>` is created with a zip of SVG/PNG/PDF/EPS/webfont files.
     npm trusted publishing (OIDC) requires npm ≥11.5.1, so the workflow installs `npm@11` — [T/.github/workflows/release.yml](https://github.com/tabler/tabler-icons/blob/main/.github/workflows/release.yml)
- `.changeset/config.json`: `"fixed": [["@tabler/icons*"]]` (one shared version), `@changesets/changelog-github`, `access: public` — [T/.changeset/config.json](https://github.com/tabler/tabler-icons/blob/main/.changeset/config.json)
- Current version 3.49.0 (`@tabler/icons-react` published 2026-10-05) — [npm registry @tabler/icons-react](https://registry.npmjs.org/@tabler/icons-react)
- `build.yml` (PR and main): lint, format check, type-check build scripts, `node --test` build scripts, build with `ICONS_LIMIT=100`, check image packages, then `turbo run test` for packages plus `test-react-rsc` and `test-react-types`. The Turbo cache is persisted via `actions/cache` — [T/.github/workflows/build.yml](https://github.com/tabler/tabler-icons/blob/main/.github/workflows/build.yml)
- `validate-pr.yml` runs in the unprivileged `pull_request` context. It runs `pnpm validate` and `generate-icons-comment` into markdown artifacts, and `validate-pr-comment.yml` posts them (same split pattern as Lucide) — [T/.github/workflows/validate-pr.yml](https://github.com/tabler/tabler-icons/blob/main/.github/workflows/validate-pr.yml)

**Phosphor**

- React CI: on push, Node 18 + pnpm 8, `pnpm test` then `pnpm build`. There is no publish workflow in the repo — [PR/.github/workflows/main.yml](https://github.com/phosphor-icons/react/blob/main/.github/workflows/main.yml)
- npm latest versions:
  - `@phosphor-icons/react` 2.1.10 (2025-05-22)
  - `@phosphor-icons/core` 2.1.1 (2024-03-29)
  - `@phosphor-icons/vue` 2.2.1 (2024-04-05)
  - `@phosphor-icons/web` 2.1.2 (2025-03-31)
  - `@phosphor-icons/webcomponents` 2.1.5 (2024-06-29)
  - `phosphor-react-native` 3.0.6 (2026-04-23)

  Source: [npm registry](https://registry.npmjs.org/@phosphor-icons/react)

### Inferences

- Lucide's "icons changed → auto minor" combined with Tabler's "new icon → auto changeset minor" suggests a rule for nubo-icons: icon additions bump minor, code fixes bump patch, and API breaks bump major. Lucide's v1 and Tabler's v3 show majors are reserved for API and packaging breaks.
- Both large projects use the safe fork-PR pattern: run untrusted code in `pull_request` and upload an artifact, then comment from a privileged `workflow_run`. nubo-icons should copy this.
- Because Phosphor publishes manually, its npm versions are inconsistent across packages.

### Gaps

- The contents of Lucide's `post-release` repo, which is private or not inspected, are unknown.

---

## 7. Testing (snapshots, a11y, bundle size, integration)

### Takeaway

- **Lucide:** Vitest + Testing Library + `jest-serializer-html` snapshot tests per package, plus tests for directives, context, DynamicIcon and aliases, and Playwright-backed integration apps for Next.js, Vite, React Router and TanStack. Bundle-size visibility comes from `rollup-plugin-visualizer` stats, not a CI size gate.
- **Tabler:** Vitest with `--typecheck` per package, `@arethetypeswrong/cli` (`attw`) import checks, RSC and types test apps, and `node --test` for the build scripts.
- **Phosphor:** a single Vitest/jsdom test file per repo.

### Cited Findings

- Lucide React tests: `Icon.spec.tsx`, `createLucideIcon.spec.tsx`, `DynamicIcon.spec.tsx`, `context.spec.tsx`, `directives.spec.ts` (checks `'use client'`), `dynamicImports.spec.tsx`, `lucide-react.spec.tsx`, plus `__snapshots__/`; devDeps `jest-serializer-html`, `@testing-library/react`, `@testing-library/jest-dom` — [L/packages/lucide-react/tests](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react/tests), [L/packages/lucide-react/package.json](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/package.json)
- Lucide root `test:update` runs `vitest -u` across packages (snapshot updates); `test:font` unit-tests font codepoint allocation — [L/package.json](https://github.com/lucide-icons/lucide/blob/main/package.json)
- Lucide a11y: since v1, `aria-hidden="true"` is the default unless an aria-label/title is passed (`hasA11yProp`) — [L/docs/guide/version-1.md](https://github.com/lucide-icons/lucide/blob/main/docs/guide/version-1.md), [L/packages/lucide-react/src/Icon.ts](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/src/Icon.ts)
- Lucide spelling lint runs cspell over metadata JSON — [L/scripts/lintSpelling.mts](https://github.com/lucide-icons/lucide/blob/main/scripts/lintSpelling.mts)
- Tabler React `test.spec.tsx` asserts width/stroke/stroke-width/fill for outline vs filled icons and the class names. Packages run `vitest run --typecheck` and `imports-check: attw $(npm pack)` — [T/packages/icons-react/test.spec.tsx](https://github.com/tabler/tabler-icons/blob/main/packages/icons-react/test.spec.tsx), [T/packages/icons-react/package.json](https://github.com/tabler/tabler-icons/blob/main/packages/icons-react/package.json)
- Both Lucide and Tabler emit `stats/<pkg>.html` bundle visualizations with `rollup-plugin-visualizer` — [L/tools/rollup-plugins/plugins.js](https://github.com/lucide-icons/lucide/blob/main/tools/rollup-plugins/plugins.js), [T/.build/rollup-plugins.mjs](https://github.com/tabler/tabler-icons/blob/main/.build/rollup-plugins.mjs)
- Phosphor react: `test/index.test.tsx`, vitest `environment: "jsdom"` — [PR/vite.config.ts](https://github.com/phosphor-icons/react/blob/main/vite.config.ts)

### Inferences

- None of the three has a hard bundle-size budget in CI. For nubo-icons, adding `size-limit` or a tree-shaking test (import one icon, assert output < N KB) would go beyond all three.

### Gaps

- I did not verify whether Lucide or Tabler run a dedicated a11y test (axe). None was seen in the files inspected.

---

## 8. Package naming, exports maps, sideEffects, types

### Takeaway

All main framework packages declare `"sideEffects": false`. Lucide's React package still relies on `main`/`module`/`typings` without an `exports` map so that deep imports keep working. Other Lucide packages (`@lucide/icons`, react-native, solid, svelte) use rich conditional `exports`. Tabler uses `main`/`module`/`types` with `.cjs`/`.mjs`. Phosphor React has the most elaborate `exports` map (csr/ssr/lib subpaths plus a `./*` per-icon wildcard).

### Cited Findings

- `lucide-react`: `main: dist/cjs/lucide-react.js`, `module: dist/esm/lucide-react.mjs`, `typings: dist/lucide-react.d.ts`, `sideEffects: false`, `files` includes root `dynamic.*` and `dynamicIconImports.*`; peerDep `react ^16.5.1 || ^17 || ^18 || ^19` — [L/packages/lucide-react/package.json](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/package.json)
- `@lucide/icons` exports `"."` (`types`/`import` `.mjs`/`require` `.cjs`) and `"./icons/*"`; `@lucide/svelte` exports `"."` and `"./context"` with a `svelte` condition; `lucide-solid`/`@lucide/solid` add a `"solid": "./dist/source/lucide-solid.jsx"` condition; `lucide-react-native` adds a `"react-native"` condition; `@lucide/astro` exports raw `.ts` (`"./icons/*": "./src/icons/*.ts"`) — read from each `packages/*/package.json` — [L/packages](https://github.com/lucide-icons/lucide/tree/main/packages)
- Lucide naming: unscoped legacy names (`lucide`, `lucide-react`, `lucide-preact`, `lucide-solid`, `lucide-static`, `lucide-react-native`) alongside new scoped `@lucide/*` names. In v1 `lucide-vue-next` was renamed `@lucide/vue`, and `@lucide/angular` replaced `lucide-angular`, which is still on npm at 1.0.0 (2026-03-23) — [L/docs/guide/version-1.md](https://github.com/lucide-icons/lucide/blob/main/docs/guide/version-1.md), [npm lucide-angular](https://registry.npmjs.org/lucide-angular)
- Tabler: all scoped `@tabler/icons-<target>`; React `main ./dist/cjs/tabler-icons-react.cjs`, `module ./dist/esm/tabler-icons-react.mjs`, `types ./dist/tabler-icons-react.d.ts`, `sideEffects: false`, `files: ["dist"]`, dependency on `@tabler/icons` (`workspace:`) — [T/packages/icons-react/package.json](https://github.com/tabler/tabler-icons/blob/main/packages/icons-react/package.json)
- Phosphor React exports: `"."`, `"./ssr"`, `"./lib"`, `"./dist/csr/*"`, `"./dist/ssr/*"`, `"./dist/lib/*"`, `"./dist/icons/*"`, `"./package.json"`, and `"./*"` → `./dist/csr/*.es.js`. Every `require` condition falls back to `./dist/index.cjs.js`, so CJS has no per-icon subpath. `"type": "module"`, `sideEffects: false` — [PR/package.json](https://github.com/phosphor-icons/react/blob/main/package.json)
- Phosphor core exports `"."` plus `./assets/<weight>/*.svg` and short `./<weight>/*.svg` aliases — [PC/package.json](https://github.com/phosphor-icons/core/blob/main/package.json)
- Phosphor web exports `./<weight>` → CSS and `./*` → `./src/*` — [PW/package.json](https://github.com/phosphor-icons/web/blob/main/package.json)
- Licenses: Lucide ISC (Rollup banner pulls `pkg.license`); Tabler MIT; Phosphor MIT — [L/packages/lucide-react/package.json](https://github.com/lucide-icons/lucide/blob/main/packages/lucide-react/package.json), [T/packages/icons-react/package.json](https://github.com/tabler/tabler-icons/blob/main/packages/icons-react/package.json), [PC/package.json](https://github.com/phosphor-icons/core/blob/main/package.json)

### Inferences

- A clean target for nubo-icons:
  - scoped `@nubo-icons/<framework>`;
  - an `exports` map with `types`/`import`/`require`/`default`, a `./icons/*` per-icon subpath, and a `./dynamic` subpath;
  - framework conditions (`svelte`, `solid`, `react-native`) where needed;
  - `sideEffects: false`;
  - checked with `attw` the way Tabler does.
- Lucide's choice to keep the React package without `exports` looks like a compatibility decision for deep imports (`lucide-react/dist/esm/icons/x`). New projects don't carry that legacy.

### Gaps

- I did not unpack published tarballs from unpkg to confirm the final file layouts. The layouts above are inferred from Rollup and Vite configs.
