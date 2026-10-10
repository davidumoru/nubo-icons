# @nubo-icons/react

Soft, open-source icons for React, in three styles: **Line**, **Fill** and **Duo**.

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
| `strokeWidth`      | `1.5`   | Applies to every style, so Line, Fill and Duo stay the same size.                     |
| `color`            | inherit | Icons use `currentColor`, so they follow the text color unless you set one.           |
| `title`            | none    | Makes the icon an announced image (`role="img"` with a `<title>`).                    |
| `secondaryOpacity` | `0.35`  | Duo only: strength of the light tone. The layer also carries `data-tone="secondary"`. |

Any other SVG prop (`className`, `style`, `onClick`, `ref`) passes through. Every icon has the classes `nubo-icon` and `nubo-<name>`.

## Accessibility

Icons are hidden from screen readers by default (`aria-hidden="true"`). Pass `title` or `aria-label` to make one announced instead. For icon-only buttons, label the button rather than the icon:

```tsx
<button aria-label="Close">
  <X />
</button>
```

## License

MIT
