#!/usr/bin/env node
const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const { buildEmailHtml } = require('../lib/email');

const RSS_URL = 'https://kumar-ayush.com/feed.xml';
const SITE_URL = 'https://kumar-ayush.com';
const UNSUB_URL = 'https://kumar-ayush.com/api/unsubscribe?token=preview';

async function main() {
  const parser = new Parser({ customFields: { item: [['content:encoded', 'content']] } });
  const feed = await parser.parseURL(RSS_URL);
  const item = feed.items[0];

  console.log(`Previewing: "${item.title}"`);
  console.log('Available fields:', Object.keys(item));
  console.log(`content length: ${(item.content || '').length}`);
  console.log(`contentSnippet length: ${(item.contentSnippet || '').length}`);
  console.log(`content:encoded length: ${(item['content:encoded'] || '').length}`);

  const html = buildEmailHtml(item, SITE_URL, UNSUB_URL);
  const outPath = path.join(__dirname, '..', 'email-preview.html');
  fs.writeFileSync(outPath, html);
  console.log(`Saved to: ${outPath}`);
}

main().catch(console.error);
