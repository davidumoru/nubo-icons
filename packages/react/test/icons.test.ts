import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  STYLES,
  iconNames,
  loadIcon,
  parseSvg,
  type Node,
} from "@nubo-icons/tools/icons";
import * as Line from "../dist/esm/line/index.js";
import * as Fill from "../dist/esm/fill/index.js";
import * as Duo from "../dist/esm/duo/index.js";
import * as Root from "../dist/esm/line/index.js";

type Module = Record<string, ComponentType<Record<string, unknown>>>;
const modules = { line: Line, fill: Fill, duo: Duo } as unknown as Record<
  (typeof STYLES)[number],
  Module
>;
const pascal = (slug: string) =>
  slug.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());
const html = (C: ComponentType<Record<string, unknown>>, props = {}) =>
  renderToStaticMarkup(createElement(C, props));

const shapes = (node: Node): string[] =>
  node.children.flatMap((child) => [
    [
      child.name,
      ...Object.entries(child.attrs)
        .filter(([k]) => k !== "data-tone" && k !== "opacity")
        .map(([k, v]) => `${k}=${v}`)
        .sort(),
    ].join(" "),
    ...shapes(child),
  ]);

test("every icon renders exactly the shapes in its source SVG", () => {
  for (const slug of iconNames()) {
    const icon = loadIcon(slug);
    for (const style of STYLES) {
      const rendered = parseSvg(html(modules[style][pascal(slug)]));
      assert.deepEqual(
        shapes(rendered),
        shapes(parseSvg(icon.svg[style])),
        `${slug} (${style})`,
      );
    }
  }
});

test("every style exports the same names, including aliases and …Icon", () => {
  const names = Object.keys(Line).sort();
  assert.deepEqual(Object.keys(Fill).sort(), names);
  assert.deepEqual(Object.keys(Duo).sort(), names);
  assert.ok(names.includes("HeartIcon"));
  assert.equal(
    (Line as unknown as Module).Search,
    (Line as unknown as Module).MagnifyingGlass,
  );
  assert.equal(
    (Root as unknown as Module).House,
    (Line as unknown as Module).House,
  );
});

test("icons are hidden from screen readers unless labelled", () => {
  const { Heart } = Line as unknown as Module;
  assert.match(html(Heart), /aria-hidden="true"/);

  const titled = html(Heart, { title: "Favorite" });
  assert.match(titled, /role="img"/);
  assert.match(titled, /<title>Favorite<\/title>/);
  assert.doesNotMatch(titled, /aria-hidden/);

  const labelled = html(Heart, { "aria-label": "Favorite" });
  assert.match(labelled, /role="img"/);
  assert.doesNotMatch(labelled, /aria-hidden/);
});

test("size, strokeWidth, className and secondaryOpacity apply", () => {
  const { Heart } = Duo as unknown as Module;
  const out = html(Heart, {
    size: 32,
    strokeWidth: 2,
    className: "extra",
    secondaryOpacity: 0.2,
  });
  assert.match(out, /width="32" height="32"/);
  assert.match(out, /stroke-width="2"/);
  assert.match(out, /class="nubo-icon nubo-heart extra"/);
  assert.match(out, /<g data-tone="secondary" opacity="0.2">/);
  assert.match(html(Heart), /opacity="0.35"/);
});

test("the CommonJS build exports the same components", () => {
  const require = createRequire(import.meta.url);
  const cjs = require("../dist/cjs/fill/index.js");
  assert.deepEqual(Object.keys(cjs).sort(), Object.keys(Fill).sort());
  assert.equal(html(cjs.Gear), html((Fill as unknown as Module).Gear));
});
