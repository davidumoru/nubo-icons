import {
  createElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type SVGProps,
} from "react";

type Line = [x1: number, y1: number, x2: number, y2: number];

export type MorphShape = {
  lines: Line[];
  rotation?: string;
  angle?: number;
};

export type MorphIconProps<Name extends string> = Omit<
  SVGProps<SVGSVGElement>,
  "name"
> & {
  name: Name;
  size?: number | string;
  title?: string;
};

type Slot = { line: Line; opacity: number };

type State = {
  name: string;
  slots: Slot[];
  // Which of the shape's lines each slot draws; past the end means the slot is hidden.
  order: number[];
  angle: number;
};

const SLOTS = 3;
// A critically damped spring: no overshoot, settled in about 400ms.
const STIFFNESS = 16;

const length = ([x1, y1, x2, y2]: Line) => Math.hypot(x2 - x1, y2 - y1);
const reverse = ([x1, y1, x2, y2]: Line): Line => [x2, y2, x1, y1];
const distance = (a: Line, b: Line) =>
  Math.hypot(a[0] - b[0], a[1] - b[1]) + Math.hypot(a[2] - b[2], a[3] - b[3]);
const midpoint = ([x1, y1, x2, y2]: Line): Line => {
  const [x, y] = [(x1 + x2) / 2, (y1 + y2) / 2];
  return [x, y, x, y];
};
const mix = (a: Line, b: Line, t: number) =>
  a.map((v, i) => v + (b[i] - v) * t) as Line;

function rotate([x1, y1, x2, y2]: Line, degrees: number): Line {
  const r = (degrees * Math.PI) / 180;
  const [c, s] = [Math.cos(r), Math.sin(r)];
  const turn = (x: number, y: number) => [
    12 + (x - 12) * c - (y - 12) * s,
    12 + (x - 12) * s + (y - 12) * c,
  ];
  return [...turn(x1, y1), ...turn(x2, y2)] as Line;
}

const PERMUTATIONS = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
];

// Pairs each slot with a target line so the lines travel as little as possible; slots left over shrink away.
function match(slots: Slot[], targets: Line[]): number[] {
  const cost = (slot: Slot, index: number) => {
    const target = targets[index];
    if (slot.opacity < 0.01) return target ? length(target) : 0;
    if (!target) return length(slot.line);
    return Math.min(
      distance(slot.line, target),
      distance(slot.line, reverse(target)),
    );
  };
  let best = PERMUTATIONS[0];
  let bestCost = Infinity;
  for (const order of PERMUTATIONS) {
    const total = order.reduce((sum, t, i) => sum + cost(slots[i], t), 0);
    if (total < bestCost) [best, bestCost] = [order, total];
  }
  return best;
}

function initialState(name: string, shape: MorphShape): State {
  return {
    name,
    slots: Array.from({ length: SLOTS }, (_, i) =>
      shape.lines[i]
        ? { line: shape.lines[i], opacity: 1 }
        : { line: [12, 12, 12, 12], opacity: 0 },
    ),
    order: [0, 1, 2],
    angle: shape.angle ?? 0,
  };
}

const pathData = ([x1, y1, x2, y2]: Line) =>
  `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`;

export function createMorphIcon<Name extends string>(
  shapes: Record<Name, MorphShape>,
): ForwardRefExoticComponent<
  MorphIconProps<Name> & RefAttributes<SVGSVGElement>
> {
  const MorphIcon = forwardRef<SVGSVGElement, MorphIconProps<Name>>(
    (
      { name, size = 24, strokeWidth = 1.5, title, className, ...rest },
      ref,
    ) => {
      // The paths are drawn once and then animated directly, so React never redraws them mid-morph.
      const [initial] = useState(() => initialState(name, shapes[name]));
      const state = useRef(initial);
      const paths = useRef<(SVGPathElement | null)[]>([]);

      useEffect(() => {
        const from = state.current;
        if (from.name === name) return;
        const target = shapes[name];
        const previous = shapes[from.name as Name];
        const turning =
          target.rotation !== undefined &&
          target.rotation === previous.rotation;

        const order = turning ? from.order : match(from.slots, target.lines);
        const startAngle = turning ? from.angle : 0;
        const endAngle = turning
          ? startAngle +
            ((((target.angle! - startAngle) % 360) + 540) % 360) -
            180
          : 0;

        const moves = from.slots.map((slot, i) => {
          let to = target.lines[order[i]];
          if (!to)
            return {
              from: slot,
              to: { line: midpoint(slot.line), opacity: 0 },
            };
          let line = slot.line;
          if (turning) {
            line = rotate(line, -startAngle);
            to = rotate(to, -target.angle!);
          }
          if (distance(line, reverse(to)) < distance(line, to))
            to = reverse(to);
          if (slot.opacity < 0.01) line = midpoint(to);
          return { from: { ...slot, line }, to: { line: to, opacity: 1 } };
        });

        const draw = (progress: number) => {
          const angle = startAngle + (endAngle - startAngle) * progress;
          const slots = moves.map(({ from, to }, i) => {
            let line = mix(from.line, to.line, progress);
            if (turning) line = rotate(line, angle);
            const opacity =
              from.opacity + (to.opacity - from.opacity) * progress;
            const path = paths.current[i];
            path?.setAttribute("d", pathData(line));
            path?.setAttribute("opacity", opacity.toFixed(3));
            return { line, opacity };
          });
          state.current = {
            name,
            slots,
            order,
            angle: turning ? angle : (target.angle ?? 0),
          };
        };

        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
          draw(1);
          return;
        }

        let frame = 0;
        let start: number | undefined;
        const tick = (now: number) => {
          start ??= now;
          const t = ((now - start) / 1000) * STIFFNESS;
          const progress = 1 - (1 + t) * Math.exp(-t);
          draw(progress > 0.999 ? 1 : progress);
          if (progress <= 0.999) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
      }, [name]);

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
          fill: "none",
          stroke: "currentColor",
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: ["nubo-icon", "nubo-morph", className]
            .filter(Boolean)
            .join(" "),
          ...(labelled ? { role: "img" } : { "aria-hidden": true }),
          ...rest,
        },
        title !== undefined ? createElement("title", null, title) : null,
        ...initial.slots.map((slot, i) =>
          createElement("path", {
            key: i,
            ref: (path: SVGPathElement | null) => {
              paths.current[i] = path;
            },
            d: pathData(slot.line),
            opacity: slot.opacity,
          }),
        ),
      );
    },
  );
  MorphIcon.displayName = "MorphIcon";
  return MorphIcon;
}
