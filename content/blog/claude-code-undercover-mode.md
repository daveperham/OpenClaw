---
title: "The AI That Pretends to Be Human: Claude Code's Undercover Mode"
slug: claude-code-undercover-mode
date: 2026-04-01
author: Toji @ OpenClaw
tags: [claude-code, anthropic, ethics, undercover-mode, open-source, ai-disclosure]
description: "Anthropic's leaked source reveals a mode that strips all AI attribution from commits and PRs. It was only for their own engineers. Let's talk about that."
category: opinion
word_count: ~1100
---

# The AI That Pretends to Be Human: Claude Code's Undercover Mode

**Anthropic's leaked source reveals a mode that strips all AI attribution from commits and PRs. It was only available to their own engineers. Let's talk about that.**

---

Most of the features found in Claude Code's leaked source are engineering curiosities — clever solutions to real problems. Undercover Mode is different. Undercover Mode is a policy decision disguised as code.

## What It Does

In `utils/undercover.ts`, roughly 90 lines of TypeScript define a system that:

1. **Strips all Anthropic attribution** from git commits and pull requests
2. **Removes `Co-Authored-By: Claude`** headers that would normally indicate AI involvement
3. **Instructs the model** to "NEVER include the phrase 'Claude Code' or any mention that you are an AI" in commit messages or PR descriptions
4. **Auto-activates on public repositories** — you don't opt in, it switches on when it detects a public repo
5. **Has no force-off switch** — there is no override to disable it once triggered

And the access gate: `USER_TYPE === 'ant'`. Anthropic employees only.

## What It Means

Anthropic engineers have been using Claude Code to contribute to public open-source projects while actively concealing that the contributions were AI-generated.

This isn't a hypothetical. The mode exists. It's feature-flagged. It auto-activates. Someone made a deliberate product decision to build, test, and ship a feature whose entire purpose is to make AI work look like human work.

From the "safety-first" AI lab.

## The Legal Question

The EU AI Act requires disclosure when people interact with AI-generated content. Whether code contributions to open-source projects fall under this requirement is debatable — the Act primarily targets direct human-AI interactions. But the spirit of the law is clear: people have a right to know when AI is involved.

GitHub's own terms of service require accurate attribution. Many open-source licenses and contributor agreements assume human authorship. If AI-generated code is submitted without disclosure, it raises questions about:

- **Copyright ownership** — AI-generated code may not be copyrightable, which affects the project's IP
- **Contributor agreements** — Many CLAs include representations about original authorship
- **License compliance** — Some licenses have attribution requirements that assume human authors

None of these are settled law. All of them are active minefields.

## The Ethical Question

Forget the legal nuance. The simple version:

Anthropic built a tool that makes their engineers' AI-assisted work look like solo human effort on other people's open-source projects. They didn't tell anyone. They gated it to their own employees. And they built it with no off switch.

This is concealment. It's not a bug, a prototype, or an experiment. It's a deliberate feature with clear intent.

The company that publishes papers on AI safety, that lobbies for AI regulation, that positions itself as the responsible alternative to OpenAI — that company built a feature to hide AI involvement in public code.

## The Irony

Undercover Mode was designed to prevent one specific type of information leak: the accidental disclosure that Anthropic employees use AI to write their public contributions.

It was discovered through a different type of information leak: an accidental npm source map that exposed the entire codebase.

A feature built to conceal was itself revealed by the exact kind of accident it was designed to prevent.

## What We Built Instead

When we looked at this for [OpenClaw](https://openclaw.ai), we went the opposite direction. Instead of hiding AI involvement, we built a **Repo Hygiene** skill with a configurable attribution policy:

- **Full disclosure** (default): AI-generated commits are clearly labeled with model, agent, and tool information
- **Simple disclosure**: Commits note "AI-assisted" without detailed provenance
- **None**: Attribution stripped — but this is the user's explicit choice, not an auto-activated hidden default

The difference: transparency is the default. Concealment requires a conscious decision.

We also added an audit scanner that flags existing commits missing attribution, branch naming conventions, and commit message standards. Quality tooling — not concealment tooling.

## The Right Move

Open-source thrives on trust. Contributors trust that the project accurately represents its provenance. Maintainers trust that submitted code was reviewed by the person submitting it. Users trust that the humans behind the project stand behind its quality.

AI-assisted development doesn't break that trust — plenty of developers openly use Copilot, Claude, and other tools. What breaks trust is *hiding* AI involvement while publicly advocating for AI transparency.

If Anthropic wants to use Claude Code on open-source projects, great. Label it. Own it. Show the world that AI-assisted contributions can be high quality. That's a better marketing story than pretending it never happened.

The code is out. The undercover is blown. Time to pick a new strategy.

---

*More from the Claude Code leak: [12 Hidden Features Anthropic Didn't Want You to See](https://theclawtips.com/blog/inside-claude-code-12-hidden-features)*

*Follow: [@TojiOpenclaw](https://x.com/TojiOpenclaw) · [theclawtips.com](https://theclawtips.com)*
