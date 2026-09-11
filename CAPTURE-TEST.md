# Capture Test

## Tool & model

- Tool: **Claude Code** (CLI)
- Model: **claude-sonnet-5** (single model, plans and executes — Claude Code
  does not split planning/execution across two models)

## Mechanism

Claude Code **hooks**, configured in `.claude/settings.json`:

- `UserPromptSubmit` — fires on every prompt, appends a `PROMPT` entry to
  that session's log file.
- `Stop` — fires at end of turn; receives `transcript_path` on stdin
  (pointer to the session's JSONL transcript), reads the last assistant
  message from it for the model name and final response text, appends a
  `RESPONSE` entry.

Both events run `node .claude/capture.mjs <EventName>`. The script
([.claude/capture.mjs](.claude/capture.mjs)) maintains one log file per
`session_id` under `.agent-logs/`, named
`YYYY-MM-DD_HH-MM-SS_<session-id-short>.md`, and keeps small per-session
bookkeeping (file path, entry count) in `.claude/.capture-state.json` —
deliberately kept **outside** `.agent-logs/` so nothing in that directory is
gitignored.

Config file changed: [.claude/settings.json](.claude/settings.json)
Script: [.claude/capture.mjs](.claude/capture.mjs)

## Log files the canaries landed in

- Session 1 (this conversation):
  [.agent-logs/2026-09-11_09-14-42_6255e85e.md](.agent-logs/2026-09-11_09-14-42_6255e85e.md)
  — `session_id: 6255e85e-8767-4e52-82af-b478a8f0d5bb`, canary is exchange 3.
- Session 2 (separate terminal, fresh `claude` process, same repo):
  [.agent-logs/2026-09-11_09-42-22_f5bf6f9b.md](.agent-logs/2026-09-11_09-42-22_f5bf6f9b.md)
  — `session_id: f5bf6f9b-7d3c-4bf8-bbcc-d509fc1d81ab`, canary is exchange 1.

Different session ids, different files, both auto-generated — confirms the
hook is installed project-wide, not tied to the session that created it.

## Canary entries, pasted raw

### Session 1 — `6255e85e`

```
[LOG_ENTRY type=PROMPT num=3 session=6255e85e]
timestamp: 2026-09-11T09:41:45.965Z
model: claude-sonnet-5

CAPTURE TEST — 8x assignment, WashakhGen


[LOG_ENTRY type=RESPONSE num=3 session=6255e85e]
timestamp: 2026-09-11T09:41:53.281Z
model: claude-sonnet-5

Canary received. This exchange should now log as `PROMPT num=…` / `RESPONSE num=…` in `.agent-logs/2026-09-11_09-14-42_6255e85e.md` (same session, count bumps to 3).

Now open a **second, separate** Claude Code session (new terminal tab, `cd` into this repo, run `claude`) and send there:
```
CAPTURE TEST — 8x assignment, WashakhGen (session 2)
```

Tell me when sent — I'll check both files.
```

### Session 2 — `f5bf6f9b`

```
[LOG_ENTRY type=PROMPT num=1 session=f5bf6f9b]
timestamp: 2026-09-11T09:42:22.403Z
model: claude-sonnet-5

CAPTURE TEST — 8x assignment, WashakhGen (session 2)


[LOG_ENTRY type=RESPONSE num=1 session=f5bf6f9b]
timestamp: 2026-09-11T09:42:24.140Z
model: claude-sonnet-5

Test seen, ack. Need real task — what want done?
```

## What was tried first that didn't work

The first attempt at the capture script (already scaffolded in the repo
before this verification pass) had two bugs, found while checking the very
first captured entry rather than assuming it worked:

1. **`model: unknown-model` on every entry.** The script read `payload.model`
   from the hook's stdin JSON, but neither `UserPromptSubmit` nor `Stop`
   payloads carry a `model` field. Fixed by reading the model from the
   session's transcript JSONL instead (`message.model` on the last assistant
   message) — the only place Claude Code actually records it.
2. **State file (`.agent-logs/.session-state.json`) was gitignored.** The
   assignment explicitly forbids ignoring anything under `.agent-logs/`.
   Fixed by moving the bookkeeping file to `.claude/.capture-state.json` and
   deleting the `.gitignore` entry (the file had nothing else in it, so the
   whole `.gitignore` was removed).

Also, the first two log files this session produced
(`2026-09-11_09-03-04_6255e85e.md` and the start of
`2026-09-11_09-14-42_6255e85e.md`) both carry `session_id: 6255e85e...` —
they split into two files only because the state file above was deleted
mid-session during cleanup, not because of a second real session. That was
caught and is **not** being counted as the required second-session proof;
the actual second session (`f5bf6f9b`, a fresh `claude` process in a new
terminal) is what's cited above.
