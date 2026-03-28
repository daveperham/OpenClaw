import { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All Articles",
  description:
    "Browse all OpenClaw tutorials, setup guides, cost breakdowns, and tips for AI agent builders.",
  alternates: {
    canonical: "https://theclawtips.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">All Articles</h1>
        <p className="text-gray-600 text-lg">
          {posts.length} article{posts.length !== 1 ? "s" : ""} on OpenClaw
          setup, tutorials, cost breakdowns, and tips.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-16">
          No articles yet. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
