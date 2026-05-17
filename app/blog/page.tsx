import Image from "next/image";
import { getPaginatedPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog-list";
import { Badge } from "@/components/ui/badge";
import { Em } from "@/components/ui/em";
import { FinalCTA } from "@/components/final-cta";

export const metadata = {
  title: "Guides & Insights",
  description: "Articles on fertility, PCOS management, and reproductive health by Dr. Rezwana Rumpa.",
};

export default async function BlogPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const { posts, totalPages, totalPosts } = getPaginatedPosts(page, 12);

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 pb-24">
        {/* Hero header — rounded container */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-adelaide-500/30 via-adelaide-500/15 to-blossom-200/40 border border-adelaide-200">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] aspect-square opacity-[0.3]"
          >
            <Image src="/icon.svg" alt="" fill className="object-contain" sizes="420px" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-[320px] aspect-square opacity-[0.2]"
          >
            <Image src="/icon.svg" alt="" fill className="object-contain" sizes="320px" />
          </div>

          <div className="relative px-6 py-16 sm:py-20 text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-600 mb-4">
              Guides & Insights
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground">
              Evidence-led answers,
              <br />
              <Em>written in clinic.</Em>
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground/90 leading-relaxed">
              Articles on fertility, PCOS, IVF, and the everyday questions patients bring to my consultation room.
            </p>
            <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
              <Badge className="rounded-full bg-adelaide-900 text-adelaide-50 border-0 px-5 py-4 text-sm font-bold tracking-wide">
                {totalPosts} {totalPosts === 1 ? "Article" : "Articles"}
              </Badge>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Updated weekly
              </span>
            </div>
          </div>
        </section>

        <div className="mt-14">
          <BlogList posts={posts} page={page} totalPages={totalPages} />
        </div>
      </div>

      <FinalCTA />
    </main>
  );
}
