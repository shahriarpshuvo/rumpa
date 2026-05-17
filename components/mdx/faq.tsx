import type { ReactNode } from "react";

export function FAQ({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <details
      open
      className="not-prose my-3 group rounded-lg border border-border bg-card p-4 sm:p-5"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <summary
        className="cursor-pointer list-none flex items-start justify-between gap-3 font-bold text-foreground leading-snug"
        itemProp="name"
      >
        <span>{question}</span>
        <span className="text-primary text-xl leading-none shrink-0 group-open:rotate-45 transition-transform">
          +
        </span>
      </summary>
      <div
        className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed [&_a]:underline [&_a]:text-blossom-600"
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div itemProp="text">{children}</div>
      </div>
    </details>
  );
}
