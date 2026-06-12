# Project Context

## Pinned: Hosted Pages Registry

**[PAGES.md](PAGES.md) is the source of truth for every designed page and where it's hosted.**

- Always read `PAGES.md` before answering questions about which pages exist, their GitHub repos, source links, or live GitHub Pages preview URLs.
- Whenever a new page is designed **and** pushed to git, add a row to the correct project's table in `PAGES.md` (columns: Page | Source | Live Preview), then commit.
- Excludes the `gridwise-site` repo by request.
- All static portals are hosted under GitHub user `AnjuChorotiya` with GitHub Pages enabled. `contractor-legal-ai` is the Next.js source app; its onboarding pages are deployed live via the **wisemonk** repo (formerly `EOR`; static export served from `/docs`, basePath `/wisemonk`).
- Shareable rendered registry: https://anjuchorotiya.github.io/wisemonk/registry.html — **password-protected (AES-encrypted)**. After editing PAGES.html, rebuild the published copy with `node build-registry.js "<password>" "EOR/docs/registry.html"` (current password `1234`), then commit & push to the wisemonk repo. Never publish a plaintext copy in the public repo.
