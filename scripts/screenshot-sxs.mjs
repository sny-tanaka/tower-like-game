#!/usr/bin/env node
import { chromium } from 'playwright-core';
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const ctx = await browser.newContext({ viewport: { width: 900, height: 2400 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto('file:///tmp/cmp-sxs.html', { waitUntil: 'networkidle' });
await page.screenshot({ path: '/tmp/cmp-sxs.png', fullPage: true });
console.log('OK /tmp/cmp-sxs.png');
await browser.close();
