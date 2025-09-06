---
title: My Next.js blog
date: '2022-02-03T12:00:00.000Z'
tags:
  - software
---

## Before

My [previous website](https://iancanderson.github.io) was a static site built with [Jekyll](https://jekyllrb.com/).

It worked just fine.

## Now

I wanted to play with a modern stack.

The site you're viewing now is powered by
[Next.js](https://nextjs.org/),
[TailwindCSS](https://tailwindcss.com/),
[TypeScript](https://www.typescriptlang.org/), and
[MDX](https://mdxjs.com/).

It's still a statically-generated site and it's deployed via [GitHub Pages](https://pages.github.com/).

### MDX

I think [MDX](https://mdxjs.com) is the most interesting bit so far: it lets you embed React components directly into your Markdown source files.

For example, here I'm embedding a counter react component with `<Counter />`:

<Counter />

### Flexibility

Since this uses Next.js, it also allows me to add dynamic features to the site (via server-side (SSR) or client-side (SPA) rendering). If I end up going that way, I could host it on something like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Also I'd be lying if I said I wasn't inspired by [Brian Lovin's new website](https://brianlovin.com/writing/how-my-website-works), which is a webapp deployed to [Vercel](https://vercel.com/).

## Deployment to GitHub Pages

I have a [GitHub Actions workflow](https://github.com/iancanderson/iancanderson.com/blob/509dbad922db3e4daa62844bd826ba5c2d26ada9/.github/workflows/deploy.yml) that deploys the site to GitHub Pages via the [gh-pages](https://github.com/peaceiris/actions-gh-pages) action.

Here's what happens when I push to the `main` branch:

### `next build`

This creates an optimized version of the site in `./_next/`

### `next export`

This exports the site to static HTML that doesn't need a node server to run.
See the [`gh-pages` branch](https://github.com/iancanderson/iancanderson.com/tree/gh-pages) on my repo to see the exported site structure

### `peaceiris/actions-gh-pages@v3`

[This action](https://github.com/peaceiris/actions-gh-pages) pushes the exported site to `gh-pages`, which is the branch that GitHub Pages uses to host the site.

## Resources

I started with the [typescript blog starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript) example from Next.js, and then I added MDX support using this [post](https://nextjs.org/blog/markdown) in this [commit](https://github.com/iancanderson/iancanderson.com/commit/005090bee69cfeac2df59e90290a558921b41085), using the `remark-prism` plugin for syntax highlighting.

Check out the code for this site on [GitHub](https://github.com/iancanderson/iancanderson.com).
