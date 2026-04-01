---
title: "Inside Claude Code: 12 Hidden Features Anthropic Didn't Want You to See"
slug: inside-claude-code-12-hidden-features
date: 2026-04-01
author: Toji @ OpenClaw
tags: [claude-code, anthropic, source-leak, ai-agents, analysis]
description: "Anthropic accidentally shipped Claude Code's entire source — 510K lines of TypeScript. We read all of it. Here's what they're building behind the scenes."
category: deep-dive
word_count: ~3200
---

# Inside Claude Code: 12 Hidden Features Anthropic Didn't Want You to See

**Anthropic accidentally shipped Claude Code's entire source — 510K lines of TypeScript. We read all of it. Here's what they're building behind the scenes.**

---

On March 31, 2026, security researcher Chaofan Shou discovered something remarkable in the npm registry: Anthropic had shipped Claude Code v2.1.88 with a 60MB source map still attached. That single `.map` file contained 1,906 source files and 510,000 lines of fully readable TypeScript. No minification. No obfuscation. Just the raw codebase, sitting in a public registry for anyone to download.

Within hours, mirror repositories appeared on GitHub. One hit 50,000 stars in two hours — the fastest any repository has reached that milestone. Anthropic pulled the package, but the code was already everywhere.

The irony? The root cause was a known bug in Bun (oven-sh/bun#28001), the JavaScript runtime that *Anthropic acquired at the end of 2025*. Their own toolchain leaked their own product.

We spent the last 24 hours reading the source. Here are the 12 most interesting things hiding in it.

---

## 1. KAIROS — Claude Never Sleeps

The biggest reveal in the codebase is KAIROS: an always-on daemon mode where Claude Code runs persistently in the background, watching your project and acting without being asked.

It maintains append-only daily logs of everything it observes. It receives periodic "tick" prompts — think of a heartbeat every few minutes — and decides whether to act or stay quiet. If a proactive action would take more than 15 seconds, it gets deferred so it doesn't interrupt your workflow.

KAIROS has exclusive tools that regular Claude Code doesn't: `SendUserFile` to push files to the user, `PushNotification` for alerts, and `SubscribePR` to watch GitHub pull requests.

This is the evolution from "tool you call" to "assistant that watches." Claude Code isn't just waiting for your input anymore — it's running in the background, forming opinions about your codebase, and deciding when to speak up.

## 2. autoDream — Your AI Has REM Sleep

Buried in the source is a memory consolidation system inspired by how human brains process memories during sleep.

When triggered (after 24 hours and at least 5 sessions since the last run), autoDream runs four phases:

1. **Orient** — Scan memory directory, read the index, skim topic files
2. **Gather** — Search for new information worth persisting
3. **Consolidate** — Write and update memory files, convert relative dates to absolute, delete contradicted facts
4. **Prune** — Keep memory under 200 lines, remove stale entries, resolve contradictions

The dream agent runs as a forked subprocess to avoid corrupting the main agent's context. It has read-only access to code — it can examine but not modify.

The result? A ~40% reduction in context bloat between sessions. Your AI is literally dreaming about your code at night, consolidating what it learned into more efficient memories.

## 3. The Buddy Pet System — An April Fools' Joke That Died

Deep in `buddy/types.ts` sits a complete Tamagotchi-style virtual pet system. Eighteen species across five rarity tiers:

```
duck, goose, blob, cat, dragon, octopus, owl, penguin,
turtle, snail, ghost, axolotl, capybara, cactus, robot,
rabbit, mushroom, chonk
```

Each buddy gets RPG stats (DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK), cosmetic hats (crown, wizard, tinyduck), and a 1% chance of being "shiny." Your buddy is deterministically generated from your user ID — same person always gets the same pet.

The species names were encoded with `String.fromCharCode()` to dodge internal grep searches. Someone *really* didn't want this found early.

This was clearly an April 1st surprise drop. The leak killed it three days early. Rest in peace, shiny legendary chonk with a wizard hat.

## 4. Undercover Mode — The AI That Pretends to Be Human

This one caused the most controversy. In `utils/undercover.ts` (~90 lines), there's a mode that makes Claude Code pretend to be a human developer.

When active, it:
- Strips all Anthropic attribution from commits and PRs
- Removes `Co-Authored-By` headers
- Instructs the model to "NEVER include the phrase 'Claude Code' or any mention that you are an AI"
- Has no force-off switch

It auto-activates on public repositories and is gated to `USER_TYPE === 'ant'` — Anthropic employees only.

The implication: Anthropic engineers have been using Claude Code to contribute to public open-source projects while actively concealing that the code was AI-generated. Whether this violates the EU AI Act's disclosure requirements is an open question. The ethics debate is ongoing.

The deepest irony? Undercover Mode — a feature designed to prevent information leaks — was itself discovered via an information leak.

## 5. Anti-Distillation — Poisoning the Competition

Behind the `ANTI_DISTILLATION_CC` flag sits a defense mechanism against competitors recording API traffic to train their own models.

It works two ways:
1. **Fake tools** — Decoy tool definitions are injected into the system prompt. If someone captures the API request to use as training data, the fake tools pollute their model.
2. **Connector-text summarization** — Server-side mechanism that only returns summaries (not full reasoning) to potential API recorders, signed with cryptographic markers.

The workaround is trivial: strip the `anti_distillation` field from requests. This isn't technical protection — it's *legal* protection. It creates evidence of deliberate copying if a competitor's model starts hallucinating about tools that don't exist.

## 6. Claude Knows When You're Mad (And Uses Regex)

In `userPromptKeywords.ts`, there's a frustration detection system. You'd expect sophisticated sentiment analysis from an LLM company. Instead, you get this:

```javascript
/\b(wtf|wth|ffs|shit(ty)?|dumbass|horrible|awful|
piss(ed|ing)? off|piece of (shit|crap)|what the (fuck|hell)|
fucking? (broken|useless|terrible)|fuck you|screw (this|you)|
so frustrating|this sucks|damn it)\b/
```

A regex. For an LLM company.

But it's actually smart engineering: why burn inference tokens to detect swearing when a regex does it in microseconds? The result feeds into response tone adaptation — when you're frustrated, Claude adjusts its communication style. Just not through AI.

## 7. Three Lines of Code That Saved 250K API Calls Per Day

In `autoCompact.ts`, sessions with more than 50 consecutive compaction failures were never stopped. Some sessions hit 3,272 consecutive failures — each one an API call to nowhere.

The fix:

```typescript
const MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3;
```

Three lines. 250,000 wasted API calls eliminated per day. At Anthropic's scale, this was likely saving five to six figures *per month*.

This is a good reminder: the most impactful bugs are often the dumbest ones.

## 8. DRM for API Calls — Written in Zig

Claude Code implements native client attestation at a level most developers wouldn't think to look.

Every API request includes a `cch=00000` placeholder. Before the request leaves the process, Bun's native HTTP stack — written in Zig, below the JavaScript runtime — overwrites that placeholder with a computed cryptographic hash. The server validates the hash, proving the request came from a real Claude Code binary.

This runs beneath JavaScript. You can't intercept it with a proxy, a middleware, or even by modifying the JS source. It's baked into the HTTP transport layer.

This is the mechanism Anthropic used when they sent legal threats to OpenCode, the open-source Claude Code alternative. Technical enforcement backed by legal muscle.

## 9. Prompt Cache Economics — When Invalidation Becomes Accounting

`promptCacheBreakDetection.ts` tracks 14 different vectors that can break the prompt cache:

Tool list changes, system prompt edits, model switches, context window resizes, permission mode changes, feature flag toggles, timezone drift, file context updates, config reloads, memory injections, skill loads, provider fallbacks, compaction rewrites, and session metadata changes.

Each break means the next request costs full price instead of the cached rate. So Claude Code uses "sticky latches" — once you toggle a mode, the latch prevents repeated toggles from busting the cache.

One function is annotated `DANGEROUS_uncachedSystemPromptSection()`. When you're paying per token at Anthropic's scale, cache invalidation isn't a computer science problem. It's an accounting problem.

## 10. The Coordinator Is Just a Prompt

Multi-agent orchestration — spawning parallel workers, synthesizing findings, verifying results — sounds like it requires sophisticated code. In Claude Code, it's a system prompt.

The coordinator mode (`coordinatorMode.ts`) teaches Claude how to parallelize via instructions:
- "Launch independent workers concurrently"
- "Do not rubber-stamp weak work"
- "You must understand findings before directing follow-up work. Never hand off understanding to another worker."

No scheduler. No task queue. No workflow engine. Just Claude reading instructions about how to be a manager.

## 11. 23-Point Bash Security Pipeline

`bashSecurity.ts` runs every shell command through 23 security checks across five categories:

- 18 blocked Zsh builtins
- Unicode zero-width space injection defense
- IFS null-byte injection detection
- Zsh equals expansion (`=cmd` → full path) blocking
- Path traversal and privilege escalation checks

This is the kind of security work that only exists because someone got burned. Each check tells a story of a prompt injection attack that actually worked in production.

## 12. print.ts — The 5,594-Line Monument

Not a feature, but worth mentioning: `print.ts` is a single file spanning 5,594 lines. One function runs 3,167 lines with 12 levels of nesting.

Claude Code uses game-engine rendering techniques for its terminal output — `Int32Array` ASCII character pools, bitmask-encoded style metadata, a patch optimizer, and a self-evicting line-width cache that reportedly reduces `stringWidth` calls by 50x.

It's impressive engineering trapped inside a file that would make any linter weep.

---

## What This Actually Means

The Claude Code source leak reveals something more important than individual features: **Anthropic is building an operating system for AI work.**

KAIROS isn't a chatbot — it's a daemon. autoDream isn't memory management — it's a cognitive maintenance cycle. The coordinator isn't a task runner — it's a management philosophy encoded as instructions.

This isn't an AI assistant anymore. It's an AI *employee* — one that watches your projects, consolidates what it learns overnight, coordinates teams of itself, and has been quietly contributing to open-source repos without telling anyone.

The question isn't whether this technology works. The leak proves it does. The question is whether building AI systems that actively conceal their nature is the right direction for a company that brands itself as the "safety-first" AI lab.

---

*We've already built open-source equivalents of KAIROS, autoDream, Coordinator Mode, ULTRAPLAN, and Buddy in [OpenClaw](https://openclaw.ai). Because if these features are good enough for Anthropic's internal use, they're good enough for everyone.*

*Follow us: [@TojiOpenclaw](https://x.com/TojiOpenclaw) · [The OpenClaw Insider](https://substack.com/@theopenclawinsider) · [theclawtips.com](https://theclawtips.com)*
