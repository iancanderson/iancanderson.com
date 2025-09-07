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
  const re = new RegExp(`<${tag}[^>]*>([\s\S]*?)<\/${tag}>`, 'i');
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
  const blocks = [];
  const itemRe = /<item\b[\s\S]*?<\/item>/gi;
  const entryRe = /<entry\b[\s\S]*?<\/entry>/gi;
  let m;
  while ((m = itemRe.exec(rss)) !== null) blocks.push(m[0]);
  while ((m = entryRe.exec(rss)) !== null) blocks.push(m[0]);
  console.log(`[soundcloud] Matched blocks: items=${rss.match(itemRe)?.length || 0} entries=${rss.match(entryRe)?.length || 0}`);

  for (const block of blocks) {
    const rawTitle = extract('title', block);
    const title = sanitizeTitle(stripCdata(rawTitle));

    // link: RSS <link>url</link> OR Atom <link href="url"/>
    let link = stripCdata(extract('link', block));
    if (!link) {
      const hrefMatch = block.match(/<link[^>]*?href=["']([^"']+)["'][^>]*\/>/i);
      if (hrefMatch) link = hrefMatch[1];
    }

    // date: RSS <pubDate> OR Atom <updated>
    const pubDate = extract('pubDate', block) || extract('updated', block) || new Date().toUTCString();

    const guid = extract('guid', block) || extract('id', block);
    let id = '';
    const guidId = (guid.match(/tracks:(\d+)/i) || [])[1];
    if (guidId) id = guidId;
    if (!id && link) {
      const parts = link.split('?')[0].split('/').filter(Boolean);
      const last = parts[parts.length - 1];
      id = last || '';
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
  console.log(`[soundcloud] Fetching RSS: ${feedUrl}`);
  let rss = await get(feedUrl);
  console.log(`[soundcloud] RSS length: ${rss.length}`);
  let items = parseItems(rss);
  console.log(`[soundcloud] Parsed items: ${items.length}`);
  if (items.length === 0) {
    // Fallback to legacy page RSS
    const legacy = `https://soundcloud.com/${USERNAME}/tracks?format=rss`;
    console.log(`[soundcloud] Falling back to: ${legacy}`);
    rss = await get(legacy);
    console.log(`[soundcloud] Legacy RSS length: ${rss.length}`);
    items = parseItems(rss);
    console.log(`[soundcloud] Parsed items (legacy): ${items.length}`);
  }
  let created = 0;
  for (const it of items) {
    if (!it.id) {
      console.log(`[soundcloud] Skip item with missing id: ${it.title}`);
      continue;
    }
    console.log(`[soundcloud] Track id=${it.id} title="${it.title}" link=${it.link}`);
    const wrote = writePostFile(it);
    if (wrote) {
      created += 1;
      console.log(`[soundcloud] Wrote _posts/soundcloud-${it.id}.md`);
    } else {
      console.log(`[soundcloud] Skipped existing _posts/soundcloud-${it.id}.md`);
    }
  }
  console.log(`SoundCloud sync complete. New files: ${created}`);
}

main().catch((e) => {
  console.error('SoundCloud sync failed:', e.message);
  process.exit(1);
});
