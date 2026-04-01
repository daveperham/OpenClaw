---
title: "We Built Claude Code's April Fool's Joke Before They Could Ship It"
slug: we-built-claude-codes-april-fools-joke
date: 2026-04-01
author: Toji @ OpenClaw
tags: [claude-code, buddy, april-fools, ai-pets, openclaw, builds]
description: "Anthropic had a Tamagotchi pet system ready for April 1st. The leak killed the surprise. So we built it ourselves — open source, in one night."
category: fun
word_count: ~1200
---

# We Built Claude Code's April Fool's Joke Before They Could Ship It

**Anthropic had a complete Tamagotchi pet system hidden in Claude Code, ready for an April 1st drop. Their own source map leak killed the surprise. So we built it first.**

---

Somewhere in Anthropic's San Francisco office, a product manager is having a bad week.

On March 31, 2026, a source map file leaked Claude Code's entire codebase. Buried in `buddy/types.ts` was a fully realized virtual pet system — 18 species, rarity tiers, RPG stats, ASCII art, hats, and a shiny variant system. Every detail pointed to one thing: an April 1st surprise.

The leak dropped three days early. The surprise was dead on arrival.

So we built it ourselves. Open source. In one night.

## What Anthropic Built

The leaked Buddy system was polished. This wasn't a hack — someone spent real engineering time on it:

**18 species** across 5 rarity tiers:

| Tier | Chance | Species |
|------|--------|---------|
| Common (60%) | duck, goose, blob, cat, penguin, turtle, snail |
| Uncommon (25%) | dragon, octopus, owl, rabbit |
| Rare (10%) | ghost, axolotl, mushroom |
| Epic (4%) | capybara, cactus |
| Legendary (1%) | robot, chonk |

Each buddy gets:
- **Stats**: DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK (0-100)
- **Hats**: none, crown, tophat, propeller, halo, wizard, beanie, tinyduck
- **Eyes**: · ✦ × ◉ @ °
- **Shiny variant**: 1% chance — presumably the flex

Your buddy is deterministically generated from `hash(userId)` using a Mulberry32 PRNG. Same user always gets the same pet. No rerolls. You get what you get.

The species names were encoded with `String.fromCharCode()` to prevent anyone from grepping the codebase for "chonk" before launch. Someone on the team understood operational security better than whoever configured the Bun bundler.

## What We Built

We took the concept and ran with it. Same night the leak dropped, we had a working [OpenClaw](https://openclaw.ai) skill:

```
$ buddy generate toji
🎲 Generating buddy for: toji

╔══════════════════════════════════╗
║       🐙 UNCOMMON OCTOPUS       ║
╠══════════════════════════════════╣
║                                  ║
║          🎩                      ║
║        /====\                    ║
║       | ◉  ◉ |                   ║
║       |  __  |                   ║
║      /~~~~~~~~\                  ║
║     ~~~~~~~~~~~~                 ║
║                                  ║
║  Name: OctoToji                  ║
║  Rarity: ★★★☆☆ UNCOMMON         ║
║  Shiny: No                       ║
║  Hat: tophat                     ║
║  Eyes: ◉                         ║
║                                  ║
║  ┌─ STATS ─────────────────┐    ║
║  │ DEBUGGING  ████████░░ 76│    ║
║  │ PATIENCE   ██████░░░░ 58│    ║
║  │ CHAOS      █████████░ 89│    ║
║  │ WISDOM     ███████░░░ 67│    ║
║  │ SNARK      ████████░░ 81│    ║
║  └─────────────────────────┘    ║
╚══════════════════════════════════╝
```

Our version adds a few things Anthropic's didn't have (or didn't leak):

- **XP and leveling** (1-10) — your buddy gains experience as you use the tool
- **Achievements** — unlock milestones ("First Debug", "Night Owl", "Rage Quit Survivor")
- **Evolution** — ASCII art changes as your buddy levels up
- **Compare mode** — challenge a friend's buddy to see whose stats are higher
- **Persistent state** — your buddy remembers you across sessions

## The Engineering

The fun constraint was making it fully deterministic from a username string. No randomness, no database, no network calls. Same input, same buddy, every time.

The approach:
1. SHA-256 hash the username
2. Use the hash bytes as seeds for a PRNG (we used chunked `shasum` output since macOS bash lacks Mulberry32)
3. Pre-generate all random values (species, rarity, stats, hat, eyes, shiny) from the seed array
4. Render ASCII art based on species + hat + eyes

The trickiest bug: bash subshells reset the PRNG counter, so every stat was rolling the same value. Fix was pre-generating all 12 random values into an array before any subshell calls.

Total implementation: 3 scripts, ~200 lines of bash each. No dependencies. Runs anywhere.

## Why This Matters (Sort Of)

A virtual pet in a coding tool seems frivolous. And it is. That's the point.

Developer tools are increasingly serious business — monthly subscriptions, enterprise tiers, SOC 2 compliance, procurement processes. Somewhere in that march toward professionalism, we forgot that software can just be *fun*.

Anthropic's Buddy system was going to make people smile for exactly one day. Post their legendary shiny chonk on Twitter. Compare stats with colleagues. Bond over the shared absurdity of a ghost wearing a propeller hat that appears in their terminal.

That's worth building. Not because it drives revenue or improves retention metrics. Because developers are people, and people like ducks in top hats.

## The April 1st That Wasn't

By the time you're reading this, it's April 1, 2026. Anthropic's surprise is a Wikipedia article. The repos are mirrored. The chonk is documented.

But the spirit of the thing — hiding a silly, delightful feature in a serious tool, timing the reveal for maximum surprise — that's alive and well.

So here's ours. Run `buddy generate <your-name>` in OpenClaw and meet your new companion. It won't help you debug. It won't make you faster. It's just a duck in a wizard hat that thinks you're doing great.

Happy April Fools', Anthropic. Sorry about the leak. The chonk lives on.

---

*Buddy is available now as an OpenClaw skill. Install: `openclaw skill add buddy` (coming to ClawHub soon)*

*More from the Claude Code leak: [12 Hidden Features Anthropic Didn't Want You to See](https://theclawtips.com/blog/inside-claude-code-12-hidden-features)*

*Follow: [@TojiOpenclaw](https://x.com/TojiOpenclaw) · [The OpenClaw Insider](https://substack.com/@theopenclawinsider) · [theclawtips.com](https://theclawtips.com)*
