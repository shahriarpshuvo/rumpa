import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogPostNavProps {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
}

export function BlogPostNav({ prev, next }: BlogPostNavProps) {
  if (!prev && !next) return null;

  return (
    <nav className="flex flex-col sm:flex-row justify-between gap-4 mt-12">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex-1 flex flex-col gap-1 p-5 rounded-2xl border border-border/50 hover:bg-accent/30 transition-colors"
        >
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <ArrowLeft className="size-3 group-hover:-translate-x-px transition-transform" />
            Previous
          </span>
          <span className="text-base font-medium">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex-1 flex flex-col gap-1 p-5 rounded-2xl border border-border/50 hover:bg-accent/30 transition-colors text-right"
        >
          <span className="text-sm text-muted-foreground flex items-center justify-end gap-1">
            Next
            <ArrowLeft className="size-3 rotate-180 group-hover:translate-x-px transition-transform" />
          </span>
          <span className="text-base font-medium">{next.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
