import {
  createElement,
  forwardRef,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
  type SVGProps,
} from "react";

export type IconStyle = "line" | "fill" | "duo";

export type IconNode = [
  tag: string,
  attrs: Record<string, string>,
  children?: IconNode[],
];

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  title?: string;
  secondaryOpacity?: number;
};

export type NuboIcon = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

function render(node: IconNode, secondaryOpacity: number): ReactNode {
  const [tag, attrs, children = []] = node;
  const props: Record<string, string | number> =
    attrs["data-tone"] === "secondary"
      ? { ...attrs, opacity: secondaryOpacity }
      : attrs;
  return createElement(
    tag,
    props,
    ...children.map((child) => render(child, secondaryOpacity)),
  );
}

export function createIcon(
  name: string,
  slug: string,
  style: IconStyle,
  nodes: IconNode[],
): NuboIcon {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    (
      {
        size = 24,
        strokeWidth = 1.5,
        secondaryOpacity = 0.3,
        title,
        className,
        children,
        ...rest
      },
      ref,
    ) => {
      const labelled =
        title !== undefined ||
        rest["aria-label"] !== undefined ||
        rest["aria-labelledby"] !== undefined;
      return createElement(
        "svg",
        {
          ref,
          xmlns: "http://www.w3.org/2000/svg",
          width: size,
          height: size,
          viewBox: "0 0 24 24",
          fill: style === "line" ? "none" : "currentColor",
          stroke: "currentColor",
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: ["nubo-icon", `nubo-${slug}`, className]
            .filter(Boolean)
            .join(" "),
          ...(labelled ? { role: "img" } : { "aria-hidden": true }),
          ...rest,
        },
        title !== undefined ? createElement("title", null, title) : null,
        ...nodes.map((node) => render(node, secondaryOpacity)),
        children,
      );
    },
  );
  Icon.displayName = name;
  return Icon;
}
