import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { BlogPostNav } from "@/components/blog-post-nav";
import { FinalCTA } from "@/components/final-cta";
import { getPostBySlug, getAdjacentPosts, getAllPosts } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx";
import { DATA } from "@/data/resume";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rumpa.uk";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const ogImage = post.thumbnail ? `${SITE_URL}${post.thumbnail}` : `${SITE_URL}/social.png`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.date,
      authors: ["Dr. Rezwana Rumpa"],
      tags: post.category ? [post.category] : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: post.thumbnail ? `${SITE_URL}${post.thumbnail}` : undefined,
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    articleSection: post.category,
    wordCount: post.content.trim().split(/\s+/).length,
    publisher: {
      "@type": "Organization",
      name: DATA.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
    author: {
      "@type": "Physician",
      name: DATA.name,
      url: SITE_URL,
      image: `${SITE_URL}/rumpa-square.png`,
      jobTitle: DATA.title,
    },
  };

  return (
    <main className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-4xl px-6 pt-8 pb-24">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-px transition-transform" />
          Back to Blog
        </Link>

        <header className="mb-6">
          {post.category && (
            <div className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-blossom-600 mb-3">
              {post.category}
            </div>
          )}
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{post.description}</p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" />
              <time dateTime={post.date}>{formattedDate}</time>
            </span>
            {post.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {post.readTime} min read
              </span>
            )}
          </div>
        </header>

        {post.thumbnail && (
          <div className="relative aspect-[40/21] w-full rounded-lg overflow-hidden bg-muted border border-adelaide-200">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              itemProp="image"
            />
          </div>
        )}

        <div
          className="prose dark:prose-invert max-w-full text-pretty font-sans leading-relaxed text-foreground mt-10 prose-p:text-foreground prose-li:text-foreground prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-strong:text-foreground prose-a:text-blossom-600 hover:prose-a:text-blossom-700 prose-a:underline-offset-4 prose-li:my-1 prose-img:rounded-lg"
          itemProp="articleBody"
        >
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [rehypePrettyCode, { theme: "github-dark-default", defaultLang: "plaintext", lineNumbers: true }],
                ],
              },
            }}
          />
        </div>

        <BlogPostNav prev={prev} next={next} />
      </article>

      <FinalCTA />
    </main>
  );
}
