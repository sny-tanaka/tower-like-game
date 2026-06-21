// pwa-template の patch バージョンを 1 つ進めるスクリプト。
// 例: 0.1.0 → 0.1.1
//
// git コミットや tag は付けない（ビルド結果と一緒にユーザーがコミットする想定）。

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkgPath = resolve(here, '../package.json');

const raw = readFileSync(pkgPath, 'utf8');
const pkg = JSON.parse(raw);

const parts = String(pkg.version ?? '0.0.0').split('.').map(Number);
if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
  console.error(`[bump-patch-version] invalid version: ${pkg.version}`);
  process.exit(1);
}
const [major, minor, patch] = parts;
const next = `${major}.${minor}.${patch + 1}`;
pkg.version = next;

// 末尾改行を維持して書き戻す
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log(`[bump-patch-version] ${parts.join('.')} → ${next}`);
