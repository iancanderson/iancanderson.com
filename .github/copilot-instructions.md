# GitHub Copilot Instructions for iancanderson.com

This is a personal website/blog built with **Next.js 14 + TypeScript + Tailwind CSS**. Content is sourced from Markdown files and includes YouTube video sync functionality.

## Project Structure

- `pages/` - Next.js routes (`index.tsx`, `posts/[slug].tsx`)
- `components/` - Reusable React components (kebab-case filenames)
- `lib/` - Data/utility functions (`api.ts`, `constants.ts`)
- `types/` - Shared TypeScript types (`author.ts`, `post.ts`)
- `_posts/` - Markdown/MDX content files
- `styles/` - Global CSS and Tailwind entry point
- `public/` - Static assets

## Development Commands

```bash
npm run dev         # Start dev server with hot-reload
npm run build       # Production build
npm run typecheck   # TypeScript type checking only
npm run export      # Static export to out/
```

## Coding Conventions

- **Language**: TypeScript with React function components
- **Styling**: Tailwind-first approach, minimal custom CSS
- **Indentation**: 2 spaces, include semicolons, prefer double quotes
- **File naming**: kebab-case for components/utils (e.g., `post-preview.tsx`)
- **Components**: Default export per file, props typed via `type` or `interface`
- **Imports**: Use relative paths (no path aliases configured)

## Testing Approach

- **No unit test runner** - prioritize `npm run typecheck` and manual verification
- Keep functions in `lib/` pure and testable
- Avoid side effects in components

## Content Model

Posts are Markdown files in `_posts/` with YAML frontmatter:
```md
---
title: "Post Title"
date: "2022-01-01T12:00:00.000Z"
externalUrl: https://example.com  # optional for external links
type: video                       # optional type indicator
---

Markdown content here...
```

## Key Patterns

- Use `gray-matter` for parsing frontmatter
- Date handling with `date-fns`
- MDX rendering with `next-mdx-remote`
- Static generation for all pages
- YouTube sync creates auto-generated post files

## Common File Types

- `.tsx` - React components and pages
- `.ts` - Utility functions and types
- `.md` - Content files in `_posts/`
- `.css` - Minimal global styles with Tailwind

For detailed guidelines, see [AGENTS.md](../AGENTS.md) in the repository root.