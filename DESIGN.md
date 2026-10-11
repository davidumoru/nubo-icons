# Nubo design guide

The rules every nubo icon follows. When an icon breaks a rule, it's because clarity demanded it, and the exception is noted in that icon's `meta.json`.

Values marked **(calibrate)** are our best starting point and get confirmed or adjusted in the first batch that uses them.

## Styles

Every icon ships in all three styles, with the same name and the same silhouette.

| Style    | What it is                                                                                     |
| -------- | ---------------------------------------------------------------------------------------------- |
| **Line** | Everything drawn with a 1.5px round stroke. Nothing filled.                                    |
| **Fill** | Every enclosed area is solid. Details inside a shape are cut out. Open glyphs stay as strokes. |
| **Duo**  | Line, with a light tint behind the part that identifies the icon.                              |

Line and Fill are drawn on the **same geometry**. A Line icon's centerlines are a Fill icon's shape outlines. Because both use a 1.5px stroke (Fill uses it to soften the shape, see below), their outer edges land in exactly the same place, and switching styles never makes an icon jump in size.

## Canvas

- **24×24 viewBox**, default render size 24px.
- **2px padding.** Rendered edges (geometry plus half the stroke) stay inside the 20×20 live area, `2 → 22` on both axes.
- An icon may push into the padding, never closer than 1px to the edge, only when it needs the extra weight to look the same size as its neighbours.
- Drawn for 24px, checked at 16, 20, 24 and 32. There are no separate small-size drawings in v1.

### Keylines

Different shapes need different sizes to _look_ the same size. Rendered extents:

| Shape                        | Size                             |
| ---------------------------- | -------------------------------- |
| Circle                       | 20 × 20                          |
| Square                       | 18 × 18                          |
| Portrait rectangle           | 16 × 20                          |
| Landscape rectangle          | 20 × 16                          |
| Symbols (x, chevrons, check) | as small as 14–16, judged by eye |

Keylines are a guide. Center optically, not mathematically. A shape whose mass is lopsided (a crescent, a chevron) is centered by its mass, not its bounding box.

## The soft look

No sharp points or hard corners anywhere. Star tips, arrow heads, bolt points and the bottom of a heart are all small curves. The look is light and friendly, never chunky.

- Round caps and round joins on every stroke.
- Every corner gets at least a 2px radius on the stroke's centerline (1.5px where a short segment leaves no room). A stroke's inner edge has the centerline radius minus half the stroke (0.75px), so anything smaller leaves the inside of the corner sharp even though the outside looks round.
- Points that would be sharp get a small geometric curve as well as the round join.
- Inner (concave) corners are rounded too. A round join only softens outer corners.
- Angles: abstract diagonals (check, x, arrows, slashes) use 45°. Outlines of real objects follow the object: a roof is as steep as it needs to be to read as a house. No perspective, no 3D. Front-on or profile views only, except where the convention is isometric and a flat view would not read: `package` is a cube because every major set draws it that way.
- One or two forms per icon. If a detail disappears at 16px, leave it out.

## Line

- `stroke-width="1.5"`, round caps, round joins, `fill="none"`. The same weight as Heroicons and Phosphor Regular, and it lands on exactly 1px at 16px, so small sizes stay crisp.
- One weight in every style. No thicker or thinner strokes for emphasis, ever.
- Separate elements keep at least a 1.5px visible gap (one stroke width). Tighter gaps make neighbouring strokes merge and read as heavier.
- **Dots** are circles with a radius of exactly half the stroke (`r=".75"`), so the stroke closes at the center and the dot is solid at every size. Any larger and a pinhole shows; any smaller and many renderers draw it hollow. Dots are symbols, identical in every style.

## Fill

The **puff** technique: every solid shape is filled _and_ traced with a 1.5px round stroke (`fill="currentColor" stroke="currentColor" stroke-width="1.5"`). The stroke adds 0.75px on every side and rounds every outer corner. Draw the shape on the centerline, exactly where Line draws it.

- **Cutouts.** Details inside a solid shape (the flap of an envelope, the "i" in info, a keyhole) are holes made with `fill-rule="evenodd"`. The puff stroke shrinks every hole by 0.75px on each side, so draw a hole 1.5px larger than it should look.
- **Cutout lines** are drawn 3px wide, so they show as a 1.5px gap: a negative stroke the same weight as Line. Build them with `strokeOutline` in `tools/icons/src/geometry.ts`, which traces a real round-capped, round-joined stroke, so the gap's ends and elbows stay soft.
- **Minimum hole:** 4px drawn (2.5px visible). Holes that identify the object, like a gear's axle, should be generous, around a third of the icon's width, so the shape still reads at 16px. Every major set draws them that way.
- A hole's corners are not softened by the stroke. Round them in the geometry.
- **Separate solid parts** (a head and shoulders, a bell and its clapper, a lid and bin) keep a 1.5px visible gap, one stroke width, so Fill shows exactly the space Line leaves.
- **Fill only fills objects.** When an icon's subject is a solid object with a body (heart, house, gear, bell), it becomes solid. When the subject is a line, a symbol or a frame (check, arrows, chevrons, plus, x, menu, a magnifier's ring, an open tray), Fill is identical to Line: the same 1.5px stroke, pixel for pixel. There is no in-between weight.
- An icon can mix the two: a solid basket with a line handle.
- **Inner circles are holes, never solid dots.** A gear's axle and an eye's pupil are both cut out of the solid body.
- **A cutout is the Line detail, inverted.** Same shape, same size: its visible edge lands on the Line ink's outer edge, so a hole is drawn at the Line centerline plus 1.5 and a cut line 3px wide. Never swap in a different shape, such as a triangle head for a chevron arrow.
- **Secondary parts stay outlines.** When an object has a secondary part (a page's folded corner, a folder's tab, a clipboard's clip), Fill keeps that part as its Line outline, clear inside, sitting on the solid body. The body runs right up to the part's outline, so the silhouette matches Line exactly. Cutting the part free with a gap makes the shape fall apart.
- **Exception: shapes cut into many pieces.** When gaps split a solid shape into many pieces (the Fill globe's nine), the standard soft outline rounds every piece so much that the whole shape reads as loose tiles. Those pieces use a thinner 1px outline (0.5px corners), drawn so their visible edges stay where the normal outline would put them. The icon declares `"exceptions": ["thin-fill-outline"]` in its `meta.json`; lint rejects a thinner outline anywhere else.
- **Exception: cutouts with narrow wedges.** The soft outline rounds the black wedge where two cut lines meet at a sharp angle (an arrow's arms and shaft), so the cut reads as a solid triangle. That path switches to a miter join, which lands each wedge on the Line's inner corner. The icon declares `"exceptions": ["miter-cutout"]`; lint rejects a miter join anywhere else.

## Duo

Duo is Line with a light tint behind the part of the icon that identifies it.

- **Primary**: the icon's Line drawing, exactly. Same strokes, same 1.5px weight, full strength, drawn on top.
- **Secondary**: one region, filled at 30% of the same color and drawn underneath.
- The secondary is puffed like Fill and traced on the same curves as the Line drawing, so its edge sits under the stroke and never peeks out.
- The secondary opacity sits on a group, never on a shape. Many renderers apply element opacity to fill and stroke separately, which doubles up where they overlap.

**What gets tinted** follows Phosphor's duotone, which has been refined over many releases. When in doubt, check what Phosphor tints for the same object.

- **The body**, when the object is one solid thing: heart, house, bell, lock, trash bin, gear, magnifier lens, circle-check's disc.
- **The identifying part**, when the object has one: a person's head (not the shoulders), a calendar's header strip, an envelope's flap, a pencil's eraser, the sheet behind the front one in copy.
- **Holes and inner details stay clear**: a gear's axle, an eye's pupil, a house's door.
- **Symbols get no tint** and no added shapes. Arrows and chevrons stay open, and check, plus, minus, x and menu get no background. Their Duo is identical to Line.

## Motion

Symbols that may join the morph group (menu, x, plus, minus, check, chevrons, arrows) are drawn from at most three straight lines. That keeps them animatable later without redrawing. See [docs/roadmap.md](docs/roadmap.md).

## Metaphors and naming

- **Name what the icon shows, not what it does.** `floppy-disk`, not `save`; `magnifying-glass`, not `search`. The meaning goes in tags, so one glyph can serve several actions.
- **Established conventions beat literal accuracy.** The floppy disk still means save.
- **Avoid** letters and text (except fixed conventions like the info "i"), culture-specific gestures and symbols, violent imagery, and brand logos.
- **The 5-second test.** If you can't think of the image for a concept within 5 seconds, users won't recognise it either. Pair that icon with a label in the UI, or don't make it.
- **Names** are kebab-case nouns, object first, then modifier: `user-plus`, `circle-check`, `arrow-left`. Use Lucide's name when it already describes the picture. When Lucide names an icon by its function (`search`, `settings`), that name becomes an alias: `magnifying-glass` is aliased `search`, so migrating from Lucide still works.
- **Modifier badges** (plus, minus, check, x) are 7px: arms 5.5px long on the stroke's centerline. They keep a 1.5px gap from the base icon and never overlap it. They sit bottom-right when the base leaves room there; when it doesn't (a person's shoulders fill the bottom), the base shrinks a little and the badge moves beside it at head height, as in `user-plus`. A badge stays a line in every style.
- **Slashes** run corner to corner at 45°, top-left to bottom-right. They cut a 1.5px gap through the base icon on the upper-right side only; on the lower-left side the icon runs into the slash, so it reads as one shape with a slash lying over it. Inner details on that side (an eye's pupil) meet the slash too, as in `eye-off`.

## Source format

```
icons/<name>/line.svg
icons/<name>/fill.svg
icons/<name>/duo.svg
icons/<name>/meta.json
```

- Allowed elements: `path`, `circle`, `rect`, and `g` only to mark Duo's secondary tone (`<g data-tone="secondary">`). No transforms, masks, clip paths, filters or gradients.
- The only color is `currentColor`.
- Coordinates rounded to 2 decimals.

`meta.json`:

```json
{
  "tags": ["love", "like", "favorite"],
  "categories": ["social"],
  "aliases": [],
  "rtl": "none",
  "added": "0.1.0",
  "status": "draft"
}
```

- `exceptions` (optional) lists deliberate departures from these rules that lint should allow for this icon. Today there are two: `thin-fill-outline` and `miter-cutout`.

- `status` is `"draft"` until the icon passes review, then `"approved"`.

- `rtl` is `"mirror"` for directional icons that flip in right-to-left languages (back/forward arrows, reply, list indent). Media controls, clocks, checkmarks, charts and real-world objects don't flip.

## Review

`pnpm icons:lint` checks every rule above that a machine can check. `pnpm icons:preview [names…]` renders the review sheets into `tools/icons/out/`: the named icons, otherwise the drafts, otherwise the whole set.

Icons are made in small batches of 4–6, with each icon drawn in all three styles at once.

1. Draw the batch.
2. Render the review sheet: every icon at 16, 20, 24 and 32px in light and dark, next to every approved icon, plus the metrics (rendered bounds, center of mass, ink coverage).
3. Compare against the approved set. Fix anything that looks heavier, lighter, sharper, busier, smaller or off-center.
4. Once approved, an icon is locked. Changing it after that is a deliberate redesign, never a side effect of other work.

## Accessibility

These rules are for the packages built from the icons.

- Icons are hidden from screen readers by default (`aria-hidden="true"`). Passing a `title` makes the icon a labelled image instead.
- Icon-only buttons are labelled on the button, not the icon.
- Color comes from `currentColor`, so icons follow text color and forced-colors (high contrast) mode.
- Icons that carry meaning need 3:1 contrast against their background (WCAG 1.4.11). Duo's light tone is decorative and must never be the only thing carrying meaning.

The research behind these rules is in [docs/research](docs/research/report.md).
