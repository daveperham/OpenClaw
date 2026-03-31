---
title: "How to Set Up an AI Call Screener with OpenClaw"
date: 2026-03-31
category: tutorials
tags: ["ai", "openclaw", "voice-call", "automation", "call-screening"]
description: "Reclaim your focus and let your AI assistant handle unwanted calls. This tutorial walks you through setting up a powerful, personalized call screener with the OpenClaw voice-call plugin."
---

Spam calls are more than just an annoyance; they're a constant interruption that shatters your focus and drains your productivity. Robocalls, unsolicited sales pitches, and phishing attempts have become a daily reality. While mobile carriers and apps offer basic blocking, they often lack the intelligence and flexibility to handle the nuance of real-world calls. What about the legitimate delivery driver, the new client, or the local service you actually need to hear from?

What if you could have a personal gatekeeper, one that intelligently screens every call, understands context, and only forwards the ones that truly matter? With OpenClaw and its `voice-call` plugin, you can build exactly that. This isn't just a blocklist; it's a fully automated, AI-powered receptionist that works for you 24/7.

In this tutorial, we'll walk you through the steps to configure your own AI call screener, transforming your phone from a source of distraction into a tool that respects your time.

### Prerequisites

Before we dive in, make sure you have the following set up:

1.  **A Working OpenClaw Instance:** You should have OpenClaw running on a machine that's accessible from the internet. A home server, a Raspberry Pi, or a cloud VPS works perfectly.
2.  **The `voice-call` Plugin:** Ensure the voice-call plugin is installed and enabled in your OpenClaw configuration.
3.  **A Telephony Provider:** You'll need an account with a service that provides a phone number and a programmable voice API. [Twilio](https://www.twilio.com/) is a popular and well-supported choice, and we'll use it for our examples. You will need a phone number from your provider that you can configure to forward requests to your OpenClaw instance.

### Step 1: Configure the `voice-call` Plugin

The heart of our call screener is the `voice-call` plugin. This tool connects OpenClaw to your telephony provider, allowing your agent to make and receive calls, speak, and listen.

You'll need to add the plugin's configuration to your main OpenClaw settings file (e.g., `~/.openclaw/gateway.yaml`). The configuration requires your account credentials from your telephony provider and specifies how to handle inbound calls.

Here’s a sample configuration using Twilio:

```yaml
# In your gateway.yaml or equivalent config file

plugins:
  entries:
    - id: voice-call
      # ... other plugin settings
      config:
        provider: twilio
        twilio:
          accountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" # Your Twilio Account SID
          authToken: "{{ TWILIO_AUTH_TOKEN }}"         # Your Twilio Auth Token (use secrets!)
          phoneNumber: "+15017122661"               # The number you bought from Twilio
        inbound:
          # This tells OpenClaw what to do when a call comes in
          # We'll trigger a rule named 'handle_inbound_call'
          onEvent: "event:inbound_call"
```

A few key points about this configuration:

*   **`accountSid` and `authToken`**: These are your API credentials from the Twilio console. It's highly recommended to store your `authToken` as a secret (like an environment variable) rather than hardcoding it.
*   **`phoneNumber`**: This is the programmable number you acquired from Twilio.
*   **`onEvent`**: This is the magic hook. We're telling the plugin to emit an event called `inbound_call` whenever your number receives a call. We will create an OpenClaw rule to listen for this event.

### Step 2: Create the Screening Rule

Now that the plugin is configured, we need to teach our agent *how* to screen calls. We do this with an OpenClaw rule. This rule will listen for the `inbound_call` event and execute a script.

Create a new rule file (e.g., `~/.openclaw/rules/call_screening.jsonl`):

```json
{
  "id": "rule_handle_inbound_call",
  "name": "Handle Inbound Phone Call",
  "if": { "event": { "type": "inbound_call" } },
  "then": {
    "run": {
      "prompt": "You are a polite and firm AI call screener. Your goal is to identify the caller and the purpose of their call, then decide if the call is important enough to forward. Be concise. Ask who is calling and what the call is about. Based on their response, decide to either hang up on spam, or forward the call to the user's personal number if it seems legitimate. The user's personal number is {{env.MY_PERSONAL_PHONE}}. The caller's number is {{event.payload.from}}. The call ID is {{event.payload.callId}}. Use the voice_call tool to manage the call flow.",
      "tools": ["voice_call"]
    }
  }
}
```

This rule does the following:
*   **`if`**: It triggers whenever an event with the type `inbound_call` is received.
*   **`then`**: It executes the `run` action, which invokes an AI model with a specific persona and instructions.
*   **`prompt`**: This is the core instruction set for your AI agent. We define its role (call screener), its goal (identify and qualify), and give it the necessary information like the user's personal number (which should be stored as an environment variable `MY_PERSONAL_PHONE` for security) and the caller's details from the event payload.
*   **`tools`**: We explicitly grant the agent permission to use the `voice_call` tool.

### Step 3: The AI's Logic in Action

With the rule in place, let's trace the flow of a typical screened call:

1.  **Incoming Call:** Someone dials your Twilio number. Twilio sends a webhook to your OpenClaw instance.
2.  **Event Trigger:** The `voice-call` plugin receives the webhook and emits the `inbound_call` event.
3.  **Rule Execution:** Your `handle_inbound_call` rule matches the event and the AI agent is activated with the prompt you defined.
4.  **AI Takes Over:** The agent, now in character, will use the `voice_call` tool to control the call. Its first action will likely be to answer and greet the caller.
    *   `voice_call(action='speak_to_user', callId='...', message='Hello, who is calling and what is this regarding?')`
5.  **Transcription and Analysis:** The caller responds. The `voice-call` plugin automatically transcribes their speech and feeds it back to the agent. The agent analyzes the response:
    *   Does it sound like a robocall? ("Congratulations, you've won...")
    *   Is it a clear sales pitch? ("I'm calling about your car's extended warranty...")
    *   Is it a person with a legitimate reason? ("Hi, this is Jane from Dr. Smith's office," or "This is your food delivery driver.")
6.  **Decision Time:** Based on its analysis, the agent makes a decision:
    *   **Spam:** The agent hangs up.
        *   `voice_call(action='speak_to_user', callId='...', message='Thank you, we are not interested.')`
        *   `voice_call(action='end_call', callId='...')`
    *   **Legitimate:** The agent forwards the call.
        *   `voice_call(action='speak_to_user', callId='...', message='Thank you. Please hold while I connect you.')`
        *   `voice_call(action='continue_call', callId='...', to='{{env.MY_PERSONAL_PHONE}}')`

### Advanced Customization

This basic setup is already powerful, but you can extend it further:

*   **VIP List:** Create a file or a database of phone numbers that should always be allowed through without screening. The agent can check the caller's number against this list first.
*   **Blocklist:** If a number is identified as spam, have the agent add it to a persistent blocklist to be automatically rejected in the future.
*   **Notifications:** Have the agent send you a message on Discord or Telegram with the transcript of a screened call, especially for those it blocks, so you can review them later.
*   **Voicemail:** For calls that seem important but you can't answer, have the AI take a message and email or message you the transcript.

### Conclusion

Setting up an AI call screener with OpenClaw is a perfect example of practical AI automation. In under an hour, you can build a system that saves you from countless daily interruptions. You get the peace of mind that important calls will still reach you while reclaiming the focus that spammers and robocallers try to steal. Give it a try—your productivity will thank you.
