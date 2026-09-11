
import fs from "node:fs";
import path from "node:path";

const LOG_DIR = path.join(process.cwd(), ".agent-logs");
// State lives outside .agent-logs — that dir must contain only shipped log files.
const STATE = path.join(process.cwd(), ".claude", ".capture-state.json");
const AUTHOR = process.env.GH_HANDLE || "WashakhGen";
const PROJECT = process.env.CAPTURE_PROJECT || "nanno-clone";

fs.mkdirSync(LOG_DIR, { recursive: true });
fs.mkdirSync(path.dirname(STATE), { recursive: true });

let raw = "";
try { raw = fs.readFileSync(0, "utf8"); } catch {}
let payload = {};
try { payload = JSON.parse(raw || "{}"); } catch {}

const now = new Date().toISOString();
const sessionId = payload.session_id || "unknown-session";
const eventName = payload.hook_event_name || process.argv[2] || "unknown";

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE, "utf8")); } catch { return {}; }
}
function saveState(s) { fs.writeFileSync(STATE, JSON.stringify(s, null, 2)); }

function sessionFile(state, sid, model) {
  if (state[sid]?.file) return state[sid].file;
  const stamp = now.replace(/:/g, "-").replace(/\..+/, "").replace("T", "_");
  const file = path.join(LOG_DIR, `${stamp}_${sid.slice(0, 8)}.md`);
  const header = `---
session_id: ${sid}
date: ${now.slice(0, 10)}
author: ${AUTHOR}
model: ${model}
tool: claude-code
project: ${PROJECT}
total_exchanges: 0
first_prompt_time: ${now}
last_prompt_time: ${now}
---

# Session Log - ${now.slice(0, 10)}

Session: \`${sid.slice(0, 8)}\` | Project: \`${PROJECT}\` | Author: \`${AUTHOR}\`

---
`;
  fs.writeFileSync(file, header);
  state[sid] = { file, count: 0 };
  return file;
}

// Pull model + final response text from the transcript. Transcript lines are
// JSONL; each assistant message carries message.model. The final response
// for a turn is the last assistant message with text content.
function readTranscriptTail(transcriptPath) {
  let model = "unknown-model";
  let response = "";
  try {
    if (transcriptPath && fs.existsSync(transcriptPath)) {
      const lines = fs.readFileSync(transcriptPath, "utf8").trim().split("\n");
      for (let i = lines.length - 1; i >= 0; i--) {
        let msg;
        try { msg = JSON.parse(lines[i]); } catch { continue; }
        const m = msg.message;
        if ((msg.type === "assistant" || m?.role === "assistant") && m) {
          if (m.model) model = m.model;
          const content = m.content ?? [];
          const text = Array.isArray(content)
            ? content.filter(c => c.type === "text").map(c => c.text).join("\n")
            : String(content);
          if (text) { response = text; break; }
        }
      }
    }
  } catch (e) { response = `(capture error: ${e.message})`; }
  return { model, response };
}

function updateFrontmatter(file, fields) {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return;
  let block = match[1];
  for (const [key, val] of Object.entries(fields)) {
    const re = new RegExp(`^${key}:.*$`, "m");
    if (re.test(block)) block = block.replace(re, `${key}: ${val}`);
    else block += `\n${key}: ${val}`;
  }
  const newHeader = `---\n${block}\n---\n`;
  fs.writeFileSync(file, newHeader + text.slice(match[0].length));
}

const state = loadState();

if (eventName === "UserPromptSubmit") {
  const prompt = payload.prompt ?? payload.user_prompt ?? "";
  // Model isn't known yet at prompt time (no assistant message exists);
  // best-effort peek at transcript in case this session already has one.
  const { model: peekedModel } = readTranscriptTail(payload.transcript_path);
  const file = sessionFile(state, sessionId, peekedModel);
  state[sessionId].count = (state[sessionId].count || 0) + 1;
  const num = state[sessionId].count;
  state[sessionId].pendingModel = peekedModel;
  fs.appendFileSync(file, `
[LOG_ENTRY type=PROMPT num=${num} session=${sessionId.slice(0, 8)}]
timestamp: ${now}
model: ${peekedModel}

${prompt}

`);
  updateFrontmatter(file, { total_exchanges: num, last_prompt_time: now });
} else if (eventName === "Stop") {
  const { model, response } = readTranscriptTail(payload.transcript_path);
  const file = state[sessionId]?.file || sessionFile(state, sessionId, model);
  const num = state[sessionId]?.count || 1;
  fs.appendFileSync(file, `
[LOG_ENTRY type=RESPONSE num=${num} session=${sessionId.slice(0, 8)}]
timestamp: ${now}
model: ${model}

${response}

`);
  updateFrontmatter(file, { model });
  // Backfill this turn's PROMPT entry with the now-known model, if it was unknown.
  try {
    const text = fs.readFileSync(file, "utf8");
    const promptTag = `[LOG_ENTRY type=PROMPT num=${num} session=${sessionId.slice(0, 8)}]`;
    const idx = text.indexOf(promptTag);
    if (idx !== -1) {
      const after = text.slice(idx);
      const fixed = after.replace(/^model: unknown-model$/m, `model: ${model}`);
      if (fixed !== after) fs.writeFileSync(file, text.slice(0, idx) + fixed);
    }
  } catch {}
}
saveState(state);
