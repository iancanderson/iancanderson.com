#!/usr/bin/env node
// Tag remaining posts using broad categories: investing, music, video, software
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(process.cwd(), '_posts');
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

function uniq(arr) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function classify(file, data) {
  const tags = Array.isArray(data.tags) ? [...data.tags] : [];

  // Videos
  if (data.type === 'video') {
    tags.push('video');
    const title = String(data.title || '').toLowerCase();
    const isGameDev = /(xna|unity|unreal|game|suite game)/.test(title);
    if (!isGameDev && !tags.includes('music')) tags.push('music');
    if (isGameDev) tags.push('software');
    return uniq(tags);
  }

  const hay = `${file} ${data.title || ''} ${(data.externalUrl || '')}`.toLowerCase();
  const investingKeywords = [
    'invest',
    'portfolio',
    'portfolios',
    'risk',
    'parity',
    'hedge',
    // 'fund' removed to avoid matching 'fundamentals'
    'finance',
    'stock',
    'bond',
    'etf',
  ];
  if (investingKeywords.some((k) => hay.includes(k))) {
    tags.push('investing');
  }

  // Default non-video content to software if no other tag added
  if (!tags.includes('investing')) {
    tags.push('software');
  }

  return uniq(tags);
}

let updated = 0;
for (const file of files) {
  const full = path.join(postsDir, file);
  const raw = fs.readFileSync(full, 'utf8');
  const parsed = matter(raw);
  const before = Array.isArray(parsed.data.tags) ? parsed.data.tags.slice().sort() : [];
  const after = classify(file, parsed.data).sort();
  const changed = JSON.stringify(before) !== JSON.stringify(after);
  if (changed) {
    parsed.data.tags = after;
    const out = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(full, out, 'utf8');
    updated += 1;
  }
}

console.log(`Tagged ${updated} posts.`);
