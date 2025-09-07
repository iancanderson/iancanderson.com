#!/usr/bin/env node
/*
  Sync podcast episodes from an RSS feed into _posts/ as Markdown entries.

  Default feed: https://hunchpig.audio/podcast.xml (override with PODCAST_FEED_URL)

  Each episode becomes: _posts/podcast-<id-or-slug>.md with frontmatter:
    title, date (ISO), externalUrl (episode page or enclosure), tags: [podcast]

  Usage:
    node scripts/sync-podcast.js
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const FEED_URL = process.env.PODCAST_FEED_URL || 'https://hunchpig.audio/podcast.xml';

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}`));
          resolve(data);
        });
      })
      .on('error', reject);
  });
}

function extract(tag, xml) {
  // Supports <tag>...</tag> and <tag attr>...</tag>
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = xml.match(re);
  return m ? m[1].trim() : '';
}

function stripCdata(s) {
  return s.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
}

function sanitizeTitle(t) {
  return String(t || '').replace(/"/g, '\\"');
}

function lastPathSegment(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts.pop() || '';
  } catch (_) {
    const parts = String(url).split('?')[0].split('/').filter(Boolean);
    return parts.pop() || '';
  }
}

function safeSlug(s) {
  return s.toLowerCase().replace(/[^a-z0-9-_]+/g, '-').replace(/^-+|-+$/g, '');
}

function parseItems(rss) {
  const items = [];
  const parts = rss.split(/<item>/i).slice(1);
  for (const part of parts) {
    const block = part.split(/<\/item>/i)[0];
    const rawTitle = extract('title', block);
    const title = sanitizeTitle(stripCdata(rawTitle));
    const pubDate = extract('pubDate', block) || new Date().toUTCString();
    let link = stripCdata(extract('link', block));
    if (!link) {
      const hrefMatch = block.match(/<link[^>]*?href=["']([^"']+)["'][^>]*\/>/i);
      if (hrefMatch) link = hrefMatch[1];
    }
    // enclosure url fallback
    if (!link) {
      const encl = (block.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*>/i) || [])[1];
      if (encl) link = encl;
    }
    const guid = extract('guid', block);
    let id = '';
    const guidId = (String(guid).match(/([a-z0-9_-]{6,})$/i) || [])[1];
    if (guidId) id = guidId;
    if (!id && link) id = safeSlug(lastPathSegment(link));
    items.push({ id, title, link, pubDate });
  }
  return items;
}

function writePostFile(item) {
  const { id, title, link, pubDate } = item;
  if (!id) return false;
  const filename = path.join(process.cwd(), '_posts', `podcast-${id}.md`);
  if (fs.existsSync(filename)) return false;
  const dateIso = new Date(pubDate).toISOString();
  const fm = [
    '---',
    `title: "${title}"`,
    `date: "${dateIso}"`,
    link ? `externalUrl: "${link}"` : '',
    'tags:',
    '  - podcast',
    '---',
    '',
  ].filter(Boolean).join('\n');
  fs.writeFileSync(filename, fm, 'utf8');
  return true;
}

async function main() {
  const postsDir = path.join(process.cwd(), '_posts');
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);
  const rss = await get(FEED_URL);
  const items = parseItems(rss);
  let created = 0;
  for (const it of items) {
    if (writePostFile(it)) created += 1;
  }
  console.log(`Podcast sync complete. New files: ${created}`);
}

main().catch((e) => {
  console.error('Podcast sync failed:', e.message);
  process.exit(1);
});

