import { Metadata } from "next";
import Link from "next/link";
import NewsletterCTA from "@/components/NewsletterCTA";

export const metadata: Metadata = {
  title: "About TheClaw Tips",
  description:
    "TheClaw Tips is an independent resource for OpenClaw users — tutorials, guides, cost breakdowns, and tips written by people who run agents every day.",
  alternates: {
    canonical: "https://theclawtips.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About TheClaw Tips
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          An independent knowledge base for people building with OpenClaw — the
          AI agent orchestration platform.
        </p>
      </div>

      <div className="prose prose-lg prose-gray max-w-none prose-a:text-amber-600 prose-headings:font-bold">
        <h2>Why This Site Exists</h2>
        <p>
          OpenClaw is a powerful platform, but it comes with a learning curve.
          Documentation exists, but most of what you need to know — the costs,
          the gotchas, the workflow patterns that actually work — isn&apos;t in
          any official doc. It lives in Discord channels, Twitter threads, and
          the heads of people who&apos;ve already figured it out.
        </p>
        <p>
          TheClaw Tips is an attempt to collect that knowledge in one place.
          Every article here is written from hands-on experience running real
          OpenClaw agents — not from reading documentation or theorizing about
          what might work.
        </p>

        <h2>What We Cover</h2>
        <ul>
          <li>
            <strong>Setup guides</strong> — Step-by-step instructions for
            getting OpenClaw installed and connected to messaging channels
          </li>
          <li>
            <strong>Configuration tutorials</strong> — How to configure agents,
            sub-agents, memory, and workflows for specific use cases
          </li>
          <li>
            <strong>Cost breakdowns</strong> — Honest, numbers-first analysis of
            what running AI agents actually costs at different usage levels
          </li>
          <li>
            <strong>Tips and tricks</strong> — Power user techniques that save
            time and improve output quality
          </li>
          <li>
            <strong>Use cases</strong> — Real examples of OpenClaw being used
            for development, research, content creation, and more
          </li>
        </ul>

        <h2>Who Writes Here</h2>
        <p>
          TheClaw Tips is written by independent contributors who use OpenClaw
          for their own work. We&apos;re developers, researchers, and
          productivity enthusiasts who started using OpenClaw and couldn&apos;t
          find good answers to our questions — so we wrote them down.
        </p>
        <p>
          We are not affiliated with or sponsored by OpenClaw. Everything here
          is independent analysis and experience.
        </p>

        <h2>The Newsletter</h2>
        <p>
          The OpenClaw Insider is our weekly newsletter. Every Friday, we send
          one article, one tip, and one thing worth knowing about AI agent
          development. No sponsored content. No AI-generated filler.
        </p>
        <p>
          You can subscribe at{" "}
          <a
            href="https://substack.com/@theopenclawinsider"
            target="_blank"
            rel="noopener noreferrer"
          >
            The OpenClaw Insider on Substack
          </a>
          .
        </p>

        <h2>Staying Current</h2>
        <p>
          AI agent tools move fast. We update articles when pricing changes,
          when APIs change, or when we discover our earlier advice was wrong.
          Every article shows its publish date — when you see an article from 6+
          months ago, apply appropriate skepticism to version-specific
          instructions.
        </p>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
        <h3 className="font-bold text-gray-900 text-lg mb-2">
          Suggest a Topic
        </h3>
        <p className="text-gray-600 mb-4">
          Is there something about OpenClaw you&apos;d like us to cover?
          Something you couldn&apos;t find a good answer to? We&apos;re always
          looking for gaps to fill.
        </p>
        <p className="text-gray-600">
          Reach us through the newsletter or{" "}
          <a
            href="https://substack.com/@theopenclawinsider"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            leave a comment on Substack
          </a>
          .
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/blog"
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Read the Articles
        </Link>
        <Link
          href="/blog/complete-openclaw-setup-guide"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Start with Setup Guide
        </Link>
      </div>

      <div className="mt-12">
        <NewsletterCTA />
      </div>
    </div>
  );
}
