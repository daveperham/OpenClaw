import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import {
  getAllPosts,
  getPostsByCategory,
  getAllCategories,
} from "@/lib/posts";
import { CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/lib/categories";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  // Also include all defined categories even if no posts yet
  const allCategoryKeys = Object.keys(CATEGORY_LABELS);
  const uniqueCategories = Array.from(
    new Set([...categories, ...allCategoryKeys])
  );
  return uniqueCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category] || category;
  const description =
    CATEGORY_DESCRIPTIONS[category] ||
    `Browse all OpenClaw articles in the ${label} category.`;

  return {
    title: `${label} — OpenClaw Articles`,
    description,
    alternates: {
      canonical: `https://theclawtips.com/categories/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];

  if (!label) notFound();

  const posts = getPostsByCategory(category);
  const allCategories = Object.entries(CATEGORY_LABELS);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-amber-600 transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{label}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
          Category
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{label}</h1>
        <p className="text-gray-600 text-lg">
          {CATEGORY_DESCRIPTIONS[category] ||
            `All OpenClaw articles about ${label.toLowerCase()}.`}
        </p>
        {posts.length > 0 && (
          <p className="text-gray-500 text-sm mt-2">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Articles */}
      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No articles yet in this category
          </h2>
          <p className="text-gray-500 mb-6">
            Check back soon — we&apos;re always adding new content.
          </p>
          <Link
            href="/blog"
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            Browse All Articles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Other categories */}
      <div className="mt-12 pt-10 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Other Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {allCategories
            .filter(([slug]) => slug !== category)
            .map(([slug, catLabel]) => (
              <Link
                key={slug}
                href={`/categories/${slug}`}
                className="bg-gray-100 hover:bg-amber-100 hover:text-amber-700 text-gray-700 font-medium px-4 py-2 rounded-full text-sm transition-colors"
              >
                {catLabel}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
