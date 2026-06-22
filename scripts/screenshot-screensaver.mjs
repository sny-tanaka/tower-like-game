#!/usr/bin/env node
/* global document */
import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const ctx = await browser.newContext({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(
  'http://localhost:6006/iframe.html?id=organisms-screensaverdialog--default&viewMode=story',
  { waitUntil: 'domcontentloaded' },
);
try {
  await page.waitForFunction(
    () => (document.querySelector('#storybook-root')?.children.length ?? 0) > 0,
    null,
    { timeout: 8000 },
  );
} catch {
  /* ignore */
}
await page.waitForTimeout(1500);
await page.screenshot({ path: '/tmp/screensaver-sb.png', fullPage: true });
console.log('OK /tmp/screensaver-sb.png');
await browser.close();
