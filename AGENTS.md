# Repository Guidelines

## Project Structure & Module Organization
- `pages/` Next.js routes (e.g., `index.tsx`, `posts/[slug].tsx`).
- `components/` Reusable React components (kebab-case filenames).
- `lib/` Data/util functions (e.g., `api.ts`, `constants.ts`).
- `types/` Shared TypeScript types (`author.ts`, `post.ts`).
- `_posts/` Markdown/MDX content rendered on the site.
- `styles/` Global CSS and Tailwind entry (`index.css`).
- `public/` Static assets (`/favicon`, `/assets`, `CNAME`).

## Build, Test, and Development Commands
- `npm run dev` Start Next.js dev server with `_posts` hot-reload.
- `npm run build` Production build (`.next/`).
- `npm start` Serve the production build.
- `npm run export` Static export to `out/`.
- `npm run typecheck` TypeScript type-check only.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Indentation: 2 spaces; include semicolons; prefer double quotes.
- Filenames: kebab-case for components/utils (e.g., `post-preview.tsx`).
- Components: default export per file; props typed via `type` or `interface`.
- Styling: Tailwind-first; keep custom CSS minimal in `styles/`.
- Imports: use relative paths within repo (no path aliases configured).

## Testing Guidelines
- No unit test runner is configured. Prioritize `npm run typecheck` and manual page verification.
- If adding tests, prefer Jest + ts-jest; colocate as `*.test.ts(x)` next to sources.
- Keep functions in `lib/` pure and testable; avoid side effects in components.

## Commit & Pull Request Guidelines
- Commits: short, imperative summaries (e.g., “Fix date parsing”). Group related changes.
- PRs: clear description, rationale, and screenshots for UI changes. Link issues when relevant.
- Scope: keep diffs focused; avoid unrelated refactors/reformatting.
- Update docs (`README.md`, this file) when behavior or commands change.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` (gitignored) for local env vars if introduced.
- External content/analytics belong in `public/`; avoid remote scripts without review.

## Agent-Specific Instructions
- Make minimal, targeted patches; follow kebab-case and 2-space style.
- Do not add dependencies without discussion; avoid lockfile churn.
- Respect existing structure; prefer adding to `components/` and `lib/` over ad-hoc folders.
