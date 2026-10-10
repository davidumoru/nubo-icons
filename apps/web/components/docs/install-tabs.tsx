import { TerminalIcon } from "@nubo-icons/react";
import { CodeTabsBlock } from "@/components/code/code-tabs-block";

const MANAGERS = [
  { value: "pnpm", command: "pnpm add" },
  { value: "npm", command: "npm install" },
  { value: "yarn", command: "yarn add" },
  { value: "bun", command: "bun add" },
];

export function InstallTabs({ pkg }: { pkg: string }) {
  return (
    <CodeTabsBlock
      storageKey="nubo:package-manager"
      icon={<TerminalIcon />}
      tabs={MANAGERS.map((m) => ({
        value: m.value,
        label: m.value,
        code: `${m.command} ${pkg}`,
      }))}
    />
  );
}
