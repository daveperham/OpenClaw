---
title: "Turn Voice Notes Into Organized Obsidian Notes with OpenClaw"
description: "A step-by-step workflow for transcribing voice notes and filing them into Obsidian with OpenClaw automation."
date: "2026-03-31"
category: "tutorials"
tags: ["openclaw", "obsidian", "automation", "voice-notes", "productivity"]
---
Ideas are fleeting. You're walking the dog or driving when a brilliant thought strikes, but by the time you can write it down, it's gone. Voice notes are a great solution, but they often end up in a messy, unstructured pile on your phone.

What if you could speak an idea and have it automatically transcribed, tagged, and filed into your Obsidian knowledge base? With OpenClaw, you can build a seamless pipeline that turns raw audio into structured, searchable notes.

This guide will show you how to set up this voice-to-Obsidian workflow. We'll cover configuring local transcription, using `echoTranscript` to process audio, and creating standing orders to automatically move the transcribed text into your Obsidian vault.

## The Big Picture: Voice → Text → Obsidian

Our goal is to create a fully automated three-step process:

1.  **Capture:** Record a voice note on your phone or computer.
2.  **Transcribe:** OpenClaw detects the new audio file, transcribes it using a local Whisper model (no data sent to the cloud), and creates a text file.
3.  **Organize:** A standing order in OpenClaw watches for new transcriptions, formats the text into markdown, adds tags, and moves it to the correct folder in your Obsidian vault.

Let's build it piece by piece.

## Step 1: Configure Local Audio Transcription

First, you need to tell OpenClaw how to handle audio files. We'll configure it to use a local `whisper.cpp` model for transcription, which is fast, accurate, and completely private.

You'll need to have a Whisper model downloaded on your machine. If you don't, you can find them in GGML format online. We'll assume you have a model located at `~/models/ggml-base.en.bin`.

Now, edit your OpenClaw `config.yaml` to enable the transcription service. Find the `plugins` section and add or modify the following entry:

```yaml
plugins:
  entries:
    # ... other plugins
    core-audio-whisper:
      enabled: true
      config:
        modelPath: "~/models/ggml-base.en.bin"
        # Optional: set a specific directory to watch for new audio files
        watchDir: "~/Documents/VoiceNotes"
```

If you specify a `watchDir`, OpenClaw will automatically transcribe any audio file dropped into that folder. If you omit it, you'll need to trigger transcriptions manually, which we'll cover next.

## Step 2: Using `echoTranscript` for On-Demand Processing

While a watched folder is great, sometimes you want to process a one-off file. OpenClaw's `echoTranscript` command is perfect for this. It takes an audio file as input and outputs the transcribed text directly to your terminal.

Let's say you've just recorded `idea.mp3`. You can transcribe it with a simple command:

```bash
openclaw echoTranscript --file ~/path/to/idea.mp3
```

The output will be the clean text of your voice note. This is useful for quick tasks, but the real power comes from piping this output into other commands. For example, to save the transcription to a file:

```bash
openclaw echoTranscript --file ~/path/to/idea.mp3 > ~/tmp/transcription.txt
```

This command forms the core of our automation pipeline.

## Step 3: Create a Standing Order for Obsidian Integration

Now we need to connect the transcription output to Obsidian. We'll create a "standing order," which is a task that OpenClaw runs automatically whenever a certain trigger occurs. In our case, the trigger will be the creation of a new transcription file.

Let's create a dedicated folder for our incoming transcriptions.

```bash
mkdir -p ~/transcripts
```

Next, create a standing order file. These are typically stored in your OpenClaw workspace, perhaps in a `standing-orders/` directory.

**`~/path/to/your/openclaw/workspace/standing-orders/voice-to-obsidian.md`:**

```markdown
---
name: "Voice Note to Obsidian"
schedule: "on-create"
watch: "~/transcripts/*.txt"
---

You are an expert organizer for an Obsidian vault. Your task is to process the newly created transcription file located at `{{trigger.path}}`.

1.  **Read the content** of the transcription file.
2.  **Format it** as a new Obsidian note. The note should have the following structure:
    -   A title, which is the first 10 words of the transcription.
    -   A `## Transcript` section containing the full text.
    -   A `## Summary` section where you provide a one-sentence summary of the note.
    -   A `## Tags` section. Add relevant tags based on the content. Always include `#voice-note`. If the content mentions projects like "Project Phoenix" or "Q2-report", add those as tags (e.g., `#project-phoenix`).
3.  **Generate a filename**. The filename should be the current date and a kebab-case version of the title (e.g., `2026-03-31-my-brilliant-new-idea.md`).
4.  **Save the new note** to the `01_Inbox` folder of my Obsidian vault, located at `~/Documents/ObsidianVault/01_Inbox/`.
5.  **Delete the original transcription file** from `~/transcripts` after it has been successfully processed.
```

This standing order tells OpenClaw exactly what to do. The `{{trigger.path}}` variable is automatically replaced with the path of the file that triggered the order.

## Step 4: Putting It All Together

With all the pieces in place, let's trace the complete workflow:

1.  You record a voice note, `meeting-idea.wav`, and save it to your computer.
2.  You run the `echoTranscript` command and direct the output to your `~/transcripts` folder.

    ```bash
    openclaw echoTranscript --file ~/path/to/meeting-idea.wav > ~/transcripts/meeting-idea.txt
    ```

3.  The creation of `meeting-idea.txt` instantly triggers your "Voice Note to Obsidian" standing order.
4.  The standing order agent reads the text file, formats it into a structured markdown note with a title, summary, and tags.
5.  The agent saves the new note to your Obsidian inbox, for example, as `~/Documents/ObsidianVault/01_Inbox/2026-03-31-new-idea-for-the-client-meeting.md`.
6.  Finally, the agent cleans up by deleting `~/transcripts/meeting-idea.txt`.

The next time you open Obsidian, your transcribed and organized note is waiting for you in your inbox, ready to be linked and developed.

This pipeline is a game-changer for capturing and organizing ideas. You can extend it further by adding more sophisticated logic to your standing order, such as automatically creating tasks in Obsidian for action items mentioned in the voice note. Start with this simple setup and build a system that perfectly fits your workflow.
