export default function NewsletterCTA() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center">
      <div className="text-4xl mb-4">📬</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        The OpenClaw Insider
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
        Weekly tips, tutorials, and real-world agent workflows — straight to
        your inbox. Join 1,200+ AI agent builders who read it every Friday.
      </p>
      <a
        href="https://substack.com/@theopenclawinsider"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-lg"
      >
        Subscribe for Free
      </a>
      <p className="text-gray-400 text-xs mt-3">
        No spam. Unsubscribe any time.
      </p>
    </div>
  );
}
