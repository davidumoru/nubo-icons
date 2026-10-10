import { ImageResponse } from "next/og";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/components/logo";
import { getIcon, type Style } from "@/lib/icons";
import { SITE_URL } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#171717";
const MUTED = "#737373";

// The images are rendered outside the page, so the SVG has no text colour to inherit, and Duo's tint group
// needs the 30% opacity the site applies with CSS.
function iconSrc(name: string, style: Style) {
  const svg = getIcon(name)!
    .svg[style].replaceAll("currentColor", INK)
    .replace(
      '<g data-tone="secondary">',
      '<g data-tone="secondary" opacity=".3">',
    );
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export type OgContent = {
  eyebrow?: string;
  title: string;
  description?: string;
  icons: { name: string; style: Style }[];
  iconSize?: number;
};

export function renderOg({
  eyebrow,
  title,
  description,
  icons,
  iconSize = 64,
}: OgContent) {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        background: "#ffffff",
        color: INK,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <svg viewBox={LOGO_VIEWBOX} width={120} height={40}>
          <path
            d={LOGO_PATH}
            fill={INK}
            stroke={INK}
            strokeWidth={1.25}
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ fontSize: 26, color: MUTED }}>
          {new URL(SITE_URL).host}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {eyebrow && <div style={{ fontSize: 28, color: MUTED }}>{eyebrow}</div>}
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.1,
            letterSpacing: -2.5,
            maxWidth: 960,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: MUTED,
              maxWidth: 900,
            }}
          >
            {description}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: iconSize * 0.75 }}>
        {icons.map(({ name, style }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${name}-${style}`}
            src={iconSrc(name, style)}
            width={iconSize}
            height={iconSize}
            alt=""
          />
        ))}
      </div>
    </div>,
    OG_SIZE,
  );
}
