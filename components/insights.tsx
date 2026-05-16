import Image from "next/image";
import Link from "next/link";
import { getAllPosts, type BlogPostMeta } from "@/lib/blog";
import { Em } from "@/components/ui/em";

const CATEGORY_GRADIENTS: Record<string, string> = {
  PCOS: "from-adelaide-300 via-adelaide-500 to-adelaide-700",
  Treatment: "from-blossom-300 via-blossom-400 to-blossom-600",
  Preconception: "from-adelaide-200 via-adelaide-300 to-blossom-300",
  Fertility: "from-blossom-200 to-adelaide-400",
  default: "from-adelaide-200 to-adelaide-400",
};

function gradient(category?: string) {
  return CATEGORY_GRADIENTS[category ?? "default"] ?? CATEGORY_GRADIENTS.default;
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function applyEmphasis(title: string, words?: string[]) {
  if (!words || words.length === 0) {
    const parts = title.split(" ");
    if (parts.length < 3) return <>{title}</>;
    const head = parts.slice(0, -2).join(" ");
    const tail = parts.slice(-2).join(" ");
    return (
      <>
        {head} <Em>{tail}</Em>
      </>
    );
  }
  const pattern = words
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "i");
  const parts = title.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? <Em key={i}>{part}</Em> : <span key={i}>{part}</span>
      )}
    </>
  );
}

function FeaturedCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-3xl bg-card overflow-hidden shadow-mauve-lg hover:shadow-mauve transition-shadow ring-1 ring-adelaide-200"
    >
      <div
        className={`relative h-72 sm:h-96 bg-gradient-to-br ${gradient(post.category)} flex items-center justify-center overflow-hidden grain`}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        ) : (
          <span className="font-display italic font-bold text-[120px] sm:text-[180px] text-adelaide-50/70 tracking-tighter leading-none">
            {post.category ?? "Read"}
          </span>
        )}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-blossom-300 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-adelaide-950">
          ✦ Featured
        </div>
        <div className="absolute bottom-4 right-4 bg-adelaide-950/80 backdrop-blur px-3 py-1.5 rounded-full text-xs text-adelaide-100 font-semibold">
          {post.readTime} min read
        </div>
      </div>
      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.category && <Em className="text-base">{post.category}</Em>}
          <span className="opacity-30">·</span>
          <span className="uppercase tracking-[0.15em] text-[11px] font-semibold">{formatDate(post.date)}</span>
        </div>
        <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground group-hover:text-adelaide-700 transition-colors">
          {applyEmphasis(post.title, post.emphasisWords)}
        </h3>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed line-clamp-2">
          {post.description}
        </p>
        <div className="mt-auto pt-8 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Dr. Rezwana Rumpa</strong>
          </div>
          <span className="text-sm font-bold text-blossom-600 group-hover:translate-x-1 transition-transform">
            Read article →
          </span>
        </div>
      </div>
    </Link>
  );
}

function SecondaryCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-1 rounded-3xl bg-card overflow-hidden shadow-mauve hover:shadow-mauve-lg transition-shadow ring-1 ring-adelaide-200"
    >
      <div
        className={`relative w-44 flex-shrink-0 bg-gradient-to-br ${gradient(post.category)} flex items-center justify-center grain`}
      >
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="180px" />
        ) : (
          <span className="font-display italic font-bold text-3xl text-adelaide-50/80 leading-none text-center px-2 tracking-tighter">
            {post.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {post.category && <Em className="text-sm">{post.category}</Em>}
          {post.readTime && (
            <>
              <span className="opacity-30">·</span>
              <span className="uppercase tracking-[0.15em] text-[11px] font-semibold">{post.readTime} min</span>
            </>
          )}
        </div>
        <h3 className="mt-2 text-lg font-extrabold leading-snug text-foreground group-hover:text-adelaide-700 transition-colors">
          {applyEmphasis(post.title, post.emphasisWords)}
        </h3>
        <div className="mt-auto pt-4 text-[11px] uppercase tracking-[0.15em] text-blossom-600 font-bold">
          {formatDate(post.date)} · Read →
        </div>
      </div>
    </Link>
  );
}

export function Insights() {
  const all = getAllPosts();
  if (all.length === 0) return null;

  const featured = all.find((p) => p.featured) ?? all[0];
  const secondaries = all.filter((p) => p.slug !== featured.slug).slice(0, 2);

  return (
    <section id="insights" className="px-4 sm:px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-12">
          <div className="max-w-xl">
            <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-600">
              § 03 — Reading Room
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-foreground">
              Insights &amp;
              <br />
              <Em>Education.</Em>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Evidence-based fertility guidance, written for couples who want
              to understand — not just be told.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors self-start lg:self-auto"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
          <FeaturedCard post={featured} />
          <div className="flex flex-col gap-5">
            {secondaries.map((post) => (
              <SecondaryCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
