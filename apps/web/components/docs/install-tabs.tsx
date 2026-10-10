import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/docs/code-block";

const MANAGERS = [
  { id: "pnpm", command: "pnpm add" },
  { id: "npm", command: "npm install" },
  { id: "yarn", command: "yarn add" },
  { id: "bun", command: "bun add" },
];

export function InstallTabs({ pkg }: { pkg: string }) {
  return (
    <Tabs defaultValue="pnpm" className="mt-[1.25em]">
      <TabsList variant="line" aria-label="Package manager">
        {MANAGERS.map((m) => (
          <TabsTrigger key={m.id} value={m.id}>
            {m.id}
          </TabsTrigger>
        ))}
      </TabsList>
      {MANAGERS.map((m) => (
        <TabsContent key={m.id} value={m.id}>
          <CodeBlock>
            <code>
              {m.command} {pkg}
            </code>
          </CodeBlock>
        </TabsContent>
      ))}
    </Tabs>
  );
}
