import type { IconProps, NuboIcon } from "@nubo-icons/react";
import * as Line from "@nubo-icons/react/line";
import * as Fill from "@nubo-icons/react/fill";
import * as Duo from "@nubo-icons/react/duo";
import type { Style } from "@/lib/icons";

const sets = { line: Line, fill: Fill, duo: Duo } as unknown as Record<
  Style,
  Record<string, NuboIcon>
>;

export function Icon({
  component,
  iconStyle,
  ...props
}: IconProps & { component: string; iconStyle: Style }) {
  const Component = sets[iconStyle][component];
  return <Component {...props} />;
}
