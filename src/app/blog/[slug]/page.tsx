import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import { CATEGORY_LABELS, formatDate } from "@/lib/categories";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: `https://theclawtips.com/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://theclawtips.com/blog/${slug}`,
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;
  const categoryLabel =
    CATEGORY_LABELS[frontmatter.category] || frontmatter.category;
  const relatedPosts = getRelatedPosts(slug, frontmatter.category, 3);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    url: `https://theclawtips.com/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "TheClaw Tips",
      url: "https://theclawtips.com",
    },
    publisher: {
      "@type": "Organization",
      name: "TheClaw Tips",
      url: "https://theclawtips.com",
    },
    keywords: frontmatter.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
          <Link
            href={`/categories/${frontmatter.category}`}
            className="hover:text-amber-600 transition-colors"
          >
            {categoryLabel}
          </Link>
        </nav>

        {/* Article header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/categories/${frontmatter.category}`}
              className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-amber-200 transition-colors"
            >
              {categoryLabel}
            </Link>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {frontmatter.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            <span>·</span>
            <span>{readingTime}</span>
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <>
                <span>·</span>
                <div className="flex flex-wrap gap-1.5">
                  {frontmatter.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Article content */}
        <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50 prose-blockquote:py-1 prose-img:rounded-xl">
          <MDXRemote source={content} />
        </div>

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-12">
          <NewsletterCTA />
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              More in {categoryLabel}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <ArticleCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
