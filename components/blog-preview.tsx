import { getAllPosts } from "@/lib/blog";
import { BlogPreviewList } from "@/components/blog-preview-list";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return <BlogPreviewList posts={posts} />;
}
