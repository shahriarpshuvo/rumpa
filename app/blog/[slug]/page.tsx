import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Separator } from "@/components/ui/separator";
import { BlogPostNav } from "@/components/blog-post-nav";
import { getPostBySlug, getAdjacentPosts, getAllPosts } from "@/lib/blog";
import { BlogHeader } from "@/components/blog-header";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://drrezwanarumpa.com";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.date,
      authors: ["Dr. Rezwana Rumpa"],
      images: [
        {
          url: `${SITE_URL}/social.png`,
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
      images: [`${SITE_URL}/social.png`],
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
    url: `${SITE_URL}/blog/${slug}`,
    author: {
      "@type": "Physician",
      name: "Dr. Rezwana Rumpa",
      url: SITE_URL,
    },
  };

  return (
    <main className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogHeader />
      <div className="mx-auto max-w-3xl px-6 pt-8 pb-24">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-px transition-transform" />
          Back to Blog
        </Link>

        <h1 className="font-heading font-bold text-3xl md:text-4xl leading-tight">{post.title}</h1>
        <p className="text-sm text-muted-foreground mt-2">{formattedDate}</p>

        <Separator className="my-6" />

        <article className="prose dark:prose-invert max-w-full text-pretty font-sans leading-relaxed text-muted-foreground">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [rehypePrettyCode, { theme: "github-dark-default", defaultLang: "plaintext", lineNumbers: true }],
                ],
              },
            }}
          />
        </article>

        <BlogPostNav prev={prev} next={next} />
      </div>
    </main>
  );
}
