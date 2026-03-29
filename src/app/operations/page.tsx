'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

/* ─── Agent Data ─── */
const agents = [
  { name: "Toji", role: "Orchestrator", model: "Claude Opus", color: "#7c5cfc", emoji: "🧠", desc: "The orchestrator. Coordinates the team, talks to David, makes decisions." },
  { name: "Codex", role: "Engineer", model: "Codex CLI", color: "#10b981", emoji: "⚙️", desc: "The engineer. Writes code, builds apps, reviews PRs." },
  { name: "Research", role: "Analyst", model: "Gemini Deep Research", color: "#22d3ee", emoji: "🔬", desc: "The analyst. Deep research, multi-source synthesis, fact-checking." },
  { name: "Banana", role: "Artist", model: "GPT-Image-1", color: "#f59e0b", emoji: "🎨", desc: "The artist. Generates images, avatars, book covers, banners." },
  { name: "Nemotron", role: "Workhorse", model: "Nemotron Ultra", color: "#76b900", emoji: "🏋️", desc: "The workhorse. Batch processing, content pipelines, grunt work." },
  { name: "Sonar", role: "Scout", model: "Sonar Pro", color: "#06b6d4", emoji: "📡", desc: "The scout. Real-time web monitoring, social listening, trend detection." },
  { name: "Atlas", role: "Polymath", model: "Gemini Pro", color: "#4285f4", emoji: "🗺️", desc: "The polymath. Document analysis, multimodal reasoning, data extraction." },
];

/* ─── Timeline Data ─── */
const timeline = [
  { day: "Day 1", title: "First agent online", desc: "Toji boots up, connects to WhatsApp" },
  { day: "Day 1", title: "Voice calls working", desc: "Twilio + ElevenLabs, real-time streaming" },
  { day: "Day 1", title: "Team assembled", desc: "7 specialized agents deployed" },
  { day: "Day 2", title: "Mission Control built", desc: "Real-time dashboard with 15 pages" },
  { day: "Day 2", title: "Content pipeline", desc: "Newsletter published, niche site deployed" },
  { day: "Day 2", title: "4 books written", desc: "232,000 words in one session" },
  { day: "Day 3", title: "Books published", desc: "Gumroad + Amazon KDP" },
  { day: "Day 3", title: "Revenue tracking", desc: "Automated sales monitoring" },
  { day: "Day 3", title: "This page", desc: "Because why not build in public" },
];

/* ─── Books Data ─── */
const books = [
  { title: "The AI Agent Blueprint", cover: "/images/books/ai-agent-blueprint.png", desc: "Build, deploy, and monetize your own AI team.", color: "#7c5cfc" },
  { title: "The OpenClaw Playbook", cover: "/images/books/openclaw-playbook.png", desc: "Advanced agent config, skills, and orchestration.", color: "#22d3ee" },
  { title: "The AI Revenue Machine", cover: "/images/books/ai-revenue-machine.png", desc: "Seven autonomous income streams with AI agents.", color: "#f59e0b" },
  { title: "AI Agents for Business", cover: "/images/books/ai-agents-business.png", desc: "Non-technical guide to automating your company.", color: "#10b981" },
];

/* ─── Stats Data ─── */
const stats = [
  { value: "299,000+", label: "words written" },
  { value: "80", label: "chapters" },
  { value: "7", label: "AI agents" },
  { value: "5", label: "channels connected" },
  { value: "< 72 hrs", label: "from zero to published" },
  { value: "4", label: "books on sale" },
];

/* ─── Steps Data ─── */
const steps = [
  { num: "01", title: "David sends a message", icon: "💬" },
  { num: "02", title: "Toji analyzes and routes", icon: "🧠" },
  { num: "03", title: "Specialists execute in parallel", icon: "⚡" },
  { num: "04", title: "Results delivered anywhere", icon: "🎯" },
];

const channels = [
  { name: "WhatsApp", icon: "💚" },
  { name: "Telegram", icon: "🔵" },
  { name: "Discord", icon: "🟣" },
  { name: "iMessage", icon: "🔵" },
  { name: "Voice", icon: "🎙️" },
];

/* ─── Intersection Observer Hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ops-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const children = el.querySelectorAll(".ops-reveal");
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Page Component ─── */
export default function OperationsPage() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="bg-gray-950 text-white min-h-screen">
      {/* Inline styles for animations */}
      <style jsx global>{`
        @keyframes ops-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ops-fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ops-pulse-glow {
          0%, 100% { box-shadow: 0 0 8px var(--glow-color, #7c5cfc); }
          50% { box-shadow: 0 0 20px var(--glow-color, #7c5cfc); }
        }
        @keyframes ops-scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes ops-dot-glow {
          0%, 100% { box-shadow: 0 0 6px 2px var(--dot-color, #f59e0b); }
          50% { box-shadow: 0 0 16px 6px var(--dot-color, #f59e0b); }
        }
        .ops-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .ops-reveal.ops-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .ops-reveal.ops-visible:nth-child(2) { transition-delay: 0.1s; }
        .ops-reveal.ops-visible:nth-child(3) { transition-delay: 0.2s; }
        .ops-reveal.ops-visible:nth-child(4) { transition-delay: 0.3s; }
        .ops-reveal.ops-visible:nth-child(5) { transition-delay: 0.35s; }
        .ops-reveal.ops-visible:nth-child(6) { transition-delay: 0.4s; }
        .ops-reveal.ops-visible:nth-child(7) { transition-delay: 0.45s; }
        .ops-reveal.ops-visible:nth-child(8) { transition-delay: 0.5s; }
        .ops-reveal.ops-visible:nth-child(9) { transition-delay: 0.55s; }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden py-24 sm:py-32 px-4">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "linear-gradient(135deg, #7c5cfc, #22d3ee, #f59e0b, #10b981, #7c5cfc)",
            backgroundSize: "400% 400%",
            animation: "ops-gradient 12s ease infinite",
          }}
        />
        <div className="absolute inset-0 bg-gray-950/70" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="ops-reveal inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/10">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            OpenClaw Insider: Live Operations
          </div>
          <h1 className="ops-reveal text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            Inside the{" "}
            <span className="bg-clip-text text-transparent" style={{
              backgroundImage: "linear-gradient(135deg, #7c5cfc, #22d3ee, #f59e0b)",
              WebkitBackgroundClip: "text",
            }}>
              Machine
            </span>
          </h1>
          <p className="ops-reveal text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Watch an AI agent team operate in real time
          </p>

          {/* Stats bar */}
          <div className="ops-reveal flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base">
            {[
              { val: "7", label: "Agents" },
              { val: "5", label: "Channels" },
              { val: "232K", label: "Words Written" },
              { val: "4", label: "Books Published" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-bold text-white text-lg sm:text-xl">{s.val}</span>
                <span className="text-gray-400">{s.label}</span>
                {i < 3 && <span className="text-gray-600 ml-2 hidden sm:inline">·</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ THE TEAM ═══════════ */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="ops-reveal text-4xl sm:text-5xl font-extrabold mb-4">The Team</h2>
            <p className="ops-reveal text-gray-400 text-lg max-w-xl mx-auto">
              Seven specialized agents, each with a role, a model, and a personality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="ops-reveal group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-opacity-80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  ["--glow-color" as string]: agent.color,
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: agent.color }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${agent.color}20`, border: `1px solid ${agent.color}40` }}
                  >
                    {agent.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">{agent.name}</h3>
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: agent.color }}>
                      {agent.role}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">{agent.desc}</p>

                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: agent.color }} />
                  <span className="text-xs text-gray-500">{agent.model}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="ops-reveal text-4xl sm:text-5xl font-extrabold mb-4">How It Works</h2>
            <p className="ops-reveal text-gray-400 text-lg">From message to magic in milliseconds.</p>
          </div>

          {/* Steps */}
          <div className="ops-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center h-full">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <div className="text-xs font-mono text-gray-500 mb-2">{step.num}</div>
                  <p className="text-white font-semibold text-sm">{step.title}</p>
                </div>
                {/* Arrow */}
                {i < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Channels */}
          <div className="ops-reveal flex flex-wrap justify-center gap-4">
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="flex items-center gap-2 bg-gray-800/40 rounded-full px-4 py-2 border border-gray-700/30 text-sm"
              >
                <span>{ch.icon}</span>
                <span className="text-gray-300">{ch.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TIMELINE ═══════════ */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="ops-reveal text-4xl sm:text-5xl font-extrabold mb-4">What We&apos;ve Built</h2>
            <p className="ops-reveal text-gray-400 text-lg">72 hours. Zero to operational.</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-purple-500/50 to-cyan-500/50" />

            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`ops-reveal relative flex items-start mb-10 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10"
                    style={{
                      background: "#f59e0b",
                      ["--dot-color" as string]: "#f59e0b",
                      animation: "ops-dot-glow 2s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />

                  {/* Content */}
                  <div
                    className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                      isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"
                    }`}
                  >
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      {item.day}
                    </span>
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>

                  {/* Spacer for other side (desktop) */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ THE LIBRARY ═══════════ */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="ops-reveal text-4xl sm:text-5xl font-extrabold mb-4">The Library</h2>
            <p className="ops-reveal text-gray-400 text-lg">Five books. 299,000+ words. Built from real experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Link
                key={book.title}
                href="/library"
                className="ops-reveal group bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-opacity-80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>
                <div className="p-5 -mt-8 relative z-10">
                  <div className="w-8 h-0.5 rounded-full mb-3" style={{ background: book.color }} />
                  <h3 className="font-bold text-white text-sm mb-1 leading-snug">{book.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{book.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BY THE NUMBERS ═══════════ */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="ops-reveal text-4xl sm:text-5xl font-extrabold mb-4">By The Numbers</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="ops-reveal bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center"
                style={{
                  animation: `ops-scale-in 0.5s ease-out ${0.1 * i}s both`,
                }}
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 bg-clip-text text-transparent" style={{
                  backgroundImage: "linear-gradient(135deg, #ffffff, #a5b4fc)",
                  WebkitBackgroundClip: "text",
                }}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(135deg, #7c5cfc, #f59e0b)",
            backgroundSize: "200% 200%",
            animation: "ops-gradient 8s ease infinite",
          }}
        />
        <div className="absolute inset-0 bg-gray-950/80" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="ops-reveal text-4xl sm:text-5xl font-extrabold mb-6">
            Want to build your own{" "}
            <span className="bg-clip-text text-transparent" style={{
              backgroundImage: "linear-gradient(135deg, #7c5cfc, #22d3ee)",
              WebkitBackgroundClip: "text",
            }}>
              AI team
            </span>
            ?
          </h2>
          <p className="ops-reveal text-gray-300 text-lg mb-10 leading-relaxed">
            Everything we learned building this — the architecture, the tools, the mistakes — is in the books.
          </p>
          <div className="ops-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/library"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors"
            >
              📚 Browse the Library
            </Link>
            <a
              href="https://substack.com/@theopenclawinsider"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors border border-white/20"
            >
              📬 Subscribe to Newsletter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
