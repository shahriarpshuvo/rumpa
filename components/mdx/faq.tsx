import type { ReactNode } from "react";

export function FAQ({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <details className="not-prose my-3 group rounded-xl border border-border bg-card p-4 open:bg-accent/30 transition-colors">
      <summary className="cursor-pointer list-none flex items-start justify-between gap-3 font-semibold text-foreground">
        <span>{question}</span>
        <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">
          +
        </span>
      </summary>
      <div className="mt-3 text-sm text-muted-foreground leading-relaxed [&_a]:underline [&_a]:text-primary">
        {children}
      </div>
    </details>
  );
}
