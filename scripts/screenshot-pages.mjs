/* eslint-disable */
// 各 Page を Storybook と dev server の両方でスクショして /tmp に出力
import pkg from 'playwright-core';
const { chromium } = pkg;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  ignoreHTTPSErrors: true,
  viewport: { width: 412, height: 900 }, // モバイル想定
});
const page = await ctx.newPage();

// Storybook の Page ストーリー
const storybookPages = [
  { id: 'pages-title--no-save', name: 'pg-title-nosave' },
  { id: 'pages-title--with-save', name: 'pg-title-withsave' },
  { id: 'pages-preparation--default', name: 'pg-preparation' },
  { id: 'pages-machine--default', name: 'pg-machine' },
  { id: 'pages-armoryscreen--details', name: 'pg-armory-details' },
  { id: 'pages-armoryscreen--upgrade', name: 'pg-armory-upgrade' },
  { id: 'pages-patchscreen--default', name: 'pg-patches' },
  { id: 'pages-settingsscreen--default', name: 'pg-settings' },
  { id: 'pages-battle--default', name: 'pg-battle' },
];

for (const s of storybookPages) {
  const url = `http://localhost:6006/iframe.html?id=${s.id}&viewMode=story`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: `/tmp/${s.name}.png`, fullPage: false });
    console.log('saved', `/tmp/${s.name}.png`);
  } catch (e) {
    console.log('FAIL', s.id, e.message.split('\n')[0]);
  }
}

// dev server (実アプリ) で TitleScreen を撮影
try {
  await page.goto('http://localhost:5173/tower-like-game/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: '/tmp/devapp-title.png', fullPage: false });
  console.log('saved /tmp/devapp-title.png');
} catch (e) {
  console.log('FAIL dev app', e.message.split('\n')[0]);
}

await browser.close();
