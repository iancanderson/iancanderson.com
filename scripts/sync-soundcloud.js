#!/usr/bin/env node
/*
  Sync latest SoundCloud tracks into _posts/ as Markdown entries.

  Usage:
    node scripts/sync-soundcloud.js

  Behavior:
    - Fetches RSS feed of SoundCloud tracks for the user
    - Writes one file per track: _posts/soundcloud-<id|slug>.md
    - Adds tag `music` and type `music`
    - Skips files that already exist

  Notes:
    - Uses public RSS at: https://soundcloud.com/<user>/tracks?format=rss
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const USERNAME = process.env.SOUNDCLOUD_USERNAME || 'iancanderson';
const USER_ID = process.env.SOUNDCLOUD_USER_ID; // optional: numeric user id

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
    let id = '';
    const guidId = (guid.match(/tracks:(\d+)/i) || [])[1];
    if (guidId) id = guidId;
    if (!id && link) {
      const slug = link.split('/').filter(Boolean).pop();
      id = slug || String(Date.now());
    }
    items.push({ id, title, link, pubDate });
  }
  return items;
}

function writePostFile(item) {
  const { id, title, link, pubDate } = item;
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

async function resolveUserId(username) {
  if (USER_ID) return USER_ID;
  const html = await get(`https://soundcloud.com/${username}`);
  // Try several patterns found in SoundCloud pages
  const patterns = [
    /soundcloud:users:(\d+)/i,
    /"user_id":\s*(\d+)/i,
    /data-user-id=\"(\d+)\"/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m && m[1]) return m[1];
  }
  throw new Error('Unable to determine SoundCloud user id');
}

async function main() {
  const postsDir = path.join(process.cwd(), '_posts');
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);
  const userId = await resolveUserId(USERNAME);
  const feedUrl = `https://feeds.soundcloud.com/users/soundcloud:users:${userId}/sounds.rss`;
  const rss = await get(feedUrl);
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
