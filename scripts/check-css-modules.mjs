#!/usr/bin/env node
/**
 * src/**\/*.{ts,tsx} で `import styles from './foo.module.scss'` した CSS Module を
 * `styles.xxx` / `styles['xxx']` / `styles[`prefix-${x}`]` で参照しているとき、
 * 参照先クラスが SCSS 側に存在するかをチェックする。
 *
 * 使い道: SCSS にクラスを定義し忘れて (またはリネーム漏れで) tsx 側だけ
 * `styles.header` が残り、CSS Module は undefined を返してスタイルが当たらない事故の検出。
 *
 * 検出ルール:
 *   - 静的アクセス `styles.foo` / `styles["foo"]` / `styles['foo']` / `styles[`foo`]`
 *     → 完全一致でクラスが存在しなければ fail
 *   - テンプレリテラル `styles[`prefix-${x}`]` (静的前置 + 1 個の ${} の単純形)
 *     → 同じ prefix で始まるクラスが 1 つでも SCSS にあれば OK、なければ fail
 *   - それ以外の動的アクセス (`styles[someVar]` 等) は判定不能なので無視
 *
 * 仮定 (このリポジトリのコード慣習に基づく):
 *   - import は常に default import (`import styles from '...'`)
 *   - SCSS 内に `#{}` 補間や `@each` でクラス名を動的生成する箇所は無い
 *   - BEM の `&__bar` ネストも使っていない (=トップレベルの `.name` のみ)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SRC = join(ROOT, 'src');

/** ts/tsx を再帰列挙 (node_modules, snapshots は除外) */
function listSourceFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '__snapshots__') continue;
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) listSourceFiles(p, acc);
    else if (/\.(tsx?|jsx?)$/.test(entry)) acc.push(p);
  }
  return acc;
}

/** `/* *\/` と `// ...` を空白に置換 (誤検出回避) */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ');
}

/** SCSS ソースから定義済みクラス名 Set を抽出 */
function parseScssClasses(scssPath) {
  const src = stripComments(readFileSync(scssPath, 'utf8'));
  const classes = new Set();
  for (const m of src.matchAll(/\.([a-zA-Z_][\w-]*)/g)) {
    classes.add(m[1]);
  }
  return classes;
}

const files = listSourceFiles(SRC);
const errors = [];
let scannedTsx = 0;
let scannedScss = 0;
const scssCache = new Map();

function loadScss(path) {
  if (!scssCache.has(path)) {
    scssCache.set(path, parseScssClasses(path));
    scannedScss++;
  }
  return scssCache.get(path);
}

for (const file of files) {
  const rawSrc = readFileSync(file, 'utf8');
  const src = stripComments(rawSrc);

  // import <alias> from '...module.scss'
  const imports = [...src.matchAll(
    /import\s+(\w+)\s+from\s+['"]([^'"]+\.module\.(?:scss|css))['"]/g,
  )];
  if (imports.length === 0) continue;
  scannedTsx++;

  for (const imp of imports) {
    const alias = imp[1];
    const spec = imp[2];
    if (!spec.startsWith('.')) continue; // 相対パス以外は対象外
    const scssPath = resolve(dirname(file), spec);
    let classes;
    try {
      classes = loadScss(scssPath);
    } catch (e) {
      errors.push({
        file: file.replace(ROOT + '/', ''),
        line: src.slice(0, imp.index ?? 0).split('\n').length,
        msg: `cannot read ${spec}: ${e.message}`,
      });
      continue;
    }

    // 1) 静的: alias.foo
    const dotRe = new RegExp(`\\b${alias}\\s*\\.([a-zA-Z_][\\w]*)`, 'g');
    for (const m of src.matchAll(dotRe)) {
      const name = m[1];
      if (classes.has(name)) continue;
      const idx = m.index ?? 0;
      errors.push({
        file: file.replace(ROOT + '/', ''),
        line: src.slice(0, idx).split('\n').length,
        msg: `${alias}.${name} は ${spec} に未定義`,
      });
    }

    // 2) 静的: alias['foo'] / alias["foo"] / alias[`foo`] (${} 無し)
    const staticBracketRe = new RegExp(
      `\\b${alias}\\s*\\[\\s*(['"\`])([\\w-]+)\\1\\s*\\]`,
      'g',
    );
    for (const m of src.matchAll(staticBracketRe)) {
      const name = m[2];
      if (classes.has(name)) continue;
      const idx = m.index ?? 0;
      errors.push({
        file: file.replace(ROOT + '/', ''),
        line: src.slice(0, idx).split('\n').length,
        msg: `${alias}['${name}'] は ${spec} に未定義`,
      });
    }

    // 3) テンプレリテラル: alias[`prefix-${...}`] (単純形のみ)
    //    キャプチャ: [1]=prefix, [2]=${expr}, [3]=suffix
    const templateRe = new RegExp(
      `\\b${alias}\\s*\\[\\s*\`([^\`$]*?)\\$\\{[^}]+\\}([^\`$]*)\`\\s*\\]`,
      'g',
    );
    for (const m of src.matchAll(templateRe)) {
      const prefix = m[1];
      const suffix = m[2];
      // 接頭辞 (suffix) どちらも空なら判定不能 → スキップ
      if (!prefix && !suffix) continue;
      // 接頭辞だけ持つよくあるパターン: `size-${x}` → /^size-/ にマッチするクラスが必要
      // 接尾辞も持つパターン: `${x}-active` → /-active$/ にマッチするクラスが必要
      const hit = [...classes].some((c) => {
        if (prefix && !c.startsWith(prefix)) return false;
        if (suffix && !c.endsWith(suffix)) return false;
        // prefix と suffix を除いた中央部分が 1 文字以上必要
        const inner = c.slice(prefix.length, suffix ? -suffix.length : undefined);
        return inner.length > 0;
      });
      if (hit) continue;
      const idx = m.index ?? 0;
      errors.push({
        file: file.replace(ROOT + '/', ''),
        line: src.slice(0, idx).split('\n').length,
        msg: `${alias}[\`${prefix}\${...}${suffix}\`] にマッチするクラスが ${spec} に無い`,
      });
    }
  }
}

if (errors.length === 0) {
  console.log(
    `OK  ${scannedTsx} *.tsx / ${scannedScss} *.module.scss — no unknown CSS Module reference`,
  );
  process.exit(0);
}

console.error(`FAIL  ${errors.length} unknown CSS Module reference(s):`);
for (const e of errors) {
  console.error(`  ${e.file}:${e.line}  ${e.msg}`);
}
process.exit(1);
