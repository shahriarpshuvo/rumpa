import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function calcReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export type BlogCategory = "PCOS" | "Treatment" | "Preconception" | "Fertility";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  coverImage?: string;
  category?: BlogCategory;
  readTime?: number;
  featured?: boolean;
  emphasisWords?: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      description: data.description ?? "",
      coverImage: data.coverImage,
      category: data.category as BlogCategory | undefined,
      readTime: data.readTime ?? calcReadTime(content),
      featured: data.featured ?? false,
      emphasisWords: data.emphasisWords,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPaginatedPosts(
  page: number,
  perPage: number = 5
): { posts: BlogPostMeta[]; totalPages: number; totalPosts: number } {
  const allPosts = getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const start = (page - 1) * perPage;
  const posts = allPosts.slice(start, start + perPage);

  return { posts, totalPages, totalPosts };
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    coverImage: data.coverImage,
    category: data.category as BlogCategory | undefined,
    readTime: data.readTime ?? calcReadTime(content),
    featured: data.featured ?? false,
    emphasisWords: data.emphasisWords,
    content,
  };
}

export function getAdjacentPosts(
  slug: string
): { prev: BlogPostMeta | null; next: BlogPostMeta | null } {
  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);

  return {
    prev: index < allPosts.length - 1 ? allPosts[index + 1] : null,
    next: index > 0 ? allPosts[index - 1] : null,
  };
}
