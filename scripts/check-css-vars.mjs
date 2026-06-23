#!/usr/bin/env node
/**
 * src/**\/*.scss に書かれた `var(--xxx)` のうち、
 * src/styles/tokens.scss で定義されていない名前を使ってる箇所を検出して fail する。
 *
 * 使い道: 前回 `var(--spacing-md)` (実在しない) と書いてしまい、
 * SCSS は無視して padding が 0 になっていた事故の再発防止。
 *
 * 通常の CSS 仕様で `var()` は未定義名でも fallback を使うため、
 * lint 上は無効値として通ってしまう。手動で許可リスト方式でチェックする。
 *
 * 既知の例外:
 *   - safe-area-inset-*       env() 由来でブラウザ提供のため許可
 *   - 各 SCSS module 内の自己定義 (`--local-name: ...` 直後の var(--local-name))
 *     はファイル内検出で許可
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const TOKENS_PATH = join(ROOT, 'src/styles/tokens.scss');

const tokensSource = readFileSync(TOKENS_PATH, 'utf8');
// `--name:` の形を全て抽出
const defined = new Set([...tokensSource.matchAll(/--([a-zA-Z0-9_-]+)\s*:/g)].map((m) => m[1]));

// React inline style (`style={{ '--xxx': value }}`) から動的に渡される変数。
// SCSS では「定義されていない」が、ランタイムでは確実に値が入る。
const BLESSED = new Set([
  'tier-color', // TierSelectTab: tier 別のアクセント色
  'badge-color', // Badge: variant=tier の動的色
  'slider-fill-pct', // Slider: 進捗パーセント
  'start-scale', // WaveProgressBar: scaleX アニメ keyframes の開始倍率 (JSX が inline で渡す)
  'divider-color', // Divider: color prop を JSX inline style から渡す
]);

function listScssFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '__snapshots__') continue;
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) listScssFiles(p, acc);
    else if (entry.endsWith('.scss')) acc.push(p);
  }
  return acc;
}

const files = listScssFiles(join(ROOT, 'src'));
const errors = [];

/** SCSS の `// ...` と `/* ... *\/` を空白に置き換えてからスキャンする (コメント内の擬似 var() を無視) */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ');
}

for (const file of files) {
  const src = stripComments(readFileSync(file, 'utf8'));
  // ファイル内ローカル変数 (--xxx: ...)
  const local = new Set(
    [...src.matchAll(/--([a-zA-Z0-9_-]+)\s*:/g)].map((m) => m[1]),
  );
  // var(--xxx) のうち未定義のもの
  for (const m of src.matchAll(/var\(\s*--([a-zA-Z0-9_-]+)/g)) {
    const name = m[1];
    if (defined.has(name) || local.has(name) || BLESSED.has(name)) continue;
    // 行番号
    const idx = m.index ?? 0;
    const lineNo = src.slice(0, idx).split('\n').length;
    errors.push({ file: file.replace(ROOT + '/', ''), line: lineNo, name });
  }
}

if (errors.length === 0) {
  console.log(`OK  ${files.length} *.scss / ${defined.size} tokens — no unknown var() reference`);
  process.exit(0);
}

console.error(`FAIL  ${errors.length} unknown var(--xxx) reference(s):`);
for (const e of errors) {
  console.error(`  ${e.file}:${e.line}  var(--${e.name})`);
}
process.exit(1);
