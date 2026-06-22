#!/usr/bin/env node
/* global document */
/**
 * 14 Atom を claude design ref と Storybook autodocs の両方で撮影し、
 * /tmp/acmp/<Name>/{design,sb}.png として保存する。
 *
 *   Storybook (docs view): http://localhost:6006/iframe.html?id=atoms-<name>--docs&viewMode=docs
 *   Design ref:            http://localhost:8765/atoms/<Name>/<Name>.html
 *
 * 各 Atom は variant 一覧を持つ HTML / autodocs page なので、
 * フルページ (scroll した中身全部) で撮る。
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const CHROME =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const ATOMS = [
  { name: 'Badge',            story: 'atoms-badge--showcase' },
  { name: 'Button',           story: 'atoms-button--showcase' },
  { name: 'Card',             story: 'atoms-card--showcase' },
  { name: 'CircularProgress', story: 'atoms-circularprogress--all-colors' },
  { name: 'CurrencyAmount',   story: 'atoms-currencyamount--full-showcase' },
  { name: 'Icon',             story: 'atoms-icon--all-icons-by-category' },
  { name: 'IconButton',       story: 'atoms-iconbutton--showcase' },
  { name: 'NumericDisplay',   story: 'atoms-numericdisplay--showcase' },
  { name: 'Overlay',          story: 'atoms-overlay--showcase' },
  { name: 'ProgressBar',      story: 'atoms-progressbar--color-showcase' },
  { name: 'Sheet',            story: 'atoms-sheet--showcase-all' },
  { name: 'Tab',              story: 'atoms-tab--badge-showcase' },
  { name: 'Text',             story: 'atoms-text--showcase' },
  { name: 'Toggle',           story: 'atoms-toggle--showcase' },
];

const VW = 800;
const VH = 900;

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });

for (const { name: A, story } of ATOMS) {
  const outDir = `/tmp/acmp/${A}`;
  mkdirSync(outDir, { recursive: true });

  const sbUrl  = `http://localhost:6006/iframe.html?id=${story}&viewMode=story`;
  const refUrl = `http://localhost:8765/atoms/${A}/${A}.html`;

  for (const [name, url, sel] of [
    ['sb',     sbUrl,  '#storybook-root'],
    ['design', refUrl, '#root *'],
  ]) {
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      try {
        // 描画完了待ち（失敗しても撮影は試みる）
        await page.waitForFunction(
          (s) => {
            const root = document.querySelector(s);
            return root && root.children.length > 0;
          },
          sel,
          { timeout: 8000 },
        );
      } catch {
        /* ignore - fall through to screenshot anyway */
      }
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
      console.log(`OK  ${A}/${name}`);
    } catch (e) {
      console.log(`ERR ${A}/${name}: ${e.message.split('\n')[0]}`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
console.log('done');
