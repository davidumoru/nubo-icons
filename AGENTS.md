# Agent instructions

Nubo is an open-source icon library: one set of icon names, three styles (Line, Fill, Duo), published to npm.

## Layout

| Path             | What lives there                                                                      |
| ---------------- | ------------------------------------------------------------------------------------- |
| `DESIGN.md`      | The design rules. Read it before drawing or changing any icon.                        |
| `icons/<name>/`  | Source of truth: `line.svg`, `fill.svg`, `duo.svg`, `meta.json`.                      |
| `packages/`      | Published packages, generated from `icons/`.                                          |
| `tools/`         | Lint, build and preview scripts.                                                      |
| `apps/web/`      | The website (Next.js, shadcn/ui).                                                     |
| `docs/research/` | The research behind the design and architecture decisions.                            |
| `playground/`    | Throwaway 18px experiments from before the real setup. Reference only, to be deleted. |

pnpm workspace. Use `pnpm`, never npm or yarn.

## Working on icons

- New icons are made in batches of 4–6, every icon in all three styles. Follow the review loop in `DESIGN.md`. Render the sheet and look at it before asking for review.
- Approved icons are locked. Don't change one unless the task is explicitly to redesign it.
- Never copy paths from another icon set. Several popular sets have licenses that forbid reuse in competing libraries.

## Code comments

- Default to no comments. Write self-explanatory code through clear naming and simple structure.
- Comment only to explain a non-obvious _why_: important constraints, business rules, workarounds or unintuitive decisions.
- Never comment on what the code plainly does. Don't narrate implementation details, restate function names, or summarize a block.
- No docstrings unless they document a public API contract.
- Remove redundant, outdated or unnecessary comments when you come across them. Update comments when you change the behavior they describe.

Rule of thumb: if removing a comment wouldn't cause a developer to miss essential context, misunderstand a constraint or make an incorrect change, remove it.
