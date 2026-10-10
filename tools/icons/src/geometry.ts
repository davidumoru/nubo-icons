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
    const p1: Pt = [
      cur[0] + ((prev[0] - cur[0]) * a) / d1,
      cur[1] + ((prev[1] - cur[1]) * a) / d1,
    ];
    const p2: Pt = [
      cur[0] + ((next[0] - cur[0]) * b) / d2,
      cur[1] + ((next[1] - cur[1]) * b) / d2,
    ];
    out.push(
      `${i === 0 ? "M" : "L"}${fmt(p1[0])} ${fmt(p1[1])}Q${fmt(cur[0])} ${fmt(cur[1])} ${fmt(p2[0])} ${fmt(p2[1])}`,
    );
  }
  return out.join("") + "z";
}

export const circlePath = (cx: number, cy: number, r: number) =>
  `M${fmt(cx - r)} ${fmt(cy)}a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(2 * r)} 0a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(-2 * r)} 0z`;

// The outline of a round-capped, round-joined stroke along a polyline, as one closed path.
// Fill cuts these out with evenodd, so overlapping capsules can't be used: overlaps would cancel.
export function strokeOutline(pts: Pt[], halfWidth: number): string {
  const w = halfWidth;
  const unit = (a: Pt, b: Pt): Pt => {
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    return [(b[0] - a[0]) / l, (b[1] - a[1]) / l];
  };
  const dirs = pts.slice(1).map((p, i) => unit(pts[i], p));
  const normal = (u: Pt): Pt => [-u[1], u[0]];
  const add = (p: Pt, v: Pt, k: number): Pt => [
    p[0] + v[0] * k,
    p[1] + v[1] * k,
  ];
  const cross = (a: Pt, b: Pt) => a[0] * b[1] - a[1] * b[0];
  const p = (q: Pt) => `${fmt(q[0])} ${fmt(q[1])}`;
  const arc = (from: Pt, to: Pt, center: Pt, via: Pt) => {
    const sweep =
      cross(
        [from[0] - center[0], from[1] - center[1]],
        [via[0] - center[0], via[1] - center[1]],
      ) > 0
        ? 1
        : 0;
    return `A${fmt(w)} ${fmt(w)} 0 0 ${sweep} ${p(to)}`;
  };

  const side = (sign: 1 | -1, order: Pt[], ds: Pt[]) => {
    let out = `L${p(add(order[0], normal(ds[0]), sign * w))}`;
    for (let i = 1; i < order.length - 1; i++) {
      const [u0, u1] = [ds[i - 1], ds[i]];
      const a = add(order[i], normal(u0), sign * w);
      const b = add(order[i], normal(u1), sign * w);
      const outer = cross(u0, u1) < 0 === sign > 0;
      if (outer) {
        const mid = normal([u0[0] + u1[0], u0[1] + u1[1]]);
        const ml = Math.hypot(mid[0], mid[1]);
        out += `L${p(a)}${arc(a, b, order[i], add(order[i], [mid[0] / ml, mid[1] / ml], sign * w))}`;
      } else {
        const t = cross([b[0] - a[0], b[1] - a[1]], u1) / cross(u0, u1);
        out += `L${p(add(a, u0, t))}`;
      }
    }
    const last = order.length - 1;
    out += `L${p(add(order[last], normal(ds[last - 1]), sign * w))}`;
    return out;
  };

  const reversed = [...pts].reverse();
  const reversedDirs = [...dirs].reverse().map((u): Pt => [-u[0], -u[1]]);
  const end = pts.length - 1;
  const capEnd = (at: Pt, u: Pt, sign: 1 | -1) =>
    arc(
      add(at, normal(u), sign * w),
      add(at, normal(u), -sign * w),
      at,
      add(at, u, w),
    );
  const body =
    side(1, pts, dirs).slice(1) +
    capEnd(pts[end], dirs[end - 1], 1) +
    side(1, reversed, reversedDirs).replace(/^L[^LA]*/, "") +
    capEnd(pts[0], reversedDirs[end - 1], 1);
  return `M${body}z`;
}
