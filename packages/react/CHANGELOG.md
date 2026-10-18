# @nubo-icons/react

## 0.6.0

### Minor Changes

- 5f48d24: Add 6 icons: floppy-disk (alias `save`), circle-plus (alias `plus-circle`), circle-minus (alias `minus-circle`), trend-down (alias `trending-down`), clock-counter-clockwise (alias `history`) and palette.

## 0.5.0

### Minor Changes

- d4ce9d1: Add `MorphIcon` from `@nubo-icons/react/morph`, which animates between menu, x, plus, minus, check, and the arrows and chevrons.
- 4561d71: Icons that point a direction now have the class `nubo-mirror`, so one CSS rule flips them all in right-to-left layouts. A new `mirrored` prop overrides it per icon, and `MorphIcon` follows the text direction on its own.

## 0.4.0

### Minor Changes

- 4d1adcc: Add 12 icons: inbox (alias `tray`), layers (alias `stack`), cursor (alias `mouse-pointer`), hash (alias `hashtag`), command, timer (alias `stopwatch`), alarm-clock (alias `alarm`), note (alias `sticky-note`), table, qr-code, fingerprint and currency-dollar (alias `dollar-sign`).

### Patch Changes

- 0bd6f1c: The folded corner of file and file-text in Fill is now the same size as in Line.

## 0.3.0

### Minor Changes

- a3f35a0: Add 12 icons: laptop, keyboard, printer, headphones, music-note (alias `music`), battery, bluetooth, cpu (alias `chip`), server (alias `hard-drives`), cloud-arrow-down (alias `cloud-download`), cloud-arrow-up (alias `cloud-upload`) and hourglass.

### Patch Changes

- 595b2bf: Fill details now match Line in size and shape: larger holes in eye, eye-off, gear and image; rounder corners in bug, calendar, credit-card, gift, lock, lock-open and mail; sharper check cutouts in circle-check and shield-check; the image's lower mountain flank; and a larger wallet pocket in every style.

## 0.2.0

### Minor Changes

- 4fec05d: Add 12 icons: thumbs-down, text-b, text-italic, text-underline, text-strikethrough, text-align-center, text-align-right, link-break, magnifying-glass-plus, magnifying-glass-minus, eraser and highlighter. They come with the aliases `bold`, `italic`, `underline`, `strikethrough`, `unlink`, `zoom-in` and `zoom-out`.
- 717f0aa: Add 12 icons: wallet, truck, package, ticket, briefcase, book-open, lightbulb, trophy, rocket, bug, wrench and puzzle-piece (alias `puzzle`).

## 0.1.1

### Patch Changes

- 1167698: README: link to the site, docs and changelog, and say that custom stroke widths are for Line only.

## 0.1.0

### Minor Changes

- First release: 138 icons, each in Line, Fill and Duo, as React components with ESM, CommonJS and TypeScript types.
