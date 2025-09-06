# iancanderson.com

Personal site built with Next.js + TypeScript. Content is sourced from Markdown files in `_posts/` and YouTube uploads are synced into the same list as external links.

## Prerequisites
- Node 18+ and npm

## Install & Run
```bash
npm install
npm run dev         # start dev server with hot-reload
npm run typecheck   # TypeScript only
npm run build       # production build to .next/
npm start           # serve the production build
npm run export      # static export to out/
```

## Content Model
- Posts live in `_posts/` as `*.md` with YAML front matter. Example article:
```md
---
title: "My Post"
date: "2022-01-01T12:00:00.000Z"
---

Markdown body...
```

- External items (e.g., YouTube) appear in the list via `externalUrl`. Example video entry (auto‑generated):
```md
---
title: "Video Title"
date: "2024-01-01T12:00:00.000Z"
externalUrl: https://www.youtube.com/watch?v=VIDEO_ID
type: video
---
```

## YouTube Sync
Generates one `_posts/youtube-<videoId>.md` per upload from your channel.

Local run:
```bash
export YOUTUBE_API_KEY=your_api_key
export YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxx
npm run sync:youtube
```

GitHub Actions (daily): `.github/workflows/youtube-sync.yml`
- Add repo secrets: `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`.
- The workflow runs daily and on manual dispatch, commits new `_posts/youtube-*.md` if any.

## Project Layout
- `pages/` Next.js routes (home lists posts and external links)
- `components/` UI components (Tailwind-first styling)
- `lib/` data utilities (Markdown parsing)
- `_posts/` Markdown content (articles and synced video links)
- `scripts/sync-youtube.js` fetch + generate video entries

## Deployment
- Static export: `npm run export` (outputs `out/`). Deploy `out/` to a static host (e.g., GitHub Pages). If using Next server, use `npm run build && npm start`.
