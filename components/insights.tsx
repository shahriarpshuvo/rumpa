import Image from "next/image";
import Link from "next/link";
import { getAllPosts, type BlogPostMeta } from "@/lib/blog";
import { Em } from "@/components/ui/em";

const CATEGORY_GRADIENTS: Record<string, string> = {
  PCOS: "from-adelaide-200 via-adelaide-300 to-adelaide-500",
  Treatment: "from-adelaide-300 via-adelaide-400 to-adelaide-600",
  Preconception: "from-adelaide-100 to-adelaide-300",
  Fertility: "from-adelaide-200 to-adelaide-400",
  default: "from-adelaide-100 to-adelaide-300",
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
      className="group flex flex-col rounded-3xl bg-card overflow-hidden shadow-mauve hover:shadow-mauve-lg transition-shadow"
    >
      <div
        className={`relative h-64 sm:h-72 bg-gradient-to-br ${gradient(post.category)} flex items-center justify-center overflow-hidden`}
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
          <span className="font-display italic font-semibold text-7xl sm:text-8xl text-adelaide-50/55 tracking-tighter leading-none">
            {post.category ?? "Read"}
          </span>
        )}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-adelaide-950/70 backdrop-blur px-3 py-1 text-xs font-semibold text-adelaide-100">
          <span className="size-1.5 rounded-full bg-adelaide-300" />
          Featured
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.category && <Em className="text-sm">{post.category}</Em>}
          <span className="opacity-30">·</span>
          <span>{formatDate(post.date)}</span>
          {post.readTime && (
            <>
              <span className="opacity-30">·</span>
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>
        <h3 className="mt-3 text-2xl sm:text-[28px] font-extrabold leading-tight tracking-tight text-foreground group-hover:text-adelaide-700 transition-colors">
          {applyEmphasis(post.title, post.emphasisWords)}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.description}
        </p>
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Dr. Rezwana Rumpa</strong>
          </div>
          <span className="text-sm font-semibold text-foreground group-hover:translate-x-1 transition-transform">
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
      className="group flex flex-1 rounded-3xl bg-card overflow-hidden shadow-mauve hover:shadow-mauve-lg transition-shadow"
    >
      <div
        className={`relative w-40 flex-shrink-0 bg-gradient-to-br ${gradient(post.category)} flex items-center justify-center`}
      >
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="160px" />
        ) : (
          <span className="font-display italic font-semibold text-3xl text-adelaide-100 leading-none text-center px-2">
            {post.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {post.category && <Em className="text-sm">{post.category}</Em>}
          {post.readTime && (
            <>
              <span className="opacity-30">·</span>
              <span>{post.readTime} min</span>
            </>
          )}
        </div>
        <h3 className="mt-2 text-base sm:text-lg font-bold leading-snug text-foreground group-hover:text-adelaide-700 transition-colors">
          {applyEmphasis(post.title, post.emphasisWords)}
        </h3>
        <div className="mt-auto pt-3 text-xs text-muted-foreground">
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
    <section id="insights" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-secondary px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
              Reading Room
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
              Insights &amp; <Em>Education</Em>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
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

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
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
