# Roadmap

How nubo gets from here to a published library, and what comes after. The reasoning behind most of these choices is in [research/report.md](research/report.md).

## Done

- **Research** on icon design, accessibility and how the major open-source sets are built.
- **Design rules** in [DESIGN.md](../DESIGN.md): 24px canvas, 1.5px stroke, Line / Fill / Duo.
- **Workspace**: pnpm monorepo, Next.js site scaffold in `apps/web`.
- **Icon tooling** in `tools/icons`: `pnpm icons:lint` enforces the rules, `pnpm icons:preview` renders review sheets.
- **Batch 1**: check, gear, heart, heart-straight, house, magnifying-glass.
- **Batch 2**: x, plus, minus, chevron-right, arrow-right, circle-check.
- **Batch 3**: chevron-left, chevron-up, chevron-down, arrow-left, arrow-up, arrow-down.
- **Batch 4**: user, bell, mail, lock, trash, calendar.
- **Batch 5**: menu, eye, eye-off, user-plus, pencil, copy.
- **Batch 6**: circle, dot, ellipsis, grip-vertical, loader, chevrons-up-down, panel-left.
- **Batch 7**: circle-x, circle-info, circle-alert, circle-question, clock, triangle-alert. Every icon shadcn/ui components import now exists.
- **Batch 8**: sun, moon, monitor, globe, cloud, star.
- **Batch 9**: file, file-text, folder, image, paperclip, clipboard.
- **Batch 10**: link, share, download, upload, arrows-clockwise, sliders-horizontal.
- **Batch 11**: ellipsis-vertical, chevrons-left, chevrons-right, arrow-up-right, arrows-up-down, arrow-counter-clockwise, arrow-clockwise.
- **Batch 12**: user-minus, users, circle-user, chat, paper-plane, phone.
- **Batch 13**: play, pause, speaker-high, speaker-slash, microphone, camera.
- **Batch 14**: lock-open, key, shield-check, shopping-cart, credit-card, map-pin.
- **Batch 15**: funnel, arrow-up-right-from-square, sign-out, bookmark, sparkle.
- **Batch 16**: code, list, squares-four, chart-bar, sparkles.
- **Batch 17**: sign-in, arrows-out, arrows-in, arrow-elbow-down-left, panel-right, prohibit.
- **Batch 18**: pin, flag, tag, archive, bolt, bell-off, user-check, folder-open, database, terminal, scissors, at.
- **Batch 19**: list-ordered, text-align-left, quotes, rows, chart-line, chart-pie, stop, skip-forward, skip-back, microphone-slash, video-camera, trend-up.
- **Batch 20**: device-mobile, wifi, power, shield, shopping-bag, receipt, gift, map, compass, building, thumbs-up, smiley. Every icon on the launch list is done.
- **`@nubo-icons/react`** in `packages/react`: generated from `icons/`, one module per icon per style, ESM + CommonJS with types for both, Lucide-compatible names and props. Tested against the SVG sources.
- **CI**: GitHub Actions runs format, icon lint, build, typecheck and tests on every push and pull request.
- **Website, first version** in `apps/web`, built on shadcn/ui: search across names, aliases and tags; a toolbar for style, size, stroke and color with Random and Reset; a bottom drawer per icon with previews, SVG and React code, copy and download; light and dark themes; a generated `llms.txt`.
- **Logo and favicon**: a wordmark built from circles, half circles and bars like the icons, with the "n" as the favicon.
- **Docs** in `apps/web/content/docs`: introduction, React, styles, SVG, accessibility and design, on shadcn's typeset, sidebar and table of contents.
- **Exports**: download an icon as SVG or PNG at 1x, 2x or 3x, copy it as a PNG or data URI, copy a link to it (`/?icon=phone` opens its drawer), and download the whole set as a zip.
- **Showcase**: a pannable canvas of UI examples built from shadcn/ui components.
- **Footer** with the maker's links, and a **public roadmap** at `/docs/roadmap`. Keep that page in step with this file, written for users rather than contributors.
- **Launch polish**: SEO metadata, link previews per page and per icon, sitemap, 404 page, Markdown versions of every page for AI tools, Vercel Analytics, and a README for the public repo.
- **`@nubo-icons/react` on npm** (0.1.0, then 0.1.1). Changesets version it; CI stages each release through npm trusted publishing and a maintainer approves it with 2FA. The changelog is shown at `/docs/changelog`, generated from the package's `CHANGELOG.md`.
- **`@nubo-icons/svg`** in `packages/svg`: every icon as a minified SVG file per style, with Duo's tint as real opacity, plus `icons.json` with aliases, tags and categories. A Changesets `fixed` group releases it with the React package, so both share one version.
- **Morphing icons**: `MorphIcon` from `@nubo-icons/react/morph`, based on [Morphing icons with Claude](https://benji.org/morphing-icons-with-claude). It covers menu, x, plus, minus, check, arrows and chevrons. The build reads each icon's straight lines from `line.svg`; `meta.json` marks which icons join (`morph`) and which turn into each other (`rotation` and `angle`). Lint keeps morph icons to three straight lines and checks that rotation sets line up. `/morph` plays every pair for review.

## Next

1. **Grow the set past the [launch list](launch-icons.md)** in batches, led by icon requests, every icon in all three styles, each batch reviewed and locked before the next.
2. **Distribution**: ask Iconify to include the set, which brings Tailwind and unplugin-icons support with no extra work.

## Later

### More morphing icons

Play/pause and download/upload could join the morph group, but they're drawn with curves and rounded rectangles. Joining means redrawing approved icons, so it waits for a redesign request.

### More styles

- **Bold**: Line and Fill at a heavier weight, around 2.25px like Phosphor Bold. The first 18px "Soft" experiment showed how good a heavier weight looks.
- **Thin and Light**: lighter weights on the same drawings, with hand fixes where details close up.
- **Duo B ("body + accent")**: the two-tone look where one identifying part is dark and the body is light. Only if a rule can be found that works for every icon, including ones with no distinct part, like the heart.

### More frameworks and tools

Vue and Svelte packages, a Figma library, an MCP server so AI coding tools can find and insert icons.
