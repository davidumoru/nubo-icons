import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";
import {
  STYLES,
  iconNames,
  loadIcon,
  parseSvg,
  toRenderable,
} from "@nubo-icons/tools/icons";

const PKG = new URL("..", import.meta.url).pathname;
const read = (path: string) => readFileSync(PKG + path, "utf8");

test("every style has exactly one file per icon", () => {
  const files = iconNames()
    .map((name) => `${name}.svg`)
    .sort();
  for (const style of STYLES)
    assert.deepEqual(readdirSync(PKG + style).sort(), files, style);
});

test("every file draws exactly what its source draws", () => {
  for (const name of iconNames()) {
    const icon = loadIcon(name);
    for (const style of STYLES)
      assert.deepEqual(
        parseSvg(read(`${style}/${name}.svg`)),
        parseSvg(toRenderable(icon.svg[style])),
        `${name} (${style})`,
      );
  }
});

test("Duo files carry real opacity, not the source's marker", () => {
  for (const name of iconNames())
    assert.ok(!read(`duo/${name}.svg`).includes("data-tone"), name);
});

test("icons.json lists every icon with its aliases", () => {
  const data = JSON.parse(read("icons.json"));
  assert.deepEqual(Object.keys(data), iconNames());
  assert.ok(data["magnifying-glass"].aliases.includes("search"));
});
