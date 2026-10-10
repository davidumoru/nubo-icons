import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { CodeBlock } from "@/components/code/code-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function heading(Tag: "h2" | "h3" | "h4") {
  return function Heading({
    id,
    children,
    ...props
  }: React.ComponentProps<"h2">) {
    return (
      <Tag id={id} {...props}>
        <a href={`#${id}`} className="group font-[inherit] no-underline">
          {children}
          <span
            aria-hidden
            className="ml-2 text-muted-foreground opacity-0 group-hover:opacity-100"
          >
            #
          </span>
        </a>
      </Tag>
    );
  };
}

const components: MDXComponents = {
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} {...props} />
    ) : href.startsWith("#") ? (
      <a href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noreferrer" {...props} />
    ),
  pre: (props) => <CodeBlock {...props} />,
  table: (props) => (
    <div
      data-not-typeset
      className="mt-[1.25em] overflow-hidden rounded-xl border text-sm [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_td:first-child]:font-medium [&_td:first-child]:text-foreground [&_td:first-child_code]:text-foreground"
    >
      <Table {...props} />
    </div>
  ),
  thead: (props) => <TableHeader className="bg-muted/50" {...props} />,
  tbody: (props) => <TableBody {...props} />,
  tr: (props) => <TableRow className="hover:bg-transparent" {...props} />,
  th: (props) => (
    <TableHead
      className="h-10 px-4 text-xs font-medium text-muted-foreground"
      {...props}
    />
  ),
  td: (props) => (
    <TableCell
      className="px-4 py-3 align-top leading-relaxed whitespace-normal text-muted-foreground [&_code]:text-foreground/80"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
