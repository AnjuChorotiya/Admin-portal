# Admin-portal — Screen Docs

Purpose and flow for each screen in this repo. Live pages:
`https://anjuchorotiya.github.io/Admin-portal/<file>`.

---

## payroll-summary.html

**Purpose:** Finance admin screen giving an overview of the company's payroll for a selected month and a per-personnel status roster to drive the run through its lifecycle (Finalize → Execute → Mark as Paid).

**Flow:**
1. The left nav is scoped to a single **Payroll** tab (no sub-menu or dropdown).
2. A **Payroll** overview card shows the **Total payroll amount** (₹25,52,30,775.96) for the period, a month selector (June 2026), and three lifecycle actions: **Finalize payroll** (primary), **Execute payroll** and **Mark as Paid** (each disabled until the prior step completes).
3. An **Employee status (June 2026)** card surfaces run counts — **Finalized / Executed / Paid / Skipped / Total** (0 / 0 / 0 / 698 / 698) — and an **Export** action.
4. The roster table lists each worker with columns **Personnel** (avatar + name, with the **designation/job title shown beneath the name**), **Client**, **Invoice / Deposit / Risk**, **Employment type**, **Currency** (sortable), **FX Rate**, **Gross pay**, **Total payout** (sortable), **Status** (sortable) and a per-row more-actions menu; rows are selectable via checkboxes with a header select-all.
5. **Invoice / Deposit / Risk** is a centre-aligned column packing three at-a-glance client health signals into one cell, separated by `/`: an **invoice label** in light weight — "Paid" (blue) or "Unpaid" (grey), a **deposit-runway risk figure** in months as a colour-coded signed decimal (green ≥ 1 healthy · orange 0–1 thin · red negative = shortfall/overdue · grey dash = no data, e.g. `2.2`, `0.3`, `-1.1`, `–`), and a **client-background risk dot** (green = good · yellow = watch · red = high risk). Each element carries a hover tooltip and the column header has an info tooltip describing the legend.
6. The **FX Rate** column shows a dash (–) for every row (no rate applied yet). Exited workers carry an **EXIT** tag on the name.
7. The toolbar filters the roster by free-text search (name / client / job title) and by **All clients**, **Employee type** and **Status** dropdowns. Each dropdown is **multi-select** (tick several values; the trigger reads "… · N" when more than one is chosen, the field name when none); filters combine as AND across columns and OR within a column. An empty-result state shows when no rows match. The Invoice / Deposit / Risk dots/figure are explained via per-element hover tooltips and the column header's info tooltip.

**Validations:**
- Lifecycle buttons are state-gated: **Execute payroll** enables only after Finalize; **Mark as Paid** enables only after Execute (`finalizeBtn` → `executeBtn` → `markPaidBtn`).
- Header select-all toggles only currently-visible (filtered) rows and reflects an indeterminate state on partial selection.
- FX Rate is display-only (dash placeholder) on every row; all amounts and counts are illustrative demo data.
- Filter dropdowns are multi-select and combine with the search box; selecting the "All …" row clears that column's filter.

**Notes:** Built on the wisemonk-ui design system; status pills use neutral styling for "Skipped". Lifecycle actions and Export are simulated client-side (toasts) for demonstration.

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
