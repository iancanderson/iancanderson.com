#!/usr/bin/env node
/*
  Populate videoDescription for existing video posts using YouTube Data API v3.
  Requires env YOUTUBE_API_KEY. Uses the `videos` endpoint in batches of 50.
*/
const fs = require('fs');
const path = require('path');
const https = require('https');
const matter = require('gray-matter');

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error('Missing env YOUTUBE_API_KEY');
  process.exit(1);
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function fetchDescriptions(ids) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids.join(',')}&key=${API_KEY}`;
  const json = await getJson(url);
  const map = new Map();
  for (const item of json.items || []) {
    const id = item.id;
    const desc = (item.snippet && item.snippet.description) || '';
    map.set(id, desc);
  }
  return map;
}

async function main() {
  const dir = path.join(process.cwd(), '_posts');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const targets = [];
  for (const f of files) {
    const full = path.join(dir, f);
    const raw = fs.readFileSync(full, 'utf8');
    const parsed = matter(raw);
    if (parsed.data && parsed.data.type === 'video' && !parsed.data.videoDescription) {
      const id = parsed.data.youtubeId || f.replace(/^youtube-/, '').replace(/\.md$/, '');
      if (id) targets.push({ file: full, id, parsed });
    }
  }
  if (targets.length === 0) {
    console.log('No video posts missing descriptions.');
    return;
  }
  let updated = 0;
  for (let i = 0; i < targets.length; i += 50) {
    const batch = targets.slice(i, i + 50);
    const ids = batch.map((t) => t.id);
    const map = await fetchDescriptions(ids);
    for (const t of batch) {
      const desc = map.get(t.id);
      if (typeof desc === 'string') {
        t.parsed.data.videoDescription = desc;
        const out = matter.stringify(t.parsed.content, t.parsed.data);
        fs.writeFileSync(t.file, out, 'utf8');
        updated += 1;
      }
    }
  }
  console.log(`Updated ${updated} video posts with descriptions.`);
}

main().catch((e) => { console.error('Backfill failed:', e); process.exit(1); });

