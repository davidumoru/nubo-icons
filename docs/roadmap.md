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
- **`@nubo-icons/react`** in `packages/react`: generated from `icons/`, one module per icon per style, ESM + CommonJS with types for both, Lucide-compatible names and props. Tested against the SVG sources.

## Next

1. **Grow the set to the [launch list](launch-icons.md)** in batches, every icon in all three styles, each batch reviewed and locked before the next. The list also says what nubo doesn't draw.
2. **Packages.**
   - `@nubo-icons/svg`: optimized SVGs plus icon data JSON.
   - Release with Changesets, all packages on one version, published from CI with npm provenance.
3. **Website** in `apps/web`: search across names and tags, style switcher, copy SVG or JSX, a page per icon, an auto-generated `llms.txt`.
4. **Distribution**: ask Iconify to include the set, which brings Tailwind and unplugin-icons support with no extra work.

## Later

### Morphing icons

A `MorphIcon` component that animates between icons in a morph group, based on [Morphing icons with Claude](https://benji.org/morphing-icons-with-claude).

- **Morph group**: symbols built from at most three straight lines. Today that's menu, x, plus, minus, check, chevrons and arrows; later play/pause, download/upload and equals. Objects like heart or gear can't morph cleanly and stay out.
- **Data**: generated from the existing `line.svg` files. The build reads each morph-group icon's straight segments and pads it to three, collapsing unused lines to invisible points. `meta.json` marks which icons rotate into each other (chevron right/left/up/down, plus and x), because rotating looks better than morphing between same-shape icons.
- **Component**: `<MorphIcon name={open ? "x" : "menu"} />`. Endpoints animate between icons; same-shape pairs rotate. Follows `size` and `strokeWidth`.
- **Reduced motion**: with `prefers-reduced-motion`, icons swap instantly.
- **Accessibility**: the button's label changes, never the icon's.
- **Lint rule**: morph-group icons must stay at three straight segments or fewer.
- **Test page** that plays every pair in the group, since whether a transition feels right needs a human eye.

Depends on `@nubo-icons/react`.

### More styles

- **Bold**: Line and Fill at a heavier weight, around 2.25px like Phosphor Bold. The first 18px "Soft" experiment showed how good a heavier weight looks.
- **Thin and Light**: lighter weights on the same drawings, with hand fixes where details close up.
- **Duo B ("body + accent")**: the two-tone look where one identifying part is dark and the body is light. Only if a rule can be found that works for every icon, including ones with no distinct part, like the heart.

### More frameworks and tools

Vue and Svelte packages, a Figma library, an MCP server so AI coding tools can find and insert icons.
