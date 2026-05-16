import { getPaginatedPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog-list";
import { Badge } from "@/components/ui/badge";
import { BlogHeader } from "@/components/blog-header";

export const metadata = {
  title: "Blog",
  description: "Articles on fertility, PCOS management, and reproductive health by Dr. Rezwana Rumpa.",
};

export default async function BlogPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const { posts, totalPages, totalPosts } = getPaginatedPosts(page, 5);

  return (
    <main className="relative">
      <BlogHeader />
      <div className="mx-auto max-w-4xl px-6 pt-12 pb-24">
        <div className="mb-14 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold">Blog</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-md mx-auto">
            Insights on fertility, PCOS, and your journey to parenthood.
          </p>
          <div className="mt-4">
            <Badge variant="outline" className="text-sm bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1">
              {totalPosts} {totalPosts === 1 ? "Article" : "Articles"}
            </Badge>
          </div>
        </div>
        <BlogList posts={posts} page={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
