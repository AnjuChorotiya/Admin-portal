# Design Tracker

Pre-handoff design pipeline (list view). Status ∈ `To build` · `In design` · `In review` · `Ready for handoff` · `Hosted`. Priority ∈ `P0` · `P1` · `P2` · `P3` (blank = none). When a design ships to the [Hosted Pages Registry](registry.html), set Status to **Hosted**.

| Item | Project | Status | Priority | Version | Updated | Link | Notes |
|---|---|---|---|---|---|---|---|
| PLG loop — self-serve activation + paywall | Client-freelancer | To build | P0 | v0 | 2026-06-28 |  | signup → add contractor → pay → upgrade |
| AI support widget ("Ask AI") | Wisemonk UI | To build | P0 | v0 | 2026-06-28 |  | grounded in help/SCREENS, human fallback |
| Funnel analytics events | contractor-legal-ai | In design | P0 | v0.1 | 2026-06-28 |  | Q3 M0 · signup→activate→pay→upgrade event spec |
| ICP-branched onboarding | Client-freelancer | To build | P1 | v0 | 2026-06-28 |  | goal selector → tailored checklist/dashboard |
| Unified Admin Console | Admin-portal | To build | P1 | v0 | 2026-06-28 |  | one shell over Form 16 / Notifications / Rules / Usage |
| Contractor onboarding · Get started | contractor-legal-ai | Ready for handoff | P1 | v1 | 2026-06-28 | [src](https://github.com/AnjuChorotiya/contractor-legal-ai/blob/dev/frontend/src/app/onboarding/get-started/page.tsx) | on dev; merge dev→main to ship to prod |
| Workspace onboarding (5-step) | contractor-legal-ai | Ready for handoff | P1 | v1 | 2026-06-28 | [src](https://github.com/AnjuChorotiya/contractor-legal-ai/blob/dev/frontend/src/app/onboarding/workspace/page.tsx) | on dev; not yet in prod |
| In-workflow testimonials | Client-freelancer | To build | P2 | v0 | 2026-06-28 |  | capture after positive feedback |
| App shell (nav + header) | Wisemonk UI | Hosted |  | v1.3 | 2026-06-12 | [live](https://anjuchorotiya.github.io/Client-freelancer/wisemonk-ui/app-shell.html) | shipped · exact portal nav+header |
| Dev notes (annotations) | Wisemonk UI | Hosted |  | v1.5 | 2026-06-17 | [live](https://anjuchorotiya.github.io/Client-freelancer/wisemonk-ui/dev-notes.js) | shipped · drop-in on every project |
| Before/after-setup home + empty tabs | Client-freelancer | Hosted |  | v1 | 2026-06-17 | [live](https://anjuchorotiya.github.io/Client-freelancer/home.html?setup) | shipped · checklist, empty tabs, setup banner |
| EOR org + employee onboarding | wisemonk | Hosted |  | v1 | 2026-06-12 | [live](https://anjuchorotiya.github.io/wisemonk/) | shipped |
| contractor-legal-ai (app) | contractor-legal-ai | Hosted |  | v1 | 2026-06-28 | [live](https://legal.wisemonk.io) | shipped · live in production |
