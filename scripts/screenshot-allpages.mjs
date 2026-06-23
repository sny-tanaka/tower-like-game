#!/usr/bin/env node
/**
 * 全 Page を claude design ref と Storybook の両方で撮影し、
 * /tmp/pcmp/<page>/{design,sb}.png に並べて保存する。
 * 続けて side-by-side 比較画像 /tmp/pcmp/<page>/sxs.png も生成。
 *
 *   Storybook : http://localhost:6006/iframe.html?id=pages-<page>--<story>&viewMode=story
 *   Design ref: http://localhost:8765/pages/<Name>/<Name>.html
 *
 * 412 x 900 / DPR 2 (claude design @dsCard と同一スケール) で撮影。
 */
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const CHROME =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const PAGES = [
  { slug: 'title',       sb: 'pages-title--with-save',          ref: 'TitleScreen'       },
  { slug: 'title-nosave',sb: 'pages-title--no-save',            ref: 'TitleScreen'       },
  { slug: 'preparation', sb: 'pages-preparation--default',      ref: 'PreparationScreen' },
  { slug: 'battle',      sb: 'pages-battle--default',           ref: 'BattleScreen'      },
  { slug: 'machine',     sb: 'pages-machine--default',          ref: 'MachineScreen'     },
  { slug: 'armory-det',  sb: 'pages-armoryscreen--details',     ref: 'ArmoryScreen'      },
  { slug: 'armory-upg',  sb: 'pages-armoryscreen--upgrade',     ref: 'ArmoryScreen'      },
  { slug: 'patches',     sb: 'pages-patchscreen--default',      ref: 'PatchScreen'       },
  { slug: 'settings',    sb: 'pages-settingsscreen--default',   ref: 'SettingsScreen'    },
  { slug: 'home',        sb: 'pages-home--default',             ref: null                },
];

const VW = 412;
const VH = 900;

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });

for (const p of PAGES) {
  const outDir = `/tmp/pcmp/${p.slug}`;
  mkdirSync(outDir, { recursive: true });

  const sbUrl = `http://localhost:6006/iframe.html?id=${p.sb}&viewMode=story`;
  const refUrl = p.ref ? `http://localhost:8765/pages/${p.ref}/${p.ref}.html` : null;

  for (const [name, url, sel] of [
    ['sb',     sbUrl,  '#storybook-root'],
    ['design', refUrl, '#root *'],
  ]) {
    if (!url) continue;
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForSelector(sel, { timeout: 5000 });
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: false });
      console.log(`OK  ${p.slug}/${name}`);
    } catch (e) {
      console.log(`ERR ${p.slug}/${name}: ${e.message.split('\n')[0]}`);
    } finally {
      await page.close();
    }
  }

  // side-by-side HTML を一時生成 → 撮影
  const sxsHtml = `<!doctype html><html><body style="margin:0;padding:0;background:#04060d;display:flex;gap:4px">
    <div><div style="color:#a7b8d8;font:11px system-ui;padding:2px 6px">claude design ref</div>
      ${refUrl ? `<img src="${outDir}/design.png" style="width:${VW}px;display:block;border:1px solid #1f2a44" />` : '<div style="width:412px;height:900px;background:#0a0f1c;color:#6b7d9e;display:flex;align-items:center;justify-content:center">no design ref</div>'}
    </div>
    <div><div style="color:#4ee4f6;font:11px system-ui;padding:2px 6px">Storybook (${p.sb})</div>
      <img src="${outDir}/sb.png" style="width:${VW}px;display:block;border:1px solid #1f2a44" />
    </div></body></html>`;
  writeFileSync(`${outDir}/sxs.html`, sxsHtml);
  const sxsPage = await ctx.newPage();
  await sxsPage.setViewportSize({ width: VW * 2 + 20, height: VH + 40 });
  await sxsPage.goto(`file://${outDir}/sxs.html`, { waitUntil: 'load' });
  await sxsPage.waitForTimeout(400);
  await sxsPage.screenshot({ path: `${outDir}/sxs.png`, fullPage: true });
  await sxsPage.close();
}

await browser.close();
console.log('done');
