#!/usr/bin/env node
/*
  Sync podcast episodes from an RSS feed into _posts/ as Markdown entries.

  Default feed: https://hunchpig.audio/podcast.xml (override with PODCAST_FEED_URL)

  Each episode becomes: _posts/podcast-<id-or-slug>.md with frontmatter:
    title, date (ISO), type: audio, tags: [podcast], audioUrl (enclosure), summary (itunes:summary)

  Usage:
    node scripts/sync-podcast.js
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const FEED_URL = process.env.PODCAST_FEED_URL || 'https://hunchpig.audio/podcast.xml';
const DEBUG = process.env.PODCAST_DEBUG === '1';

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const status = res.statusCode || 0;
        const loc = res.headers.location;
        if ([301, 302, 307, 308].includes(status) && loc && redirects < 5) {
          const nextUrl = new URL(loc, url).toString();
          if (DEBUG) console.log(`[podcast] Redirect ${status} to ${nextUrl}`);
          res.resume();
          return resolve(get(nextUrl, redirects + 1));
        }
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          if (status >= 400) return reject(new Error(`HTTP ${status}`));
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
  let blocks = rss.split(/<item\b/i).slice(1).map((p) => p.split(/<\/item>/i)[0]);
  if (DEBUG) console.log(`[podcast] Found RSS <item> blocks: ${blocks.length}`);
  // Atom fallback (<entry>)
  if (blocks.length === 0) {
    blocks = rss.split(/<entry\b/i).slice(1).map((p) => p.split(/<\/entry>/i)[0]);
    if (DEBUG) console.log(`[podcast] Found Atom <entry> blocks: ${blocks.length}`);
  }
  for (const block of blocks) {
    const rawTitle = extract('title', block);
    const title = sanitizeTitle(stripCdata(rawTitle));
    const pubDate = extract('pubDate', block) || extract('updated', block) || extract('published', block) || new Date().toUTCString();
    let link = stripCdata(extract('link', block));
    if (!link) {
      const hrefMatch = block.match(/<link[^>]*?href=["']([^"']+)["'][^>]*>/i);
      if (hrefMatch) link = hrefMatch[1];
    }
    // Capture enclosure URL (audio)
    const audioUrl = (block.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*>/i) || [])[1] || '';
    // Summary from itunes:summary
    const rawSummary = extract('itunes:summary', block) || extract('description', block) || extract('summary', block);
    const summary = stripCdata(rawSummary);
    const guid = extract('guid', block) || extract('id', block);
    let id = '';
    const guidId = (String(guid).match(/([a-z0-9][a-z0-9._-]{5,})$/i) || [])[1];
    if (guidId) id = guidId;
    if (!id && link) id = safeSlug(lastPathSegment(link));
    items.push({ id, title, link, pubDate, audioUrl, summary });
  }
  return items;
}

function writePostFile(item) {
  const { id, title, link, pubDate, audioUrl, summary } = item;
  if (!id) return false;
  const filename = path.join(process.cwd(), '_posts', `podcast-${id}.md`);
  if (fs.existsSync(filename)) return false;
  const dateIso = new Date(pubDate).toISOString();
  const summaryLines = String(summary || '').replace(/\r\n/g, '\n').split('\n').map((l) => '  ' + l);
  const fm = [
    '---',
    `title: "${title}"`,
    `date: "${dateIso}"`,
    'type: audio',
    'tags:',
    '  - podcast',
    (audioUrl ? `audioUrl: "${audioUrl}"` : ''),
    (summary ? 'summary: |' : ''),
    ...(summary ? summaryLines : []),
    '---',
    '',
  ].filter(Boolean).join('\n');
  fs.writeFileSync(filename, fm, 'utf8');
  return true;
}

async function main() {
  const postsDir = path.join(process.cwd(), '_posts');
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);
  if (DEBUG) console.log(`[podcast] Fetching feed: ${FEED_URL}`);
  const rss = await get(FEED_URL);
  if (DEBUG) console.log(`[podcast] RSS length: ${rss.length}`);
  const items = parseItems(rss);
  if (DEBUG) console.log(`[podcast] Parsed items: ${items.length}`);
  let created = 0;
  for (const it of items) {
    if (writePostFile(it)) {
      created += 1;
      if (DEBUG) console.log(`[podcast] Wrote podcast-${it.id}.md`);
    }
  }
  console.log(`Podcast sync complete. New files: ${created}`);
}

main().catch((e) => {
  console.error('Podcast sync failed:', e.message);
  process.exit(1);
});
