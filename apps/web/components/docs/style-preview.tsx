import { Icon } from "@/components/icon";
import { STYLES, type Style } from "@/lib/icons";

const NAMES = ["Heart", "Bell", "House", "Folder", "Camera"];

export function StylePreview({ styles = [...STYLES] }: { styles?: Style[] }) {
  return (
    <div className="mt-[1.25em] grid gap-8 rounded-xl border px-6 py-10 sm:grid-cols-3 sm:gap-4">
      {styles.map((s) => (
        <div key={s} className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            {NAMES.map((n) => (
              <Icon key={n} component={n} iconStyle={s} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground capitalize">{s}</span>
        </div>
      ))}
    </div>
  );
}
