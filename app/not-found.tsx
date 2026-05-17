import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-600 mb-4">
          404 — Not found
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          The link might be broken, or the page may have moved. Try the home
          page or browse the blog.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-adelaide-300 text-foreground text-sm font-semibold hover:bg-accent/50 transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
