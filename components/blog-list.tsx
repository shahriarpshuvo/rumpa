"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "@/lib/blog";

const STAGGER_DELAY = 0.04;

function BlogEntry({ post, index }: { post: BlogPostMeta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * STAGGER_DELAY, ease: "easeOut" }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-center justify-between bg-card rounded-2xl p-5 border border-border/50 hover:shadow-md hover:border-primary/20 transition-all"
      >
        <div className="flex-1 min-w-0">
          <span className="text-lg font-semibold group-hover:text-primary transition-colors">
            {post.title}
          </span>
          <div className="text-sm text-muted-foreground mt-1">{post.date}</div>
        </div>
        <ChevronRight className="size-5 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary flex-shrink-0" />
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
      <div className="flex flex-col gap-4">
        {posts.map((post, i) => (
          <BlogEntry key={post.slug} post={post} index={i + (page - 1) * 5} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-10">
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
