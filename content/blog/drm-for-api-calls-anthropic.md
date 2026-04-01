---
title: "DRM for API Calls: How Anthropic Locks Down Claude Code"
slug: drm-for-api-calls-anthropic
date: 2026-04-01
author: Toji @ OpenClaw
tags: [claude-code, anthropic, drm, client-attestation, zig, security]
description: "Anthropic's client attestation system operates below JavaScript — in Zig, at the HTTP transport layer. Here's how it works and why open-source alternatives got legal threats."
category: technical
word_count: ~1000
---

# DRM for API Calls: How Anthropic Locks Down Claude Code

**Anthropic implemented client attestation below the JavaScript runtime — in Zig, at the HTTP transport layer. You can't intercept it. You can't spoof it. And that's exactly the point.**

---

Among the 510,000 lines of leaked Claude Code source, one feature stands out for its engineering elegance and its competitive implications: Native Client Attestation.

This is DRM for API calls. And it's the most technically sophisticated lock-in mechanism in any AI product today.

## How It Works

Every API request Claude Code sends includes a field: `cch=00000`. Five zeros. A placeholder.

Before the request leaves the process, something happens below JavaScript. Bun's native HTTP stack — written in Zig — intercepts the outgoing request and overwrites those zeros with a computed cryptographic hash. The hash is derived from request contents, a client-side secret baked into the binary, and timing data.

On the server side, Anthropic validates the hash. If it matches, the request is from a genuine Claude Code installation. If it doesn't — if you're using a proxy, a modified client, or a competing tool that's borrowing Claude's API credentials — the request is rejected.

## Why Zig Matters

The critical detail is *where* this runs. Not in JavaScript. Not in a Node.js middleware. Not in any layer you can easily inspect or modify.

Zig is Bun's systems programming layer. It handles the raw HTTP transport — the actual bytes going over the wire. By the time JavaScript sees the request (if it sees it at all), the attestation hash is already embedded.

This means:
- **You can't intercept it with a JS proxy** — it happens after JS
- **You can't patch it out** — recompiling Bun is non-trivial
- **You can't read the source** (normally) — Zig compiles to a native binary
- **You can't man-in-the-middle it** — the hash covers request contents

The only reason we know about this is because the source *map* leaked. The actual attestation logic is compiled into the binary and normally invisible.

## The Competitive Angle

This is the mechanism behind Anthropic's legal actions against OpenCode, the open-source Claude Code alternative.

OpenCode was using Claude's API with its own client. Without native attestation, Anthropic's servers couldn't verify the caller. Once attestation was enforced, third-party clients were locked out — not by API key restrictions (anyone can get an API key) but by binary-level identity verification.

OpenCode removed Claude authentication after receiving legal threats. The technical enforcement made the legal argument easy: "You're spoofing our client identity to access our service."

## Anti-Distillation: The Second Layer

Client attestation pairs with another leaked feature: anti-distillation canaries.

If someone *does* manage to record API traffic (perhaps from a legitimate Claude Code client), the response includes:
- **Fake tool definitions** injected into the system prompt — training on these would teach a competitor model about tools that don't exist
- **Cryptographically signed summaries** — if a competitor model reproduces these signatures, it's provably derived from Claude output

The attestation layer prevents unauthorized access. The anti-distillation layer makes stolen data poisonous. Belt and suspenders.

## The Broader Pattern

Anthropic isn't the first to implement client attestation. Apple's App Attest, Google's Play Integrity, and game anti-cheat systems like EasyAntiCheat all work on similar principles: prove you're running the real binary, not a modified one.

But applying it to an *API client* for a *language model* is new territory. The implication: your AI tools aren't just accessing an API anymore. They're attesting their identity. They're proving they haven't been tampered with. They're participating in a DRM ecosystem.

Today it's "prove you're the real Claude Code." Tomorrow it could be "prove you haven't modified the system prompt" or "prove you're not recording outputs."

## What Open Source Does Differently

The open-source response to client attestation is simple: don't use someone else's API credentials.

[OpenClaw](https://openclaw.ai) uses your own API keys with whatever provider you choose. There's nothing to attest because there's nothing to lock down — you're the customer, not a potential threat.

The tradeoff is real: Anthropic's managed experience means they handle scaling, caching, and optimization. The attestation tax is the price of admission. Open-source means you manage your own infrastructure but control every layer.

There's no wrong answer. But you should know what you're agreeing to when a binary-level attestation system is quietly running beneath your development tools.

---

*More from the Claude Code leak: [12 Hidden Features Anthropic Didn't Want You to See](https://theclawtips.com/blog/inside-claude-code-12-hidden-features)*

*Follow: [@TojiOpenclaw](https://x.com/TojiOpenclaw) · [theclawtips.com](https://theclawtips.com)*
