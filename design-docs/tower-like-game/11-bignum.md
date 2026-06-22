# 11. BigNum 内部仕様（無限桁数値管理）

本作は **動的 Tier (Tier 1 → ∞)** で敵 HP・ATK・通貨・コストが指数的に成長する。
JavaScript の `Number` 型は IEEE 754 倍精度のため、`Number.MAX_SAFE_INTEGER ≈ 9 × 10^15` を超えると整数精度が崩れ、`Number.MAX_VALUE ≈ 1.8 × 10^308` を超えると `Infinity` になる。

これに対処するため、**3 桁ブロック配列ベースの BigNum クラス**を採用し、インフレ対象の数値は精度劣化なく無限スケールで保持する。

## 設計思想

- **3 桁ブロック単位の配列で整数を保持**: `digits[0]` が最下位 3 桁、`digits[length-1]` が最上位
- **各ブロックは 0〜999 の整数**: Number で常に精密、ブロック単位の演算は劣化なし
- **3 桁単位 = アルファベット表記単位**: `toDisplay()` の実装が自然
- **小数倍率は分数経由で精密**: `× 1.02` を `× 102 / 100` に分解、配列 × 整数 / 配列 ÷ 整数 はどちらも精密

### Number と BigNum の使い分け

| 種類 | 型 | 例 |
|---|---|---|
| **インフレ対象（精度必須）** | `BigNum` | HP / ATK / 通貨 / コスト / ダメージ計算結果 |
| **倍率・確率・補正値** | `number` | 攻撃力倍率 1.02 / クリ率 0.5 / α=0.01 / 索敵距離（漸近形） |
| **座標・角度・時間** | `number` | px 座標 / radian / 秒 |

## データ構造

### 配列表現

```
1,500,000  → [0, 500, 1]     // [最下位 3 桁, 次の 3 桁, 最上位 3 桁]
999        → [999]
1,000,000  → [0, 0, 1]
0          → []              // 空配列で 0 を表現（または [0]、正規化で空に統一）
```

### TypeScript 型

```ts
type BigNumJSON = number[];   // セーブ用、各要素 0〜999

class BigNum {
  // 不変な内部配列。各要素は 0 〜 999。
  // 末尾の 0 ブロックは正規化で trim 済み（length === 0 が 0 を意味）。
  private readonly digits: readonly number[];

  private constructor(digits: readonly number[]) {
    this.digits = digits;
  }
  // ファクトリ・演算・比較・表示・シリアライズ は後述
}
```

### 正規化ルール

すべてのファクトリと演算結果は、必ず以下を満たすよう正規化する。

1. **各ブロックは 0 〜 999 の整数**
2. **末尾（最上位側）の 0 ブロックは除去**: `[0, 500, 0]` ではなく `[0, 500]`
3. **0 の表現は空配列**: `[]` または `[0]` から末尾 trim で `[]` に統一

正規化関数:

```ts
function normalize(digits: number[]): number[] {
  // 1. 各ブロックを 0 〜 999 にする（繰り上げ処理）
  let carry = 0;
  for (let i = 0; i < digits.length; i++) {
    const v = Math.floor(digits[i] + carry);
    digits[i] = v % 1000;
    carry = Math.floor(v / 1000);
  }
  while (carry > 0) {
    digits.push(carry % 1000);
    carry = Math.floor(carry / 1000);
  }
  // 2. 末尾の 0 ブロックを除去
  while (digits.length > 0 && digits[digits.length - 1] === 0) {
    digits.pop();
  }
  return digits;
}
```

## API

### ファクトリ

```ts
static zero(): BigNum;                         // []
static one(): BigNum;                          // [1]
static fromNumber(n: number): BigNum;          // n >= 0 限定、n < Number.MAX_SAFE_INTEGER 推奨
static fromDigits(digits: number[]): BigNum;   // 内部 raw 配列から（正規化される）
static fromJSON(arr: BigNumJSON): BigNum;
```

### 整数演算（精密）

```ts
add(other: BigNum): BigNum;
sub(other: BigNum): BigNum;          // 結果が負なら zero クランプ
mul(other: BigNum): BigNum;          // 配列同士、O(n²)
mulInt(n: number): BigNum;           // 配列 × 整数（n は Number.MAX_SAFE_INTEGER 未満）、O(n)
divInt(n: number): BigNum;           // 配列 ÷ 整数（n > 0）、O(n)、結果は切り上げ
```

### 小数倍率（分数経由で精密）

```ts
mulRational(num: number, den: number): BigNum;  // × num / den
mulNumber(scalar: number): BigNum;              // 内部で rationalize() → mulRational
```

`mulNumber(1.02)` は内部で `rationalize(1.02) = { num: 102, den: 100 }` に分解し、`mulInt(102).divInt(100)` を呼ぶ。

### 比較

```ts
eq(other: BigNum): boolean;
lt(other: BigNum): boolean;
lte(other: BigNum): boolean;
gt(other: BigNum): boolean;
gte(other: BigNum): boolean;
isZero(): boolean;
```

比較は配列長で大小、同長なら最上位ブロックから順に比較。

### 表示・シリアライズ

```ts
toDisplay(): string;     // 例: "1.50B"、アルファベット表記（02-currencies.md 参照）
toJSON(): BigNumJSON;    // [0, 500, 1]
toString(): string;      // "1500000"（デバッグ用、巨大数は指数表記）
```

## アルゴリズム詳細

### 加算（O(n)）

```
A = [a0, a1, a2, ...]
B = [b0, b1, b2, ...]
C = []
carry = 0
for i in 0 ... max(A.length, B.length):
  sum = (A[i] ?? 0) + (B[i] ?? 0) + carry
  C[i] = sum % 1000
  carry = Math.floor(sum / 1000)
if carry > 0: C.push(carry)
normalize(C)
```

### 減算（O(n)、結果が負なら zero）

```
A = [a0, a1, a2, ...]
B = [b0, b1, b2, ...]
if A < B: return zero()
C = []
borrow = 0
for i in 0 ... A.length - 1:
  diff = A[i] - (B[i] ?? 0) - borrow
  if diff < 0:
    diff += 1000
    borrow = 1
  else:
    borrow = 0
  C[i] = diff
normalize(C)
```

### 乗算（O(n²)）

```
A = [a0, a1, a2, ...]   // length n
B = [b0, b1, b2, ...]   // length m
C = new Array(n + m).fill(0)
for i in 0 ... n - 1:
  for j in 0 ... m - 1:
    C[i + j] += A[i] * B[j]
    // ↑ A[i] * B[j] は最大 999 * 999 = 998,001、Number で余裕
normalize(C)              // 繰り上げ処理が末尾末まで波及
```

### 整数倍率乗算 mulInt（O(n)）

```
A = [a0, a1, a2, ...]
n: integer (< MAX_SAFE_INTEGER)
C = []
carry = 0
for i in 0 ... A.length - 1:
  v = A[i] * n + carry
  C[i] = v % 1000
  carry = Math.floor(v / 1000)
while carry > 0:
  C.push(carry % 1000)
  carry = Math.floor(carry / 1000)
normalize(C)
```

### 整数除算 divInt（O(n)、切り上げ）

```
A = [a0, a1, a2, ...]   // 上位から処理
n: integer > 0
C = []
remainder = 0
for i from A.length - 1 down to 0:
  v = remainder * 1000 + A[i]
  C[i] = Math.floor(v / n)
  remainder = v % n
// 切り上げ: 余りがあれば +1
if remainder > 0:
  // 最下位に +1 して再正規化
  C[0] += 1
normalize(C)
```

### 小数倍率の分数化 rationalize

```ts
function rationalize(scalar: number): { num: number; den: number } {
  // scalar を最大 6 桁の小数として扱う前提
  // 例: 1.02 → { num: 102, den: 100 }
  // 例: 1.5  → { num: 15, den: 10 }
  // 例: 0.333 → { num: 333, den: 1000 }
  // 必要なら gcd で約分しておく
  const str = scalar.toString();
  const dotIdx = str.indexOf('.');
  if (dotIdx === -1) return { num: scalar, den: 1 };
  const decimals = str.length - dotIdx - 1;
  const den = Math.pow(10, decimals);
  const num = Math.round(scalar * den);
  return reduce(num, den);  // gcd で約分
}
```

### 表示 toDisplay

詳細は [02-currencies.md](./02-currencies.md) のアルファベット表記参照。

```ts
toDisplay(): string {
  if (this.digits.length === 0) return '0';
  const len = this.digits.length;
  const top = this.digits[len - 1];                // 最上位 3 桁（1〜999）
  const sub = len >= 2 ? this.digits[len - 2] : 0; // 次の 3 桁

  if (len === 1) {
    return String(top);                            // 999 以下は生表示
  }

  // 単位記号: len === 2 で A、len === 3 で B、... len === 27 で AA
  const unit = unitLabel(len - 1);                 // 1 → 'A', 2 → 'B', ..., 26 → 'Z', 27 → 'AA', ...
  // 小数 2 桁: sub の上 2 桁
  const decimal2 = Math.floor(sub / 10);           // 0 〜 99
  return `${top}.${String(decimal2).padStart(2, '0')}${unit}`;
}

function unitLabel(n: number): string {
  // n は 1 から開始（n=1 → 'A'）
  // Excel カラム名と同じ繰り上がり方
  let s = '';
  while (n > 0) {
    n -= 1;
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26);
  }
  return s;
}
```

## エッジケース・テスト規約

### 必須テストケース

1. **正規化**
   - `[0, 500, 0]` → `[0, 500]`
   - `[0, 0, 0]` → `[]`
   - `[1000]` → `[0, 1]`（繰り上げ）

2. **加算**
   - `0 + 0 = 0`
   - `[999] + [1] = [0, 1]`（繰り上げ）
   - `[999, 999, 999] + [1] = [0, 0, 0, 1]`（連鎖繰り上げ）

3. **減算**
   - `[0, 1] - [1] = [999]`（借り）
   - `[1] - [2] = []`（負はクランプ）
   - `[0, 0, 1] - [1] = [999, 999]`（連鎖借り）

4. **乗算**
   - `0 × N = 0`
   - `1 × N = N`
   - `[0, 1] × [0, 1] = [0, 0, 0, 1]`（1000 × 1000 = 1,000,000）

5. **小数倍率**
   - `[0, 500, 1] × 1.02 = [0, 530, 1]`（1,500,000 × 1.02 = 1,530,000）
   - `[1] × 0.5` = `[1]`（切り上げで 1）
   - 浮動小数の誤差: `0.1 + 0.2 ≠ 0.3` の問題が出ないこと

6. **比較**
   - 配列長違い: `[999] < [0, 1]`
   - 同長: `[0, 1] < [0, 2]`
   - ゼロ: `[] < [1]`

7. **シリアライズ round-trip**
   - 任意の BigNum → toJSON → fromJSON が同値

### vitest テスト規約

- `src/lib/bignum/BigNum.test.ts` に網羅テストを置く
- ライン カバレッジ **100%** 目標
- プロパティテスト（fast-check）で a + b = b + a、(a × b) × c = a × (b × c) などの代数則を検証

## パフォーマンス

### 計算量

| 演算 | 計算量 | 本作の典型サイズ (Tier 100 想定) |
|---|---|---|
| `add` / `sub` | O(n) | n ≈ 30、< 1µs |
| `mul` | O(n × m) | 30 × 30 = 900 演算、数 µs |
| `mulInt` / `divInt` | O(n) | n ≈ 30、< 1µs |
| `mulNumber` | O(n) + rationalize | 同上 |
| `toDisplay` | O(1) | 最上位 2 ブロックだけ参照 |

### メモリ・GC

- 演算ごとに新しい配列を生成（イミュータブル）
- バトル中の **ホットパス（ダメ計算）はオブジェクトプール** の導入を検討（v1 では入れず、計測後に判断）
- 配列はサイズが小さい（n ≈ 30）ので GC 圧は限定的

## セーブ形式（08-data-model.md との整合）

IndexedDB に保存する型を `number` から `BigNumJSON`（= `number[]`）に置き換える対象:

```ts
// 通貨残高
type CurrenciesRecord = {
  id: 'singleton';
  bolt: BigNumJSON;
  alloy: BigNumJSON;
};
```

`profile.totalEnemiesKilled` のような統計値は **Tier 100 以内では Number で収まる** のでそのまま `number` で OK。

## ディレクトリ

```
src/lib/bignum/
├── BigNum.ts           # クラス本体
├── BigNum.test.ts      # 単体テスト
├── rationalize.ts      # 小数 → 分数
├── rationalize.test.ts
└── unitLabel.ts        # アルファベット単位文字
```

## 未確定事項（TBD）

- 演算頻度の実測と、オブジェクトプール導入判断（バトル中の hot path のみ）
- WASM 化の必要性検討（実測後）
- `mul` の Karatsuba 法導入判断（n > 100 で価値が出る、本作の Tier 想定では不要）
