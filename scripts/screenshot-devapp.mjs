/* eslint-disable */
// dev server で各画面を navigate して fullPage スクショ
// 「画面全体スクロール」のバグ確認用
import pkg from 'playwright-core';
const { chromium } = pkg;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  ignoreHTTPSErrors: true,
  viewport: { width: 412, height: 900 },
});
const page = await ctx.newPage();

const BASE = 'http://localhost:5173/tower-like-game/';

// タイトル画面まず開く
await page.goto(BASE, { waitUntil: 'networkidle', timeout: 15000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: '/tmp/dev-title.png' });
console.log('saved /tmp/dev-title.png');

// 「新規開始」ボタンをタップ → PreparationScreen
const newGameBtn = await page.getByRole('button', { name: '新規開始' });
if (await newGameBtn.count()) {
  await newGameBtn.first().click();
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: '/tmp/dev-preparation.png' });
  console.log('saved /tmp/dev-preparation.png');
}

// BottomNav の「マシン」をタップ
const machineNav = await page.getByText(/^マシン$/);
if (await machineNav.count()) {
  await machineNav.first().click();
  await new Promise((r) => setTimeout(r, 600));
  // viewport クリップ + fullPage の両方撮る
  await page.screenshot({ path: '/tmp/dev-machine-viewport.png' });
  await page.screenshot({ path: '/tmp/dev-machine-fullpage.png', fullPage: true });
  console.log('saved /tmp/dev-machine-viewport.png');
  console.log('saved /tmp/dev-machine-fullpage.png');

  // body / shell の scrollHeight を測定して、ウィンドウ高さに対する比率を出力
  const scrollInfo = await page.evaluate(() => ({
    bodyScrollHeight: document.body.scrollHeight,
    htmlScrollHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
    bodyOverflow: window.getComputedStyle(document.body).overflow,
    htmlOverflow: window.getComputedStyle(document.documentElement).overflow,
  }));
  console.log('scroll measurements:', JSON.stringify(scrollInfo, null, 2));
}

// 武器庫
const armoryNav = await page.getByText(/^武器庫$/);
if (await armoryNav.count()) {
  await armoryNav.first().click();
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: '/tmp/dev-armory.png' });
  console.log('saved /tmp/dev-armory.png');
}

// パッチ
const patchNav = await page.getByText(/^パッチ$/);
if (await patchNav.count()) {
  await patchNav.first().click();
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: '/tmp/dev-patches.png' });
  console.log('saved /tmp/dev-patches.png');
}

// 設定
const settingsNav = await page.getByText(/^設定$/);
if (await settingsNav.count()) {
  await settingsNav.first().click();
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: '/tmp/dev-settings.png' });
  console.log('saved /tmp/dev-settings.png');
}

await browser.close();
