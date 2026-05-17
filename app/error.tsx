"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-600 mb-4">
          Something broke
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
          That didn&apos;t work.
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          An unexpected error stopped this page from loading. Try again, or
          head back to the home page.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-adelaide-300 text-foreground text-sm font-semibold hover:bg-accent/50 transition-colors"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
