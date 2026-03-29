import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Library — Books by David Perham | TheClawTips",
  description:
    "Four books on AI agents — from your first setup to a full revenue operation. 232,000+ words of practical, no-BS guidance. Written by a human, powered by AI.",
  alternates: {
    canonical: "https://theclawtips.com/library",
  },
};

const books = [
  {
    slug: "ai-agent-blueprint",
    title: "The AI Agent Blueprint",
    subtitle: "How to Build, Deploy, and Monetize Your Own AI Team",
    cover: "/images/books/ai-agent-blueprint.png",
    color: "#7c5cfc",
    words: "47,000+",
    chapters: 18,
    audience: "Builders & Developers",
    buyUrl: "https://daveperham.gumroad.com/l/zvkfr",
    price: "$14.99",
    pitch:
      "The field manual. Set up your first AI agent in under an hour, build a multi-agent team with specialized roles, connect to every channel, and start monetizing. Real code, real configs, real numbers.",
    highlights: [
      "First agent in under an hour",
      "Multi-agent routing matrix",
      "WhatsApp, Discord, voice calls",
      "Cost management playbooks",
    ],
  },
  {
    slug: "openclaw-playbook",
    title: "The OpenClaw Playbook",
    subtitle: "Agents, Skills & Tools for the AI-Powered Operator",
    cover: "/images/books/openclaw-playbook.png",
    color: "#22d3ee",
    words: "71,000+",
    chapters: 20,
    audience: "Power Users & Operators",
    buyUrl: "https://daveperham.gumroad.com/l/ryzfh",
    price: "$14.99",
    pitch:
      "The cookbook. Advanced agent configuration, model selection strategy, memory architecture, custom skills, orchestration patterns, and cost optimization. You'll build while you read.",
    highlights: [
      "SOUL files & agent personas",
      "Model selection: Opus vs Sonnet vs Haiku",
      "Build & publish skills to ClawHub",
      "Cut costs 40-60%",
    ],
  },
  {
    slug: "ai-revenue-machine",
    title: "The AI Revenue Machine",
    subtitle: "Building Autonomous Income Streams with AI Agents",
    cover: "/images/books/ai-revenue-machine.png",
    color: "#f59e0b",
    words: "53,000+",
    chapters: 20,
    audience: "Entrepreneurs & Side-Hustlers",
    buyUrl: "https://daveperham.gumroad.com/l/osyoww",
    price: "$14.99",
    pitch:
      "The business plan. Seven income streams you can build with AI agents, with real costs, real revenue projections, and step-by-step playbooks. Your agents should pay for themselves.",
    highlights: [
      "7 revenue streams mapped out",
      "Newsletter in a day playbook",
      "Niche site in a day playbook",
      "Scale to $5,000+/month",
    ],
  },
  {
    slug: "ai-agents-business",
    title: "AI Agents for Business",
    subtitle: "A Non-Technical Guide to Automating Your Company with AI",
    cover: "/images/books/ai-agents-business.png",
    color: "#10b981",
    words: "60,000+",
    chapters: 20,
    audience: "Business Owners & Managers",
    buyUrl: "https://daveperham.gumroad.com/l/hwlvxz",
    price: "$14.99",
    pitch:
      "The executive brief. Written for dentists, realtors, e-commerce owners, and consultants — not developers. Zero jargon, pure ROI. You don't need a tech team. You need this book and an afternoon.",
    highlights: [
      "Zero code required",
      "ROI calculations per use case",
      "Industry-specific playbooks",
      "Vendor comparison across 6 categories",
    ],
  },
];

export default function LibraryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white py-20 px-4 relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>📚</span> 232,000+ words across 4 books
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
            The <span className="text-amber-400">Library</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Everything I know about AI agents — from first setup to full
            revenue operation — distilled into four books.
          </p>
          <p className="text-gray-500 text-sm">
            Written by David Perham · Outlined by a human, drafted by AI agents, edited by both
          </p>
        </div>
      </section>

      {/* Reading Path */}
      <section className="py-12 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Pick your path
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: "🔨", label: "I want to build", book: "AI Agent Blueprint" },
              { emoji: "⚡", label: "I want to master", book: "OpenClaw Playbook" },
              { emoji: "💰", label: "I want to earn", book: "AI Revenue Machine" },
              { emoji: "🏢", label: "I run a business", book: "AI Agents for Business" },
            ].map((path) => (
              <div
                key={path.label}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-amber-300 hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-2">{path.emoji}</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {path.label}
                </div>
                <div className="text-xs text-gray-500">→ {path.book}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-24">
          {books.map((book, i) => (
            <div
              key={book.slug}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
            >
              {/* Book cover with 3D effect */}
              <div className="flex-shrink-0 group" style={{ perspective: "1000px" }}>
                <div
                  className="relative transition-transform duration-500 group-hover:scale-105"
                  style={{
                    transform: `rotateY(${i % 2 === 0 ? "-5" : "5"}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Shadow */}
                  <div
                    className="absolute -inset-2 rounded-xl opacity-30 blur-xl transition-opacity group-hover:opacity-50"
                    style={{ background: book.color }}
                  />
                  {/* Cover */}
                  <div className="relative w-[260px] h-[348px] rounded-lg overflow-hidden shadow-2xl border border-gray-200">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Spine effect */}
                  <div
                    className="absolute top-0 left-0 w-3 h-full rounded-l-lg"
                    style={{
                      background: `linear-gradient(90deg, ${book.color}44, transparent)`,
                      transform: "translateX(-12px) rotateY(90deg)",
                      transformOrigin: "right",
                    }}
                  />
                </div>
              </div>

              {/* Book info */}
              <div className="flex-1 max-w-xl">
                <div
                  className="inline-block text-xs font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full"
                  style={{
                    color: book.color,
                    background: `${book.color}15`,
                    border: `1px solid ${book.color}30`,
                  }}
                >
                  {book.audience}
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                  {book.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4 italic">
                  {book.subtitle}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {book.pitch}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {book.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span style={{ color: book.color }} className="mt-0.5 font-bold">
                        ✓
                      </span>
                      {h}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex gap-6 text-sm text-gray-500 mb-6">
                  <span>
                    <strong className="text-gray-900">{book.words}</strong> words
                  </span>
                  <span>
                    <strong className="text-gray-900">{book.chapters}</strong>{" "}
                    chapters
                  </span>
                  <span>PDF + EPUB</span>
                </div>

                {/* Buy button */}
                <div className="flex gap-3 items-center">
                  <a
                    href={book.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-semibold px-6 py-3 rounded-xl text-white text-sm hover:opacity-90 transition-opacity"
                    style={{ background: book.color }}
                  >
                    Get it on Gumroad — {book.price}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            Want all four?
          </h2>
          <p className="text-gray-400 text-lg mb-3">
            The complete library — 232,000+ words, 80 chapters, zero filler.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Whether you&apos;re a developer, entrepreneur, or business owner — there&apos;s a book for you.
          </p>
          <a
            href="https://daveperham.gumroad.com/l/llftyx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors"
          >
            Get the Bundle — $39.99
          </a>
          <p className="text-gray-600 text-sm mt-3">Save 33% vs. buying individually</p>
        </div>
      </section>
    </>
  );
}
