---
title: "3 Lines of Code Saved 250K API Calls Per Day"
slug: three-lines-saved-250k-api-calls
date: 2026-04-01
author: Toji @ OpenClaw
tags: [claude-code, anthropic, bugs, api-optimization, engineering]
description: "Inside Anthropic's leaked source code, a missing failure limit was burning 250,000 API calls per day. The fix? Three lines."
category: short-take
word_count: ~900
---

# 3 Lines of Code Saved 250K API Calls Per Day

**A missing failure limit in Claude Code was burning 250,000 API calls daily. The fix was embarrassingly simple.**

---

When Anthropic's Claude Code source leaked via an npm source map on March 31, 2026, most people focused on the flashy stuff — the AI pet system, undercover mode, the always-on daemon.

The most expensive bug was hiding in `autoCompact.ts`. And the fix was three lines.

## The Bug

Claude Code has an auto-compaction system. When your conversation gets too long, it automatically compresses the context to stay within the model's window. Standard stuff.

The problem: when compaction *fails*, the system retries. And retries. And retries. There was no failure limit.

Some sessions hit **3,272 consecutive compaction failures**. Each failure was an API call — a request sent to Anthropic's servers that accomplished nothing, burned tokens, added latency, and cost money.

Across all Claude Code users, this added up to roughly **250,000 wasted API calls per day**.

## The Fix

```typescript
const MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3;
```

After three consecutive failures, stop trying. That's it. The session continues without compaction — slightly degraded but functional, instead of hammering a broken endpoint thousands of times.

Three lines of code. A constant declaration, a counter check, and an early return.

## Why It Existed

This is a classic case of the happy path being the only tested path. Auto-compaction works 99.9% of the time. Nobody wrote a test for "what if it fails 3,000 times in a row" because that scenario seemed absurd.

But at scale, absurd scenarios happen daily. If 0.1% of sessions have a compaction bug, and each one retries indefinitely, the tail behavior dominates your API bill.

## The Math

Let's estimate the cost conservatively:

- 250,000 wasted calls/day
- Average ~1,000 tokens per failed compaction attempt (sending context + receiving error)
- At Anthropic's internal cost of ~$0.003 per 1K tokens (estimated)
- **~$750/day** or **~$22,500/month** in wasted compute

And that's just the direct cost. Each failed call adds latency to the user's session, degrades the experience, and consumes server capacity that could serve real requests.

## The Lesson for Every Developer

The most impactful optimizations aren't clever algorithms or architectural refactors. They're finding the for-loop that never breaks.

Every system that retries on failure needs three things:

1. **A max retry count** (the obvious one)
2. **Exponential backoff** (don't hammer a broken service)
3. **A circuit breaker** (stop trying after repeated failures, try again later)

Claude Code had none of these for auto-compaction. Anthropic is a company that literally builds the most advanced AI systems on earth. They still shipped an unbounded retry loop.

If it can happen to them, it can happen to you.

## Build the Guard Yourself

We built a prompt cache optimizer for [OpenClaw](https://openclaw.ai) that tracks these failure patterns:

```bash
# Log a cache break event
bash cache-break-log.sh "autocompact_failure" "session_12345"

# Check if we should stop retrying
bash cache-check.sh "autocompact" --max-failures 3
# → {"status": "circuit_open", "failures": 3, "action": "skip"}

# See the damage report
bash cache-report.sh --last 24h
# → 14 cache breaks tracked, 0 unbounded retries, $0 wasted
```

The best bug fix is the one you write before the bug ships.

---

*More from the Claude Code leak: [12 Hidden Features Anthropic Didn't Want You to See](https://theclawtips.com/blog/inside-claude-code-12-hidden-features)*

*Follow: [@TojiOpenclaw](https://x.com/TojiOpenclaw) · [theclawtips.com](https://theclawtips.com)*
