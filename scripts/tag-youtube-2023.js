#!/usr/bin/env node
// Tag all YouTube posts from 2023 with 'katies-40th' and 'music'
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(process.cwd(), '_posts');

const TAGS_TO_ADD = ['katies-40th', 'music'];

function isYouTubePost(data) {
  return data && data.type === 'video' && /^2023/.test(String(data.date));
}

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
let updated = 0;

for (const file of files) {
  const full = path.join(postsDir, file);
  const raw = fs.readFileSync(full, 'utf8');
  const parsed = matter(raw);
  if (isYouTubePost(parsed.data)) {
    const current = Array.isArray(parsed.data.tags) ? parsed.data.tags : [];
    const next = Array.from(new Set([...current, ...TAGS_TO_ADD]));
    parsed.data.tags = next;
    const out = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(full, out, 'utf8');
    updated += 1;
  }
}

console.log(`Tagged ${updated} posts with: ${TAGS_TO_ADD.join(', ')}`);

