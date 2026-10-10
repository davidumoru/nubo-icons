import type { NuboIcon } from "@nubo-icons/react";
import * as Line from "@nubo-icons/react/line";
import * as Fill from "@nubo-icons/react/fill";
import * as Duo from "@nubo-icons/react/duo";

const STYLES = [
  { name: "Line", icons: Line },
  { name: "Fill", icons: Fill },
  { name: "Duo", icons: Duo },
] as const;

// Each icon is also exported under …Icon and Lucide alias names; keep only the canonical export.
const canonical = (icons: Record<string, unknown>) =>
  Object.entries(icons).filter(
    (entry): entry is [string, NuboIcon] =>
      (entry[1] as NuboIcon).displayName === entry[0],
  );

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">Nubo</h1>
      <p className="mt-2 text-muted-foreground">
        Soft, open-source icons in three styles.
      </p>

      {STYLES.map(({ name, icons }) => (
        <section key={name} className="mt-12">
          <h2 className="text-sm font-medium text-muted-foreground">{name}</h2>
          <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2">
            {canonical(icons).map(([iconName, Icon]) => (
              <li
                key={iconName}
                className="flex flex-col items-center gap-3 rounded-lg border px-2 py-5"
              >
                <Icon />
                <span className="text-xs text-muted-foreground">
                  {iconName}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
