# Nubo design guide

The rules every nubo icon follows. When an icon breaks a rule, it's because clarity demanded it, and the exception is noted in that icon's `meta.json`.

Values marked **(calibrate)** are our best starting point and get confirmed or adjusted during the first batch.

## Styles

Every icon ships in all three styles, with the same name and the same silhouette.

| Style | What it is |
|---|---|
| **Line** | Everything drawn with a 2px round stroke. Nothing filled. |
| **Fill** | Every enclosed area is solid. Details inside a shape are cut out. Open glyphs stay as strokes. |
| **Duo** | Fill's shapes, split into a full-strength primary tone and a light secondary tone. |

Line and Fill are drawn on the **same geometry**. A Line icon's centerlines are a Fill icon's shape outlines. Because both use a 2px stroke (Fill uses it to soften the shape, see below), their outer edges land in exactly the same place, and switching styles never makes an icon jump in size.

## Canvas

- **24×24 viewBox**, default render size 24px.
- **2px padding.** Rendered edges (geometry plus half the stroke) stay inside the 20×20 live area, `2 → 22` on both axes.
- An icon may push into the padding, never closer than 1px to the edge, only when it needs the extra weight to look the same size as its neighbours.
- Drawn for 24px, checked at 16, 20, 24 and 32. There are no separate small-size drawings in v1.

### Keylines

Different shapes need different sizes to *look* the same size. Rendered extents:

| Shape | Size |
|---|---|
| Circle | 20 × 20 |
| Square | 18 × 18 |
| Portrait rectangle | 16 × 20 |
| Landscape rectangle | 20 × 16 |
| Symbols (x, chevrons, check) | as small as 14–16, judged by eye |

Keylines are a guide. Center optically, not mathematically. A shape whose mass is lopsided (a crescent, a chevron) is centered by its mass, not its bounding box.

## The soft look

No sharp points or hard corners anywhere. Star tips, arrow heads, bolt points and the bottom of a heart are all small curves. The look is light and friendly, never chunky.

- Round caps and round joins on every stroke.
- Containers (boxes, cards, screens) get at least a 2px corner radius on their centerline.
- Points that would be sharp get a small geometric curve as well as the round join.
- Inner (concave) corners are rounded too. A round join only softens outer corners.
- Angles: 45° wherever possible, otherwise 15° steps. No perspective, no 3D. Front-on or profile views only.
- One or two forms per icon. If a detail disappears at 16px, leave it out.

## Line

- `stroke-width="2"`, round caps, round joins, `fill="none"`.
- One weight. No thicker or thinner strokes for emphasis.
- Separate elements keep at least a 2px visible gap.
- **Dots:** draw a zero-length path (`M x y h.01`) with the round cap, not a tiny circle. A circle that small renders hollow in many SVG tools.

## Fill

The **puff** technique: every solid shape is filled *and* traced with a 2px round stroke (`fill="currentColor" stroke="currentColor" stroke-width="2"`). The stroke adds 1px on every side and rounds every outer corner. Draw the shape on the centerline, exactly where Line draws it.

- **Cutouts.** Details inside a solid shape (the flap of an envelope, the "i" in info, a keyhole) are holes made with `fill-rule="evenodd"`. The puff stroke shrinks every hole by 1px on each side, so draw a hole 2px larger than it should look.
- **Cutout lines** are drawn 4px wide, so they show as a 2px gap: a negative stroke the same weight as Line.
- **Minimum hole:** 4px drawn (2px visible).
- A hole's corners are not softened by the stroke. Round them in the geometry.
- **Separate solid parts** keep at least a 1.5px visible gap. **(calibrate)**
- **Open glyphs** have nothing to fill: chevrons, arrows, plus, x, check, menu, and open containers like a tray or an open box. They stay as strokes, slightly heavier so they hold up next to solid shapes: 2.5px. **(calibrate)**
- A solid lens or ring with nothing inside it reads wrong. A magnifier stays a thick ring, not a disc.

## Duo

Duo is Fill, split into two tones of the same color.

- **Primary**: full strength, drawn on top.
- **Secondary**: the same color at 35% opacity, drawn first, underneath. **(calibrate)**
- The secondary opacity sits on a group, never on the shape itself. Many renderers apply element opacity to fill and stroke separately, which doubles up where the puff stroke overlaps the fill.
- The primary may overlap the secondary. The primary is opaque, so the overlap never shows.

What goes light, in order of preference:

1. **Container vs. contents.** The container is primary, what it holds is secondary. Trash: lid dark, bin light. Calendar: header dark, body light.
2. **Background vs. focus.** The thing that acts is primary, its backdrop is secondary. Gear: hub dark, gear light. Info: "i" dark, disc light.
3. **Fold.** A single solid object with no parts is split down the middle, left half light, but only if the split doesn't change the meaning. A half-filled star reads as a half rating, so stars don't fold.

Pure symbols with nothing to split (check, plus, x, chevrons, arrows, menu) are single-tone.

## Metaphors and naming

- **Name what the icon shows, not what it does.** `floppy-disk`, not `save`; `magnifying-glass`, not `search`. The meaning goes in tags, so one glyph can serve several actions.
- **Established conventions beat literal accuracy.** The floppy disk still means save.
- **Avoid** letters and text (except fixed conventions like the info "i"), culture-specific gestures and symbols, violent imagery, and brand logos.
- **The 5-second test.** If you can't think of the image for a concept within 5 seconds, users won't recognise it either. Pair that icon with a label in the UI, or don't make it.
- **Names** are kebab-case nouns, object first, then modifier: `user-plus`, `circle-check`, `arrow-left`. Follow Lucide's name where the metaphor is the same, so migrating is easy.
- **Modifiers** (plus, minus, check, x, slash) keep the same size and position across every icon that uses them, bottom-right unless the base icon needs otherwise. **(calibrate the exact size in the first batch that needs one)**

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
  "added": "0.1.0"
}
```

- `rtl` is `"mirror"` for directional icons that flip in right-to-left languages (back/forward arrows, reply, list indent). Media controls, clocks, checkmarks, charts and real-world objects don't flip.

## Review

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
