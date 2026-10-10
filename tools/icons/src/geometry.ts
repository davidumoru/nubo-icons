export type Pt = [number, number];

export const fmt = (n: number) => {
  const s = (Math.round(n * 100) / 100).toFixed(2).replace(/\.?0+$/, "");
  return s === "-0" ? "0" : s;
};

export const polar = (cx: number, cy: number, r: number, deg: number): Pt => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

// Every corner becomes a quadratic curve that starts `r` back along each edge.
// Concave corners need this too: a round stroke join only softens convex ones.
export function roundedPolygon(pts: Pt[], r: number | number[]): string {
  const n = pts.length;
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const cur = pts[i];
    const next = pts[(i + 1) % n];
    const ri = Array.isArray(r) ? r[i] : r;
    const d1 = Math.hypot(cur[0] - prev[0], cur[1] - prev[1]);
    const d2 = Math.hypot(next[0] - cur[0], next[1] - cur[1]);
    const a = Math.min(ri, d1 / 2);
    const b = Math.min(ri, d2 / 2);
    const p1: Pt = [cur[0] + ((prev[0] - cur[0]) * a) / d1, cur[1] + ((prev[1] - cur[1]) * a) / d1];
    const p2: Pt = [cur[0] + ((next[0] - cur[0]) * b) / d2, cur[1] + ((next[1] - cur[1]) * b) / d2];
    out.push(`${i === 0 ? "M" : "L"}${fmt(p1[0])} ${fmt(p1[1])}Q${fmt(cur[0])} ${fmt(cur[1])} ${fmt(p2[0])} ${fmt(p2[1])}`);
  }
  return out.join("") + "z";
}

export const circlePath = (cx: number, cy: number, r: number) =>
  `M${fmt(cx - r)} ${fmt(cy)}a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(2 * r)} 0a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(-2 * r)} 0z`;

// A polyline thickened into a closed band with miter joins, for cutting stroke-shaped holes in Fill.
export function band(pts: Pt[], halfWidth: number): Pt[] {
  const normal = (a: Pt, b: Pt): Pt => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l = Math.hypot(dx, dy);
    return [-dy / l, dx / l];
  };
  const side = (sign: number) =>
    pts.map((p, i): Pt => {
      const n0 = i > 0 ? normal(pts[i - 1], p) : normal(p, pts[i + 1]);
      const n1 = i < pts.length - 1 ? normal(p, pts[i + 1]) : n0;
      const m: Pt = [n0[0] + n1[0], n0[1] + n1[1]];
      const ml = Math.hypot(m[0], m[1]);
      const k = halfWidth / ((m[0] / ml) * n0[0] + (m[1] / ml) * n0[1]);
      return [p[0] + (sign * m[0] * k) / ml, p[1] + (sign * m[1] * k) / ml];
    });
  return [...side(1), ...side(-1).reverse()];
}

export function clipRightOf(pts: Pt[], x: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    const aIn = a[0] >= x;
    if (aIn) out.push(a);
    if (aIn !== b[0] >= x) {
      const t = (x - a[0]) / (b[0] - a[0]);
      out.push([x, a[1] + t * (b[1] - a[1])]);
    }
  }
  return out;
}
