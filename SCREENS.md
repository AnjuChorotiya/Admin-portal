# Admin-portal — Screen Docs

Purpose and flow for each screen in this repo. Live pages:
`https://anjuchorotiya.github.io/Admin-portal/<file>`.

---

## form16.html

**Purpose:** Admin screen for uploading, signing, attaching and emailing employees' Form 16 tax documents for a financial year (FY APR 2025 – MAR 2026).

**Flow:**
1. The header "Upload or Sign Form 16" offers a primary **Upload Form 16** action; a toolbar filters the roster by **All employment** (All / Active / Relieved), **Form 16 status** (Available / Partially available / Not available) and **Release status** (Released / Not released).
2. The employee table lists each worker with columns **Employee**, **Employment status**, **PAN**, **Form 16 status** (pill plus a download icon and timestamp), **Form 16 released**, and a per-row more-actions menu; rows are selectable via checkboxes.
3. Selecting rows enables the **Send Form 16** and **Download Form 16** bulk actions.
4. The **Upload Form 16** button opens a modal where the admin uploads signed **Part A** and **Part B** via drag-and-drop / "Browse your Files" drop zones, with per-part "uploaded" confirmation and an "Upload again" option.

**Validations:**
- Part A / Part B file inputs: accept `.zip` only (`accept=".zip"` on both `<input type="file">` drop zones).
- "Save uploaded files" button: disabled by default; enabled only once at least one drop zone is marked `done` (file selected or dropped) — see `refreshSave()`.
- Bulk "Send Form 16" / "Download Form 16" buttons: disabled until at least one employee row checkbox is selected (`refreshBulk()`).
- No text-field constraints (no `required`, `pattern`, email/number/date types) — the only enforced rule is the `.zip` file-type filter and the selection-gated buttons.

**Notes:** Status pills use success/warning styling (e.g. "Available", "Partially available"). Built on the wisemonk-ui design system.

---

## notification-engine-admin.html

**Purpose:** Admin console for configuring how the platform's system notifications are routed, who owns them per client, the message copy used, and an audit log of what was dispatched.

**Flow:**
1. A left sidebar switches between four views: **Defaults**, **Owners**, **Templates**, and **Inbox** (each with a count badge).
2. **Defaults** (Default routing rules) — a matrix table mapping each **Event** to internal teams (**CS**, **CF**, **HR Ops**, **Sales**) and external recipients (**Client**, **Manager**, **Worker**), filterable by team chips, with **New rule** creation and pagination.
3. **Owners** (Client owners) — a table mapping each **Client** to the responsible person for **Customer Success**, **Customer Finance**, **HR Ops** and **Sales**, with an **Add client** action; this is where the team chosen in Defaults resolves to a specific person.
4. **Templates** (Notification templates) — a two-pane editor: a searchable event list on the left and a per-event message editor on the right that supports variables like `{client}` and `{employee}`, customised per recipient type.
5. **Inbox** (Notification inbox) — a log of notifications dispatched in the last 30 days with columns **Time**, **Event**, **Client**, **Recipient**; filterable by search, time range, module (Employees, Payroll, Invoicing, Compliance, Leaves, Contractors, Account), audience and team member, plus an **Export** action.

**Notes:** Views are toggled client-side via `switchView()`; the Templates and Inbox lists are populated dynamically by script.

---
