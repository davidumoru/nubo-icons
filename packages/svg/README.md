# @nubo-icons/svg

Soft, open-source icons as plain SVG files, in three styles: **Line**, **Fill** and **Duo**.

[Browse the icons](https://nubo.davidumoru.me) · [Docs](https://nubo.davidumoru.me/docs/svg) · [Changelog](https://github.com/davidumoru/nubo-icons/blob/main/packages/svg/CHANGELOG.md)

```sh
pnpm add @nubo-icons/svg
```

## Usage

Every icon is a file per style: `line/<name>.svg`, `fill/<name>.svg` and `duo/<name>.svg`.

```js
import heart from "@nubo-icons/svg/line/heart.svg";
```

Or straight from a CDN, with no install:

```html
<img
  src="https://unpkg.com/@nubo-icons/svg/fill/heart.svg"
  alt=""
  width="24"
  height="24"
/>
```

The icons use `currentColor`. An `<img>` can't inherit color, so inline the SVG when it should follow your text color.

## Icon data

`icons.json` has every icon's aliases, tags and categories, keyed by name:

```js
import icons from "@nubo-icons/svg/icons.json" with { type: "json" };

icons["magnifying-glass"].aliases; // ["search"]
```

This package and [`@nubo-icons/react`](https://www.npmjs.com/package/@nubo-icons/react) are released together and always share a version number.

## License

MIT
