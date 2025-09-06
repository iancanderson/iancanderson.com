#!/usr/bin/env node
/*
  Sync latest YouTube videos into _posts/ as Markdown link entries.

  Requirements (env):
    - YOUTUBE_API_KEY (YouTube Data API v3 key)

  Usage:
    node scripts/sync-youtube.js

  Behavior:
    - Resolves the channel's uploads playlist
    - Fetches all videos
    - Writes one file per video: _posts/youtube-<videoId>.md
    - Skips files that already exist
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.YOUTUBE_API_KEY;
const ENV_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID; // optional override
// Hardcoded canonical channel ID for youtube.com/iancanderson
const CHANNEL_ID = 'UCvRvcLNML0QOOAah4HNXg8g';

if (!API_KEY) {
  console.error('Missing env YOUTUBE_API_KEY');
  process.exit(1);
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

async function getUploadsPlaylistId(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`;
  const json = await getJson(url);
  const item = json.items && json.items[0];
  if (!item) throw new Error('Channel not found or no contentDetails');
  return item.contentDetails.relatedPlaylists.uploads;
}

async function getAllPlaylistItems(playlistId) {
  let items = [];
  let pageToken = '';
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50${pageToken ? `&pageToken=${pageToken}` : ''}&key=${API_KEY}`;
    const json = await getJson(url);
    const batch = (json.items || []).map((it) => it.snippet).filter(Boolean);
    items = items.concat(batch);
    pageToken = json.nextPageToken || '';
  } while (pageToken);
  return items;
}

function writePostFile(snippet) {
  const videoId = snippet.resourceId && snippet.resourceId.videoId;
  if (!videoId) return false;
  const title = snippet.title || 'Untitled';
  const publishedAt = snippet.publishedAt || new Date().toISOString();
  const description = (snippet.description || '').replace(/\r\n/g, '\n');
  const slug = `youtube-${videoId}`;
  const filename = path.join(process.cwd(), '_posts', `${slug}.md`);
  if (fs.existsSync(filename)) {
    return false; // already exists
  }

  const fm = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: "${publishedAt}"`,
    `youtubeId: ${videoId}`,
    'videoDescription: |',
    ...description.split('\n').map((l) => '  ' + l),
    'type: video',
    '---',
    '',
  ].join('\n');

  fs.writeFileSync(filename, fm, 'utf8');
  return true;
}

async function main() {
  const postsDir = path.join(process.cwd(), '_posts');
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);
  const resolvedChannelId = ENV_CHANNEL_ID || CHANNEL_ID;
  const uploadsId = await getUploadsPlaylistId(resolvedChannelId);
  const items = await getAllPlaylistItems(uploadsId);
  let created = 0;
  for (const snip of items) {
    if (writePostFile(snip)) created += 1;
  }
  console.log(`YouTube sync complete. New files: ${created}`);
}

main().catch((e) => {
  console.error('YouTube sync failed:', e.message);
  process.exit(1);
});
