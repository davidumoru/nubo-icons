# Icon-Set Websites and Developer Experience (DX): How They Are Built and What Users Expect (as of Oct 2026)

Method note: Most stack facts below come from reading each site's source repo directly (raw `package.json`/config files on GitHub) and from inspecting live HTTP response headers and HTML on 2026-10-09. Header-based hosting conclusions are marked as such, because a CDN in front (Cloudflare) can hide the origin.

## 1. Tech stack, hosting, and where the site code lives

### Takeaway

No single stack dominates. Lucide uses VitePress with a Nitro API on Vercel, Phosphor and Remix Icon use Vite SPAs, Heroicons, Tabler, Iconoir and Radix use Next.js, Icônes uses Vue 3 + Vite on Netlify, and Simple Icons has moved to a Rust/WASM app. Sites kept inside the icon monorepo (Lucide, Iconoir) can use workspace packages directly and run build-time metadata scripts. Separate repos (Phosphor, Simple Icons) or closed sites (Heroicons, Tabler.io) are also common.

### Cited Findings

**Lucide (lucide.dev)**

- The site lives in the main monorepo under `docs/` (package `@lucide/docs`). It is built with VitePress (`vitepress ^1.6.4`), and the live HTML reports `generator: VitePress v1.6.4`. — [lucide docs/package.json](https://github.com/lucide-icons/lucide/blob/main/docs/package.json); live headers/HTML of [lucide.dev](https://lucide.dev)
- It is hosted on Vercel (`server: Vercel`, `x-vercel-cache: HIT`). `docs/vercel.json` enables `"fluid": true` and `"cleanUrls": true` and holds many legacy redirects, such as `/icon/*` → `/icons/*` and `/?search=` → `/icons`. — [lucide docs/vercel.json](https://github.com/lucide-icons/lucide/blob/main/docs/vercel.json)
- A Nitro server (`nitropack`) is built next to the static VitePress build (`build:api`). Its API routes live in `docs/.vitepress/api/`: `categories`, `figma`, `gh-icon`, `icon-nodes`, `icons`, `lab`, `tags`. — [lucide docs/.vitepress/api](https://github.com/lucide-icons/lucide/tree/main/docs/.vitepress/api); [package.json](https://github.com/lucide-icons/lucide/blob/main/docs/package.json)
- Build-time data pipeline (`prebuild:*` scripts): `writeIconNodes`, `writeIconMetaIndex`, `writeReleaseMetadata`, `writeCategoriesMetadata`, `writeIconRelatedIcons`, `writeIconDetails`, `writeiconPopularity` (plus a popularity index), `writeBrandStopwords`, and Lab icon nodes/meta, followed by `postbuild:vercelJson`. Builds run with `--max-old-space-size=8192`. — [lucide docs/package.json](https://github.com/lucide-icons/lucide/blob/main/docs/package.json)
- Main runtime dependencies are Vue 3, `@headlessui/vue`, `@floating-ui/vue`, `@vueuse/*`, `fuse.js ^7.5`, `jszip`, `motion-v`, `sandpack-vue3` (live code playgrounds), and React 19 (to render lucide-react examples). Dev dependencies include `sharp`, `shiki`, `simple-git`, `sitemap`, `vitepress-plugin-group-icons` and `vitepress-plugin-llms`. — [lucide docs/package.json](https://github.com/lucide-icons/lucide/blob/main/docs/package.json)

**Phosphor (phosphoricons.com)**

- The site has its own repo, `phosphor-icons/homepage`. It is a React 19 + Vite 7 + TypeScript SPA using `zustand` (state), `fuse.js ^6.6`, `motion`, `react-hotkeys-hook`, `file-saver`, `svg2png-converter`, `tinycolor2`, `react-ga4` and `vite-plugin-svgr`. Dev dependencies include `iconjar-exporter`. Icon data comes from `@phosphor-icons/core`. — [phosphor homepage package.json](https://github.com/phosphor-icons/homepage/blob/master/package.json)
- The live site returns `server: Apache` and a roughly 4 KB HTML shell loading `/assets/index-*.js`. That makes it a client-rendered SPA on conventional hosting, not Vercel or Netlify (inferred from headers). — live headers of [phosphoricons.com](https://phosphoricons.com)

**Heroicons (heroicons.com)**

- The live site is Next.js (`x-powered-by: Next.js`, `__NEXT_DATA__`, `_next/static`) on Vercel (`x-vercel-id`) behind Cloudflare. — live headers of [heroicons.com](https://heroicons.com)
- The site source is not public. `api.github.com/repos/tailwindlabs/heroicons.com` returns 404, and the public `tailwindlabs/heroicons` repo contains only the icons and packages. — [GitHub API](https://api.github.com/repos/tailwindlabs/heroicons.com); [heroicons package.json](https://github.com/tailwindlabs/heroicons/blob/master/package.json)
- The page server-renders all icon names into the HTML (about 400 KB). Header text reads "Heroicons v2.1.5 … 316 icons, MIT license, React & Vue libraries, Documentation, Get Figma File, Outline / Solid / Mini / Micro, Outline 24x24, 1.5px stroke". — [heroicons.com](https://heroicons.com) (live HTML)

**Tabler (tabler.io/icons)**

- tabler.io/icons is Next.js on Vercel behind Cloudflare (`_next/static`, `x-vercel-id`, 8 JSON-LD blocks, Next `opengraph-image` route). — live headers/HTML of [tabler.io/icons](https://tabler.io/icons)
- The `tabler/tabler-icons` monorepo has its own Astro site/preview (`"dev": "astro dev"`, `astro.config.mjs`, `src/pages`) and a Turbo + changesets build. Build scripts include `changelog-image` (generated release images), `preview-icons`/`preview-stroke` image generation, `import-tags` and `import-categories`. — [tabler-icons package.json](https://github.com/tabler/tabler-icons/blob/main/package.json); [astro.config.mjs](https://github.com/tabler/tabler-icons/blob/main/astro.config.mjs)
- I found no public source for the tabler.io marketing site itself (see Gaps).

**Iconoir (iconoir.com)**

- The site lives in the monorepo at `iconoir.com/`. It is Next.js 15 with `output: 'export'` (static), styled-components, `react-window` (virtualization), `react-aria` sliders, `next-mdx-remote` for docs, and `@octokit/rest` plus `@nodesecure/npm-registry-sdk` as dev dependencies. — [iconoir.com/package.json](https://github.com/iconoir-icons/iconoir/blob/main/iconoir.com/package.json); [next.config.ts](https://github.com/iconoir-icons/iconoir/blob/main/iconoir.com/next.config.ts)
- It is served from GitHub Pages behind Cloudflare (`x-github-request-id`, `via: varnish`), and the live HTML includes Carbon Ads. — live headers of [iconoir.com](https://iconoir.com)

**Remix Icon (remixicon.com)**

- The site is a Vite-style SPA shell (about 2 KB HTML, `/assets/index-*.js`, Google Tag Manager) on AWS S3 + CloudFront (`server: AmazonS3`, `x-amz-cf-id`). — live headers of [remixicon.com](https://remixicon.com)
- The public repo `Remix-Design/RemixIcon` contains only `icons/`, `fonts/`, `tags.json`, `package.json` and READMEs. The site source is not in it. — [RemixIcon repo root](https://github.com/Remix-Design/RemixIcon)

**Radix Icons (icons.radix-ui.com)**

- It now redirects to radix-ui.com/icons, which is a Next.js page (290 `_next/static` references) behind Cloudflare with a Next `opengraph-image` route and GTM. — live HTML of [icons.radix-ui.com](https://icons.radix-ui.com)
- The `radix-ui/icons` repo contains `packages/radix-icons` and `packages/generate-icon-lib`, a committed `radix-icons.zip`, and a `context7.json` (registration for the Context7 LLM docs service). The site is not in this repo. — [radix-ui/icons repo root](https://github.com/radix-ui/icons)
- The page shows `npm install @radix-ui/react-icons` (React only), "Open in Figma", "Download SVG" (zip), and categories such as Typography, Arrows, Borders and corners. License is MIT, copyright WorkOS. — [radix-ui.com/icons](https://www.radix-ui.com/icons)

**Icônes (icones.js.org, Iconify browser)**

- Its repo is `antfu-collective/icones`: Vue 3 + Vite 8 + UnoCSS, `vue-router`, `vite-plugin-pages`, `vite-plugin-pwa` (installable/offline), `dexie` (IndexedDB), `fzf` (fuzzy search), `iconify-icon`, `@iconify/json` (all sets bundled at build), `svg-packer` (icon fonts), `client-zip`, `shiki` and `hotkeys-js`. — [icones package.json](https://github.com/antfu-collective/icones/blob/main/package.json)
- It is hosted on Netlify (`x-nf-request-id`, `netlify.toml` in the repo) behind Cloudflare. — [icones repo](https://github.com/antfu-collective/icones); live headers
- The README lists: "Instant Fuzzy Searching – all are done locally, no web queries", "The Bag – select your icons and pack them into a ready-to-use icon font", copy usage, SVG download, mobile friendly, collection bookmarks, category filters and dark mode. A community VS Code extension also exists. — [icones README](https://github.com/antfu-collective/icones)

**Simple Icons (simpleicons.org)**

- The live site is now a Rust → WebAssembly app. The HTML loads `simple-icons-website-<ts>.js` and a `_bg.wasm` (estimated at 2,463,740 bytes) and shows a percentage loader while the WASM streams. It is served behind Cloudflare. — live HTML of [simpleicons.org](https://simpleicons.org)
- The source repo is `simple-icons/simple-icons-website-rs`, a Cargo workspace with crates for components (`controls/search`, `grid`, `modal`, `copy`, `storage`, `url`, `preview-generator`, `svg-defs`) and libraries (`fast-fuzzy`, `svg-path-bbox`, `badge-maker`, `simple-icons-sdk`, `web-sys-simple-copy`). It uses a `wasm-release` profile with `lto`, `opt-level='z'` and end-to-end tests. — [simple-icons-website-rs Cargo.toml](https://github.com/simple-icons/simple-icons-website-rs/blob/master/Cargo.toml); [org repos](https://github.com/orgs/simple-icons/repositories)
- The older JS site (`simple-icons-website`) was webpack + Pug, `fast-fuzzy`, `pdfkit` (PDF download) and jest-puppeteer e2e tests. — [simple-icons-website package.json](https://github.com/simple-icons/simple-icons-website/blob/master/package.json)
- The site publishes `/stats.json` (fields such as `simpleIconsVersion`, `numberOfIcons` and `numberOfDeprecatedIcons`), which README badges consume, and has a `/deprecations/` page. — [simple-icons-website-rs README](https://github.com/simple-icons/simple-icons-website-rs)

**Material Symbols (fonts.google.com/icons)**

- It is a Google property (`server: ESF`). The browser is closed source. — live headers of [fonts.google.com/icons](https://fonts.google.com/icons)

### Inferences

- Putting the site in the icon monorepo (Lucide, Iconoir) lets the site import the in-repo framework packages and generate metadata (release history, contributors, categories) from git and the icon source files at build time. This is the strongest pattern for nubo-icons.
- A static output (VitePress, Next `output: export`, Vite SPA) plus a small API layer (Lucide's Nitro routes) covers both human browsing and machine consumers (Figma plugin, external tools).

### Gaps

- tabler.io, heroicons.com and remixicon.com site sources are not public, so their internal search libraries could not be verified.
- Whether simpleicons.org uses Leptos specifically: the crate list suggests a Rust UI framework, but I did not open the `app` crate to confirm.
- The origin host behind Cloudflare for radix-ui.com and simpleicons.org is unconfirmed.

## 2. Features: search, filters, customizer, copy/download, detail pages, badges, keyboard, dark mode, URL state

### Takeaway

Users expect at least: instant fuzzy search over names, tags and categories; a live customizer (size, stroke width or weight, color); copy SVG and copy framework code in one click; category filters; and dark mode. Leading sites add per-icon pages with version history, contributors, related icons, an "edit in studio" link, and URL-persisted settings.

### Cited Findings

**Search**

- Lucide uses Fuse.js with `threshold: 0.2` and `useExtendedSearch: true`. The query is split on spaces into an `$and` of tokens, so every word must match. — [lucide useSearch.ts](https://github.com/lucide-icons/lucide/blob/main/docs/.vitepress/theme/composables/useSearch.ts)
- In Lucide's IconsOverview, the query is debounced (`searchQueryDebounced`). Tag and category metadata are lazy-loaded only once the user starts typing (`loadSearchMetadata`). A keyboard shortcut focuses the search box (`useSearchShortcut`), and `?focus` in the URL auto-focuses it. — [lucide IconsOverview.vue](https://github.com/lucide-icons/lucide/blob/main/docs/.vitepress/theme/components/icons/IconsOverview.vue)
- Lucide's build also generates icon popularity data and "brand stopwords", which are used to handle brand-name queries in search. — [lucide docs/package.json](https://github.com/lucide-icons/lucide/blob/main/docs/package.json)
- Phosphor uses Fuse.js with weighted keys: `name` (weight 4), `tags`, `categories`, `codepoint`, `threshold: 0.2`. The empty state suggests clickable tags: `*new*`, `*updated*`, `communication`, `editor`, `emoji`, `maps`, `weather`. — [phosphor state/index.ts](https://github.com/phosphor-icons/homepage/blob/master/src/state/index.ts); [IconGrid.tsx](https://github.com/phosphor-icons/homepage/blob/master/src/components/IconGrid/IconGrid.tsx)
- Icônes uses `fzf` for local fuzzy search across all Iconify sets. Simple Icons uses `fast-fuzzy` (as a JS lib in the old site, ported to a Rust crate in the new one). — [icones package.json](https://github.com/antfu-collective/icones/blob/main/package.json); [simple-icons-website-rs Cargo.toml](https://github.com/simple-icons/simple-icons-website-rs/blob/master/Cargo.toml)

**Customizer**

- Lucide's sidebar customizer has "Color", "Stroke width" (default 2px), "Size" (default 24px), and a "Non-scaling stroke" toggle (absolute stroke width). There is also an "Include external libs: Lab" option that mixes Lucide Lab icons into the grid. — [lucide.dev/icons/house](https://lucide.dev/icons/house)
- Tabler offers Style (Outline / Filled / All), Size (default 32), Stroke (default 2) and Color. — [tabler.io/icons](https://tabler.io/icons)
- Phosphor's `IconContext` provides weight, size, color and mirrored, with six weights: Thin, Light, Regular, Bold, Fill, Duotone. — [IconGrid.tsx](https://github.com/phosphor-icons/homepage/blob/master/src/components/IconGrid/IconGrid.tsx); [phosphor homepage README](https://github.com/phosphor-icons/homepage)
- Heroicons uses style tabs instead of a free customizer: Outline (24x24, 1.5px stroke), Solid, Mini, Micro. — [heroicons.com](https://heroicons.com)
- Material Symbols exposes variable-font axes: FILL 0–1, wght 100–700, GRAD (e.g., -50–200) and opsz 20–48. The browser offers SVG/PNG download and platform formats (web font, Android Vector Drawable, Apple Symbols). — [Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)

**Copy and download**

- Lucide icon pages have "Copy SVG", "Copy JSX" and "Edit in studio" (Lucide Studio). Its components include `CopyCodeButton`, `CopySVGButton` and `EditInStudioButton`. "Download all" zips are built client-side with `jszip`, with a `getFallbackZip`. — [lucide.dev/icons/house](https://lucide.dev/icons/house); [lucide icons components](https://github.com/lucide-icons/lucide/tree/main/docs/.vitepress/theme/components/icons); [lucide .vitepress/lib](https://github.com/lucide-icons/lucide/tree/main/docs/.vitepress/lib)
- Phosphor does client-side PNG export (`svg2png-converter`) and file download (`file-saver`), and has an IconJar export at build time (`iconjar-exporter`). — [phosphor package.json](https://github.com/phosphor-icons/homepage/blob/master/package.json)
- Icônes has "The Bag": the user collects icons and packs them into a custom icon font (`svg-packer`) or a zip (`client-zip`). — [icones README](https://github.com/antfu-collective/icones)
- Simple Icons downloads SVG and PDF (pdfkit in the old site), shows brand hex colors, and has a `badge-maker` crate for shields-style badges. — [simple-icons-website package.json](https://github.com/simple-icons/simple-icons-website/blob/master/package.json); [Cargo.toml](https://github.com/simple-icons/simple-icons-website-rs/blob/master/Cargo.toml)
- Radix offers "Download SVG" (zip) and "Open in Figma". — [radix-ui.com/icons](https://www.radix-ui.com/icons)

**Icon detail pages, badges, changelog, contributors**

- Lucide's per-icon page (`/icons/house`) shows tags, categories (linked to category pages), "Created" (version, linked to its release tag), "Last changed" (version, linked), contributor GitHub avatars, related icons, and zoom previews at 1000/200/100%. — [lucide.dev/icons/house](https://lucide.dev/icons/house)
- That data is generated at build time (`writeReleaseMetadata`, `writeIconRelatedIcons`, `writeIconDetails`), using `simple-git` to read history. — [lucide docs/package.json](https://github.com/lucide-icons/lucide/blob/main/docs/package.json)
- Phosphor supports `*new*` and `*updated*` pseudo-tags in search for recent icons. — [IconGrid.tsx](https://github.com/phosphor-icons/homepage/blob/master/src/components/IconGrid/IconGrid.tsx)
- Tabler generates changelog images per release (`changelog-image` script). — [tabler-icons package.json](https://github.com/tabler/tabler-icons/blob/main/package.json)

**URL state, keyboard, dark mode**

- Phosphor persists its settings (weight, size, color, query) with a custom zustand `PersistStorage` that reads and writes `URLSearchParams` via `history.replaceState`, so shared links reproduce the view. — [phosphor state/index.ts](https://github.com/phosphor-icons/homepage/blob/master/src/state/index.ts)
- Phosphor uses `react-hotkeys-hook` for keyboard shortcuts, and Icônes uses `hotkeys-js`. — [phosphor package.json](https://github.com/phosphor-icons/homepage/blob/master/package.json); [icones package.json](https://github.com/antfu-collective/icones/blob/main/package.json)
- Simple Icons has a dedicated `components/url` crate (URL state) and a `storage` crate (local persistence), plus `layout-type` and `order-types` controls for grid/list layout and sort order (alphabetical, color, etc.). — [Cargo.toml](https://github.com/simple-icons/simple-icons-website-rs/blob/master/Cargo.toml)
- Dark mode: Lucide serves dark and light logos, Phosphor has an `ApplicationTheme.DARK` state, and Icônes advertises dark mode. — [lucide config](https://github.com/lucide-icons/lucide/blob/main/docs/.vitepress/config.ts); [IconGrid.tsx](https://github.com/phosphor-icons/homepage/blob/master/src/components/IconGrid/IconGrid.tsx); [icones README](https://github.com/antfu-collective/icones)

### Inferences

- A strong default for nubo-icons is a Fuse.js (or similar) index over name (high weight), tags, aliases and categories, with a low threshold (around 0.2), AND-matching of tokens, debounced input and lazy-loaded tag metadata. Add `new`/`updated` pseudo-filters driven by release metadata.
- Keeping customizer state in the URL (Phosphor) and adding a `/` or Cmd+K focus shortcut (Lucide) are cheap wins.

### Gaps

- Heroicons, Tabler and Remix Icon search implementations could not be verified (closed source).
- I did not verify per-framework snippet tabs on Tabler icon detail pages. The fetched URL rendered as the landing page.

## 3. Performance: rendering thousands of icons, build-time indexes, OG images

### Takeaway

The sites with large sets virtualize the grid: Lucide uses `useVirtualList` over chunked rows and Iconoir uses `react-window`. Smaller sets (Phosphor, about 1,250 icons × 6 weights; Heroicons, 316) just render everything. Heavy metadata is precomputed into JSON at build time. Lucide generates per-icon OG images at build time with sharp from an SVG template.

### Cited Findings

- Lucide splits search results into rows with `chunkArray(searchResults, columnSize)`, where the column count comes from `useElementSize`, and renders them with `@vueuse/core`'s `useVirtualList`. The CSS grid is `repeat(auto-fill, minmax(56px, 1fr))` with square cells. — [IconsOverview.vue](https://github.com/lucide-icons/lucide/blob/main/docs/.vitepress/theme/components/icons/IconsOverview.vue); [IconGrid.vue](https://github.com/lucide-icons/lucide/blob/main/docs/.vitepress/theme/components/icons/IconGrid.vue)
- Lucide ships precomputed "icon nodes" (an array-of-element data structure rather than raw SVG strings) via the `writeIconNodes` script and the `/api/icon-nodes` route. — [lucide docs/package.json](https://github.com/lucide-icons/lucide/blob/main/docs/package.json); [api dir](https://github.com/lucide-icons/lucide/tree/main/docs/.vitepress/api)
- Iconoir depends on `react-window` and `use-resize-observer`, which points to a virtualized, resize-aware grid. — [iconoir.com/package.json](https://github.com/iconoir-icons/iconoir/blob/main/iconoir.com/package.json)
- Phosphor maps all filtered results directly into a `motion.div` grid with entrance animation and no virtualization. — [IconGrid.tsx](https://github.com/phosphor-icons/homepage/blob/master/src/components/IconGrid/IconGrid.tsx)
- Simple Icons uses a `svg-defs` component crate (shared SVG definitions, suggesting `<use>` references) and a `preview-generator` crate. The site streams a roughly 2.4 MB WASM bundle behind a progress loader. — [Cargo.toml](https://github.com/simple-icons/simple-icons-website-rs/blob/master/Cargo.toml); [simpleicons.org](https://simpleicons.org) (live HTML)
- Icônes bundles `@iconify/json` at build time and caches it in IndexedDB (`dexie`), with PWA offline support. — [icones package.json](https://github.com/antfu-collective/icones/blob/main/package.json)
- Lucide OG images: `createOGImage.ts` fills `{{placeholders}}` in `guideOGTemplate.svg` and `iconOGTemplate.svg`, then rasterizes with `sharp` to 1200×630 (×1.1) PNGs in `public/og/` during the build, with one image per guide page and per icon. — [lucide createOGImage.ts](https://github.com/lucide-icons/lucide/blob/main/docs/.vitepress/createOGImage.ts)
- Tabler and Radix use Next.js `opengraph-image` routes (the URL pattern `opengraph-image-*.png?opengraph-image.*` is in their HTML). — live HTML of [tabler.io/icons](https://tabler.io/icons) and [radix-ui.com/icons](https://www.radix-ui.com/icons)
- Material Symbols subsetting: passing `icon_names=` (alphabetical) cuts the font from 295 KB to 1.7 KB in Google's example. — [Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
- Heroicons server-renders all 316 icons into roughly 400 KB of HTML, which is feasible only for small sets. — [heroicons.com](https://heroicons.com) (live HTML)

### Inferences

- Above roughly 1,500 visible cells, use row virtualization with a measured column count. Keep icon data as compact nodes or path strings, render inline SVG only for visible rows, and precompute search indexes and metadata JSON at build time.
- Build-time OG image generation (sharp, or Satori/resvg) per icon is proven at Lucide's scale (1,600+ icons). Watch memory, since Lucide needs an 8 GB heap.

### Gaps

- No public performance metrics (LCP/INP) for these sites were found. A Lighthouse run would be needed.

## 4. Docs content and ecosystem tooling (framework guides, a11y, Figma, Raycast, VS Code, MCP, llms.txt)

### Takeaway

Lucide has the most complete docs. It has per-framework guide trees (each with getting-started, basics, advanced and migration pages), a11y how-tos, a comparison page, a VS Code page, a showcase, a brand-logo statement and an auto-generated llms.txt. AI tooling in 2026 is mostly llms.txt (Lucide) plus community MCP servers. I found no official MCP servers from these icon projects.

### Cited Findings

- Lucide's `docs/guide` has folders for angular, astro, lucide (vanilla), preact, react-native, react, solid, static, svelte and vue, plus `comparison.md`, `installation.md`, `version-1.md` and `vscode.md`. The top level adds `showcase.md`, `community.md`, `brand-logo-statement.md`, `license.md`, `contribute/` and `how-to/`. — [lucide docs/guide](https://github.com/lucide-icons/lucide/tree/main/docs/guide); [lucide docs](https://github.com/lucide-icons/lucide/tree/main/docs)
- Lucide's `llms.txt` is generated by `vitepress-plugin-llms`. It contains a table of contents per framework (Basics: Color, Sizing, Stroke width; Advanced: Global styling, Shadow DOM, Accessibility, Filled icons, Lab/custom icons; migration guides including "react-feather → lucide-react") with `.md` links to each page. — [lucide.dev/llms.txt](https://lucide.dev/llms.txt); [lucide config.ts](https://github.com/lucide-icons/lucide/blob/main/docs/.vitepress/config.ts)
- The other sites return 404 for `/llms.txt`: phosphoricons.com, tabler.io, iconoir.com, remixicon.com, radix-ui.com and simpleicons.org. heroicons.com and icones.js.org return 200 with `text/html`, which looks like an SPA fallback rather than a real llms.txt. Checked 2026-10-09. — direct HTTP checks
- Radix registers its icons with Context7 (`context7.json` in the repo). — [radix-ui/icons](https://github.com/radix-ui/icons)
- Community MCP servers exist: `lucide-icons-mcp` by SeeYangZhi (tools `search_icons` and `search_categories`, run with `npx lucide-icons-mcp --stdio`) and several Iconify MCP servers (osmansiddiquer's iconify-mcp, icon-search-mcp, Pickapicon). One listing notes that Iconify search is keyword-based, not semantic. — [mcpservers.org lucide-icons-mcp](https://mcpservers.org/servers/SeeYangZhi/lucide-icons-mcp); [glama iconify-mcp](https://glama.ai/mcp/servers/Osmansiddiquer/iconify-mcp)
- Figma:
  - Lucide's site has a `/api/figma` route that serves data to its Figma plugin.
  - Tabler has "Get Figma plugin".
  - Heroicons has "Get Figma File".
  - Radix has "Open in Figma".
  - Phosphor has an official Figma plugin repo plus Sketch and Penpot versions.
  - Sources: [lucide api](https://github.com/lucide-icons/lucide/tree/main/docs/.vitepress/api); [tabler.io/icons](https://tabler.io/icons); [heroicons.com](https://heroicons.com); [phosphor homepage README](https://github.com/phosphor-icons/homepage)
- Raycast and VS Code: Phosphor's README links a community Raycast extension (marinsokol/phosphor-icons). Icônes links a community VS Code extension. Lucide has a `guide/vscode.md` page. — [phosphor homepage README](https://github.com/phosphor-icons/homepage); [icones README](https://github.com/antfu-collective/icones); [lucide docs/guide](https://github.com/lucide-icons/lucide/tree/main/docs/guide)
- Lucide offers "Edit in studio" (Lucide Studio) to open an icon in an editor, and lists Lucide Lab as an external library you can toggle in the grid. — [lucide.dev/icons/house](https://lucide.dev/icons/house)
- Material Symbols documents platform delivery: web font with axes via the CSS API, Android Vector Drawables, Apple Symbols, and Flutter support stated as planned. — [Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)

### Inferences

- For nubo-icons, generate llms.txt automatically from the docs, publish a machine-readable icon index (JSON with names, tags and aliases), and consider an official MCP server (search, get SVG, get framework snippet). The gap is real: none of the 10 projects ships an official MCP server as of this check.

### Gaps

- I did not verify whether Lucide's VS Code page describes an official extension or a third-party one, or what Raycast extensions exist for Lucide and Tabler.
- Detailed design-guidelines pages (e.g., Lucide `contribute/` design guide, Tabler and Phosphor grid rules) were not opened.

## 5. Branding and marketing: presentation, comparison pages, showcase, sponsors, monetization

### Takeaway

Projects run by companies (Heroicons by Tailwind Labs, Radix by WorkOS, Material by Google) present the set as part of a larger product family. Community sets earn money through ads (Carbon on Lucide and Iconoir), sponsors (Vercel and DigitalOcean badges on Lucide; GitHub Sponsors, Open Collective and PayPal on Tabler) and paid upsells (Tabler bundles at $9 and $69). Comparison and showcase pages are a Lucide differentiator.

### Cited Findings

- Lucide shows "Powered by Vercel" and DigitalOcean sponsor badges, and overrides VitePress's Carbon Ads component (`VPCarbonAds.vue`, `CarbonAdOverlay.vue`). It also has `comparison.md`, `showcase.md` and a `brand-logo-statement.md` explaining its policy on brand logos. Fun touches include a confetti composable and a survey overlay. — [lucide.dev/icons/house](https://lucide.dev/icons/house); [lucide config.ts](https://github.com/lucide-icons/lucide/blob/main/docs/.vitepress/config.ts); [lucide icons components](https://github.com/lucide-icons/lucide/tree/main/docs/.vitepress/theme/components/icons)
- Tabler:
  - Headline claims are "6200+ free vector icons" and "6238 open source icons" (v3.49.0).
  - Its pricing tiers are Open Source (free), Bundle at $9 (PNG & PDF, webfont), and "All Package" at $69 (adds 139 SVG illustrations and 80 email templates).
  - The page also shows a third-party Streamline banner ("Get 250,000 more icons") and a "Support our work" section (GitHub Sponsors, Open Collective, PayPal).
  - Source: [tabler.io/icons](https://tabler.io/icons)
- Iconoir runs Carbon Ads. — live HTML of [iconoir.com](https://iconoir.com)
- Heroicons' header is "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS", with icon count, license, "React & Vue libraries" and "Share on Twitter". — [heroicons.com](https://heroicons.com)
- Phosphor describes itself as "A flexible icon family for interfaces, diagrams, presentations — whatever, really." — [phosphor package.json](https://github.com/phosphor-icons/homepage/blob/master/package.json)
- Icônes and its author show sponsors via the antfu sponsors SVG. — [icones README](https://github.com/antfu-collective/icones)
- Simple Icons exposes live stats (`/stats.json`) used in README badges, which works as social proof. — [simple-icons-website-rs README](https://github.com/simple-icons/simple-icons-website-rs)

### Inferences

- A positioning line, a live icon count or version badge, a comparison page against Lucide, Phosphor and Heroicons, and a showcase of real products using the set are the most reusable marketing elements for nubo-icons.

### Gaps

- Remix Icon's live page content could not be extracted (the client-rendered SPA returned only a title to the fetcher), so its features and marketing are unverified.
- No blog posts about building these sites were found in the time available.
