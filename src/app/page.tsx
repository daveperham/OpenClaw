import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import {
  getAllPosts,
  getFeaturedPosts,
} from "@/lib/posts";
import { CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/lib/categories";

export const metadata: Metadata = {
  title: "TheClaw Tips — OpenClaw Tutorials, Guides & Tips",
  description:
    "The best tutorials, guides, and tips for AI agent builders using OpenClaw. Learn to set up agents, reduce costs, and build powerful AI workflows.",
  alternates: {
    canonical: "https://theclawtips.com",
  },
};

const categoryIcons: Record<string, string> = {
  "getting-started": "🚀",
  tutorials: "🛠️",
  "cost-breakdowns": "💰",
  "agent-setup": "🤖",
  "tips-and-tricks": "⚡",
  "use-cases": "💡",
};

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 6);
  const categories = Object.entries(CATEGORY_LABELS);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>🦞</span> Your OpenClaw knowledge base
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
            Master <span className="text-amber-400">OpenClaw</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The best tutorials, guides, and tips for AI agent builders. Learn to
            set up, optimize, and get real value from OpenClaw agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog/complete-openclaw-setup-guide"
              className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-lg"
            >
              Start Here: Setup Guide
            </Link>
            <Link
              href="/blog"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-lg border border-white/20"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Articles
              </h2>
              <Link
                href="/blog"
                className="text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Browse by Category
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
            Find exactly what you need — from setup guides to cost breakdowns to
            advanced agent configuration.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(([slug, label]) => (
              <Link
                key={slug}
                href={`/categories/${slug}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-amber-300 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="text-3xl mb-3">{categoryIcons[slug] || "📄"}</div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                  {label}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {CATEGORY_DESCRIPTIONS[slug]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Library Teaser */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-sm font-medium px-3 py-1 rounded-full mb-4">
                <span>📚</span> New
              </div>
              <h2 className="text-3xl font-extrabold mb-4">
                Go deeper with <span className="text-amber-400">The Library</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Five books covering everything from your first AI agent to intelligent memory systems. 299,000+ words of practical, battle-tested guidance.
              </p>
              <Link
                href="/library"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Browse the Library →
              </Link>
            </div>
            <div className="flex gap-4">
              {[
                { src: "/images/books/ai-agent-blueprint.png", alt: "AI Agent Blueprint" },
                { src: "/images/books/openclaw-playbook.png", alt: "OpenClaw Playbook" },
                { src: "/images/books/ai-revenue-machine.png", alt: "AI Revenue Machine" },
                { src: "/images/books/ai-agents-business.png", alt: "AI Agents for Business" },
                { src: "/images/books/ai-memory-architecture.png", alt: "The AI Memory Architecture" },
              ].map((book, i) => (
                <Link key={book.alt} href="/library" className="group">
                  <div
                    className="relative w-[100px] h-[134px] rounded shadow-lg overflow-hidden border border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ transform: `rotate(${-3 + i * 2}deg)` }}
                  >
                    <Image src={book.src} alt={book.alt} fill className="object-cover" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {latestPosts.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Latest Articles
              </h2>
              <Link
                href="/blog"
                className="text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <NewsletterCTA />
        </div>
      </section>
    </>
  );
}
