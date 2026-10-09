# Repo architecture of open-source icon sets and distribution (Heroicons, Radix, Iconoir, Remix, Material, Fluent, Octicons, Simple Icons, Iconify)

Method: I read the repos directly via the GitHub git-trees API and raw.githubusercontent.com (HEAD of the default branch, fetched 2026-10-09), plus the npm registry `/latest` metadata. Versions observed: heroicons 2.2.0, @radix-ui/react-icons 1.3.2, iconoir 7.12.1, remixicon 4.9.1, @primer/octicons 19.40.0, simple-icons 16.34.0, @fluentui/react-icons 2.0.344 / svg-icons 1.1.344, @iconify/json 2.2.541, unplugin-icons 24.0.0. URLs below use `blob/HEAD`, so they point at whatever is current on the default branch.

## 1. Repo layout, source of truth, naming, size variants

### Takeaway

The sets fall into three tiers. **Simple:** SVG files in the repo are the source (Heroicons, Iconoir, Remix, Simple Icons). **Figma-sourced:** a script or plugin exports from Figma into the repo (Radix, Octicons). **Upstream-generated:** the public repo is an output of a private pipeline and does not accept icon PRs (Material, and largely Fluent and Iconify). Sizes are expressed three ways: as directories (Heroicons `24/outline`), as filename suffixes (Octicons `name-16.svg`, Fluent `ic_fluent_add_24_regular.svg`), or by a single grid (Radix 15, Simple Icons 24, Remix 24).

### Cited Findings

**Heroicons (simplest monorepo)**

- Top level: `src/{16,20,24}/…` (raw SVGs), `optimized/{16/solid,20/solid,24/outline,24/solid}` (SVGO output, committed), `react/`, `vue/` (package folders inside the same repo), `scripts/` (build.js, verify-names.js, deprecated.js, release-channel.js, release-notes.js), and one SVGO config per style: `svgo.16.solid.mjs`, `svgo.20.solid.mjs`, `svgo.24.outline.mjs`, `svgo.24.solid.mjs` — [repo tree](https://github.com/tailwindlabs/heroicons)
- Four styles: 24 outline, 24 solid, 20 solid ("mini") and 16 solid ("micro"). They import from `@heroicons/react/24/outline`, `/24/solid`, `/20/solid` and `/16/solid` — [README](https://github.com/tailwindlabs/heroicons/blob/HEAD/README.md); [verify-names.js](https://github.com/tailwindlabs/heroicons/blob/HEAD/scripts/verify-names.js) maps `micro: src/16/solid`, `mini: src/20/solid`, `solid: src/24/solid`, `outline: src/24/outline`.
- Names are kebab-case filenames (e.g. `arrow-down-on-square-stack.svg`). The build turns each into a PascalCase name with an `Icon` suffix: `camelcase(file, {pascalCase:true}) + 'Icon'` — [scripts/build.js](https://github.com/tailwindlabs/heroicons/blob/HEAD/scripts/build.js)

**Radix Icons (Figma as the source of truth)**

- A pnpm workspace with `packages/radix-icons` (published as `@radix-ui/react-icons`) and `packages/generate-icon-lib` (private, uses `figma-js`, `svgo`, `ejs`, `cheerio`, `ink`) — [generate-icon-lib/package.json](https://github.com/radix-ui/icons/blob/HEAD/packages/generate-icon-lib/package.json)
- `generate-src` runs `generate-icon-lib --file=uvCPWGs49VP4oslkOtVcCu`, which pulls from the Figma file ID, moves `icons/15/*` into `icons/` and zips them into `radix-icons.zip`, committed at the repo root — [radix-icons/package.json](https://github.com/radix-ui/icons/blob/HEAD/packages/radix-icons/package.json). CONTRIBUTING says: "if any changes were made to the community Figma file, generate new icons" with `pnpm icons:generate` — [CONTRIBUTING](https://github.com/radix-ui/icons/blob/HEAD/.github/CONTRIBUTING.md)
- Single 15×15 grid ("A crisp set of 15×15 icons designed by the WorkOS team") — [README](https://github.com/radix-ui/icons/blob/HEAD/README.md)

**Iconoir**

- `icons/regular/*.svg` and `icons/solid/*.svg` are the source. The repo also holds `packages/iconoir-{react,react-native,vue,solid-js,flutter}`, `css/`, `bin/build/` (the build orchestrator plus worker and targets), `examples/`, and the `iconoir.com/` website — [repo tree](https://github.com/iconoir-icons/iconoir)
- NAMING_CONVENTION.md sets the pattern `[Object]-[Modifier]-[Container]` (e.g. `user-minus` vs `minus-square`). Names are object-oriented, not actions (`user-minus` is right, `remove-user` is wrong), with an exception for physical actions (`walking`). It lists the common modifiers `-plus -minus -warning -check -xmark -tag -ban -slash -plus-in -no-access` and the containers `-square -circle`. Solid variants take a `-solid` suffix — [NAMING_CONVENTION.md](https://github.com/iconoir-icons/iconoir/blob/HEAD/NAMING_CONVENTION.md)

**Remix Icon**

- Category folders with human names: `icons/Arrows`, `icons/System` (348 files), `icons/Logos` (300), `icons/User & Faces`, etc. There are 20 categories and about 3,200 SVGs. A root `tags.json` holds search keywords, and `fonts/` holds the committed font build (css/eot/ttf/woff/woff2/less/scss/styl plus `remixicon.glyph.json`) — [repo tree](https://github.com/Remix-Design/RemixIcon)
- Styles come in `-line` / `-fill` pairs. The CSS classes use the `ri-` prefix (`ri-admin-fill`), the React components the `Ri` prefix (`RiHeartFill`) — [README](https://github.com/Remix-Design/RemixIcon/blob/HEAD/README.md)

**Octicons (GitHub)**

- A flat `icons/` directory where the filename encodes the size: `accessibility-16.svg`, `accessibility-24.svg`. The build rejects any file that doesn't match `/(.+)-([0-9]+).svg$/`, and checks that the filename height equals the `height` attribute and that `viewBox` is `0 0 W H` matching width and height — [script/build.ts](https://github.com/primer/octicons/blob/HEAD/script/build.ts)
- Metadata files: `keywords.json` (name → keyword array) and `icon-metadata.json` (aliases, deprecation, `defaultHeight`, and **protectedGeometry**, which stores SHA-256 fingerprints so a rename can't silently change a glyph). Example: `triangle-circle` has alias `play` at heights [16, 24]; `bookmark-filled` is a deprecated alias of `bookmark-fill` — [icon-metadata.json](https://github.com/primer/octicons/blob/HEAD/icon-metadata.json)
- Figma is the design source. Staff use the "Octicons Push" Figma plugin, which exports, commits and pushes selected 16×16 or 24×24 frames to a branch. The 16px component carries the bare name; other sizes add a numeric suffix (`issue-opened-24`) — [CONTRIBUTING](https://github.com/primer/octicons/blob/HEAD/CONTRIBUTING.md); [add-octicon-checklist](https://github.com/primer/octicons/blob/HEAD/docs/add-octicon-checklist.md)
- `lib/` holds every distribution: `octicons_node`, `octicons_react`, `octicons-react-symbols`, `octicons_styled`, `octicons_gem`, `octicons_helper` (Rails), `octicons_jekyll` — [repo tree](https://github.com/primer/octicons)

**Fluent System Icons (Microsoft)**

- `assets/<Human Name>/` holds about 1,442 concept folders, e.g. `assets/Add/`. Each contains `SVG/` and `PDF/` subfolders and a `metadata.json`. The filename pattern is `ic_fluent_{name}_{size}_{style}.svg`, e.g. `ic_fluent_add_12_filled.svg` … `ic_fluent_add_48_regular.svg`, plus `ic_fluent_add_32_light.svg` — [assets/Add](https://github.com/microsoft/fluentui-system-icons/tree/HEAD/assets/Add)
- Example `metadata.json`: `{"name":"Add","size":[28,24,20,16,12,32,48],"style":["Regular","Filled","Light"],"keyword":"fluent-icon","description":"…","metaphor":["plus","addition","new"]}`. The README documents a `directionType` of `unique` or `mirror` for RTL handling, and a `singleton` default direction — [metadata.json](https://github.com/microsoft/fluentui-system-icons/blob/HEAD/assets/Add/metadata.json); [README](https://github.com/microsoft/fluentui-system-icons/blob/HEAD/README.md)
- Native platforms are first-class: `android/`, `ios/`, `flutter`, `Package.swift`, `FluentIcons.podspec`, plus an `importer/` that generates the Android and iOS libraries from `assets/` — [README](https://github.com/microsoft/fluentui-system-icons/blob/HEAD/README.md)

**Material Symbols / Material Icons (Google)**

- The repo is a generated mirror. Material Icons (the classic set, "no longer updated" since 2022) lives in `android/ ios/ png/ src/ font/`; Material Symbols lives in `symbols/` and `variablefont/` — [README](https://github.com/google/material-design-icons/blob/HEAD/README.md). The tree is very large: more than 47k entries in the git-trees response, which was truncated, with about 45 files per icon folder under android.
- Material Symbols were designed variable-font-first, in three fonts (Outlined, Rounded, Sharp) with four axes: opsz 20–48, weight 100–700, grade −50 to 200, and fill 0–100. Only the 20 and 24px versions are pixel-grid-aligned — [README](https://github.com/google/material-design-icons/blob/HEAD/README.md)

**Simple Icons (brand icons)**

- `icons/<slug>.svg` (a single 24×24 path per icon), with all metadata in **one JSON file**, `data/simple-icons.json`, validated by `.jsonschema.json`. Generated files (`slugs.md`, `sdk.d.ts`) are built at release, and CI fails any PR that edits them — [repo tree](https://github.com/simple-icons/simple-icons); [verify.yml](https://github.com/simple-icons/simple-icons/blob/HEAD/.github/workflows/verify.yml)
- The schema requires `title`, `hex` and `source`. Optional fields: `slug`, `guidelines`, `aliases{aka,dup,loc,old}` and `license` (an SPDX id, or `custom` plus a URL). The hex pattern is `^[0-9A-F]{6}$`, the slug pattern is `^[a-z0-9]+(_[a-z0-9]+)?$`, URLs must be https-only, and `aliases.old` exists "for backwards compatibility" — [.jsonschema.json](https://github.com/simple-icons/simple-icons/blob/HEAD/.jsonschema.json)
- Filenames are lowercase, latin-only and space-free (`Adobe Photoshop` → `adobephotoshop.svg`; `Citroën` → `citroen.svg`), and the helper `npm run get-filename -- "Brand"` produces them — [CONTRIBUTING](https://github.com/simple-icons/simple-icons/blob/HEAD/CONTRIBUTING.md)

### Inferences

- For nubo-icons, the Heroicons layout of `src/` → `optimized/` → per-framework folders is the smallest workable shape. Octicons' size-in-filename with build-time validation, plus `icon-metadata.json` for aliases and deprecations, is the best pattern for managing renames.
- Per-icon `metadata.json` (Fluent) scales better for many contributors than one big JSON file (Simple Icons), but one file is easier to lint for ordering and duplicates.

### Gaps

- I did not confirm whether Heroicons' `src/` SVGs are exported from Figma by a script; the repo shows only the committed SVGs. The Fluent `packages/` directory listing could not be enumerated because the GitHub API rate limit was hit (the tree response was truncated). The package names were confirmed through npm and the CONTRIBUTING scopes instead.

## 2. Build: SVGO config, codegen, bundlers, ESM/CJS, tree-shaking, types, exports maps

### Takeaway

Every project runs SVGO and then generates **one module per icon** plus a barrel `index`. They differ in tooling. Heroicons uses a 250-line Node script (SVGR + Babel + the Vue compiler, writing CJS and ESM side by side with hand-written `.d.ts` files). Iconoir uses a multi-target worker-pool build. Octicons, Radix and Fluent use tsc, rolldown or nx with full conditional `exports` maps.

### Cited Findings

- **Heroicons SVGO**: `preset-default`, `removeDimensions`, `sortAttrs`, `cleanupListOfValues`. Outline strips `stroke` and `path:stroke-width`, then adds `stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"`. Solid strips `fill` and adds `fill="currentColor" aria-hidden data-slot="icon"` — [svgo.24.outline.mjs](https://github.com/tailwindlabs/heroicons/blob/HEAD/svgo.24.outline.mjs); [svgo.20.solid.mjs](https://github.com/tailwindlabs/heroicons/blob/HEAD/svgo.20.solid.mjs)
- **Heroicons codegen**: `@svgr/core` with `{ref:true, titleProp:true}`, then Babel JSX transform, then a `/*#__PURE__*/` annotation on `React.forwardRef`. CJS is made by regex-rewriting the ESM output. Each style gets `esm/` with `{"type":"module","sideEffects":false}` and a CJS folder with `{"module":"./esm/index.js","sideEffects":false}`. Each icon gets a hand-written `.d.ts` (a `ForwardRefExoticComponent<SVGProps & {title?, titleId?}>`). Deprecated icons get a `/** @deprecated */` JSDoc from the list in `scripts/deprecated.js`. Vue components are compiled with `@vue/compiler-dom` into render functions — [scripts/build.js](https://github.com/tailwindlabs/heroicons/blob/HEAD/scripts/build.js)
- **Heroicons exports map** is generated by the script. It includes `./24/outline`, the `./24/outline/*` wildcard, `./24/outline/*.js` (types/import/require), `./package.json`, and v1 back-compat entries `./outline` and `./solid` that point to a proxy which prints an error message. Root `.` exists "to appease Vite's optimizeDeps". `peerDependencies: react >= 16 || ^19.0.0-rc` — [react/package.json](https://github.com/tailwindlabs/heroicons/blob/HEAD/react/package.json); [build.js](https://github.com/tailwindlabs/heroicons/blob/HEAD/scripts/build.js)
- The root `heroicons` npm package ships only the optimized SVG dirs `16/ 20/ 24/` (`"files": ["16/","20/","24/",…]`) — [package.json](https://github.com/tailwindlabs/heroicons/blob/HEAD/package.json)
- **Radix**: `tsc` builds ESM, then `tsc -p tsconfig.cjs.json` builds CJS. In development, `exports` points at `./src/*.tsx`; at publish time a `publishConfig.exports` override points at `dist/`. It exports `./icons/*.svg` raw files and has `sideEffects:false`. Note: the published CJS types path is spelled `./dist/csj/index.d.ts`, an apparent typo for `cjs` — [radix-icons/package.json](https://github.com/radix-ui/icons/blob/HEAD/packages/radix-icons/package.json)
- **Iconoir**: `bin/build/index.js` uses `listr2` and a `tinypool` worker pool to build these targets: `css`, `flutter`, `react`, `react-native` (react target with `native:true`), `solid-js` and `vue`. You can build a subset with `pnpm run build react vue`. The Vue target (Vite/Rollup) needs `maxOldGenerationSizeMb: 8192`. Names are produced in pascal and snake case, with and without the variant, via `scule` — [bin/build/index.js](https://github.com/iconoir-icons/iconoir/blob/HEAD/bin/build/index.js). Devdeps include `@svgr/core`, `esbuild`, `vite`, `vite-plugin-dts`, `vite-plugin-solid` and `hast-util-*` — [package.json](https://github.com/iconoir-icons/iconoir/blob/HEAD/package.json)
- **Iconoir exports**: the root package maps `./icons/*.svg` → regular, `./icons/*-solid.svg` → solid, and `./css/*.css`. `iconoir-react` exports `.`, `./regular` and `./solid` (ESM `.mjs` and CJS) — [package.json](https://github.com/iconoir-icons/iconoir/blob/HEAD/package.json); [iconoir-react/package.json](https://github.com/iconoir-icons/iconoir/blob/HEAD/packages/iconoir-react/package.json)
- **Octicons SVGO**: multipass, `preset-default` with `removeViewBox:false`, `removeStyleElement`, and `removeAttrs` for `xmlns:xlink, id, class, data-name, fill, transform, href, clip-path, clip-rule` — [svgo.config.mts](https://github.com/primer/octicons/blob/HEAD/svgo.config.mts). The root build turns all SVGs plus keywords plus metadata into one `lib/build/data.json` (name → heights → {width, path, ast}) and copies SVGs, including alias copies, to `lib/build/svg`. Every framework package consumes that intermediate — [script/build.ts](https://github.com/primer/octicons/blob/HEAD/script/build.ts)
- **@primer/octicons-react** uses rolldown, `.mjs` and `.umd.cjs`, split `.d.mts`/`.d.cts` types, a `./*` per-icon subpath export, and `publint --strict`. Its tests include `tree-shaking.test.ts`, `codesplitting.test.ts` and a public-API snapshot test — [octicons_react/package.json](https://github.com/primer/octicons/blob/HEAD/lib/octicons_react/package.json); [repo tree](https://github.com/primer/octicons/tree/HEAD/lib/octicons_react)
- **Simple Icons SVGO** is aggressive: multipass, `floatPrecision: 3`, `mergePaths{force:true}` ("Compound all paths into one"), `convertShapeToPath{convertArcs:true}`, `noSpaceAfterFlags:false` ("Some editors (e.g. Adobe Illustrator and Sketch) cannot parse flags without space wrapping"), and it strips all `svg` attributes except role, viewBox and xmlns, then adds `role="img"` — [svgo.config.mjs](https://github.com/simple-icons/simple-icons/blob/HEAD/svgo.config.mjs). The package exports `.`, `./icons`, `./icons/*`, `./sdk` and `./icons.json` (with types) — [package.json](https://github.com/simple-icons/simple-icons/blob/HEAD/package.json)
- **Fluent react-icons** is an nx monorepo using yarn 4, svgo 4, `fantasticon` (patched, for fonts), `svgstore` (sprites), `subset-font`, `@griffel/react` (CSS-in-JS) and `monosize` (bundle-size tracking). Its exports map offers `./svg`, `./svg/*`, `./fonts`, `./fonts/*`, `./headless` and `./headless/fonts`, plus a custom `fluentIconFont` export condition that swaps the root entry to font-backed icons. `sideEffects` is limited to two CSS files — [root package.json](https://github.com/microsoft/fluentui-system-icons/blob/HEAD/package.json); [@fluentui/react-icons on npm](https://registry.npmjs.org/@fluentui/react-icons/latest)

### Inferences

- A good nubo-icons default: SVGO config per style, `currentColor` injection, `aria-hidden` plus a `data-slot` hook, per-icon ESM files, `sideEffects:false`, a generated `exports` map with `types` first, and a `publint`/`attw` check (Octicons uses publint; Fluent has `@arethetypeswrong/cli` in devDeps).
- Octicons' "one JSON intermediate feeds N framework builds" separates parsing from codegen better than Heroicons' approach of reading `optimized/` separately for each framework.

### Gaps

- I did not read the Fluent `convert.js`, the Iconoir per-target scripts in `bin/build/targets`, or the Radix generator internals in depth.

## 3. Distribution forms

### Takeaway

Distribution ranges from "raw SVGs plus React/Vue" (Heroicons) to "everything": npm per framework, Flutter on pub.dev, Maven, CocoaPods/SPM, Ruby gems, fonts, sprites and a Figma plugin (Fluent, Octicons, Iconoir). Icon fonts survive mainly as optional add-ons (Remix, Fluent's font-backed React mode, the separate `simple-icons-font` repo). Material is the exception: it is variable-font-first. Iconify mirrors all of these sets as JSON and is the de facto "free" distribution channel.

### Cited Findings

- **Heroicons**: `heroicons` (SVGs), `@heroicons/react` and `@heroicons/vue`. The README points to browsing names on UNPKG — [README](https://github.com/tailwindlabs/heroicons/blob/HEAD/README.md)
- **Iconoir**: npm packages `iconoir`, `iconoir-react`, `iconoir-react-native`, `iconoir-solid-js` and `@iconoir/vue`; pub.dev `iconoir_flutter`; CSS files `css/iconoir.css`, `iconoir-regular.css` and `iconoir-solid.css`; and `docs/framer.md` — [releases.mdc](https://github.com/iconoir-icons/iconoir/blob/HEAD/.cursor/rules/releases.mdc); [repo tree](https://github.com/iconoir-icons/iconoir)
- **Remix**: a webfont (`remixicon/fonts/remixicon.css`, also via the jsDelivr CDN), an SVG symbol sprite (`remixicon.symbol.svg` used with `<use xlink:href="…#ri-admin-fill">`), `@remixicon/react` and `@remixicon/vue` (both 4.9.0, published outside this repo), and an official Figma plugin — [README](https://github.com/Remix-Design/RemixIcon/blob/HEAD/README.md); [npm @remixicon/react](https://registry.npmjs.org/@remixicon/react/latest)
- **Material**: Google hosts fonts through the Google Fonts CSS API (`fonts.googleapis.com/css2?family=Material+Symbols+Outlined`). Google does **not** maintain npm packages past v3 (2016); the community packages `material-symbols`, `material-icons` and `@material-design-icons/{font,svg}` by @marella are "not monitored or vetted" by Google — [README](https://github.com/google/material-design-icons/blob/HEAD/README.md)
- **Fluent**: Maven `com.microsoft.design:fluent-system-icons`, CocoaPods `FluentIcons`, Carthage, Swift Package, Flutter `fluentui_system_icons`, `@fluentui/svg-icons`, `@fluentui/svg-sprites`, `@fluentui/react-icons` (SVG, font, and headless modes), `@fluentui/react-native-icons` and a webpack plugin — [README](https://github.com/microsoft/fluentui-system-icons/blob/HEAD/README.md); [CONTRIBUTING scopes](https://github.com/microsoft/fluentui-system-icons/blob/HEAD/CONTRIBUTING.md); [npm @fluentui/svg-sprites](https://registry.npmjs.org/@fluentui/svg-sprites/latest)
- **Octicons**: `@primer/octicons` (node, with `toSVG` and an `index.scss`), `@primer/octicons-react`, `@primer/octicons-react-symbols` ("Optimized React components for rendering Octicons with shared SVG symbols", 0.6.0), `@primer/styled-octicons`, plus the Ruby gems `octicons`, `octicons_helper` and `jekyll-octicons` — [CONTRIBUTING](https://github.com/primer/octicons/blob/HEAD/CONTRIBUTING.md); [npm](https://registry.npmjs.org/@primer/octicons-react-symbols/latest)
- **Why Octicons dropped the icon font (GitHub, Feb 22 2016)**:
  - Fonts rendered blurry on 1x displays, and subpixel text rendering made it worse.
  - Fonts caused a flash of unstyled content while loading.
  - Users who override fonts (e.g. for dyslexia) saw empty squares.
  - A font allowed only one 16px glyph per icon, while SVG allows a separate drawing per size.
  - Adding an icon is just dropping in an SVG.
  - SVG supports `alt` and accessible labels.
  - SVG can be animated.
  - Pageload performance showed no adverse effects, and dropping the font CSS removed bloat.
    — [GitHub Blog](https://github.blog/engineering/user-experience/delivering-octicons-with-svg/)
- **Simple Icons**: the npm `simple-icons` package (SVGs, JS objects, SDK, JSON), a separate `simple-icons-font` repo whose release is triggered by a dispatch from the main repo's publish workflow (npm `simple-icons-font` 16.34.0, versioned in lockstep), and a website repo (`simple-icons-website-rs`) that is also dispatch-triggered — [publish.yml](https://github.com/simple-icons/simple-icons/blob/HEAD/.github/workflows/publish.yml); [npm](https://registry.npmjs.org/simple-icons-font/latest). PHP Composer is supported via `composer.json` — [repo tree](https://github.com/simple-icons/simple-icons)
- **Iconify as a distribution layer**:
  - `@iconify/json` contains about 230 sets as `json/<prefix>.json`. It includes heroicons, `heroicons-outline`/`-solid` (legacy), radix-icons, iconoir, `ri` (Remix), material-symbols, material-symbols-light, fluent, octicon, simple-icons and many more. It is "automatically updated several times a week" — [icon-sets tree](https://github.com/iconify/icon-sets); [readme](https://github.com/iconify/icon-sets/blob/HEAD/readme.md)
  - The `IconifyJSON` format is `{prefix, icons:{name:{body,width,height,left,top,rotate,hFlip,vFlip,hidden}}, aliases:{name:{parent,…}}}`. Shared width and height move to the root object. `hidden:true` keeps removed icons resolvable "to prevent applications that rely on old icon from breaking" — [readme](https://github.com/iconify/icon-sets/blob/HEAD/readme.md)
  - Per-set packages `@iconify-json/<prefix>` exist (e.g. `@iconify-json/heroicons` 1.2.3 exports `./icons.json`, `./info.json` and `./metadata.json`) — [npm](https://registry.npmjs.org/@iconify-json/heroicons/latest)
  - The Tailwind 4 plugin `@iconify/tailwind4` is enabled with `@plugin "@iconify/tailwind4";`. Class syntax is `icon-[prefix--name]`, or `iconify prefix--name` once prefixes are configured. Icons render as a CSS mask (monochrome, takes `currentColor`) or, with `iconify-color`, as a background. An `icon-sets` option supports custom sets — [Iconify docs](https://iconify.design/docs/usage/css/tailwind/tailwind4/)
  - `unplugin-icons` compiles on demand imports like `~icons/{collection}/{icon}` for Vite, Webpack, Rollup, Rolldown, Rspack, esbuild and Nuxt. It has compilers for vue3, vue-vapor, jsx (React/Preact), solid, svelte, astro, qwik, ember, marko, web-components and raw. `autoInstall: true` pulls `@iconify-json/*` packages — [package.json](https://github.com/unplugin/unplugin-icons/blob/HEAD/package.json); [README](https://github.com/unplugin/unplugin-icons/blob/HEAD/README.md); [src/core/compilers](https://github.com/unplugin/unplugin-icons/tree/HEAD/src/core/compilers)
- **Figma distribution**: Radix (a community Figma file with a fixed file ID), Remix (an official plugin), Octicons (a library file plus the Octicons Push plugin) — sources above.

### Inferences

- Getting nubo-icons into Iconify (by opening an issue at iconify/icon-sets with a git or npm source that can be auto-downloaded) gives instant support for Tailwind, unplugin-icons, UnoCSS and other frameworks at almost no maintenance cost. This argues for shipping only SVG plus React (and maybe Vue) packages first.
- Fonts are a legacy or opt-in format. If nubo-icons ships one, keep it in a separate package or repo, triggered from the main release (the Simple Icons pattern).

### Gaps

- No Raycast or VS Code extensions were found in these repos. I didn't search their marketplaces, so I can't say whether official extensions exist. I also didn't fetch the Iconify page on adding custom sets via `icon-sets` in Tailwind.

## 4. Validation, CI, templates, releases, versioning

### Takeaway

Simple Icons is the gold standard for validation: svglint with about 13 custom path rules, a JSON schema, its own "ourlint" for ordering and URLs, and enforcement that generated files aren't edited by hand. Octicons adds geometry fingerprinting and auto-SVGO commits on PRs. Fluent adds cheap shell checks. Heroicons has almost no CI (build-only). Release automation runs from manual tags (Heroicons, Iconoir) through Changesets (Radix, Octicons) to a weekly bot release PR (Simple Icons).

### Cited Findings

- **Simple Icons svglint**:
  - A format regex requires exactly `<svg (3 attrs)><title>…</title><path d="…"/></svg>`.
  - Precision is 3 decimals, with 5 as the hard maximum.
  - Named rules: `icon-title` (the title must match a JSON entry and be correctly encoded), `icon-size` (the path bbox must be exactly 24 in one dimension), `icon-precision`, `ineffective-segments`, `collinear-segments`, `extraneous`, `negative-zeros`, `icon-centered`, `final-closepath`, `path-format`, `svg-format`, `simplifiable-numbers` and `spacing-consistency`.
    — [svglint.config.mjs](https://github.com/simple-icons/simple-icons/blob/HEAD/svglint.config.mjs)
- **Simple Icons lint chain**: `ourlint` (alphabetical order of the JSON, formatting, redundant trailing slashes in URLs, GitHub source URLs must contain a commit hash), `prettierlint`, `xo`, `jsonlint` (schema), `svglint`, `editorconfig-checker`, `tsc` and `rumdl` for markdown. CI lints only the changed SVGs and runs `lychee` link checks on docs — [package.json](https://github.com/simple-icons/simple-icons/blob/HEAD/package.json); [ourlint.js](https://github.com/simple-icons/simple-icons/blob/HEAD/scripts/lint/ourlint.js); [verify.yml](https://github.com/simple-icons/simple-icons/blob/HEAD/.github/workflows/verify.yml)
- **Simple Icons releases**:
  - A cron (Sunday 00:00) plus `workflow_dispatch` runs `simple-icons/release-action`, which opens a release PR.
  - A bot then bumps the version and regenerates the CDN URLs, SVG count, slugs table and SDK types on `develop`.
  - Merging to `master` publishes to npm via OIDC (`id-token: write`), creates a tag and GitHub release, posts to Discord, and dispatches the font and website repos.
    — [create-release.yml](https://github.com/simple-icons/simple-icons/blob/HEAD/.github/workflows/create-release.yml); [publish.yml](https://github.com/simple-icons/simple-icons/blob/HEAD/.github/workflows/publish.yml)
- **Simple Icons semver policy**: Major means removed icons, slug changes or breaking API changes. Minor means new icons, title changes or API changes. Patch means updated SVGs or metadata. Minor and patch releases ship weekly on Sundays. Majors come about every 6 months, mainly to remove icons. After a major, only the last version of the previous major gets bug fixes — [VERSIONING.md](https://github.com/simple-icons/simple-icons/blob/HEAD/VERSIONING.md)
- **Octicons**:
  - The `optimize.yml` workflow runs SVGO on changed icons in PRs and pushes, and auto-commits the result with `EndBug/add-and-commit`. It skips icons that are protected or alias-locked (`script/optimization-inputs.ts`).
  - Other workflows: `check_for_changeset.yml` (bypassed with a `skip changeset` label), `codeql`, `stale`, `add-to-inbox`.
  - `publish.yml` uses `changesets/action` to create a "Release Tracking" PR or publish to npm and RubyGems.
  - For a new icon, contributors select a `minor` bump for all four npm packages. `octicons-react-symbols` keeps an independent `0.x` line.
    — [optimize.yml](https://github.com/primer/octicons/blob/HEAD/.github/workflows/optimize.yml); [publish.yml](https://github.com/primer/octicons/blob/HEAD/.github/workflows/publish.yml); [CONTRIBUTING](https://github.com/primer/octicons/blob/HEAD/CONTRIBUTING.md)
- **Octicons rename rules**: "A name change must not silently replace an existing glyph." Old names live in `icon-metadata.json` as aliases. Aliasing is separate from deprecation. Figma components are renamed in place to keep node IDs stable. Protected geometry fingerprints make the build reject any change to the `play` glyph — [CONTRIBUTING](https://github.com/primer/octicons/blob/HEAD/CONTRIBUTING.md)
- **Octicons agent assets**: `AGENTS.md` and `.github/skills/icon-request-review/SKILL.md` (with references `request-triage.md`, `design-review.md` and `contribution-review.md`) guide AI review of icon PRs — [AGENTS.md](https://github.com/primer/octicons/blob/HEAD/AGENTS.md)
- **Fluent PR CI**:
  - Asset directory names are checked for trailing spaces (Windows safety).
  - Every non-`_color` SVG must contain `fill="#212121"`.
  - PR titles go through commitlint (Conventional Commits, also enforced locally by a Husky hook).
  - The iOS and Android libraries are built, and Gradle `assembleRelease` runs.
    — [pr.yml](https://github.com/microsoft/fluentui-system-icons/blob/HEAD/.github/workflows/pr.yml); [CONTRIBUTING](https://github.com/microsoft/fluentui-system-icons/blob/HEAD/CONTRIBUTING.md). Other workflows: `bump-version`, `bundle-size.baseline`, `cocoapods-publish`, `deploy-docsite`, `publish`, `publish-prerelease` — [repo tree](https://github.com/microsoft/fluentui-system-icons/tree/HEAD/.github/workflows)
- **Heroicons**:
  - CI only runs `npm run build`. `npm run lint` is just `verify-names.js`, which prints a table of icons missing from some style; it doesn't fail the build.
  - `release.yml` publishes three packages with `--provenance`. Every push to master publishes an **insiders** build, `0.0.0-insiders.<sha>`. A published GitHub release publishes to the channel computed by `release-channel.js`.
  - Version bumps are manual edits to three package.json files.
    — [CI.yml](https://github.com/tailwindlabs/heroicons/blob/HEAD/.github/workflows/CI.yml); [release.yml](https://github.com/tailwindlabs/heroicons/blob/HEAD/.github/workflows/release.yml); [CONTRIBUTING](https://github.com/tailwindlabs/heroicons/blob/HEAD/.github/CONTRIBUTING.md)
- **Heroicons deprecation**: deprecated icons stay in the package with a `@deprecated` JSDoc, so editors strike them through, rather than being removed — [scripts/deprecated.js](https://github.com/tailwindlabs/heroicons/blob/HEAD/scripts/deprecated.js); [build.js](https://github.com/tailwindlabs/heroicons/blob/HEAD/scripts/build.js)
- **Iconoir**:
  - CI runs ESLint on changed files and a React 19 build of the Next.js example.
  - A `v*` tag push builds everything, runs `prepublish-all` to bump versions, commits to main, force-moves the tag, then publishes each package idempotently: it skips any `name@version` already on npm, so re-pushing a tag retries only the missing packages.
  - It also publishes to pub.dev via OIDC.
  - Documented gotchas: pushes made with `GITHUB_TOKEN` don't trigger workflows, and granular npm tokens can't create new packages.
    — [release.yaml](https://github.com/iconoir-icons/iconoir/blob/HEAD/.github/workflows/release.yaml); [releases.mdc](https://github.com/iconoir-icons/iconoir/blob/HEAD/.cursor/rules/releases.mdc)
- **Radix**: Changesets. `bump:next` produces snapshot releases, and a push to the `stable` branch triggers `changesets/action` (version PR or publish) — [package.json](https://github.com/radix-ui/icons/blob/HEAD/package.json); [publish-stable.yml](https://github.com/radix-ui/icons/blob/HEAD/.github/workflows/publish-stable.yml). The PR template checklist:
  - Figma "Scale" constraints, components sorted Z–A, a single union or compound shape.
  - Exports at `width="15" height="15" viewBox="0 0 15 15"`.
  - No `stroke`, no `clip-path`, and no icon over 5 KB.
    — [PULL_REQUEST_TEMPLATE](https://github.com/radix-ui/icons/blob/HEAD/.github/PULL_REQUEST_TEMPLATE.md)
- **Remix**: the only workflow publishes to npm on a GitHub release, with `id-token: write` — [npm-publish.yml](https://github.com/Remix-Design/RemixIcon/blob/HEAD/.github/workflows/npm-publish.yml)
- **Material**: a weekly cron (Friday 02:00) runs `update/update_symbols.py` and commits "Update Symbols" straight to master — [main.yml](https://github.com/google/material-design-icons/blob/HEAD/.github/workflows/main.yml)
- **Issue templates**:
  - Simple Icons uses YAML issue forms (`icon_request.yml`, `icon_update.yml`, `icon_removal.yml`, `package.yml`, `documentation.yml`). The request form requires the brand name, website, a popularity metric (Traffic.cv top 500k), a forbidden-brands checkbox, a ToS link and official resources. Automation workflows auto-close issues, detect duplicates and add priority labels — [icon_request.yml](https://github.com/simple-icons/simple-icons/blob/HEAD/.github/ISSUE_TEMPLATE/icon_request.yml); [repo tree](https://github.com/simple-icons/simple-icons/tree/HEAD/.github/workflows)
  - Iconoir's and Remix's markdown templates ask for the icon name, use case, screenshots of similar icons, and (Remix) tags — [Iconoir](https://github.com/iconoir-icons/iconoir/blob/HEAD/.github/ISSUE_TEMPLATE/icon_request.md); [Remix](https://github.com/Remix-Design/RemixIcon/blob/HEAD/.github/ISSUE_TEMPLATE/icon-request.md)
  - Heroicons disables blank issues and sends icon suggestions to GitHub Discussions ("ideas") — [config.yml](https://github.com/tailwindlabs/heroicons/blob/HEAD/.github/ISSUE_TEMPLATE/config.yml)
- **Simple Icons PR template** requires: closes #issue, a popularity metric, a ToS link, a forbidden-brands check, an **AI-use disclosure**, the JSON updated, SVGO applied, and viewBox `0 0 24 24` — [PULL_REQUEST_TEMPLATE](https://github.com/simple-icons/simple-icons/blob/HEAD/.github/PULL_REQUEST_TEMPLATE.md)

### Inferences

- The minimum CI worth copying for nubo-icons:
  - Build on PR.
  - A Heroicons-style name parity check across styles, made to fail the build.
  - Octicons-style filename, size and viewBox assertions.
  - A Fluent-style grep for fill or stroke conventions.
  - A Simple Icons-style schema check on metadata.
  - An auto-SVGO commit job.
- Adopt a written versioning policy like Simple Icons': removal or rename is major, an addition is minor, and a redraw is patch. Combine it with alias-not-remove (Octicons aliases, Iconify `hidden`, Heroicons `@deprecated`) so majors can be batched.

### Gaps

- I didn't read Simple Icons' `scripts/build/package.js` or Octicons' `script/changeset-publish` in detail. Fluent's versioning rules (patch-number-only bumps, e.g. 1.1.344) aren't documented in the files I read.

## 5. Governance: CONTRIBUTING, icon request process, licensing

### Takeaway

Most design-led sets **do not accept icon PRs**: Iconoir, Remix, Material and Iconify refuse them outright, and Octicons accepts them from GitHub staff only. They take requests via issues or discussions instead. Simple Icons is the community-PR exception and offsets that with heavy policy (popularity thresholds, forbidden brands, AI disclosure). Licenses are mostly MIT. The outliers are Apache-2.0 (Material), CC0 (Simple Icons) and a new restrictive custom license (Remix, January 2026).

### Cited Findings

- **Iconoir**: "we are not accepting pull requests containing icons. You can open an issue to request a new icon"; brand and product logos are no longer accepted. It asks for help with fonts and libraries — [CONTRIBUTING](https://github.com/iconoir-icons/iconoir/blob/HEAD/CONTRIBUTING.md)
- **Material**: Google "does not accept pull requests for icon files", because upstream source files generate the repo. Concepts are welcome as issues. Third-party logos are excluded "due to legal reasons". License is Apache 2.0, with attribution appreciated but not required — [README](https://github.com/google/material-design-icons/blob/HEAD/README.md)
- **Remix**: "we currently do not accept third-party drawn icons" — [README](https://github.com/Remix-Design/RemixIcon/blob/HEAD/README.md). Since January 2026 it uses the **"Remix Icon License v1.0"** (npm `license` field: "Remix Icon License v1.0"). The license allows free commercial use, modification and optional attribution. It prohibits standalone icon sales, "competing icon libraries" (even modified with minor changes), and use as a logo or brand identity — [License](https://github.com/Remix-Design/RemixIcon/blob/HEAD/License); [package.json](https://github.com/Remix-Design/RemixIcon/blob/HEAD/package.json)
- **Octicons**: "Currently GitHub Staff only … only include icons that are used in the GitHub UI". The process runs: staff-only request template → triage → Figma design → Octicons Push PR → approval by the requester plus an Octicons designer → changeset → release. Review questions: Where will it be used? Is an icon necessary? Could an existing icon work? Is it representing too many ideas? — [CONTRIBUTING](https://github.com/primer/octicons/blob/HEAD/CONTRIBUTING.md). License: MIT — [package.json](https://github.com/primer/octicons/blob/HEAD/lib/octicons_node/package.json)
- **Fluent**: requires a Microsoft CLA (bot-enforced) and Conventional Commits PR titles with scopes (`react-icons`, `svg-icons`, `svg-sprites`, `assets`, `android`, `ios`, …). License is MIT plus a NOTICE file — [CONTRIBUTING](https://github.com/microsoft/fluentui-system-icons/blob/HEAD/CONTRIBUTING.md); [repo tree](https://github.com/microsoft/fluentui-system-icons)
- **Radix**: a generic CONTRIBUTING (open an issue before big changes, pnpm, the Node version from `.nvmrc`). Icon changes go through the Figma file plus regeneration. License: MIT, © WorkOS — [CONTRIBUTING](https://github.com/radix-ui/icons/blob/HEAD/.github/CONTRIBUTING.md); [README](https://github.com/radix-ui/icons/blob/HEAD/README.md)
- **Heroicons**: CONTRIBUTING covers only maintainer publishing steps. Suggestions go to Discussions. License: MIT — [CONTRIBUTING](https://github.com/tailwindlabs/heroicons/blob/HEAD/.github/CONTRIBUTING.md); [package.json](https://github.com/tailwindlabs/heroicons/blob/HEAD/package.json)
- **Simple Icons**: the CONTRIBUTING file is long (about 32 KB). It covers:
  - Requesting an icon, a forbidden-brands list (e.g. Amazon/AWS, Disney/Marvel, Microsoft…) and popularity assessment (Traffic.cv global top 500k, or other metrics).
  - Extraction to 24×24, optimization with SVGO or SVGOMG, annotation, naming rules, JSON data, source guidelines and aliases.
  - Requesting permission from a brand (with an example email), and an **AI Usage Policy**: disclosure is mandatory, a human must review, and no AI generation of brand artwork.
    It also has DISCLAIMER.md (trademark disclaimer) and LICENSE.md (CC0-1.0) — [CONTRIBUTING](https://github.com/simple-icons/simple-icons/blob/HEAD/CONTRIBUTING.md); [package.json](https://github.com/simple-icons/simple-icons/blob/HEAD/package.json)
- **Iconify**: icon-set PRs are not accepted ("Third party JSON files are not trusted"). To suggest a set, open an issue with a source that can be auto-downloaded (git repo or npm). Requirements: open source, usable in UI, consistent; hard-coded palettes are rarely accepted. Individual icons should be requested upstream from the set — [CONTRIBUTING](https://github.com/iconify/icon-sets/blob/HEAD/CONTRIBUTING.md). Each set keeps its own license, listed in `collections.md`; the `@iconify/json` package itself is MIT — [readme](https://github.com/iconify/icon-sets/blob/HEAD/readme.md); [package.json](https://github.com/iconify/icon-sets/blob/HEAD/package.json)

### Inferences

- For a single-designer set like nubo-icons, the Iconoir/Remix model fits best: code PRs are welcome, icons come by request issue with a structured form (name, use case, references, tags), and governance docs include a NAMING_CONVENTION.md. Add an AI-disclosure line, as Simple Icons does, if outside contributions are ever accepted.
- MIT is the norm and maximizes uptake. That includes Iconify inclusion, which requires an open-source license. Remix's 2026 anti-competing-library clause is a cautionary data point: borrowing glyphs from Remix for nubo-icons would now be prohibited.

### Gaps

- I didn't verify the Material Symbols LICENSE file text directly (the README states Apache 2.0). I didn't check whether Remix's npm React/Vue packages carry the new license.
