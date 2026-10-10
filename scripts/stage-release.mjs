import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const out = mkdtempSync(join(tmpdir(), "nubo-release-"));

for (const dir of readdirSync("packages")) {
  const cwd = join("packages", dir);
  const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"));
  if (pkg.private) continue;
  const id = `${pkg.name}@${pkg.version}`;

  if (isPublished(id)) {
    console.log(`${id} is already on npm`);
    continue;
  }

  // pnpm pack swaps workspace: ranges for real versions, which npm on its own would publish verbatim.
  const tarball = execFileSync("pnpm", ["pack", "--pack-destination", out], {
    cwd,
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .pop();
  execFileSync("npm", ["stage", "publish", tarball, "--access", "public"], {
    stdio: "inherit",
  });
  // changesets/action reads these lines to tag the release and write its GitHub release notes.
  console.log(`New tag: ${id}`);
}

function isPublished(id) {
  try {
    return (
      execFileSync("npm", ["view", id, "version"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }).trim() !== ""
    );
  } catch (error) {
    if (String(error.stderr).includes("E404")) return false;
    throw error;
  }
}
