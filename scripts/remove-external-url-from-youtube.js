#!/usr/bin/env node
// Remove externalUrl from video posts (prefer youtubeId + internal page)
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(process.cwd(), '_posts');
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
let updated = 0;

for (const file of files) {
  const full = path.join(postsDir, file);
  const raw = fs.readFileSync(full, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data || {};
  const isYouTube = data.type === 'video' && (data.youtubeId || file.startsWith('youtube-'));
  if (isYouTube && typeof data.externalUrl === 'string') {
    delete data.externalUrl;
    const out = matter.stringify(parsed.content, data);
    fs.writeFileSync(full, out, 'utf8');
    updated += 1;
  }
}

console.log(`Removed externalUrl from ${updated} video posts.`);

