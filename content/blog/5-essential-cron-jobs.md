---
title: "5 Cron Jobs Every OpenClaw User Should Set Up"
description: "Five practical cron-driven automations that turn OpenClaw from a reactive assistant into a proactive operator."
date: "2026-03-31"
category: "tips-and-tricks"
tags: ["openclaw", "cron", "automation", "productivity", "agents"]
---
An AI agent that only works when you talk to it is a missed opportunity. The true power of OpenClaw is unlocked when you give it the autonomy to work for you in the background, around the clock. The simplest and most effective way to do this is with cron jobs.

By setting up scheduled tasks, you can transform OpenClaw from a reactive assistant into a proactive partner. This guide covers five practical cron jobs that every intermediate OpenClaw user should set up. These aren't just simple reminders; they are sophisticated workflows that will save you time, keep you informed, and even help you grow.

## A Quick Primer on OpenClaw Cron

Setting up a cron job in OpenClaw is straightforward. You use the `openclaw cron add` command, specifying a schedule and a prompt.

```bash
# Example: Say "Good morning!" every day at 8 AM
openclaw cron add --schedule "0 8 * * *" --prompt "Tell me 'Good morning!'"
```

The schedule uses the standard cron syntax. If you're not familiar with it, [crontab.guru](https://crontab.guru/) is an excellent resource for building schedules.

Now, let's get to the five essential jobs.

### 1. The Morning Briefing (8:00 AM Daily)

Start your day informed and prepared. This cron job gathers all the essential information you need and delivers it in a single, concise message to your preferred chat client (like Discord or Slack).

**The Task:** Create a summary of today's calendar events, urgent emails, and the day's weather forecast.

**The Prompt:**
"Good morning. Create my daily briefing. Include:
1.  A summary of today's events from my calendar.
2.  A list of any unread emails marked as 'Important' or from my boss (boss@example.com).
3.  Today's weather forecast for New York, NY.
Post the final briefing to the #general channel on Discord."

**The Command:**
```bash
openclaw cron add \
  --schedule "0 8 * * *" \
  --prompt "Good morning. Create my daily briefing. Include: 1. A summary of today's events from my calendar. 2. A list of any unread emails marked as 'Important' or from my boss (boss@example.com). 3. Today's weather forecast for New York, NY. Post the final briefing to the #general channel on Discord."
```

### 2. The Research Scout (11:00 PM Daily)

Stay on top of your interests without spending hours sifting through news feeds. This job sends your agent to scout the web for fresh content on topics you care about and deliver a digest.

**The Task:** Search the web for new articles, blog posts, and research papers on specific keywords. Summarize the top three most relevant results.

**The Prompt:**
"Perform my nightly research scan. Search the web for new content published in the last 24 hours related to 'advances in large language models', 'new AI agent architectures', and 'reinforcement learning from human feedback'. Summarize the top 3 most interesting and relevant articles. Save the summary to a new file in my Obsidian vault at `Research/AI_Digest_{{date.YYYY-MM-DD}}.md`."

**The Command:**
```bash
openclaw cron add \
  --schedule "0 23 * * *" \
  --prompt "Perform my nightly research scan. Search the web for new content published in the last 24 hours related to 'advances in large language models', 'new AI agent architectures', and 'reinforcement learning from human feedback'. Summarize the top 3 most interesting and relevant articles. Save the summary to a new file in my Obsidian vault at 'Research/AI_Digest_{{date.YYYY-MM-DD}}.md'."
```
*(Note: The `{{date.YYYY-MM-DD}}` is a placeholder that OpenClaw will automatically replace with the current date.)*

### 3. The Knowledge Synthesizer (3:00 AM Weekly on Sunday)

Your digital notes are only useful if you can connect the dots between them. This weekly job has your agent read through your recent notes and find hidden connections, themes, and contradictions.

**The Task:** Scan your personal knowledge base (like Obsidian or Logseq) for the past week's notes and generate a synthesis report.

**The Prompt:**
"It's time for my weekly knowledge synthesis. Read all markdown files created in my Obsidian vault (`~/Documents/ObsidianVault/`) in the last 7 days. Identify the top 3-5 recurring themes or ideas. Are there any interesting connections between topics? Are there any contradictions? Write a synthesis report and save it to `Meta/Weekly_Synthesis_{{date.YYYY-MM-DD}}.md`."

**The Command:**
```bash
openclaw cron add \
  --schedule "0 3 * * 0" \
  --prompt "It's time for my weekly knowledge synthesis. Read all markdown files created in my Obsidian vault ('~/Documents/ObsidianVault/') in the last 7 days. Identify the top 3-5 recurring themes or ideas. Are there any interesting connections between topics? Are there any contradictions? Write a synthesis report and save it to 'Meta/Weekly_Synthesis_{{date.YYYY-MM-DD}}.md'."
```

### 4. The Sales & Social Monitor (Every Hour)

If you run a business or manage a brand, you need to know what people are saying about you. This job keeps a constant watch on sales data and social media mentions.

**The Task:** Check for new sales notifications in your email and search Twitter/X for mentions of your product or company. Send an immediate alert if anything significant is found.

**The Prompt:**
"Perform a high-priority monitoring check.
1.  Scan my work email inbox for any new emails with the subject 'New Sale!'.
2.  Search Twitter for any mentions of 'MyAwesomeProduct' in the last hour.
3.  If you find a new sale OR a new mention with negative sentiment, send me an urgent iMessage immediately with the details. Otherwise, do nothing."

**The Command:**
```bash
openclaw cron add \
  --schedule "0 * * * *" \
  --prompt "Perform a high-priority monitoring check. 1. Scan my work email inbox for any new emails with the subject 'New Sale!'. 2. Search Twitter for any mentions of 'MyAwesomeProduct' in the last hour. 3. If you find a new sale OR a new mention with negative sentiment, send me an urgent iMessage immediately with the details. Otherwise, do nothing."
```

### 5. The Self-Improvement Coach (9:00 PM Daily)

Use your agent to help you stick to your goals. This cron job acts as a gentle, intelligent accountability partner, helping you reflect on your day and plan for the next.

**The Task:** Ask you a series of reflective questions about your day via your preferred chat app.

**The Prompt:**
"Act as my end-of-day coach. Send me a direct message on Discord with the following questions, one at a time, waiting for my reply before sending the next:
1.  'What was your biggest win today?'
2.  'What was one thing you could have done better?'
3.  'What is your most important task for tomorrow?'
Log my answers in my daily note file in Obsidian: `Journal/{{date.YYYY-MM-DD}}.md`."

**The Command:**
```bash
openclaw cron add \
  --schedule "0 21 * * *" \
  --prompt "Act as my end-of-day coach. Send me a direct message on Discord with the following questions, one at a time, waiting for my reply before sending the next: 1. 'What was your biggest win today?' 2. 'What was one thing you could have done better?' 3. 'What is your most important task for tomorrow?' Log my answers in my daily note file in Obsidian: 'Journal/{{date.YYYY-MM-DD}}.md'."
```

## Conclusion

These five cron jobs are just the beginning. The key is to identify repetitive, high-value tasks in your daily and weekly routines and delegate them to your OpenClaw agent. By investing a small amount of time to set up these automations, you reclaim hours of focus and ensure that important work happens consistently, even when you're not looking.
