import Link from "next/link";
import { Post } from "@/lib/posts"; import { CATEGORY_LABELS, formatDate } from "@/lib/categories";

interface ArticleCardProps {
  post: Post;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  "getting-started": "bg-green-100 text-green-700",
  tutorials: "bg-blue-100 text-blue-700",
  "cost-breakdowns": "bg-purple-100 text-purple-700",
  "agent-setup": "bg-orange-100 text-orange-700",
  "tips-and-tricks": "bg-amber-100 text-amber-700",
  "use-cases": "bg-teal-100 text-teal-700",
};

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const { frontmatter, slug, readingTime } = post;
  const categoryLabel =
    CATEGORY_LABELS[frontmatter.category] || frontmatter.category;
  const colorClass =
    categoryColors[frontmatter.category] || "bg-gray-100 text-gray-700";

  return (
    <article
      className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col ${
        featured ? "shadow-md" : ""
      }`}
    >
      {/* Thumbnail placeholder */}
      <div className="h-44 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-5xl opacity-60">
          {frontmatter.category === "getting-started" && "🚀"}
          {frontmatter.category === "tutorials" && "🛠️"}
          {frontmatter.category === "cost-breakdowns" && "💰"}
          {frontmatter.category === "agent-setup" && "🤖"}
          {frontmatter.category === "tips-and-tricks" && "⚡"}
          {frontmatter.category === "use-cases" && "💡"}
          {!frontmatter.category && "📄"}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Category badge */}
        <span
          className={`inline-block self-start text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${colorClass}`}
        >
          {categoryLabel}
        </span>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2">
          <Link
            href={`/blog/${slug}`}
            className="hover:text-amber-600 transition-colors"
          >
            {frontmatter.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {frontmatter.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 mt-auto">
          <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          <span>{readingTime}</span>
        </div>
      </div>
    </article>
  );
}
