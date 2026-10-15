import { parseSvg, type Icon } from "./icons";

export type Line = [x1: number, y1: number, x2: number, y2: number];

export type MorphShape = {
  lines: Line[];
  rotation?: string;
  angle?: number;
};

export const MAX_LINES = 3;

const round = (n: number) => Math.round(n * 100) / 100;

export function morphLines(svg: string): Line[] {
  const root = parseSvg(svg);
  const lines: Line[] = [];
  for (const node of root.children) {
    if (node.name !== "path")
      throw new Error(`only paths can morph, found <${node.name}>`);
    const tokens = node.attrs.d.match(/[MLHV]|-?\d*\.?\d+/g) ?? [];
    if (/[^MLHV\d.\s-]/.test(node.attrs.d))
      throw new Error(`only M, L, H and V commands can morph: ${node.attrs.d}`);
    let [x, y] = [0, 0];
    let command = "";
    for (let i = 0; i < tokens.length;) {
      if (/[MLHV]/.test(tokens[i])) command = tokens[i++];
      const n = () => Number(tokens[i++]);
      if (command === "M") [x, y] = [n(), n()];
      else {
        const [nx, ny] =
          command === "L" ? [n(), n()] : command === "H" ? [n(), y] : [x, n()];
        lines.push([x, y, nx, ny]);
        [x, y] = [nx, ny];
      }
    }
  }
  return lines;
}

function rotate([x1, y1, x2, y2]: Line, degrees: number): Line {
  const r = (degrees * Math.PI) / 180;
  const [c, s] = [Math.cos(r), Math.sin(r)];
  const turn = (x: number, y: number) => [
    12 + (x - 12) * c - (y - 12) * s,
    12 + (x - 12) * s + (y - 12) * c,
  ];
  return [...turn(x1, y1), ...turn(x2, y2)] as Line;
}

const distance = (a: Line, b: Line) =>
  Math.hypot(a[0] - b[0], a[1] - b[1]) + Math.hypot(a[2] - b[2], a[3] - b[3]);
const reverse = ([x1, y1, x2, y2]: Line): Line => [x2, y2, x1, y1];

function permutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items];
  return items.flatMap((item, i) =>
    permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [
      item,
      ...rest,
    ]),
  );
}

// Orders an icon's lines (and their directions) to follow a reference, so line i rotates into line i.
function align(lines: Line[], reference: Line[]): Line[] {
  let best = lines;
  let bestCost = Infinity;
  for (const order of permutations(lines)) {
    const aligned = order.map((line, i) =>
      distance(reverse(line), reference[i]) < distance(line, reference[i])
        ? reverse(line)
        : line,
    );
    const cost = aligned.reduce(
      (sum, l, i) => sum + distance(l, reference[i]),
      0,
    );
    if (cost < bestCost) [best, bestCost] = [aligned, cost];
  }
  return best;
}

export function morphShapes(icons: Icon[]): Record<string, MorphShape> {
  const members = icons.filter((icon) => icon.meta.morph);
  const shapes: Record<string, MorphShape> = {};
  for (const icon of members) {
    const { rotation, angle = 0 } = icon.meta.morph!;
    let lines = morphLines(icon.svg.line);
    if (rotation) {
      const base = members.find(
        (m) => m.meta.morph!.rotation === rotation && !m.meta.morph!.angle,
      );
      if (!base)
        throw new Error(`rotation "${rotation}" has no icon at angle 0`);
      const reference = morphLines(base.svg.line).map((l) => rotate(l, angle));
      if (reference.length !== lines.length)
        throw new Error(
          `${icon.name} has ${lines.length} lines but ${base.name} has ${reference.length}`,
        );
      lines = align(lines, reference);
    }
    shapes[icon.name] = {
      lines: lines.map((l) => l.map(round) as Line),
      ...(rotation ? { rotation, angle } : {}),
    };
  }
  return shapes;
}
