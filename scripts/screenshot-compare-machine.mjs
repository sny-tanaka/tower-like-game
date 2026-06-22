#!/usr/bin/env node
/**
 * Storybook の MachineScreen Default story と claude design ref を
 * 同一 viewport (412x900) でスクショして /tmp/cmp-*.png に保存する。
 *
 *   Storybook : http://localhost:6006/iframe.html?id=pages-machine--default&viewMode=story
 *   Design ref: http://localhost:8765/pages/MachineScreen/MachineScreen.html
 *                  /organisms/MachineUpgradeList/MachineUpgradeList.html
 */
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';

const CHROME =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const TARGETS = [
  {
    name: 'storybook-machine-default',
    url: 'http://localhost:6006/iframe.html?id=pages-machine--default&viewMode=story',
    waitSelector: '#storybook-root',
  },
  {
    name: 'storybook-upgradecard-grid',
    url: 'http://localhost:6006/iframe.html?id=molecules-upgradecard--grid-two-col&viewMode=story',
    waitSelector: '#storybook-root',
  },
  {
    name: 'storybook-upgradecard-maxlen',
    url: 'http://localhost:6006/iframe.html?id=molecules-upgradecard--max-length-stress&viewMode=story',
    waitSelector: '#storybook-root',
  },
  {
    name: 'design-machinescreen',
    url: 'http://localhost:8765/pages/MachineScreen/MachineScreen.html',
    waitSelector: '#root *',
  },
  {
    name: 'design-machine-upgrade-list',
    url: 'http://localhost:8765/organisms/MachineUpgradeList/MachineUpgradeList.html',
    waitSelector: '#root *',
  },
  {
    name: 'design-upgradecard-mix',
    url: 'http://localhost:8765/molecules/UpgradeCard/UpgradeCard-mix.html',
    waitSelector: '#root *',
  },
];

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const ctx = await browser.newContext({
  viewport: { width: 412, height: 900 },
  deviceScaleFactor: 2,
});

for (const t of TARGETS) {
  const page = await ctx.newPage();
  try {
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForSelector(t.waitSelector, { timeout: 5000 });
    await page.waitForTimeout(800);
    const out = `/tmp/cmp-${t.name}.png`;
    await page.screenshot({ path: out, fullPage: false });
    console.log(`OK  ${t.name} -> ${out}`);
  } catch (e) {
    if (t.optional) {
      console.log(`SKIP ${t.name} (${e.message.split('\n')[0]})`);
    } else {
      console.log(`ERR ${t.name}: ${e.message.split('\n')[0]}`);
    }
  } finally {
    await page.close();
  }
}

await browser.close();
execSync('ls -la /tmp/cmp-*.png', { stdio: 'inherit' });
