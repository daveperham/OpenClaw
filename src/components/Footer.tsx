import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🦞</span>
              <span className="font-bold text-xl text-white">
                TheClaw<span className="text-amber-500">Tips</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The best tutorials, guides, and tips for AI agent builders using
              OpenClaw. Written by people who run agents every day.
            </p>
            <a
              href="https://substack.com/@theopenclawinsider"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Subscribe to Newsletter
            </a>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-white font-semibold mb-3">Content</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/getting-started"
                  className="hover:text-amber-400 transition-colors"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/tutorials"
                  className="hover:text-amber-400 transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/cost-breakdowns"
                  className="hover:text-amber-400 transition-colors"
                >
                  Cost Breakdowns
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/agent-setup"
                  className="hover:text-amber-400 transition-colors"
                >
                  Agent Setup
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/tips-and-tricks"
                  className="hover:text-amber-400 transition-colors"
                >
                  Tips &amp; Tricks
                </Link>
              </li>
            </ul>
          </div>

          {/* Site */}
          <div>
            <h3 className="text-white font-semibold mb-3">Site</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://substack.com/@theopenclawinsider"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Newsletter
                </a>
              </li>
              <li>
                <a
                  href="https://openclaw.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  OpenClaw.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© {year} TheClaw Tips. All rights reserved.</p>
          <p>
            Not affiliated with OpenClaw — an independent community resource.
          </p>
        </div>
      </div>
    </footer>
  );
}
