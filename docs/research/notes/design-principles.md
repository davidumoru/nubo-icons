# UI Icon Design Principles and Process (for nubo-icons)

Research date: 2026-10-09. Primary sources were fetched directly where possible (raw GitHub docs, static HTML). JS-rendered pages (m3.material.io, developer.apple.com HIG/SF Symbols, phosphoricons.com, Carbon "design" page) could not be read; those gaps are listed explicitly.

## 1. Grids and keylines: canvas sizes, live area/padding, keyline shapes

### Takeaway

The dominant conventions are a 24px canvas with 2px padding (20px live area) for general UI sets (Material, Lucide, Feather, Tabler, Heroicons) and a 16px canvas with 1px padding (14px live area) for dense product UIs (GitLab, Atlassian). IBM draws at 32px and scales down linearly; Fluent and Heroicons draw separate masters per size. Keyline shapes (circle > square, plus portrait and landscape rectangles) exist to equalize optical size, and every system treats them as guides, not hard limits.

### Cited Findings

- **Material (legacy system-icon spec, still the reference most sets copy):** system icons display at 24dp, designed at 100% scale for pixel accuracy; dense desktop layouts may use 20dp. Content sits in a 20×20dp live area; dense icons use a 16×16dp live area with 2dp padding. Content "should only extend into the padding between the live and trim areas if additional visual weight is needed." — [Material Design v1 Icons](https://m1.material.io/style/icons.html)
  - Note: the same page says "20dp x 20dp live area, with 4dp of padding around the perimeter" and "4px of empty space makes up the padding". On a 24dp canvas that is 4dp total, 2dp per side. Third-party restatements give 2dp per side. — [Material v1](https://m1.material.io/style/icons.html); [UX Planet tutorial](https://uxplanet.org/learn-how-i-design-icons-for-ui-bd8cbd4f4f80)
  - Keyline shapes on the 24dp grid: square 18×18dp, circle 20dp diameter, vertical rectangle 16w×20h dp, horizontal rectangle 20w×16h dp. The geometry presets are "circle, square, rectangle, orthogonals, and diagonals". — [Material v1](https://m1.material.io/style/icons.html)
  - Product (app) icons use a 48dp grid, drawn at 192dp (400%). Keylines at that scale: square 152, circle 176, rectangles 128×176 and 176×128. — [Material v1](https://m1.material.io/style/icons.html)
  - Clearance: a 24dp icon gets a 48dp touch target; a 20dp dense icon gets 40dp. — [Material v1](https://m1.material.io/style/icons.html)
- **IBM / Carbon:** icons are "drawn on a pixel-based grid of 32px x 32px and scaled down linearly to different sizes", with 2px padding. Art may extend into the padding only "for additional visual weight or for specific details." Key shapes: "Use the key shapes that best demonstrate the proportion of the metaphor"; "Extend content beyond the key shapes for proper form if needed"; "Don't force the content to fit inside the key shapes." — [IBM Design Language, UI icons: Design](https://www.ibm.com/design/language/iconography/ui-icons/design/)
  - Carbon usage: 16px artboards are the component default, with 20, 24 and 32 also allowed. 16 and 20 pair with 14 and 16px IBM Plex text. Interactive icons need a touch target of at least 44px. — [Carbon icons usage](https://carbondesignsystem.com/elements/icons/usage/)
- **Lucide:** "Icons must be designed on a 24 × 24-pixel canvas", square, and "Icon strokes must remain at least 1 pixel from the edge of the canvas". The edge-to-stroke gap is 1px; with a centered 2px stroke the geometry sits 2px in. — [Lucide icon design specification](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/specification.md)
- **GitLab Pajamas:** 16px is the default size: a 14×14 live area with 1px padding. A 12px grid (10×10 live area, 1px padding) is used for status icons. The keyline grid is "a starting point and guide, but not a hard rule… Squares can fill the live area, while circles and rectangles can extend into the padding." Icons should be used at their drawn size and not scaled. — [GitLab Pajamas Iconography](https://design.gitlab.com/product-foundations/iconography)
- **Atlassian:** system icons are drawn in a 16×16 bounding box. Medium (16px) is the default; small (12px) is downscaled from 16 and limited to chevrons, status icons and small contained elements. — [Atlassian Iconography](https://atlassian.design/foundations/iconography)
- **Microsoft Fluent System Icons:** each icon is shipped as separate drawings per size. For example, "Add Circle" metadata lists sizes 12, 16, 20, 24, 28, 32 and 48, styles Regular and Filled, plus a "metaphor" keyword array. — [Fluent metadata.json for Add Circle](https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Add%20Circle/metadata.json)
  - Fluent 2 guidance: 12px icons are "generally too small for interactions" and should be used for information only. — [Fluent 2 Iconography](https://fluent2.microsoft.design/iconography)
- **Heroicons:** ships separate masters: 24×24 outline, 24×24 solid, 20×20 solid ("mini") and 16×16 solid ("micro"). — [Heroicons README](https://github.com/tailwindlabs/heroicons)
- **Phosphor:** "Designed at 16 x 16px to read well small and scale up big", but the SVGs use a 256×256 viewBox (16 units per px at 16px). — [Phosphor homepage README](https://github.com/phosphor-icons/homepage); [Phosphor core SVG (thin/house)](https://unpkg.com/@phosphor-icons/core@2.1.1/assets/thin/house-thin.svg)
- **Feather / Tabler:** 24×24 grid with a 2px stroke. — [Feather README](https://github.com/feathericons/feather); [Tabler Icons README](https://github.com/tabler/tabler-icons)
- **Practitioner (Tatsiana Tarkan, Smashing 2024):** one primary size should cover up to 90% of icons (24px in her system). Other sizes change in 4px steps (24 → 20 → 16 → 12, or 28, 32). Pick the live-area shape (circle, square, vertical or horizontal rectangle) before drawing. — [Smashing Magazine, "Iconography In Design Systems"](https://www.smashingmagazine.com/2024/04/iconography-design-systems-troubleshooting-maintenance/)

### Inferences

- For a general-purpose OSS set, a 24px canvas with 2px padding is the interoperable default: Lucide, Feather, Tabler, Heroicons and Material all use it, so users can swap sets with no layout changes. If nubo targets dense apps, add a separately drawn 16px master (Heroicons, Fluent and GitLab practice) rather than only scaling 24 down.
- Material's keyline proportions (circle 20, square 18, rectangles 16×20) are the de-facto standard for optical equalization at 24px and can be adopted directly.

### Gaps

- Could not render the current M3 / Material Symbols design page (m3.material.io is JS-only). The M3 keyline values were not confirmed, though Material Symbols is understood to reuse the same 24dp, 20dp-live-area system.
- Apple SF Symbols template metrics (margins, cap height alignment) could not be fetched from developer.apple.com. From training knowledge only (unverified): symbols come in 9 weights × 3 scales and align to text cap height and baseline, and custom symbol templates are drawn as Ultralight, Regular and Black masters that are then interpolated.
- Could not retrieve Phosphor's own published design rules (keylines and padding); only grid and stroke data from the SVGs and README.

## 2. Stroke weights, corner radii, caps/joins, pixel snapping, optical sizing and correction

### Takeaway

At 24px the field splits into 2px strokes (Material, Lucide, Feather, Tabler, IBM at 32→ scaled) and 1.5px strokes (Heroicons v2, GitLab and Atlassian at 16px; Phosphor Regular = 1.5px at 24). Cap and join choice is a major personality signal: round caps and joins read as friendly (Lucide, Feather, Tabler, GitLab), square caps and terminals read as crisp or engineered (Material, IBM, Atlassian). A 2px exterior corner radius is near-universal. Pixel snapping matters but is subordinate to visual quality. Real optical sizing means redrawing or adjusting stroke per size; it is not scaling.

### Cited Findings

- **Stroke:**
  - Material: "Maintain a 2dp width for all stroke instances, including curves, angles, and both interior and exterior strokes." Optical exceptions exist: the paperclip uses 1.5dp to fit multiple curves, and the microphone's sound waves use 1.5dp. Don't use "delicate, thin stroke weights." — [Material v1](https://m1.material.io/style/icons.html)
  - IBM: "Use a 2px stroke for all icons… A single icon shouldn't contain a mix of different stroke weights." Exceptions are allowed only for complex or unusually dense icons. — [IBM UI icons: Design](https://www.ibm.com/design/language/iconography/ui-icons/design/)
  - Lucide: "Strokes must be 2 pixels wide", centered on the path. Inside and outside strokes are banned because "They change how line joins appear, creating sharp inner corners." — [Lucide design principles](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/design-principles.md)
  - GitLab: "Nearly all UI icons use a 1.5px stroke weight" at 16px, because it is "similarly weighted to regular system font weights at body text sizes" and leaves room for detail and spacing. — [GitLab Pajamas](https://design.gitlab.com/product-foundations/iconography)
  - Atlassian: "1.5px stroke width with shapes that pair rounded corners with sharp interior corners and square line caps." — [Atlassian Iconography](https://atlassian.design/foundations/iconography)
  - Heroicons v2 outline: `stroke-width="1.5"` on a 24 viewBox, round caps and joins. — [Heroicons SVG (academic-cap)](https://unpkg.com/heroicons@2.2.0/24/outline/academic-cap.svg)
  - Phosphor: Regular is 16/256-unit strokes (1px at 16px) and Bold is 24/256. Thin, Light, Regular, Bold, Fill and Duotone are the six weights. — [elmeragroup/fuse PR #207](https://github.com/elmeragroup/fuse/pull/207); [Phosphor README](https://github.com/phosphor-icons/homepage)
  - Tabler exposes stroke width as a runtime CSS/prop (e.g. `stroke-width: 1.5`) and ships a "nostroke" sprite without a fixed width. — [Tabler README](https://github.com/tabler/tabler-icons)
- **Caps and joins:**
  - Lucide: round joins and round caps are required. "Round joins do not replace corner rounding." — [Lucide design principles](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/design-principles.md)
  - Material: "Do use consistent stroke weights and squared stroke terminals. Don't use… rounded stroke terminals." — [Material v1](https://m1.material.io/style/icons.html)
  - IBM: style is derived from IBM Plex: "Rounded exteriors with 90° interiors", "Distinctive point on tips", "Slab characteristics", "Square caps"; "Use square arrow tips." — [IBM UI icons: Design](https://www.ibm.com/design/language/iconography/ui-icons/design/)
  - GitLab: round caps by default, "unless doing so would misrepresent the metaphor, or if you are trying to infer depth or element clipping". Joins depend on meaning: "a checkmark is one continuous object and the round line infers fluidity, whereas clock hands are two joined objects and a miter join defines a joint." Use square caps to show clipping or layering. — [GitLab Pajamas](https://design.gitlab.com/product-foundations/iconography)
- **Corner radii:**
  - Material: 2dp radius on the silhouette. "Do not round the corners of strokes (shapes 2dp wide or less)." "Interior corners should be square." — [Material v1](https://m1.material.io/style/icons.html)
  - IBM: 2px radius by default, increased "by a multiple of two when necessary". Use square corners when the real object has them. — [IBM UI icons: Design](https://www.ibm.com/design/language/iconography/ui-icons/design/)
  - Lucide: 2px radius for 90° corners on elements ≥8px, 1px for elements <8px. Diagonals meeting at 90° use about 2.41px (1+√2) to stay on grid. Acute corners still get some rounding. Keep corners sharp "where multiple lines meet" so the icon scales well. — [Lucide spec](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/specification.md)
  - GitLab: 2px is the default, 2px and 4px are combined where elements must fit together, and 1px suits angles under 90°. "Clarity should always override consistency." — [GitLab Pajamas](https://design.gitlab.com/product-foundations/iconography)
- **Angles:** IBM: "Use 45° angles for even anti-aliasing. Use increments of 15° whenever possible for other needed angles", but "Don't use 45° angles exclusively for all icons. It won't work." GitLab also specifies 15° increments. — [IBM](https://www.ibm.com/design/language/iconography/ui-icons/design/); [GitLab](https://design.gitlab.com/product-foundations/iconography)
- **Pixel snapping vs sub-pixel:**
  - Material: position icons "on pixel": X and Y are integers, and width equals height. — [Material v1](https://m1.material.io/style/icons.html)
  - IBM production rules: whole pixels only, "No decimals are allowed in coordinates or in width and height fields". Avoid the line tool (it lands on half pixels) and "Never use center borders". Expand strokes and combine shapes before delivery. Put arrow points and at least one point of angled caps on the grid. — [IBM UI icons: Contribute](https://www.ibm.com/design/language/iconography/ui-icons/contribute/); [IBM Design](https://www.ibm.com/design/language/iconography/ui-icons/design/)
  - Lucide (the opposite stroke philosophy, keeping live centered strokes): "Coordinates should align to the pixel grid where possible… Pixel alignment should not take precedence over the visual quality of the icon." Prefer arcs and quadratic Béziers, and avoid unnecessary control points. — [Lucide spec](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/specification.md)
  - GitLab: outside edges of closed shapes align to whole pixels. A line has at least one edge on a whole pixel and end points on whole pixels. Curves and diagonals may go off-grid because "it's better for the element to feel natural rather than forced." — [GitLab Pajamas](https://design.gitlab.com/product-foundations/iconography)
- **Spacing and counters:** Lucide requires at least 2px between distinct elements and in inner gaps. The test is that a 2px circle fits without overlapping. — [Lucide design principles](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/design-principles.md). GitLab accepts a 1px gap but prefers 2px, and says to "Remove or close counters that are less than 1px". — [GitLab](https://design.gitlab.com/product-foundations/iconography)
- **Optical correction and balance:**
  - The keyline sizes themselves are the correction: Material's circle is 20dp and its square 18dp. — [Material v1](https://m1.material.io/style/icons.html)
  - Lucide: icons "should have a visual weight similar to the circle and square icons". Asymmetrical icons "may be moved slightly off center so they look visually centered", while symmetrical icons are geometrically centered. — [Lucide spec](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/specification.md)
  - GitLab: "More detail equals more visual weight… Try offsetting this by simplifying detailed icons. Rotate narrow icons 45º, which gives them more visual weight." Optical adjustment can override the grid. — [GitLab](https://design.gitlab.com/product-foundations/iconography)
  - Material: optical corrections must "only use the consistent geometric forms… Don't skew or distort the forms." — [Material v1](https://m1.material.io/style/icons.html)
- **Optical sizing:**
  - Material Symbols is a variable font with axes FILL 0–1, wght 100–700 (default 400), GRAD (−50 to 200, e.g. −25 for light-on-dark, 200 for emphasis) and opsz 20–48dp, which "automatically adjust[s] the stroke weight when you increase or decrease the symbol size." — [Google Fonts: Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
  - Fluent redraws every icon at 12/16/20/24/28/32/48. — [Fluent metadata](https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Add%20Circle/metadata.json)
  - Fluent product icons: below 48px "detail is simplified for readability"; use specific sizes rather than scaling. — [Fluent 2](https://fluent2.microsoft.design/iconography)
  - GitLab: "icons should be used at the size they were created at and not scaled." — [GitLab](https://design.gitlab.com/product-foundations/iconography)

### Inferences

- Decide the stroke philosophy early, because it drives tooling. Live centered strokes (Lucide, Tabler, Feather) give users a runtime `stroke-width` knob, but it is hard to keep perfectly pixel-snapped. Expanded, outlined strokes (IBM, Material, Phosphor's thin SVGs ship as fills) are crisper and lock the weight.
- A 2px stroke at 24px renders as 1.33px at 16px, which is why Phosphor's PR author noted Lucide looks heavier. If nubo ships a single 24 master with a fixed 2px stroke, consider a separately tuned 16px or a stroke-width prop.
- Round versus square terminals is the cheapest, most visible personality decision. Square terminals make a set read as more "engineered" (Material, IBM, Atlassian), and round ones make it friendlier (Lucide, Feather, GitLab).

### Gaps

- Phosphor Thin and Light stroke values (often quoted as 8 and 12 per 256) are unverified.
- Apple's SF Symbols stroke and weight interpolation rules could not be fetched (JS-rendered docs).
- No quantitative perceptual study was found on circle/square size ratios beyond the design-system specs.

## 3. Metaphor selection

### Takeaway

Teams favor established, literal, object-based metaphors over novelty. They name icons after what is depicted, not their function, so one glyph can serve many contexts. They avoid antiquated objects when a modern equivalent is recognizable, while keeping entrenched conventions (the floppy disk for save) because recognition beats accuracy. Only a handful of icons are truly universal, so labels and testing remain essential.

### Cited Findings

- Atlassian: "Design icons that use widely recognized symbols and established visual metaphors… avoiding specific cultural or language aspects"; "Use caution when creating an icon that isn't a widely recognized symbol." — [Atlassian Iconography](https://atlassian.design/foundations/iconography)
- Fluent 2: icons are "literal metaphors named for the shape or object they depict, not the function they perform (e.g., 'Shield,' not 'Security')." Cultural meanings vary, so validate symbols in context. — [Fluent 2 Iconography](https://fluent2.microsoft.design/iconography)
- Lucide naming: "Icon names must describe what the icon shows, not how someone might use it". The floppy disk is named `save` only for legacy reasons, and its metadata tags it "floppy disk". — [Lucide naming conventions](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/naming-conventions.md); [Lucide save.json](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/save.json)
- GitLab: "Try to avoid potentially antiquated concepts, especially when something more modern is recognizable" (a flat screen, not an old tube TV). "Specific meaning, specific icon": don't reuse one icon for unrelated concepts or use several icons for one meaning. Prefer positive or neutral metaphors and "Avoid concepts related to violence". Style must serve the concept: a shield with crisp corners conveys robustness, and a table icon has 90° corners because product tables do. — [GitLab Pajamas](https://design.gitlab.com/product-foundations/iconography)
- IBM: icons "should be understandable by a global audience of users, regardless of nationality or language"; third-party icons need the owner's permission. — [IBM Contribute](https://www.ibm.com/design/language/iconography/ui-icons/contribute/)
- Nielsen Norman Group (Aurora Harley, 2014): universal icons are rare (home, print, magnifying-glass search). Hearts and stars have inconsistent meanings, and an obscure clock-for-history icon went unclicked by every participant ("Obscure icon = wasted feature"). An envelope works internationally for email, but mailboxes vary by country. If finding a metaphor takes more than 5 seconds, it likely won't communicate. Labels should be visible at all times. — [NN/g Icon Usability](https://www.nngroup.com/articles/icon-usability/) (2014; principles still cited, examples dated)
- Floppy-disk debate: critics call it obsolete ([UX Movement](https://uxmovement.com/buttons/why-the-floppy-disk-icon-for-save-must-die/); [Marco Arment 2011](https://marco.org/2011/04/05/replacing-the-save-icon)). Defenders argue "80% of users recognizing the floppy is better than 100% of users wondering what a downward arrow means" (Time/Techland, cited via search). — [Thomas Park 2011](https://thomaspark.co/2011/04/save-icon/). These are mostly 2004–2011 opinion pieces with no current recognition data.
- Simplicity: "Don't be overly literal. Avoid complex icons." — [Material v1](https://m1.material.io/style/icons.html). Overly illustrated icons lower recognition at small sizes. — [Smashing Magazine (via search)](https://www.smashingmagazine.com/2016/05/easy-steps-to-better-logo-design/)
- Directionality: Fluent metadata marks icons `unique` (separate RTL and LTR drawings) or `mirror` (can be flipped). — [Fluent System Icons repo](https://github.com/microsoft/fluentui-system-icons)

### Inferences

- Naming by depiction plus rich tags (Lucide, Fluent) cleanly separates the "what it looks like" decision from the "what it means" decision, letting one drawing serve several semantics through search tags.
- Avoiding letters or text inside icons was not explicitly documented in the sources I could read. Fluent's RTL metadata and IBM and Atlassian's language-neutral rules imply it.

### Gaps

- No primary source fetched that explicitly forbids letters or glyphs in icons (e.g. "A" for text formatting). Apple HIG and Material M3 likely cover this but were not readable.
- No recent (2020+) empirical data on floppy-disk recognition among younger users.

## 4. Consistency systems: style variants, modifiers, composition, perspective, detail

### Takeaway

Coherent sets use a small set of variants (outline and filled at minimum; Phosphor adds thin, light, bold and duotone; Material uses variable axes), reuse shared geometry across related icons, and place modifiers in a fixed spot (Fluent: always bottom-right, always filled). Every system bans perspective and 3D in favor of front-on or profile views and caps visual density.

### Cited Findings

- Variants:
  - Fluent: Regular is for wayfinding and actions, and Filled is for selected states or extra weight at small size. The repo also lists light and color sets. — [Fluent 2](https://fluent2.microsoft.design/iconography); [Fluent repo](https://github.com/microsoft/fluentui-system-icons)
  - Phosphor ships six weights: Thin, Light, Regular, Bold, Fill and Duotone. — [Phosphor README](https://github.com/phosphor-icons/homepage)
  - Material Symbols: FILL axis 0–1 "for state transitions or animation". — [Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
  - Heroicons: outline 24, solid 24/20/16. — [Heroicons](https://github.com/tailwindlabs/heroicons)
  - Tarkan: solid variants are optional, and you should decide which parts become solid. — [Smashing 2024](https://www.smashingmagazine.com/2024/04/iconography-design-systems-troubleshooting-maintenance/)
  - GitLab: outline is the default, and solid fill needs "a specific reason" (e.g. the clear × in inputs needs extra weight). — [GitLab](https://design.gitlab.com/product-foundations/iconography)
- Modifiers:
  - Fluent: use modifiers only when they don't add complexity; "Always use the filled theme. Always place in the bottom-right corner." — [Fluent 2](https://fluent2.microsoft.design/iconography)
  - Lucide: "Common modifiers and add-ons should use consistent geometry, size, and placement across related icons". Variants "should preserve the geometry, placement, and orientation of the base icon". — [Lucide spec](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/specification.md)
  - Lucide naming: `<group>-<variant>` (e.g. `badge-plus`, `badge-check`). Modifiers come after the element they describe, multiple elements are ordered largest to smallest, and numbers appear only if depicted. — [Lucide naming](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/naming-conventions.md)
- Perspective:
  - IBM: "avoid dimensional or perspective-based representations. Use objective angles, such as straight-on or profile views." — [IBM Design](https://www.ibm.com/design/language/iconography/ui-icons/design/)
  - Atlassian: "Shapes should appear straight on or from a full 90 degree profile. Don't use diagonal perspectives to create 3D shapes." — [Atlassian](https://atlassian.design/foundations/iconography)
  - Material: "Do make icons appear front-facing and sturdy. Don't tilt, rotate, or make icons appear dimensional." — [Material v1](https://m1.material.io/style/icons.html)
  - GitLab: depth only when "absolutely necessary to clarify a concept", using 2px strokes rather than fill areas. — [GitLab](https://design.gitlab.com/product-foundations/iconography)
- Detail level:
  - Lucide: "Details that are not necessary for recognition should be omitted." — [Lucide spec](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/specification.md)
  - Atlassian: "minimum detail required to express a metaphor." — [Atlassian](https://atlassian.design/foundations/iconography)
  - Material: "every idea edited to its essence"; "Do use geometric, consistent shapes. Don't use gestural or loose organic shapes." — [Material v1](https://m1.material.io/style/icons.html)
- Human figures: Material defines a human-icon anatomy (head, neck, upper body, arm, leg) with full-body, upper-body, cropped and detailed-part forms. — [Material v1](https://m1.material.io/style/icons.html)
- Shared geometry: Lucide says to "Reuse established shapes from existing Lucide icons". — [Lucide design principles](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/design-principles.md)

### Inferences

- nubo should write a "component library" of canonical sub-shapes (document, person, gear, cloud, badge circle, plus, slash, check) with fixed sizes and positions. Modifier icons then become compositions, which is how Lucide and Fluent keep hundreds of variants coherent.
- Slash rules (angle, the gap cut into the base shape, direction) need an explicit spec. None of the fetched sources gave numeric slash geometry.

### Gaps

- No numeric spec found for modifier badge size and cutout gap (e.g. Fluent bottom-right badge dimensions). Would need the Fluent Figma file.
- Duotone opacity conventions: Phosphor's duotone layer opacity was not confirmed from a primary source.

## 5. Process: briefs, sketching, reviews, small-size testing, naming/tagging, versioning/deprecation

### Takeaway

Mature programs run: search for an existing icon → brief with usage context → sketch → draw on template → in-context and small-size review → maintainer review → production cleanup → metadata (tags, categories, metaphor) → release, with aliases for renamed icons. Several high-quality OSS sets (Heroicons, Iconoir) no longer accept new-icon PRs, to protect consistency.

### Cited Findings

- IBM: check the library for redundancy first. Non-designers may submit sketches plus context. Use the starter file and snap-to-pixel settings. Submissions are GitHub issues (single, batch or update), and review "can take up to 30 days". Approved icons ship as SVG immediately, then enter library sprints. Layer and artboard names are exported into code. — [IBM Contribute](https://www.ibm.com/design/language/iconography/ui-icons/contribute/)
- Lucide: per-tool setup guides (Figma, Illustrator, Inkscape, Affinity), a must/should specification, naming conventions, and per-icon JSON metadata with contributors, tags, categories and use-cases. — [Lucide contribute docs](https://github.com/lucide-icons/lucide/tree/main/docs/contribute/icons); [save.json](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/save.json)
- Lucide v1 removed all brand icons over "increasing legal pressures" around trademarks. — [Lucide Version 1 notes](https://github.com/lucide-icons/lucide/blob/main/docs/guide/version-1.md). Iconoir likewise no longer accepts brand icons. — [Iconoir CONTRIBUTING](https://github.com/iconoir-icons/iconoir/blob/main/CONTRIBUTING.md)
- Phosphor core catalog stores tags, categories, the published version and the last-updated version per icon, plus an `alias` field holding "deprecated names for the icon for backwards-compatibility" and a stable font codepoint. — [Phosphor core README](https://github.com/phosphor-icons/core)
- Fluent metadata includes `description` ("Used for adding actions."), `metaphor` keywords, sizes, styles and RTL `directionType`. All platform packages share a single version number, and PR titles follow Conventional Commits (e.g. `feat(assets): add new icons`). — [Fluent metadata](https://raw.githubusercontent.com/microsoft/fluentui-system-icons/main/assets/Add%20Circle/metadata.json); [Fluent CONTRIBUTING](https://github.com/microsoft/fluentui-system-icons/blob/main/CONTRIBUTING.md)
- Contribution gating: Heroicons is "not accepting contributions for new icons". Iconoir is "not accepting pull requests containing icons", with requests taken via issues "to keep consistency, quality". — [Heroicons README](https://github.com/tailwindlabs/heroicons); [Iconoir CONTRIBUTING](https://github.com/iconoir-icons/iconoir/blob/main/CONTRIBUTING.md)
- Tarkan's process tips: place each new icon in a real UI next to existing elements; test several stroke weights; outline strokes before componentizing; give metadata (Tags, Usage, Group Name, link to designs); use status markers (finished / needs improvement / delete-redraw); assign one owner designer. Icons are "the most visually volatile part of a design system." — [Smashing 2024](https://www.smashingmagazine.com/2024/04/iconography-design-systems-troubleshooting-maintenance/)
- Sketching: Susan Kare designed early Macintosh icons on graph paper. — [Smashing, Power of Pen and Paper Sketching](https://www.smashingmagazine.com/2021/09/power-pen-paper-sketching/)
- Testing: ask people what they expect an icon to mean (recognizability) and check recall after a couple of weeks (memorability). Research competitor and platform icons first. — [NN/g](https://www.nngroup.com/articles/icon-usability/)
- GitLab naming: a recognizable object is named after the object (`pencil`); an abstract concept is named after the concept (`epic`). Use lowercase hyphenated names. Figma component descriptions carry keywords and usage. — [GitLab Pajamas](https://design.gitlab.com/product-foundations/iconography)

### Inferences

- For an OSS set, the highest-leverage process assets are a written must/should spec (Lucide model), a per-icon JSON metadata schema (tags, categories, aliases, added-in and updated-in version), and a CI lint that checks canvas, stroke attributes and decimal precision. Aliases plus semver majors give a clean deprecation path.
- Gate new-icon contributions through issues with a sketch and use case (IBM, Iconoir) rather than open PRs, at least until the spec is stable.

### Gaps

- No primary source found describing a formal deprecation timeline (e.g. how many minors an alias survives). Phosphor's alias field and Lucide v1's removals are the only concrete examples.
- Material's internal review process is not public.

## 6. What separates great icon sets from mediocre ones

### Takeaway

Practitioners and system docs converge on coherence over individual brilliance. That means one stroke weight, shared geometry, matched optical weight and a deliberate personality derived from a parent system (typeface, brand), plus restraint in detail and in the number of metaphors. The best sets write explicit rules but also explicitly let clarity override them.

### Cited Findings

- "Lucide is a consistent icon set, not a collection of unrelated icons. Every icon should feel like it belongs with the rest of the library." When rules conflict, "prioritize clarity, visual balance, and consistency." — [Lucide design principles](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/design-principles.md)
- Personality derived from a parent system: IBM icons share details with IBM Plex (slab characteristics, square caps). Atlassian's rounded corners align with its typography, while square terminals "add boldness". — [IBM](https://www.ibm.com/design/language/iconography/ui-icons/design/); [Atlassian](https://atlassian.design/foundations/iconography)
- GitLab principles: "Balance and structure", "Modern and approachable" (border radius, open counters = "a touch of personality"), "Crisp and intentional", "Simple and concise… minimize time to comprehension". — [GitLab Pajamas](https://design.gitlab.com/product-foundations/iconography)
- Material system icons: "simple, modern, friendly, and sometimes quirky… reduced to its minimal form". — [Material v1](https://m1.material.io/style/icons.html)
- Uniform weight: "no icon should appear heavier or lighter than another." — [IBM](https://www.ibm.com/design/language/iconography/ui-icons/design/). Unbalanced icons "draw unnecessary attention to themselves, or seemingly disappear." — [GitLab](https://design.gitlab.com/product-foundations/iconography)
- Rules should flex: "Clarity should always override consistency." — [GitLab](https://design.gitlab.com/product-foundations/iconography). "Don't force the content to fit inside the key shapes." — [IBM](https://www.ibm.com/design/language/iconography/ui-icons/design/)
- Common failure modes of inherited libraries: mixed styles, sizes and uses; missing source files; subjective grouping. — [Smashing 2024](https://www.smashingmagazine.com/2024/04/iconography-design-systems-troubleshooting-maintenance/)
- Feather: "an emphasis on simplicity, consistency, and flexibility". — [Feather README](https://github.com/feathericons/feather)

### Inferences

- nubo's differentiation should come from one or two deliberate, documented traits applied everywhere, such as terminal shape, a signature radius or a cloud-derived curvature ("nubo" = cloud), rather than from ornament. Everything else should stay at proven defaults so the set remains drop-in compatible.

### Gaps

- Could not locate primary writings by Steve Schoger, Cole Bemis, Helena Zhang / Tobias Fried, or Jon Hicks' _The Icon Handbook_ within the call budget. Their views are not represented here and would be worth a follow-up search.
- Apple HIG's SF Symbols and icon guidance, and the current M3 icon pages, were unreadable (JS-rendered). Anything attributed to them here is flagged as unverified.
