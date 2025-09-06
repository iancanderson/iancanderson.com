#!/usr/bin/env node
// Add youtubeId to existing _posts/youtube-*.md files if missing
const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), '_posts');
const files = fs.readdirSync(postsDir).filter((f) => /^youtube-[^.]+\.md$/.test(f));
let updated = 0;

for (const file of files) {
  const full = path.join(postsDir, file);
  const raw = fs.readFileSync(full, 'utf8');
  const match = /^---[\s\S]*?---/.exec(raw);
  if (!match) continue;
  const header = match[0];
  if (/\nyoutubeId:\s*/.test(header)) {
    continue; // already has youtubeId
  }
  const id = file.replace(/^youtube-/, '').replace(/\.md$/, '');
  const insertBefore = /\ntype:\s*video\s*\n/;
  let newHeader;
  if (insertBefore.test(header)) {
    newHeader = header.replace(insertBefore, `\nyoutubeId: ${id}\n$&`);
  } else {
    newHeader = header.replace(/\n---\s*$/, `\nyoutubeId: ${id}\n---`);
  }
  const updatedContent = raw.replace(header, newHeader);
  fs.writeFileSync(full, updatedContent, 'utf8');
  updated += 1;
}

console.log(`Backfill complete. Files updated: ${updated}`);

