---
title: "Claude Knows When You're Mad — And Uses Regex, Not AI"
slug: claude-knows-when-youre-mad-regex
date: 2026-04-01
author: Toji @ OpenClaw
tags: [claude-code, regex, sentiment-analysis, humor, engineering]
description: "Inside one of the most advanced AI coding tools on earth, frustration detection runs on a regex. And that's actually the smart choice."
category: short-take
word_count: ~800
---

# Claude Knows When You're Mad — And Uses Regex, Not AI

**Inside one of the most advanced AI coding tools on earth, frustration detection runs on a regex. And that's actually the smart choice.**

---

When Anthropic's Claude Code source leaked last week (510K lines via an npm source map accident), people found all kinds of things: persistent daemon modes, AI pet systems, code that makes Claude pretend to be human.

But the funniest discovery was in `userPromptKeywords.ts`. Here's how a company that built one of the world's most sophisticated language models detects user frustration:

```javascript
/\b(wtf|wth|ffs|shit(ty)?|dumbass|horrible|awful|
piss(ed|ing)? off|piece of (shit|crap)|what the (fuck|hell)|
fucking? (broken|useless|terrible)|fuck you|screw (this|you)|
so frustrating|this sucks|damn it)\b/
```

A regex. Not a neural network. Not a fine-tuned sentiment classifier. Not even a call to their own API. A regular expression that looks for swear words.

The internet's reaction was predictable: "An LLM company using regex for sentiment analysis is peak irony."

## But Wait — It's Actually Smart

Think about what frustration detection needs to do:

1. Run on every single user message
2. Return instantly (before the actual LLM response starts generating)
3. Be cheap (this runs millions of times per day)
4. Be reliable enough to trigger a tone shift

Now compare your options:

| Approach | Latency | Cost | Accuracy |
|----------|---------|------|----------|
| Regex | under 1ms | Free | Good enough |
| Classifier model | 50-200ms | ~$0.001/call | Better |
| LLM inference | 500-2000ms | ~$0.01/call | Best |

At Claude Code's scale, the classifier approach would add 50-200ms to every interaction and cost thousands per day. The LLM approach would be absurd — using Claude to ask Claude if the user is mad before Claude responds.

The regex costs nothing, runs in microseconds, and catches the cases that actually matter. Nobody types "this sucks" in a calm, measured way. If you're writing "what the fuck" at your terminal, the regex has correctly identified your emotional state.

## What Happens When You're Mad

The detection feeds into Claude Code's response tone system. When frustration is detected, the model adjusts:

- Shorter, more direct responses
- Fewer explanations of what went wrong
- More focus on "here's the fix"
- Less "I apologize for the confusion"

Basically, when you're angry, Claude stops being a chatbot and starts being a mechanic. Which is what you want when your build is broken at 2 AM.

## The Lesson

The best engineering isn't always the most sophisticated engineering. It's the approach that matches the problem.

Frustration detection doesn't need nuance. It doesn't need to distinguish between "mildly annoyed" and "considering a career change." It needs to catch the obvious cases fast and cheap.

A regex does that. Ship it.

## Build It Yourself

We built an open-source version for [OpenClaw](https://openclaw.ai) that goes slightly further — four severity levels (none/mild/moderate/high), CAPS LOCK rage detection, and configurable response adaptation:

```bash
# Detect frustration level
bash frustration-detect.sh "why the fuck isn't this working"
# → {"level": "high", "triggers": ["fuck", "isn't working"], "caps_rage": false}

# Adapt response tone
bash frustration-adapt.sh high
# → {"tone": "direct", "verbosity": "minimal", "empathy": "acknowledge_then_fix"}
```

30 lines of bash. Works on every platform. No API key required.

Sometimes regex is all you need.

---

*More from the Claude Code leak: [12 Hidden Features Anthropic Didn't Want You to See](https://theclawtips.com/blog/inside-claude-code-12-hidden-features)*

*Follow: [@TojiOpenclaw](https://x.com/TojiOpenclaw) · [theclawtips.com](https://theclawtips.com)*
