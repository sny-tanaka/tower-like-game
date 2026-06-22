/* eslint-disable */
// Wave C で実装した Organism の主要ストーリーをスクショして /tmp に出力
import pkg from 'playwright-core';
const { chromium } = pkg;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  ignoreHTTPSErrors: true,
  viewport: { width: 480, height: 800 },
});
const page = await ctx.newPage();

const stories = [
  // Wave C
  { id: 'organisms-battlehudtop--default', name: 'wc-battlehudtop' },
  { id: 'organisms-battlehudbottom--default', name: 'wc-battlehudbottom' },
  { id: 'organisms-runworkshopbottomsheet--default', name: 'wc-runworkshop-default' },
  { id: 'organisms-runworkshopbottomsheet--rich-screw', name: 'wc-runworkshop-rich' },
  { id: 'organisms-battlemenuoverlay--default', name: 'wc-battlemenu' },
  { id: 'organisms-resultdialog--clear', name: 'wc-result-clear' },
  { id: 'organisms-resultdialog--gameover', name: 'wc-result-gameover' },
  { id: 'organisms-resultdialog--retreat', name: 'wc-result-retreat' },
  { id: 'organisms-screensaverdialog--default', name: 'wc-screensaver' },
  // Wave B (タイトル変更含め見直し)
  { id: 'organisms-titleheader--full', name: 'wb-titleheader' },
  { id: 'organisms-titleactions--with-save', name: 'wb-titleactions-with-save' },
  { id: 'organisms-tierselecttab--default', name: 'wb-tierselect' },
  { id: 'organisms-machineupgradelist--default', name: 'wb-machineupgrade' },
  { id: 'organisms-weapondetailstab--level-10', name: 'wb-weapondetails' },
  { id: 'organisms-soundsettingstab--default', name: 'wb-soundsettings' },
];

for (const s of stories) {
  const url = `http://localhost:6006/iframe.html?id=${s.id}&viewMode=story`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 500));
    const out = `/tmp/${s.name}.png`;
    await page.screenshot({ path: out, fullPage: false });
    console.log('saved', out);
  } catch (e) {
    console.log('FAIL', s.id, e.message);
  }
}

await browser.close();
