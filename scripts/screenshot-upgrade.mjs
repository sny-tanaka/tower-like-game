/* eslint-disable */
import pkg from 'playwright-core';
const { chromium } = pkg;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 412, height: 800 } });
const page = await ctx.newPage();
const stories = [
  'molecules-upgradecard--run-all-disabled',
  'molecules-upgradecard--machine-hp-bolt',
  'molecules-upgradecard--maxed',
  'molecules-upgradecard--grid-two-col',
];
for (const id of stories) {
  await page.goto(`http://localhost:6006/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 500));
  const name = id.replace('molecules-upgradecard--', 'uc-');
  await page.screenshot({ path: `/tmp/${name}.png` });
  console.log('saved', name);
}
await browser.close();
