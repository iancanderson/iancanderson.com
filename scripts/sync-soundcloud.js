#!/usr/bin/env node
/*
  Sync SoundCloud tracks into _posts/ as Markdown entries using a fixed RSS feed.

  Usage:
    node scripts/sync-soundcloud.js

  Behavior:
    - Fetches RSS feed of SoundCloud tracks for the given user id
    - Writes one file per track: _posts/soundcloud-<id|slug>.md
    - Adds tag `music` and type `music`
    - Skips files that already exist

  Feed selection:
    - Uses SOUNDCLOUD_USER_ID if provided
    - Otherwise defaults to user id 2178588
    - Feed pattern: https://feeds.soundcloud.com/users/soundcloud:users:<id>/sounds.rss
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const USER_ID = process.env.SOUNDCLOUD_USER_ID || '2178588';
const FEED_URL = `https://feeds.soundcloud.com/users/soundcloud:users:${USER_ID}/sounds.rss`;

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
          resolve(data);
        });
      })
      .on('error', reject);
  });
}

function extract(tag, xml) {
  const re = new RegExp(`<${tag}>([\s\S]*?)<\/${tag}>`, 'i');
  const m = xml.match(re);
  return m ? m[1].trim() : '';
}

function stripCdata(s) {
  return s.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
}

function sanitizeTitle(t) {
  return t.replace(/"/g, '\\"');
}

function safeSlug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '');
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

function parseTrackId(guid, link, block) {
  const sources = [guid, link, block];
  for (const src of sources) {
    if (!src) continue;
    const m = String(src).match(/tracks[:\/]([0-9]+)/i);
    if (m) return m[1];
  }
  const seg = lastPathSegment(link || '');
  if (seg) return safeSlug(seg);
  return '';
}

function parseItems(rss) {
  const items = [];
  const parts = rss.split(/<item>/i).slice(1); // skip header
  for (const part of parts) {
    const block = part.split(/<\/item>/i)[0];
    const rawTitle = extract('title', block);
    const title = sanitizeTitle(stripCdata(rawTitle));
    const link = stripCdata(extract('link', block));
    const pubDate = extract('pubDate', block) || new Date().toUTCString();
    const guid = extract('guid', block);
    const id = parseTrackId(guid, link, block);
    items.push({ id, title, link, pubDate });
  }
  return items;
}

function writePostFile(item) {
  const { id, title, link, pubDate } = item;
  if (!id) return false;
  const filename = path.join(process.cwd(), '_posts', `soundcloud-${id}.md`);
  if (fs.existsSync(filename)) return false;
  const dateIso = new Date(pubDate).toISOString();
  const fm = [
    '---',
    `title: "${title}"`,
    `date: "${dateIso}"`,
    'type: music',
    'tags:',
    '  - music',
    `soundcloudUrl: "${link}"`,
    '---',
    '',
  ].join('\n');
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
  console.log(`SoundCloud sync complete. New files: ${created}`);
}

main().catch((e) => {
  console.error('SoundCloud sync failed:', e.message);
  process.exit(1);
});
