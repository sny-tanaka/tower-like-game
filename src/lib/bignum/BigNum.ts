import type { BigNumJSON } from './types.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** 末尾の 0 ブロックを除去して正規化された digits を返す（非破壊） */
function trimLeadingZeros(digits: number[]): readonly number[] {
  let end = digits.length;
  while (end > 0 && digits[end - 1] === 0) end--;
  return digits.slice(0, end);
}

/**
 * 繰り上げ処理 + 末尾 0 trim を行い正規化された digits を返す。
 * 入力配列は破壊される可能性がある（内部専用）。
 */
function normalize(digits: number[]): readonly number[] {
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
  return trimLeadingZeros(digits);
}

/** 最大公約数（Euclidean） */
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// ---------------------------------------------------------------------------
// rationalize (v1.3.6: scalar → {num, den} の memo を追加。 hot path で同じ scalar
//   (= damageMul / critMultiplier / hpLifestealPct / 0.3 burn 係数 / activePower 等) が
//   毎ヒット渡されるが、 scalar が同じなら結果も同じ。 .toString() + gcd ループ + オブジェクト
//   割当のコストを memo で完全カットする。
//   Map は insertion-order なので、 サイズ上限超過時は最古エントリを退避する簡易 LRU)
// ---------------------------------------------------------------------------

const RATIONALIZE_CACHE_MAX = 256;
const rationalizeCache = new Map<number, { num: number; den: number }>();

/** 小数スカラーを { num, den } の既約分数に変換する。 */
export function rationalize(scalar: number): { num: number; den: number } {
  const cached = rationalizeCache.get(scalar);
  if (cached !== undefined) return cached;

  const str = scalar.toString();
  const dotIdx = str.indexOf('.');
  let result: { num: number; den: number };
  if (dotIdx === -1) {
    result = { num: Math.round(scalar), den: 1 };
  } else {
    const decimals = str.length - dotIdx - 1;
    const den = Math.pow(10, decimals);
    const num = Math.round(scalar * den);
    const g = gcd(Math.abs(num), den);
    result = { num: num / g, den: den / g };
  }

  if (rationalizeCache.size >= RATIONALIZE_CACHE_MAX) {
    const firstKey = rationalizeCache.keys().next().value;
    if (firstKey !== undefined) rationalizeCache.delete(firstKey);
  }
  rationalizeCache.set(scalar, result);
  return result;
}

// ---------------------------------------------------------------------------
// unitLabel
// ---------------------------------------------------------------------------

/**
 * n=1 → 'A', n=2 → 'B', ..., n=26 → 'Z', n=27 → 'AA', ...
 * Excel 列名と同じアルゴリズム。
 */
function unitLabel(n: number): string {
  let s = '';
  let remaining = n;
  while (remaining > 0) {
    remaining -= 1;
    s = String.fromCharCode(65 + (remaining % 26)) + s;
    remaining = Math.floor(remaining / 26);
  }
  return s;
}

// ---------------------------------------------------------------------------
// BigNum
// ---------------------------------------------------------------------------

export class BigNum {
  private readonly digits: readonly number[];

  private constructor(digits: readonly number[]) {
    this.digits = digits;
  }

  // -------------------------------------------------------------------------
  // Static factories
  // -------------------------------------------------------------------------

  static readonly ZERO: BigNum = new BigNum([]);

  static fromNumber(n: number): BigNum {
    if (n <= 0) return BigNum.ZERO;
    const digits: number[] = [];
    let remaining = Math.floor(n);
    while (remaining > 0) {
      digits.push(remaining % 1000);
      remaining = Math.floor(remaining / 1000);
    }
    return new BigNum(trimLeadingZeros(digits));
  }

  static fromString(s: string): BigNum {
    const trimmed = s.trim();
    if (trimmed === '' || trimmed === '0') return BigNum.ZERO;
    // 右から 3 桁ずつブロック化
    const digits: number[] = [];
    let i = trimmed.length;
    while (i > 0) {
      const start = Math.max(0, i - 3);
      digits.push(parseInt(trimmed.slice(start, i), 10));
      i = start;
    }
    return new BigNum(trimLeadingZeros(digits));
  }

  static fromJSON(j: BigNumJSON): BigNum {
    return new BigNum(normalize([...j]));
  }

  /** BigNum(1) を返す。fromNumber(1) のショートハンド */
  static one(): BigNum {
    return BigNum.fromNumber(1);
  }

  /** 桁の配列（LSB-first, 各桁 0〜999）から BigNum を生成する */
  static fromDigits(digits: number[]): BigNum {
    return new BigNum([...digits]);
  }

  // -------------------------------------------------------------------------
  // Arithmetic
  // -------------------------------------------------------------------------

  add(other: BigNum): BigNum {
    const a = this.digits;
    const b = other.digits;
    const len = Math.max(a.length, b.length);
    const c: number[] = new Array(len).fill(0);
    let carry = 0;
    for (let i = 0; i < len; i++) {
      const sum = (a[i] ?? 0) + (b[i] ?? 0) + carry;
      c[i] = sum % 1000;
      carry = Math.floor(sum / 1000);
    }
    if (carry > 0) c.push(carry);
    return new BigNum(normalize(c));
  }

  sub(other: BigNum): BigNum {
    if (this.compare(other) <= 0) return BigNum.ZERO;
    const a = this.digits;
    const b = other.digits;
    const c: number[] = new Array(a.length).fill(0);
    let borrow = 0;
    for (let i = 0; i < a.length; i++) {
      let diff = (a[i] ?? 0) - (b[i] ?? 0) - borrow;
      if (diff < 0) {
        diff += 1000;
        borrow = 1;
      } else {
        borrow = 0;
      }
      c[i] = diff;
    }
    return new BigNum(normalize(c));
  }

  mulInt(n: number): BigNum {
    if (n <= 0 || this.isZero()) return BigNum.ZERO;
    const a = this.digits;
    const c: number[] = new Array(a.length).fill(0);
    let carry = 0;
    for (let i = 0; i < a.length; i++) {
      const v = a[i] * n + carry;
      c[i] = v % 1000;
      carry = Math.floor(v / 1000);
    }
    while (carry > 0) {
      c.push(carry % 1000);
      carry = Math.floor(carry / 1000);
    }
    return new BigNum(normalize(c));
  }

  divInt(n: number): BigNum {
    if (n <= 0) throw new RangeError('divInt: n must be > 0');
    if (this.isZero()) return BigNum.ZERO;
    const a = this.digits;
    const c: number[] = new Array(a.length).fill(0);
    let remainder = 0;
    for (let i = a.length - 1; i >= 0; i--) {
      const v = remainder * 1000 + (a[i] ?? 0);
      c[i] = Math.floor(v / n);
      remainder = v % n;
    }
    // 切り上げ: 余りがあれば +1
    if (remainder > 0) {
      c[0] += 1;
    }
    return new BigNum(normalize(c));
  }

  mulRational(num: number, den: number): BigNum {
    return this.mulInt(num).divInt(den);
  }

  mulNumber(scalar: number): BigNum {
    const { num, den } = rationalize(scalar);
    return this.mulRational(num, den);
  }

  // -------------------------------------------------------------------------
  // Comparison
  // -------------------------------------------------------------------------

  compare(other: BigNum): -1 | 0 | 1 {
    const a = this.digits;
    const b = other.digits;
    if (a.length !== b.length) {
      return a.length < b.length ? -1 : 1;
    }
    for (let i = a.length - 1; i >= 0; i--) {
      const av = a[i] ?? 0;
      const bv = b[i] ?? 0;
      if (av < bv) return -1;
      if (av > bv) return 1;
    }
    return 0;
  }

  eq(other: BigNum): boolean {
    return this.compare(other) === 0;
  }

  lt(other: BigNum): boolean {
    return this.compare(other) === -1;
  }

  gt(other: BigNum): boolean {
    return this.compare(other) === 1;
  }

  lte(other: BigNum): boolean {
    return this.compare(other) <= 0;
  }

  gte(other: BigNum): boolean {
    return this.compare(other) >= 0;
  }

  isZero(): boolean {
    return this.digits.length === 0;
  }

  // -------------------------------------------------------------------------
  // Serialization / Display
  // -------------------------------------------------------------------------

  toJSON(): BigNumJSON {
    return [...this.digits];
  }

  toString(): string {
    if (this.digits.length === 0) return '0';
    const len = this.digits.length;
    // 最上位ブロックはそのまま、残りは 3 桁ゼロパディング
    let result = String(this.digits[len - 1]);
    for (let i = len - 2; i >= 0; i--) {
      result += String(this.digits[i]).padStart(3, '0');
    }
    return result;
  }

  toDisplay(): string {
    if (this.digits.length === 0) return '0';
    const len = this.digits.length;
    const top = this.digits[len - 1]; // 最上位 3 桁 (1〜999)

    if (len === 1) {
      // 999 以下は生表示
      return String(top);
    }

    // 単位記号: len===2 で A (n=1)、len===3 で B (n=2)、...
    const n = len - 1;
    const unit = unitLabel(n);
    const sub = this.digits[len - 2] ?? 0; // 次の 3 桁
    const decimal2 = Math.floor(sub / 10); // 上 2 桁 (0〜99)
    return `${top}.${String(decimal2).padStart(2, '0')}${unit}`;
  }
}
