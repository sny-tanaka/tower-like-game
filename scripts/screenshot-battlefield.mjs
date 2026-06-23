/* eslint-disable */
// BattleField の各ストーリーをスクショして /tmp に出力
import pkg from 'playwright-core';
const { chromium } = pkg;
import { existsSync, readdirSync } from 'node:fs';

function findPreinstalledChromium() {
  // macOS では ~/Library/Caches/ms-playwright/ にダウンロードされる
  const candidates = [
    process.env.HOME + '/Library/Caches/ms-playwright',
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    '/opt/pw-browsers',
  ].filter(Boolean);
  for (const base of candidates) {
    if (!existsSync(base)) continue;
    for (const dir of readdirSync(base)) {
      const c1 = `${base}/${dir}/chrome-mac/Chromium.app/Contents/MacOS/Chromium`;
      const c2 = `${base}/${dir}/chrome-mac/headless_shell`;
      const c3 = `${base}/${dir}/chrome-linux/chrome`;
      const c4 = `${base}/${dir}/chrome-linux/headless_shell`;
      for (const c of [c1, c2, c3, c4]) if (existsSync(c)) return c;
    }
  }
  return null;
}

const executablePath = findPreinstalledChromium() ?? undefined;
console.log('chromium binary:', executablePath || '(default)');

const browser = await chromium.launch({ executablePath, headless: true });
const ctx = await browser.newContext({
  ignoreHTTPSErrors: true,
  viewport: { width: 480, height: 720 },
});
const page = await ctx.newPage();

const stories = [
  { id: 'organisms-battlefield--empty', name: 'empty' },
  { id: 'organisms-battlefield--ten-normals', name: 'ten-normals' },
  { id: 'organisms-battlefield--five-normals', name: 'five-normals' },
  { id: 'organisms-battlefield--elite-enemy', name: 'elite' },
  { id: 'organisms-battlefield--boss-enemy', name: 'boss' },
];

for (const s of stories) {
  const url = `http://localhost:6006/iframe.html?id=${s.id}&viewMode=story`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 500));
  const out = `/tmp/battlefield-${s.name}.png`;
  await page.screenshot({ path: out, fullPage: false });
  console.log('saved', out);
}

await browser.close();
