import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { iconNames, loadIcon } from "@nubo-icons/tools/icons";
import { morphLines, morphShapes } from "@nubo-icons/tools/morph";
import { MorphIcon } from "../dist/esm/morph/index.js";

const members = iconNames()
  .map(loadIcon)
  .filter((icon) => icon.meta.morph);

const drawn = (name: string) =>
  [
    ...renderToStaticMarkup(createElement(MorphIcon, { name })).matchAll(
      /<path d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)" opacity="1"/g,
    ),
  ].map((m) => m.slice(1).map(Number));

const key = ([x1, y1, x2, y2]: number[]) =>
  [
    [x1, y1],
    [x2, y2],
  ]
    .map((p) => p.map((n) => n.toFixed(2)).join(","))
    .sort()
    .join(" ");

test("every morphing icon first renders exactly the lines in its source SVG", () => {
  assert.ok(members.length > 0);
  for (const icon of members)
    assert.deepEqual(
      drawn(icon.name).map(key).sort(),
      morphLines(icon.svg.line).map(key).sort(),
      icon.name,
    );
});

test("MorphIcon always draws three paths and hides the unused ones", () => {
  const html = renderToStaticMarkup(
    createElement(MorphIcon, { name: "minus" }),
  );
  assert.equal(html.match(/<path /g)?.length, 3);
  assert.equal(html.match(/opacity="0"/g)?.length, 2);
  assert.match(html, /aria-hidden="true"/);
});

test("morphing icons that mirror name their mirror image", () => {
  const shapes = morphShapes(members);
  assert.equal(shapes["arrow-right"].mirror, "arrow-left");
  assert.equal(shapes["chevron-left"].mirror, "chevron-right");
  assert.equal(shapes["arrow-up"].mirror, undefined);
});
