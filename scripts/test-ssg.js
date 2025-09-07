#!/usr/bin/env node
/*
  Simple SSG checks for the exported site under out/
  No external deps; uses string includes to validate pages exist and contain key content.
*/

const fs = require('fs');
const path = require('path');

function fail(msg) {
  console.error(`SSG TEST FAILURE: ${msg}`);
  process.exit(1);
}

function ok(msg) {
  console.log(`✓ ${msg}`);
}

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (e) {
    fail(`Missing file: ${file}`);
  }
}

function fileExists(file) {
  return fs.existsSync(file);
}

function findAnyPostSlug() {
  const postsDir = path.join(process.cwd(), '_posts');
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  if (files.length === 0) fail('No markdown posts found in _posts');
  // Prefer a stable YouTube post if present, else fall back to first
  const preferred = files.find((f) => f.startsWith('youtube-')) || files[0];
  return preferred.replace(/\.md$/, '');
}

function findAnyDate() {
  const postsDir = path.join(process.cwd(), '_posts');
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const m = content.match(/\n\s*date:\s*['\"]?([^'\"\n]+)['\"]?/i);
    if (!m) continue;
    const iso = m[1].trim();
    const d = new Date(iso);
    if (!isNaN(d)) {
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
      return key;
    }
  }
  fail('Could not extract a valid date from any post');
}

const OUT = path.join(process.cwd(), 'out');
if (!fileExists(OUT)) fail('No out/ directory. Did you run next export?');

// 1) Homepage
const home = read(path.join(OUT, 'index.html'));
if (!home.includes('iancanderson')) fail('Homepage missing site heading');
if (!home.includes('Timeline')) fail('Homepage missing Timeline section title');
ok('Homepage renders with heading and timeline title');

// 2) Tag page (music)
const tagPath = path.join(OUT, 'tags', 'music', 'index.html');
const tagHtml = read(tagPath);
if (!tagHtml.includes('#music')) fail('Tag page missing #music chip');
ok('Music tag page exists and contains #music');

// 3) Day page (pick any date from posts)
const dayKey = findAnyDate();
const dayHtml = read(path.join(OUT, 'day', dayKey, 'index.html'));
if (!dayHtml.includes(`on ${dayKey}`)) fail('Day page missing date text');
if (!dayHtml.includes('Timeline')) fail('Day page missing Timeline');
ok(`Day page for ${dayKey} exists and shows timeline`);

// 4) Post page (pick any slug)
const slug = findAnyPostSlug();
const postHtml = read(path.join(OUT, 'posts', slug, 'index.html'));
if (!postHtml.includes('<title>') || !postHtml.includes('iancanderson')) fail('Post page missing <title> or brand');
ok(`Post page for ${slug} exists with a title`);

console.log('All SSG checks passed.');

