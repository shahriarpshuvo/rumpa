"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogPreviewListProps {
  posts: BlogPostMeta[];
}

export function BlogPreviewList({ posts }: BlogPreviewListProps) {
  return (
    <section id="blog" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase">
              Blog
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
              Latest <span className="text-primary">Articles</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between bg-card rounded-2xl p-5 border border-border/50 hover:shadow-md hover:border-primary/20 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-base font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </span>
                  <div className="text-sm text-muted-foreground mt-1">{post.date}</div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
