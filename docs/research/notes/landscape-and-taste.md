# Landscape, aesthetics ("taste") and project philosophy of open-source icon sets

Retrieval date for all live stats: **2026-10-09**. GitHub stars come from the GitHub REST API (`api.github.com/repos/<repo>`). npm downloads are for the week 2026-10-01 to 2026-10-07 (`api.npmjs.org/downloads/point/last-week/<pkg>`). Icon counts come from counting SVG files in the latest published npm package through the jsDelivr data API (`data.jsdelivr.com/v1/packages/npm/<pkg>@<ver>?structure=flat`). Grid and stroke values come from inspecting each package's actual `home`/`house` SVG on cdn.jsdelivr.net. Reproduce the stats with those endpoints; they are primary data, not taken from blog posts.

## Q1. Per-set facts: icon count, grid, stroke, styles, license, maintainers, start year, stars, downloads, funding

### Takeaway

Two clusters account for most of the market. The first is the "24px grid, 2px round-cap stroke" Feather lineage: Feather, Lucide and Tabler. It is effectively the default look of the React/shadcn web, and Lucide alone has about 108M weekly npm downloads, more than 10x any other dedicated set. The second is "multi-weight systems" (Phosphor, Material Symbols, Fluent, Hugeicons, Font Awesome), which win on flexibility and breadth. Lighter strokes (1.5px) are the main differentiator among the 24px line sets: Heroicons, Iconoir, Untitled UI and Hugeicons all use them.

### Cited Findings

**Summary table (retrieved 2026-10-09)**

| Set                                 | Icons (latest pkg)                                                                     | Grid / viewBox                          | Stroke                                       | Styles                                            | License                                                 | Stars                                 | npm weekly (pkg)                                                      |
| ----------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------- |
| Lucide                              | 2,134 (lucide-static 1.54.0)                                                           | 24                                      | 2px, round caps/joins                        | 1 (outline)                                       | ISC                                                     | 24,912                                | 108,346,342 (lucide-react)                                            |
| Feather                             | 287 (feather-icons 4.29.2)                                                             | 24                                      | 2px, round                                   | 1                                                 | MIT                                                     | 26,011                                | 254,768 (feather-icons) + 375,571 (react-feather)                     |
| Heroicons                           | 324 per style (2.2.0)                                                                  | 24 outline/solid, 20 mini, 16 micro     | 1.5px (outline)                              | 4                                                 | MIT                                                     | 23,863                                | 4,081,239 (@heroicons/react)                                          |
| Phosphor                            | 1,512 per weight (@phosphor-icons/core 2.1.1)                                          | designed at 16; SVG viewBox 256         | filled paths per weight                      | 6 weights                                         | MIT                                                     | 7,622 (homepage repo); 1,768 (react)  | 5,104,654 (@phosphor-icons/react)                                     |
| Tabler                              | 6,238 = 5,184 outline + 1,054 filled (3.49.0)                                          | 24                                      | 2px default (webfont also 1.5, 1)            | outline + filled                                  | MIT                                                     | 22,149                                | 3,560,828 (@tabler/icons-react)                                       |
| Radix Icons                         | 318 (react-icons 1.3.2)                                                                | **15x15**                               | filled paths                                 | 1                                                 | MIT                                                     | 2,696                                 | 5,248,988 (@radix-ui/react-icons)                                     |
| Material Symbols                    | 3,929 unique (7,858 files incl. -fill) in svg-400/outlined (0.48.0)                    | 24-based, viewBox 0 -960 960 960        | variable weight                              | 3 styles (Outlined/Rounded/Sharp) x variable axes | Apache-2.0                                              | 54,094 (google/material-design-icons) | 182,283 (@material-symbols/svg-400)                                   |
| Remix Icon                          | 3,229 files; 1,539 line + 1,539 fill pairs (4.9.1)                                     | 24                                      | filled outlines (line look built from fills) | line + fill                                       | Apache-2.0 (npm) / repo license "NOASSERTION" on GitHub | 8,400                                 | 179,985 (remixicon)                                                   |
| Iconoir                             | 1,383 regular (iconoir 7.12.1); README says "1600+"                                    | 24                                      | 1.5px                                        | regular + solid                                   | MIT                                                     | 4,574                                 | 145,819 (iconoir-react)                                               |
| Bootstrap Icons                     | 2,078 (1.13.2)                                                                         | **16**                                  | filled paths                                 | outline + fill variants as separate icons         | MIT                                                     | 8,138                                 | 809,457 (bootstrap-icons)                                             |
| Hugeicons (free)                    | ~5,100+ "stroke rounded" (FAQ); 6,073 module files in @hugeicons/core-free-icons 4.3.5 | 24                                      | stroke rounded                               | 1 free style; 10 styles in Pro                    | free for commercial use (npm packages MIT)              | 1,207 (hugeicons/hugeicons)           | 1,270,165 (@hugeicons/react) + 1,013,921 (@hugeicons/core-free-icons) |
| Fluent System Icons                 | 2,476 at 24 regular (@fluentui/svg-icons 1.1.344)                                      | multiple sizes (e.g. 16/20/24/28/32/48) | filled paths                                 | regular + filled (+ color, light in some)         | MIT                                                     | 10,884                                | 667,917 (@fluentui/react-icons)                                       |
| Octicons                            | 398 @16 / 364 @24 (19.40.0)                                                            | 16 and 24 (separately drawn)            | filled paths                                 | 1                                                 | MIT                                                     | 8,767                                 | 133,160 (@primer/octicons-react)                                      |
| Ionicons                            | 1,357 files = ~421 icons x outline/filled/sharp + logos (8.1.0)                        | viewBox 512                             | stroke (outline)                             | 3                                                 | MIT                                                     | 18,194                                | 792,125 (ionicons)                                                    |
| Font Awesome Free                   | 2,883 SVGs (2,001 solid) (7.3.1)                                                       | varies                                  | filled                                       | solid / regular / brands (free)                   | Icons CC BY 4.0, fonts OFL 1.1, code MIT                | 76,955                                | 2,817,236 (@fortawesome/fontawesome-free)                             |
| Simple Icons                        | 3,464 brands (16.34.0)                                                                 | 24, single path                         | filled mono                                  | 1                                                 | CC0-1.0                                                 | 25,986                                | 1,574,885 (simple-icons)                                              |
| Untitled UI Icons                   | 1,100+ free / 4,600+ Pro                                                               | 24                                      | line                                         | 1 free, 4 Pro                                     | free commercial use, no attribution                     | n/a                                   | 344,555 (@untitledui/icons)                                           |
| react-icons (aggregator, for scale) | n/a                                                                                    | n/a                                     | n/a                                          | n/a                                               | n/a                                                     | n/a                                   | 8,731,783                                                             |

Sources: [GitHub API](https://api.github.com/repos/lucide-icons/lucide), [npm downloads API](https://api.npmjs.org/downloads/point/last-week/lucide-react), [jsDelivr data API](https://data.jsdelivr.com/v1/packages/npm/lucide-static/resolved). Per-set SVGs inspected: [Lucide house](https://cdn.jsdelivr.net/npm/lucide-static/icons/house.svg), [Heroicons home](https://cdn.jsdelivr.net/npm/heroicons@2.2.0/24/outline/home.svg), [Iconoir home](https://cdn.jsdelivr.net/npm/iconoir@7.12.1/icons/regular/home.svg), [Phosphor house](https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/regular/house.svg), [Bootstrap house](https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/house.svg), [Octicons home-16](https://cdn.jsdelivr.net/npm/@primer/octicons/build/svg/home-16.svg), [Ionicons home-outline](https://cdn.jsdelivr.net/npm/ionicons/dist/svg/home-outline.svg), [Material home](https://cdn.jsdelivr.net/npm/@material-symbols/svg-400/outlined/home.svg), [Fluent home_24_regular](https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/home_24_regular.svg), [Remix home-line](https://cdn.jsdelivr.net/npm/remixicon/icons/Buildings/home-line.svg).

**Per-set notes**

- **Feather** was created by Cole Bemis. Its license credits "Copyright (c) 2013-present Cole Bemis". The repo was created 2014-05-28 and was last pushed 2025-03-11. — [Lucide/Feather license note via search](https://lucide.dev/guide/comparison); [GitHub API](https://api.github.com/repos/feathericons/feather)
- **Lucide** is a "community-driven fork" of Feather and is ISC-licensed. Its repo was created 2020-06-08. Eric Fennis (Netherlands) is the creator and maintainer. — [Lucide comparison](https://lucide.dev/guide/comparison); [ericfennis GitHub](https://github.com/ericfennis)
- Lucide's OpenCollective (EUR) reports 25 backers, a balance of about €2,100 and yearly income of about €3,060. The API returns these values in cents (balance 210080, yearlyIncome 306000), so they are small. — [OpenCollective API](https://opencollective.com/lucide-icons.json)
- Lucide's package is now at version 1.x (lucide-static 1.54.0), after years in 0.x. — [jsDelivr](https://data.jsdelivr.com/v1/packages/npm/lucide-static/resolved)
- **Heroicons** is made by "the makers of Tailwind CSS" (Tailwind Labs). It comes as 24 outline, 24 solid, 20 mini and 16 micro, under MIT. The repo was created 2020-02-24. — [Heroicons README](https://github.com/tailwindlabs/heroicons/blob/master/README.md)
- **Phosphor** is "a flexible icon family for interfaces, diagrams, presentations". It has six weights (Thin, Light, Regular, Bold, Fill, Duotone), is designed at 16x16 so it "read[s] well small and scale[s] up big", and keeps the raw stroke information so users can fine-tune it. It is MIT-licensed. — [Phosphor homepage README](https://github.com/phosphor-icons/homepage/blob/master/README.md)
- Phosphor is made by Helena Zhang and Tobias Fried, who also made the Departure Mono font. — [Changelog Interviews #618](https://changelog.com/news/two-tickets-for-departure-please-bORd)
- Phosphor's homepage repo was created 2020-07-14. — [GitHub API](https://api.github.com/repos/phosphor-icons/homepage)
- Phosphor takes donations through a Ko-fi page. — [Ko-fi](https://ko-fi.com/N4N618TKGC)
- **Tabler** has 6,238 icons, each "designed on a 24x24 grid with a 2px stroke". It is MIT-licensed and funded through GitHub Sponsors (codecalm, i.e. Paweł Kuna) and PayPal. Icon requests go through GitHub issues. — [Tabler README](https://github.com/tabler/tabler-icons/blob/main/README.md)
- **Iconoir** advertises 1600+ icons on a 24x24 grid under MIT. It is funded by Open Collective, which pays for "new icons, library maintenance and keeping the project sustainable". — [Iconoir README](https://github.com/iconoir-icons/iconoir/blob/main/README.md)
- Iconoir's OpenCollective reports 73 backers and yearly income of about $265 (the API value is in cents). — [OpenCollective API](https://opencollective.com/iconoir.json)
- **Material Symbols** is "the current set, introduced in April 2022, built on variable font technology". Material Icons "is the classic set, but no longer updated". There are three separate variable fonts (Outlined, Rounded, Sharp), each with design axes adjustable in CSS. Google excludes third-party logos "due to legal reasons". — [google/material-design-icons README](https://github.com/google/material-design-icons)
- **Hugeicons free tier**: 4,600+ (older FAQ) to 5,100+ (newer FAQ) "stroke rounded" icons, usable in unlimited personal and commercial projects. Pro offers 46,000 to 54,000+ icons in 10 styles, from about $99/yr. Pro Plus is listed at $1,197, with conflicting reports on whether that is yearly or one-time. — [Hugeicons FAQ](https://hugeicons.com/faq/general); [SaaSWorthy](https://www.saasworthy.com/product/hugeicons/pricing); [@hugeicons/react npm](https://npmjs.com/package/@hugeicons/react)
- **Font Awesome Free** has three licenses: icons (SVG/JS) are CC BY 4.0, fonts are SIL OFL 1.1, and code is MIT. — [FA Free LICENSE.txt](https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/LICENSE.txt)
- **Simple Icons** is CC0, at 3,464 brand icons. Each icon is 24x24, monochrome and a single path, and stores the brand hex color as metadata. — [Simple Icons CONTRIBUTING](https://github.com/simple-icons/simple-icons/blob/develop/CONTRIBUTING.md)
- **Untitled UI Icons**: 1,100+ free icons "for unlimited personal and commercial projects, without attribution". Pro has 4,600+ icons in 4 styles plus a private npm package. — [Untitled UI free icons](https://www.untitledui.com/free-icons/files)
- One third-party source says Untitled UI is maintained solely by Australian designer Jordan Hughes. This is unconfirmed on the official pages. — [Eagle community](https://community.eagle.cool/resource/untitle-clean-free-icons?groupId=2)
- **Central Icon System** (Iconists) is commercial, not open source. It has "over 1500 symbols in 30 variations each". — [Framer marketplace listing](https://www.framer.com/marketplace/plugins/central-icon-system-a5evtd58diraey2qo9pyzyhod/); [Raycast extension](https://www.raycast.com/tamino-martinius/central-icons)
- Repo creation dates are proxies for start year: Font Awesome 2012-02, Simple Icons 2012-11, Ionicons 2013-10, Material 2014-10, Octicons 2014-06, Feather 2014-05, Remix 2018-12, Iconoir 2018-03, Radix Icons 2019-05, Bootstrap Icons 2019-07, Heroicons 2020-02, Tabler 2020-02, Fluent 2020-05, Lucide 2020-06, Phosphor 2020-07, Hugeicons main repo 2024-02. — [GitHub API](https://api.github.com/repos/FortAwesome/Font-Awesome)
- Owners per GitHub org: Octicons belongs to GitHub/Primer, Fluent to Microsoft, Ionicons to the Ionic team, Bootstrap Icons to the Bootstrap team (twbs), Radix Icons to Radix/WorkOS, and Remix to Remix-Design. — [GitHub API](https://api.github.com/repos/primer/octicons)

### Inferences

- Lucide's 108M weekly downloads is a distribution effect. It is the default dependency of shadcn/ui and is pulled transitively into huge numbers of apps. The download count does not mean designers prefer it 20x over Phosphor.
- Radix Icons still gets about 5.2M weekly downloads despite only 318 icons and no growth. That is legacy shadcn "new-york" installs. Expect it to decay.
- Funding is thin everywhere in the pure-OSS model (Lucide about €3k/yr, Iconoir about $265/yr on OpenCollective). The sustainable models are a corporate parent (Google, Microsoft, GitHub, Tailwind, Bootstrap) or an open-core free tier upselling Pro (Hugeicons, Untitled UI, Font Awesome, Tabler's ecosystem).
- Grid choice signals intent. 24px is web/app UI. 16px (Bootstrap, Octicons, Phosphor's design grid) and 15px (Radix) are dense, small-size UI. Variable axes (Material) are system-level flexibility.

### Gaps

- Material Symbols axis ranges (FILL, wght, GRAD, opsz) were not captured verbatim from the README fetch; the README confirms the axes exist but not their values.
- No official per-year start dates beyond repo creation, which is a proxy. Phosphor's public launch is commonly cited as 2020, but no primary launch post was retrieved.
- Untitled UI stroke width, and the Fluent size list for every icon, were not verified directly.
- Hugeicons' 6,073 module files include index/helper files, so the exact free count is uncertain (the FAQ says 5,100+).

## Q2. Visual character: what makes each recognizable; geometric vs. humanist; corner radius; detail; critiques

### Takeaway

The Feather lineage (Feather, Lucide, Tabler) reads as friendly geometric: 2px centered strokes, round caps and joins, rounded corners, low detail. Heroicons and Iconoir are the lighter 1.5px versions of the same idea. Phosphor's identity is the weight system plus slightly softer, more illustrative forms. The filled-path sets (Bootstrap, Octicons, Fluent, Material, Remix) look more "system" or "product-native". The space between "Lucide 2px rounded" and "Material/Fluent system" is crowded. Distinct, unoccupied visual territory is scarce, so taste and coherence matter more than raw style.

### Cited Findings

- Lucide's design rules: 24x24 canvas only; at least 1px padding; 2px stroke and no mixed widths; centered strokes; round joins and caps. Corners get a 2px radius on shapes at least 8px, a 1px radius below 8px, and a 2.41px (1+√2) radius where diagonals meet at a right angle. Don't round corners where more than two lines meet. Keep at least 2px between distinct elements and at least 2px inside shapes. Match the visual weight of circle and square using a "blur test". Keep detail density low. Prefer simple arcs and quadratic curves. Reuse base shapes exactly, and keep add-on modifiers consistent in placement and size. "Consistency should not override clarity, balance, or readability." — [Lucide icon design guide](https://lucide.dev/contribute/icon-design-guide)
- Feather and Lucide SVGs share identical root attributes (`stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`, 24 viewBox). Tabler uses the same attributes, which is why Tabler drops into shadcn without a visual mismatch. — [Feather home.svg](https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/home.svg); [Tabler home.svg](https://cdn.jsdelivr.net/npm/@tabler/icons/icons/outline/home.svg); [allsvgicons Tabler vs Lucide](https://www.allsvgicons.com/compare/tabler-vs-lucide/)
- Heroicons v2 outline and Iconoir regular both use `stroke-width="1.5"` on a 24 grid, a lighter and more refined texture than Feather/Lucide. — [Heroicons home](https://cdn.jsdelivr.net/npm/heroicons@2.2.0/24/outline/home.svg); [Iconoir home](https://cdn.jsdelivr.net/npm/iconoir@7.12.1/icons/regular/home.svg)
- Phosphor ships weights as pre-expanded filled paths on a 256 viewBox rather than live strokes. Its signature is that "every single icon comes in six styles". — [Phosphor house.svg](https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/regular/house.svg); [DEV comparison](https://dev.to/svgicons/lucide-vs-tabler-vs-phosphor-which-free-icon-set-fits-your-ui-4ocl)
- Phosphor is designed at 16x16 "instead of the standard 24x24" so icons "remain crisp and readable even at smaller sizes". — [UI UX Showcase](https://uiuxshowcase.com/resources/phosphor-icon-set/)
- Remix's "line" style is drawn as filled outline paths, not strokes. The visual weight is fixed and cannot be restyled with stroke-width. — [Remix home-line.svg](https://cdn.jsdelivr.net/npm/remixicon/icons/Buildings/home-line.svg)
- Octicons draws 16 and 24 sizes separately (398 vs 364 icons) rather than scaling, a pixel-hinting philosophy. — [jsDelivr count, @primer/octicons 19.40.0](https://data.jsdelivr.com/v1/packages/npm/@primer/octicons@19.40.0?structure=flat)
- Comparison blogs give the usual split: Heroicons for Tailwind, Phosphor for weight variety, Tabler for breadth ("yet to search for an icon in Tabler and come up empty"), and Lucide as the general default. Heroicons is the smallest at about 300 per style. — [DEV/svgicons comparison](https://dev.to/svgicons/lucide-vs-tabler-vs-phosphor-which-free-icon-set-fits-your-ui-4ocl); [PkgPulse](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026)
- PkgPulse credits Lucide's review process with keeping new icons cohesive, "unlike some icon sets that feel inconsistent because contributors have varying design skill". — [PkgPulse](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026)
- Critiques from the HN Feather thread:
  - A Lucide duplicate (signal-zero and signal-low) took six months to fix.
  - Scissors are drawn with finger holes too large to cut.
  - Butterflies are typically drawn "dead" (pinned specimen pose).
  - The floppy-disk save icon persists.
  - "It's like the whole web has come to the conclusion that icons have to be monochrome and boring."
  - "It's so hard to tell the difference between all the different icon libraries."

  — [HN: Feather](https://news.ycombinator.com/item?id=33223964)

- A Feather contributor admitted breaking the constraints on the RSS icon because "it looks much nicer this way", an example of optical judgment overriding rules. — [HN: Feather](https://news.ycombinator.com/item?id=33223964)

### Inferences

- "Sameness" is the dominant complaint: the 2px-rounded-stroke look is ubiquitous. A new set differentiates through a deliberate, legible point of view, such as a distinct stroke weight (e.g. 1.75 or 1.5), a corner philosophy, a metaphor vocabulary or small-size hinting. Adding another Feather clone does not.
- The craft details designers notice are semantic accuracy (functional scissors), duplicates, optical balance and modifier consistency, not raw count.
- Fixed-weight filled outlines (Remix, Bootstrap, Fluent) trade restylability for precision at the target size. Live strokes (Lucide, Tabler) trade small-size crispness for user control of stroke-width.

### Gaps

- No rigorous survey of designer sentiment exists; evidence is anecdotal (HN threads, blogs). No Reddit or X/Twitter designer threads were retrieved in this pass.
- No authoritative source classifies each set as "geometric vs. humanist". The characterization above is inference from the specs.

## Q3. Governance: requests, design, review, acceptance, naming, aliases, tagging, deprecation

### Takeaway

Governance falls on a spectrum. At one end are closed or curated sets (Heroicons accepts no new icons; corporate sets like Material, Fluent and Octicons are internal). In the middle are maintainer-led sets that take issue requests (Tabler, Phosphor, Iconoir). Lucide is the most formalized community model: a written design guide, per-icon JSON metadata with contributors, tags, categories and deprecated aliases, plus tooling. Simple Icons has the most rigorous scope rules, with objective popularity thresholds and legal checks.

### Cited Findings

- **Lucide requests**: search first and 👍 existing requests; otherwise file an "icon request" issue from the template. Old Feather requests are tracked in issue #119 as a backlog for designers. — [Lucide CONTRIBUTING](https://github.com/lucide-icons/lucide/blob/main/CONTRIBUTING.md)
- **Lucide design and PRs**: icons must follow the design guide. Lucide Studio (a web SVG editor), plus Illustrator, Inkscape, Figma and Affinity guides, are provided. PRs must contain only related icons (e.g. a bicycle separate from arrows) and include screenshots; unrelated commits get the PR rejected. SVGs in `icons/` are the single source of truth, and build scripts generate every framework package. — [Lucide CONTRIBUTING](https://github.com/lucide-icons/lucide/blob/main/CONTRIBUTING.md)
- **Lucide metadata**: each icon has a JSON sidecar with `contributors`, `tags`, `categories`, `use-cases` and `aliases`. Each alias carries `deprecated: true` and a `deprecationReason`.
  - `house.json`: tags home/living/building/residence/architecture; categories buildings/home/navigation; deprecated alias `home`.
  - `circle-check.json`: deprecated alias `check-circle-2`. This shows a rename convention of shape-first then modifier.

  — [house.json](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/house.json); [circle-check.json](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/circle-check.json)

- Lucide's own guide says that at the fork it "removed no icons from Feather, but some were renamed". — [Lucide comparison](https://lucide.dev/guide/comparison)
- Lucide's key contributors include karsa-mistmere and jguddas, who regularly add icons and maintain design quality. — [via search summary of uiuxshowcase/PkgPulse](https://uiuxshowcase.com/resources/lucide-icon/); corroborated by the contributor fields in [house.json](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/house.json)
- **Heroicons** accepts contributions only for bugs (e.g. wrong TS types, a fill instead of a stroke). It does not accept new icons or new framework ports, and suggests people publish their own libraries. — [Heroicons README](https://github.com/tailwindlabs/heroicons/blob/master/README.md)
- **Tabler**: bug reports and icon requests go through GitHub issues, and releases are tracked in a public changelog. — [Tabler README](https://github.com/tabler/tabler-icons/blob/main/README.md)
- **Simple Icons** governance:
  - **Popularity**: the brand must be at least one year old and meet one metric. Options include a Traffic.cv global rank in the top 500k (750k for existing icons), an app top-1k ranking, package-download thresholds, Fediverse MAU, Google Trends comparison, or, as a last resort, GitHub stars.
  - **Exclusions**: military, government, religious, sports-club and individual brands are excluded, and there is a "forbidden" list of brands with protective policies.
  - **Sources**: official sources are preferred, and ®/™ rules apply.
  - **File format**: a single `path` on 24x24 touching at least two sides, SVGO, three-decimal precision, and `role="img"` with a `<title>`.
  - **Naming**: lowercase Latin filenames, with `+` written as "plus", `.` as "dot" and `&` as "and".
  - **Process**: one icon per PR, AI-use disclosure required, and brand-affiliation disclosure.
  - **Deprecation**: old names "may be kept indefinitely but can be removed at any time".

  — [Simple Icons CONTRIBUTING](https://github.com/simple-icons/simple-icons/blob/develop/CONTRIBUTING.md)

- **Material** removes third-party logos for legal reasons and froze the classic Material Icons in favor of Symbols. That is deprecation by product replacement. — [material-design-icons README](https://github.com/google/material-design-icons)

### Inferences

- Lucide's tooling should be adopted as table stakes: JSON sidecars with tags, categories and deprecated aliases with reasons, a single SVG source of truth with generated packages, a published design guide with numeric rules, and an online editor.
- A curated or closed model (Heroicons) preserves taste but caps scope. An open model (Lucide) scales scope but needs an enforceable written guide and strong reviewer-maintainers to stay coherent.
- Simple Icons shows that objective, written acceptance criteria defuse "why wasn't my icon added" conflict. An equivalent scope policy, stating what concepts the set covers and what it won't, would serve a new set well.

### Gaps

- Lucide's separate naming-conventions page returned 404 at the guessed URL and wasn't retrieved. Its formal rules (e.g. shape-first naming, no brand names) are unconfirmed here, beyond what the alias examples show.
- Phosphor, Iconoir, Remix, Fluent, Octicons and Ionicons review processes were not retrieved in detail.

## Q4. Why some sets won (Lucide/shadcn) and others stagnated (Feather); community sentiment

### Takeaway

Feather stagnated because a single maintainer stopped merging: 300+ open issues and 100+ open PRs. Lucide won by forking with the same aesthetic plus open governance, and then by becoming the default of shadcn/ui, a powerful distribution channel. Radix Icons was the previous shadcn new-york default and is now frozen. Stagnation (Feather, Remix, Radix) is punished. Breadth (Tabler, Hugeicons) and distribution defaults are rewarded.

### Cited Findings

- Lucide was forked from frustration with how Feather was moderated. Feather "had more than 300 open issues and over 100 open pull requests" and "is abandoned and no longer actively maintained", and contributors had no realistic chance of PRs being merged. Lucide's goals were to "grow the icon set while keeping Feather's minimalist style" and be community-driven. — [Lucide comparison](https://lucide.dev/guide/comparison)
- Feather issue #1110 (Sep 2021) asked how to contribute icons and got no maintainer reply. A commenter in Nov 2021 said "Feather icons is no longer active" and pointed to Lucide. — [Feather #1110](https://github.com/feathericons/feather/issues/1110)
- Feather stars (26,011) still slightly exceed Lucide's (24,912), but Lucide's weekly downloads are about 108M vs. about 0.63M for feather-icons plus react-feather combined (2026-10-09). — [GitHub API](https://api.github.com/repos/feathericons/feather); [npm API](https://api.npmjs.org/downloads/point/last-week/lucide-react)
- In November 2024 shadcn/ui's new-york style switched to Lucide as the default icon set (it previously used Radix Icons). New projects use Lucide, existing projects are unaffected, and the CLI can optionally migrate primitives. — [shadcn changelog 2024-11](https://ui.shadcn.com/docs/changelog/2024-11-icons); [shadcn on X](https://x.com/shadcn/status/1853902179041702169)
- shadcn docs list the Lucide package as 1,600+ icons under ISC and reference an `iconLibrary` setting in components.json. The fetched components.json page did not list it, so this is a conflict between sources. — [search summary of shadcn docs](https://ui.shadcn.com/docs/changelog/2024-11-icons); not confirmed on [components.json docs](https://ui.shadcn.com/docs/components-json)
- Third-party guides say shadcn's built-in components (Select chevron, Checkbox check) import from lucide-react, and Tabler is the common swap-in because of identical 24/2px language. — [allsvgicons shadcn guide](https://www.allsvgicons.com/compare/best-svg-icons-for-shadcn-ui/)
- The ecosystem is now built around Lucide. HN Show HN posts present animated icon libraries as "drop-in replacement for lucide icons", and icon pickers offer "Full Lucide support". — [HN Show HN Vue animated icons](https://news.ycombinator.com/item?id=48395648); [HN shadcn icon picker](https://news.ycombinator.com/item?id=45179782)
- HN sentiment (2022): Feather is loved but "needs way way more icons". Lucide is "a very active fork". Remix Icon was praised but "hasn't seen any updates in quite a while". — [HN: Feather](https://news.ycombinator.com/item?id=33223964)
- Release activity: Lucide, Tabler, Bootstrap, Fluent and Material were all pushed within days of 2026-10-09. Feather's last push was 2025-03. Radix Icons' last push was 2026-04, and its React package is still 1.3.2. — [GitHub API](https://api.github.com/repos/radix-ui/icons)
- Hugeicons reached about 2.3M weekly downloads (react + core-free) within about two years of its main repo appearing (2024-02), which makes it the fastest-growing open-core entrant. — [npm API](https://api.npmjs.org/downloads/point/last-week/@hugeicons/react); [GitHub API](https://api.github.com/repos/hugeicons/hugeicons)

### Inferences

- The winning formula is a familiar aesthetic, responsive governance, framework-native packages for every stack, and a default slot in a popular UI kit. For a new set, distribution (being the default or an easy swap in shadcn, Tailwind or other kits, with matching names and API) is likely as decisive as design quality.
- Matching Lucide's component API and naming (or providing a compat map) lowers the switching cost. The shadcn ecosystem already treats "drop-in Lucide replacement" as a feature.
- Bus factor is the main stagnation risk (Feather). A new project should plan for multiple maintainers and a written guide early.

### Gaps

- shadcn's exact rationale for switching from Radix to Lucide (in the X thread) was not retrieved verbatim.
- No Reddit or X/Twitter sentiment sampling was done beyond HN. No time-series download data (npmtrends) was pulled, only the current week.

## Q5. Lessons on taste: restraint, coherence, scope control, praise and complaints

### Takeaway

The sets designers praise share a small, strictly enforced rulebook (Lucide's numeric guide), visual continuity (reusing base shapes and modifiers exactly), and a clear scope boundary (Heroicons' closed set, Simple Icons' objective criteria). Complaints center on sameness across libraries, duplicates and inconsistencies, semantically wrong metaphors, stagnation, and loss of personality. That leaves room for a set with a specific, defensible point of view and impeccable consistency.

### Cited Findings

- Restraint is codified: "Keep detail density low. Simplify while keeping recognizable features. Blur test: dark areas suggest too much detail." — [Lucide design guide](https://lucide.dev/contribute/icon-design-guide)
- Coherence is codified: "Reuse existing base icons exactly. Don't change geometry, placement, or orientation of base shapes… Keep add-ons consistent in placement and size across the library", tempered by "Consistency should not override clarity, balance, or readability." — [Lucide design guide](https://lucide.dev/contribute/icon-design-guide)
- Scope control by refusal: Heroicons accepts no new icons and stays at about 324 per style, yet has 4.1M weekly downloads. — [Heroicons README](https://github.com/tailwindlabs/heroicons/blob/master/README.md); [npm API](https://api.npmjs.org/downloads/point/last-week/@heroicons/react)
- Scope control by objective criteria: Simple Icons' popularity thresholds and exclusion lists. — [Simple Icons CONTRIBUTING](https://github.com/simple-icons/simple-icons/blob/develop/CONTRIBUTING.md)
- Flexibility as taste: Phosphor's six weights and keeping "raw stroke information so you can fine-tune the style". — [Phosphor README](https://github.com/phosphor-icons/homepage/blob/master/README.md)
- Complaint: monochrome sameness and lost personality ("whole web has come to the conclusion that icons have to be monochrome and boring"), with nostalgia for Silk-era icons. — [HN: Feather](https://news.ycombinator.com/item?id=33223964)
- Complaint: the libraries are hard to tell apart. — [HN: Feather](https://news.ycombinator.com/item?id=33223964)

### Inferences

Inferred niches for nubo-icons:

- **Lighter stroke (1.5px) with an open, community-reviewed model.** Heroicons has the refined 1.5px look but is closed and small (324). Iconoir is 1.5px and open but small-funded and about 1.4k icons. There is room for a high-craft, 1.5px-default, actively governed set.
- **Small-size-first hinting.** Only Octicons draws separate 16/24 masters, and Radix (15px) is stagnant. A set with optically hinted 16 and 20 masters plus 24 would serve dense UIs.
- **Restrained personality.** One subtle signature (e.g. a corner or terminal treatment, or a "nubo"/cloud-soft radius system) applied consistently. Personality comes from rules, not decoration.
- **Lucide-compatible names and API** to ride the shadcn distribution channel, plus Lucide-style metadata (tags, categories, deprecated aliases).
- **Explicit scope policy** (what the set will and won't draw), as Simple Icons does, to avoid Tabler-style breadth sprawl and Feather-style neglect.

Tooling to adopt: a numeric design guide, a blur-test checklist, JSON sidecar metadata, a single SVG source with generated packages, and an online editor or preview to keep contributions coherent.

### Gaps

- No quantitative study of which visual attributes designers prefer was found; the lessons above are synthesized from project docs and anecdotal threads.
- Designer-blog critiques of specific sets (e.g. Tabler's consistency at 6k+ icons, Hugeicons' quality) were not found in this pass and would strengthen the analysis.
