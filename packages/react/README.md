# @nubo-icons/react

Soft, open-source icons for React, in three styles: **Line**, **Fill** and **Duo**.

[Browse the icons](https://nubo.davidumoru.me) · [Docs](https://nubo.davidumoru.me/docs) · [Changelog](https://github.com/davidumoru/nubo-icons/blob/main/packages/react/CHANGELOG.md)

```sh
pnpm add @nubo-icons/react
```

## Usage

Each style has its own import path. The package root is Line.

```tsx
import { Heart } from "@nubo-icons/react"; // Line
import { Gear } from "@nubo-icons/react/fill";
import { EyeOff } from "@nubo-icons/react/duo";

<Heart />;
<Gear size={20} />;
<EyeOff className="text-zinc-500" />;
```

Every icon is also exported with an `Icon` suffix (`HeartIcon`), and under its Lucide name where that differs (`Search`, `Home`, `Settings`), so switching from Lucide is mostly a find-and-replace.

## Props

| Prop               | Default | Notes                                                                                 |
| ------------------ | ------- | ------------------------------------------------------------------------------------- |
| `size`             | `24`    | Width and height.                                                                     |
| `strokeWidth`      | `1.5`   | In grid units, so it scales with `size`. Keep custom widths to Line (see below).      |
| `color`            | inherit | Icons use `currentColor`, so they follow the text color unless you set one.           |
| `title`            | none    | Makes the icon an announced image (`role="img"` with a `<title>`).                    |
| `secondaryOpacity` | `0.3`   | Duo only: strength of the light tone. The layer also carries `data-tone="secondary"`. |

Any other SVG prop (`className`, `style`, `onClick`, `ref`) passes through. Every icon has the classes `nubo-icon` and `nubo-<name>`.

Fill and Duo are drawn for the 1.5 stroke. A different `strokeWidth` thickens their outlines too, which can close the small gaps between parts.

## Accessibility

Icons are hidden from screen readers by default (`aria-hidden="true"`). Pass `title` or `aria-label` to make one announced instead. For icon-only buttons, label the button rather than the icon:

```tsx
<button aria-label="Close">
  <X />
</button>
```

## License

MIT
