"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "@/lib/blog";

const STAGGER_DELAY = 0.04;

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: (index % 12) * STAGGER_DELAY,
        ease: "easeOut",
      }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col rounded-2xl bg-card overflow-hidden border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all"
      >
        <div className="relative aspect-[40/21] w-full bg-muted overflow-hidden">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              {post.category ?? "Read"}
            </div>
          )}
          {post.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em]">
              ✦ Featured
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-semibold text-muted-foreground">
            {post.category && (
              <span className="text-primary">{post.category}</span>
            )}
            {post.category && post.readTime && (
              <span className="opacity-40">·</span>
            )}
            {post.readTime && <span>{post.readTime} min read</span>}
          </div>
          <h3 className="mt-3 text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.description && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {post.description}
            </p>
          )}
          <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            <span className="font-semibold text-primary group-hover:translate-x-1 transition-transform">
              Read →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface BlogListProps {
  posts: BlogPostMeta[];
  page: number;
  totalPages: number;
}

export function BlogList({ posts, page, totalPages }: BlogListProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i + (page - 1) * 12} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-12">
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link
                href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}
                className="h-9 px-4 flex items-center text-sm rounded-full border border-border hover:bg-accent/50 transition-colors"
              >
                Previous
              </Link>
            ) : (
              <span className="h-9 px-4 flex items-center text-sm rounded-full border border-border opacity-50 cursor-not-allowed">
                Previous
              </span>
            )}
            {page < totalPages ? (
              <Link
                href={`/blog?page=${page + 1}`}
                className="h-9 px-4 flex items-center text-sm rounded-full border border-border hover:bg-accent/50 transition-colors"
              >
                Next
              </Link>
            ) : (
              <span className="h-9 px-4 flex items-center text-sm rounded-full border border-border opacity-50 cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
