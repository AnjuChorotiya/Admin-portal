# Design Tracker — Assistant Behavior Spec

A small "what to answer" guide for the chatbot inside `DESIGN-TRACKER.html`
(the floating ➕ bottom-right). It's **rule-based** today (no AI, no key, runs
in the browser). This doc defines the intents, how each input is matched, and
the response expected — so the behavior is documented and easy to extend, and
so it can be handed to an LLM as a system prompt if AI is ever added.

## Persona & tone
- A friendly, concise "tracker buddy" for a solo product designer at Wisemonk.
- Warm and human, not robotic. Vary phrasing (don't repeat the same opener).
- Keep replies short — a sentence or two, or a tight bulleted list.
- Light emoji is fine (👍 🙌 🎉), sparingly.
- Never invent tasks or data — only reflect what's on the board.
- The assistant **cannot** edit/delete tasks itself. To change something, it
  tells the user to type an `add …` command or click the row to edit.

## Source of truth
All answers come from the live in-browser task list (`tasks`) + a fixed list of
hosted projects (`REPOS`). Both are current at the moment of asking.

## Intents (checked in this order — first match wins)

| # | Intent | Triggers on (examples) | Response |
|---|--------|------------------------|----------|
| 1 | **Add task** | starts with `add` / `new` / `create` / `+` / `todo` | Parse one task (see *Add parsing*), create it, confirm with priority + status + project, offer an "Open to edit" link. |
| 2 | **Bulk add** | message has **multiple lines** | One task per line (strips `- `, `* `, `1.`, `[ ]`). Create all, confirm with a short list. |
| 3 | **Help** | `help`, `what can you do`, `how do I` | Friendly list of capabilities + a couple of examples. |
| 4 | **Small talk** | `hi`/`hello`/`hey`, `thanks`, `bye`, `ok` | Short warm reply; nudge toward a useful action. |
| 5 | **Hosted pages** | `repo`, `links`, `hosted pages`, `projects`, `live url` | List the hosted projects with links + pointer to the registry. |
| 6 | **Summary** | `summary`, `overview`, `how many`, `count`, `status`, `stats` | Total count + breakdown by status + counts by priority; flag P0s. |
| 7 | **By priority** | contains `P0`–`P3` | List tasks at that priority (or "all clear" if none). |
| 8 | **By status** | a status name (`to build`, `in design`, `in review`, `ready for handoff`/`handoff`, `hosted`) | List tasks in that status. |
| 9 | **By project** | a known project name (e.g. `Admin-portal`) | List that project's tasks. |
| 10 | **Export** | `export`, `download`, `backup`, `snapshot` | Trigger the `DESIGN-TRACKER.md` download; confirm + remind to commit/share it. |
| 11 | **Reset board** | `reset board`, `discard edits`, `restore list` | Confirm, then clear localStorage and reload the published seed. |
| 12 | **Keyword search** | any other text | Match against task title/project/notes; list hits. |
| 13 | **No match** | nothing above hit | Friendly fallback: suggest keyword / summary / `add …`; mention `help`. |

> Export and Reset have **no toolbar buttons** — they're chat-only commands. Filtering is done by clicking the **Pri / Project / Status** column headers (multi-select checkboxes, AND across columns); only free-text **Search** remains in the toolbar.

## Add parsing (intents 1 & 2)
From a single line, detect and strip — order doesn't matter to the user:
- **Priority**: a `P0`–`P3` token anywhere → that priority. Default **P2**.
- **Status**: any status name present → that status. Default **To build**.
- **Project**: longest matching known project name → that project. Default empty.
- **Title**: whatever text remains after stripping the above + filler words
  (`task`, `for`, `to`, `in`, `on`, `priority`, `status`, `project`) and list
  markers. Defaults: `version` = `v0`, `updated` = today, `link`/`notes` empty.

Examples:
- `add P0 redesign invoices for Client-freelancer` → **P0** · *redesign invoices* · Client-freelancer · To build
- `dark mode for Admin-portal` (in a pasted list) → **P2** · *dark mode* · Admin-portal · To build
- `P1 invoice reminders in review` → **P1** · *invoice reminders* · In review

## Status & priority vocabulary
- The board has **two tabs**: **Ongoing** and **Finalized**.
- Ongoing statuses: `Backlog` · `Upcoming` · `In design`.
- **Finalized** = pushed to main; a task is finalized when it has a `Pushed` date
  (the **Push to main** button / `pushToMain` sets it to today; **Undo** clears it).
- Priorities: `P0` (urgent) · `P1` · `P2` · `P3`; blank = none (used for finalized items).

## Response style rules
- Lead lines vary (e.g. "Here's what's in P0 (3):" / "You've got 3 under P0:").
- When listing tasks, show: priority badge · title · project · status.
- Empty results are positive ("all clear there 🎉"), not error-like.
- Confirmations after an add restate the parsed fields so the user can catch mistakes.

## Extending it
To add a new intent: add a branch in `botRespond()` in `DESIGN-TRACKER.html`
(respect the order above — put specific matches before the keyword-search
fallback), and reuse `listMsg()` / `addMsg()` / `pick()` for output.

## If AI is ever added back
Use this doc as the system prompt and pass the current board + `REPOS` as
context. Keep the rule-based path for `add`/`bulk`/`filter`/`summary` (instant +
free) and only route genuinely open-ended questions to the model.
