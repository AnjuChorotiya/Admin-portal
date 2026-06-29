# Design Tracker

Pre-handoff design pipeline. Cards flow left → right: **To build → In design → In review → Ready for handoff → Hosted**. When a design ships to the [Hosted Pages Registry](registry.html), move it to **Hosted**. Edit the table below and rebuild.

Status must be one of: `To build` · `In design` · `In review` · `Ready for handoff` · `Hosted`.

| Item | Project | Status | Version | Updated | Link | Notes |
|---|---|---|---|---|---|---|
| PLG loop — self-serve activation + paywall | Client-freelancer | To build | v0 | 2026-06-28 |  | SCOPE P0 · signup → add contractor → pay → upgrade |
| AI support widget ("Ask AI") | Wisemonk UI | To build | v0 | 2026-06-28 |  | SCOPE P0 · grounded in help/SCREENS, human fallback |
| ICP-branched onboarding | Client-freelancer | To build | v0 | 2026-06-28 |  | SCOPE P1 · goal selector → tailored checklist/dashboard |
| Unified Admin Console | Admin-portal | To build | v0 | 2026-06-28 |  | SCOPE P1 · one shell over Form 16 / Notifications / Rules / Usage |
| In-workflow testimonials | Client-freelancer | To build | v0 | 2026-06-28 |  | SCOPE P2 · capture after positive feedback |
| Funnel analytics events | contractor-legal-ai | In design | v0.1 | 2026-06-28 |  | Q3 M0 · signup→activate→pay→upgrade event spec |
| Contractor onboarding · Get started | contractor-legal-ai | Ready for handoff | v1 | 2026-06-28 | [src](https://github.com/AnjuChorotiya/contractor-legal-ai/blob/dev/frontend/src/app/onboarding/get-started/page.tsx) | on `dev`; merge dev→main to ship to prod |
| Workspace onboarding (5-step) | contractor-legal-ai | Ready for handoff | v1 | 2026-06-28 | [src](https://github.com/AnjuChorotiya/contractor-legal-ai/blob/dev/frontend/src/app/onboarding/workspace/page.tsx) | on `dev`; not yet in prod |
| App shell (nav + header) | Wisemonk UI | Hosted | v1.3 | 2026-06-12 | [live](https://anjuchorotiya.github.io/Client-freelancer/wisemonk-ui/app-shell.html) | shipped · exact portal nav+header |
| Dev notes (annotations) | Wisemonk UI | Hosted | v1.5 | 2026-06-17 | [live](https://anjuchorotiya.github.io/Client-freelancer/wisemonk-ui/dev-notes.js) | shipped · drop-in on every project |
| Before/after-setup home + empty tabs | Client-freelancer | Hosted | v1 | 2026-06-17 | [live](https://anjuchorotiya.github.io/Client-freelancer/home.html?setup) | shipped · checklist, empty tabs, setup banner |
| EOR org + employee onboarding | wisemonk | Hosted | v1 | 2026-06-12 | [live](https://anjuchorotiya.github.io/wisemonk/) | shipped |
| contractor-legal-ai (app) | contractor-legal-ai | Hosted | v1 | 2026-06-28 | [live](https://legal.wisemonk.io) | shipped · live in production |

<!-- How to add: copy a row, set Status to one of the five values, bump Version on each iteration, update the date.
     Hosted = it's in the registry (registry.html). Rebuild with: node build-registry.js "1234" "EOR/docs/design-tracker.html" "DESIGN-TRACKER.md" "DESIGN-TRACKER.html" "Design tracker" "Enter the password to view the design tracker." 'if (document.getElementById("md")) render();' -->
