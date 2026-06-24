import { describe, it, expect } from 'vitest';

import { BigNum, rationalize } from './BigNum.js';
import type { BigNumJSON } from './types.js';

// ---------------------------------------------------------------------------
// rationalize
// ---------------------------------------------------------------------------

describe('rationalize', () => {
  it('整数はそのまま num/1 に変換する', () => {
    expect(rationalize(2)).toEqual({ num: 2, den: 1 });
    expect(rationalize(100)).toEqual({ num: 100, den: 1 });
  });

  it('1.02 → 51/50 (既約)', () => {
    const { num, den } = rationalize(1.02);
    // 102/100 = 51/50
    expect(num / den).toBeCloseTo(1.02, 10);
    expect(num).toBe(51);
    expect(den).toBe(50);
  });

  it('1.5 → 3/2', () => {
    const { num, den } = rationalize(1.5);
    expect(num).toBe(3);
    expect(den).toBe(2);
  });

  it('0.1 → 1/10', () => {
    const { num, den } = rationalize(0.1);
    expect(num).toBe(1);
    expect(den).toBe(10);
  });

  it('0.333 → 333/1000', () => {
    const { num, den } = rationalize(0.333);
    // gcd(333,1000)=1 なので既約
    expect(num).toBe(333);
    expect(den).toBe(1000);
  });

  it('0.5 → 1/2', () => {
    const { num, den } = rationalize(0.5);
    expect(num).toBe(1);
    expect(den).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

describe('BigNum.fromNumber', () => {
  it('0 → ZERO', () => {
    expect(BigNum.fromNumber(0).isZero()).toBe(true);
    expect(BigNum.fromNumber(0).toJSON()).toEqual([]);
  });

  it('負の数 → ZERO', () => {
    expect(BigNum.fromNumber(-5).isZero()).toBe(true);
  });

  it('999 → [999]', () => {
    expect(BigNum.fromNumber(999).toJSON()).toEqual([999]);
  });

  it('1000 → [0, 1]', () => {
    expect(BigNum.fromNumber(1000).toJSON()).toEqual([0, 1]);
  });

  it('1500000 → [0, 500, 1]', () => {
    expect(BigNum.fromNumber(1_500_000).toJSON()).toEqual([0, 500, 1]);
  });

  it('1000000 → [0, 0, 1]', () => {
    expect(BigNum.fromNumber(1_000_000).toJSON()).toEqual([0, 0, 1]);
  });
});

describe('BigNum.fromString', () => {
  it('"0" → ZERO', () => {
    expect(BigNum.fromString('0').isZero()).toBe(true);
  });

  it('"" → ZERO', () => {
    expect(BigNum.fromString('').isZero()).toBe(true);
  });

  it('"1500000" → [0, 500, 1]', () => {
    expect(BigNum.fromString('1500000').toJSON()).toEqual([0, 500, 1]);
  });

  it('"999" → [999]', () => {
    expect(BigNum.fromString('999').toJSON()).toEqual([999]);
  });

  it('"1000" → [0, 1]', () => {
    expect(BigNum.fromString('1000').toJSON()).toEqual([0, 1]);
  });

  it('大きな数でも fromNumber と一致', () => {
    const n = 123_456_789;
    expect(BigNum.fromString(String(n)).eq(BigNum.fromNumber(n))).toBe(true);
  });
});

describe('BigNum.fromJSON', () => {
  it('正規化されていない配列も処理できる', () => {
    // [0, 500, 0] → [0, 500] と正規化
    const b = BigNum.fromJSON([0, 500, 0]);
    expect(b.toJSON()).toEqual([0, 500]);
  });

  it('[1000] → [0, 1] に繰り上がり', () => {
    const b = BigNum.fromJSON([1000]);
    expect(b.toJSON()).toEqual([0, 1]);
  });

  it('round-trip', () => {
    const original = BigNum.fromNumber(1_234_567_890);
    const json: BigNumJSON = original.toJSON();
    const restored = BigNum.fromJSON(json);
    expect(restored.eq(original)).toBe(true);
  });
});

describe('BigNum.ZERO', () => {
  it('isZero() === true', () => {
    expect(BigNum.ZERO.isZero()).toBe(true);
  });

  it('toJSON() === []', () => {
    expect(BigNum.ZERO.toJSON()).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// add
// ---------------------------------------------------------------------------

describe('add', () => {
  it('0 + 0 = 0', () => {
    expect(BigNum.ZERO.add(BigNum.ZERO).isZero()).toBe(true);
  });

  it('0 + X = X', () => {
    const x = BigNum.fromNumber(42);
    expect(BigNum.ZERO.add(x).eq(x)).toBe(true);
  });

  it('X + 0 = X', () => {
    const x = BigNum.fromNumber(42);
    expect(x.add(BigNum.ZERO).eq(x)).toBe(true);
  });

  it('[999] + [1] = [0, 1] (繰り上がり)', () => {
    const a = BigNum.fromNumber(999);
    const b = BigNum.fromNumber(1);
    const c = a.add(b);
    expect(c.toJSON()).toEqual([0, 1]);
    expect(c.toString()).toBe('1000');
  });

  it('[999, 999, 999] + [1] = [0, 0, 0, 1] (連鎖繰り上がり)', () => {
    const a = BigNum.fromNumber(999_999_999);
    const b = BigNum.fromNumber(1);
    const c = a.add(b);
    expect(c.toJSON()).toEqual([0, 0, 0, 1]);
    expect(c.toString()).toBe('1000000000');
  });

  it('交換法則 a + b = b + a', () => {
    const a = BigNum.fromNumber(123_456);
    const b = BigNum.fromNumber(789_012);
    expect(a.add(b).eq(b.add(a))).toBe(true);
  });

  it('結合法則 (a + b) + c = a + (b + c)', () => {
    const a = BigNum.fromNumber(1_000_000);
    const b = BigNum.fromNumber(999_999);
    const c = BigNum.fromNumber(500_500);
    expect(
      a
        .add(b)
        .add(c)
        .eq(a.add(b.add(c)))
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// sub
// ---------------------------------------------------------------------------

describe('sub', () => {
  it('X - 0 = X', () => {
    const x = BigNum.fromNumber(100);
    expect(x.sub(BigNum.ZERO).eq(x)).toBe(true);
  });

  it('0 - X = 0 (クランプ)', () => {
    const x = BigNum.fromNumber(100);
    expect(BigNum.ZERO.sub(x).isZero()).toBe(true);
  });

  it('X - X = 0', () => {
    const x = BigNum.fromNumber(100);
    expect(x.sub(x).isZero()).toBe(true);
  });

  it('[1] - [2] = [] (負はクランプ)', () => {
    const a = BigNum.fromNumber(1);
    const b = BigNum.fromNumber(2);
    expect(a.sub(b).isZero()).toBe(true);
  });

  it('[0, 1] - [1] = [999] (繰り下がり)', () => {
    const a = BigNum.fromNumber(1000);
    const b = BigNum.fromNumber(1);
    const c = a.sub(b);
    expect(c.toJSON()).toEqual([999]);
    expect(c.toString()).toBe('999');
  });

  it('[0, 0, 1] - [1] = [999, 999] (連鎖繰り下がり)', () => {
    const a = BigNum.fromNumber(1_000_000);
    const b = BigNum.fromNumber(1);
    const c = a.sub(b);
    expect(c.toJSON()).toEqual([999, 999]);
    expect(c.toString()).toBe('999999');
  });
});

// ---------------------------------------------------------------------------
// mulInt
// ---------------------------------------------------------------------------

describe('mulInt', () => {
  it('0 × N = 0', () => {
    expect(BigNum.ZERO.mulInt(100).isZero()).toBe(true);
  });

  it('N × 0 = 0', () => {
    expect(BigNum.fromNumber(500).mulInt(0).isZero()).toBe(true);
  });

  it('N × 1 = N', () => {
    const n = BigNum.fromNumber(123_456);
    expect(n.mulInt(1).eq(n)).toBe(true);
  });

  it('1000 × 1000 = 1000000', () => {
    const a = BigNum.fromNumber(1000);
    const c = a.mulInt(1000);
    expect(c.toString()).toBe('1000000');
    expect(c.toJSON()).toEqual([0, 0, 1]);
  });

  it('ブロック境界をまたぐ大きな乗数', () => {
    // 999 × 999 = 998001
    const a = BigNum.fromNumber(999);
    const c = a.mulInt(999);
    expect(c.toString()).toBe('998001');
  });

  it('大きな配列 × 大きな整数でも精度を保つ', () => {
    // 1,000,000,000 × 1000 = 1,000,000,000,000
    const a = BigNum.fromNumber(1_000_000_000);
    const c = a.mulInt(1000);
    expect(c.toString()).toBe('1000000000000');
  });
});

// ---------------------------------------------------------------------------
// divInt
// ---------------------------------------------------------------------------

describe('divInt', () => {
  it('0 ÷ N = 0', () => {
    expect(BigNum.ZERO.divInt(5).isZero()).toBe(true);
  });

  it('N ÷ 1 = N', () => {
    const n = BigNum.fromNumber(123_456);
    expect(n.divInt(1).eq(n)).toBe(true);
  });

  it('1000000 ÷ 1000 = 1000', () => {
    const a = BigNum.fromNumber(1_000_000);
    expect(a.divInt(1000).toString()).toBe('1000');
  });

  it('切り上げ: 1 ÷ 2 = 1', () => {
    const a = BigNum.fromNumber(1);
    expect(a.divInt(2).toString()).toBe('1');
  });

  it('切り上げ: 3 ÷ 2 = 2', () => {
    const a = BigNum.fromNumber(3);
    expect(a.divInt(2).toString()).toBe('2');
  });

  it('n=0 を渡すと例外', () => {
    expect(() => BigNum.fromNumber(1).divInt(0)).toThrow(RangeError);
  });

  it('ブロック境界での除算', () => {
    // 999999 ÷ 1000 = 1000 (切り上げ)
    const a = BigNum.fromNumber(999_999);
    expect(a.divInt(1000).toString()).toBe('1000');
  });
});

// ---------------------------------------------------------------------------
// mulRational
// ---------------------------------------------------------------------------

describe('mulRational', () => {
  it('1500000 × 102/100 = 1530000', () => {
    const a = BigNum.fromNumber(1_500_000);
    const c = a.mulRational(102, 100);
    expect(c.toString()).toBe('1530000');
  });

  it('1.02 倍を 10000 回繰り返しても整数精度を保つ', () => {
    // 毎回 ×51/50 (既約)
    let v = BigNum.fromNumber(1_000_000);
    for (let i = 0; i < 10000; i++) {
      v = v.mulRational(51, 50);
    }
    // 最低限: NaN/Infinity でなく、元の値より大きいこと
    expect(v.gt(BigNum.fromNumber(1_000_000))).toBe(true);
    // toString が数字文字列であること
    expect(/^\d+$/.test(v.toString())).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// mulNumber
// ---------------------------------------------------------------------------

describe('mulNumber', () => {
  it('1.02 倍が mulRational(51, 50) と一致', () => {
    const a = BigNum.fromNumber(1_000_000);
    const byMulNumber = a.mulNumber(1.02);
    const byMulRational = a.mulRational(51, 50);
    expect(byMulNumber.eq(byMulRational)).toBe(true);
  });

  it('0.5 倍が mulRational(1, 2) と一致', () => {
    const a = BigNum.fromNumber(1000);
    expect(a.mulNumber(0.5).eq(a.mulRational(1, 2))).toBe(true);
  });

  it('2 倍が mulInt(2) と一致', () => {
    const a = BigNum.fromNumber(500);
    expect(a.mulNumber(2).eq(a.mulInt(2))).toBe(true);
  });

  it('1500000 × 1.02 = 1530000', () => {
    const a = BigNum.fromNumber(1_500_000);
    // rationalize(1.02) = 51/50
    // 1500000 * 51 = 76500000, 76500000 / 50 = 1530000
    expect(a.mulNumber(1.02).toString()).toBe('1530000');
  });
});

// ---------------------------------------------------------------------------
// compare / eq / lt / gt / lte / gte
// ---------------------------------------------------------------------------

describe('compare', () => {
  it('配列長違い: [999] < [0, 1]', () => {
    const a = BigNum.fromNumber(999);
    const b = BigNum.fromNumber(1000);
    expect(a.compare(b)).toBe(-1);
    expect(b.compare(a)).toBe(1);
  });

  it('同長: [0, 1] < [0, 2]', () => {
    const a = BigNum.fromNumber(1000);
    const b = BigNum.fromNumber(2000);
    expect(a.compare(b)).toBe(-1);
    expect(b.compare(a)).toBe(1);
  });

  it('ゼロ: [] < [1]', () => {
    expect(BigNum.ZERO.compare(BigNum.fromNumber(1))).toBe(-1);
  });

  it('同値: compare === 0', () => {
    expect(BigNum.fromNumber(500).compare(BigNum.fromNumber(500))).toBe(0);
  });
});

describe('eq / lt / gt / lte / gte', () => {
  const a = BigNum.fromNumber(100);
  const b = BigNum.fromNumber(200);
  const c = BigNum.fromNumber(100);

  it('a < b', () => {
    expect(a.lt(b)).toBe(true);
    expect(b.lt(a)).toBe(false);
  });

  it('b > a', () => {
    expect(b.gt(a)).toBe(true);
    expect(a.gt(b)).toBe(false);
  });

  it('a === c', () => {
    expect(a.eq(c)).toBe(true);
    expect(a.eq(b)).toBe(false);
  });

  it('a <= c', () => {
    expect(a.lte(c)).toBe(true);
    expect(a.lte(b)).toBe(true);
    expect(b.lte(a)).toBe(false);
  });

  it('a >= c', () => {
    expect(a.gte(c)).toBe(true);
    expect(b.gte(a)).toBe(true);
    expect(a.gte(b)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// isZero
// ---------------------------------------------------------------------------

describe('isZero', () => {
  it('ZERO.isZero() === true', () => {
    expect(BigNum.ZERO.isZero()).toBe(true);
  });

  it('fromNumber(0).isZero() === true', () => {
    expect(BigNum.fromNumber(0).isZero()).toBe(true);
  });

  it('非ゼロは false', () => {
    expect(BigNum.fromNumber(1).isZero()).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// toString
// ---------------------------------------------------------------------------

describe('toString', () => {
  it('0 → "0"', () => {
    expect(BigNum.ZERO.toString()).toBe('0');
  });

  it('ブロック内のゼロパディング: 1007 → "1007"', () => {
    // digits = [7, 1]
    expect(BigNum.fromNumber(1007).toString()).toBe('1007');
  });

  it('ゼロパディング: 1000000 → "1000000"', () => {
    // digits = [0, 0, 1]
    expect(BigNum.fromNumber(1_000_000).toString()).toBe('1000000');
  });

  it('1500000 → "1500000"', () => {
    expect(BigNum.fromNumber(1_500_000).toString()).toBe('1500000');
  });

  it('round-trip: toString → fromString', () => {
    const n = BigNum.fromNumber(987_654_321);
    expect(BigNum.fromString(n.toString()).eq(n)).toBe(true);
  });

  it('各ブロックに 3 桁ゼロパディング: 7 のみのブロック', () => {
    // 1,000,007 = [7, 0, 1] → "1000007"
    expect(BigNum.fromNumber(1_000_007).toString()).toBe('1000007');
  });
});

// ---------------------------------------------------------------------------
// toDisplay
// ---------------------------------------------------------------------------

describe('toDisplay', () => {
  it('0 → "0"', () => {
    expect(BigNum.ZERO.toDisplay()).toBe('0');
  });

  it('999 → "999"', () => {
    expect(BigNum.fromNumber(999).toDisplay()).toBe('999');
  });

  it('42 → "42"', () => {
    expect(BigNum.fromNumber(42).toDisplay()).toBe('42');
  });

  it('1000 → "1.00A"', () => {
    expect(BigNum.fromNumber(1000).toDisplay()).toBe('1.00A');
  });

  it('1234567 → "1.23B"', () => {
    // digits = [567, 234, 1], len=3, n=2 → B
    // top=1, sub=234, decimal2=floor(234/10)=23
    expect(BigNum.fromNumber(1_234_567).toDisplay()).toBe('1.23B');
  });

  it('10^9 → "1.00C"', () => {
    // digits = [0, 0, 0, 1], len=4, n=3 → C
    // top=1, sub=0, decimal2=0
    expect(BigNum.fromNumber(1_000_000_000).toDisplay()).toBe('1.00C');
  });

  it('10^81 → "1.00AA"', () => {
    // 10^81 は digits が 28 ブロック (81/3=27 ブロック + 最上位 1 ブロック = 28)
    // n = 27 → 'AA'
    const digits: number[] = new Array(28).fill(0);
    digits[27] = 1;
    const b = BigNum.fromJSON(digits);
    expect(b.toDisplay()).toBe('1.00AA');
  });

  it('10^156 → "1.00BA"', () => {
    // 10^156 は digits が 53 ブロック
    // n = 52 → 'AZ'? 確認: n=27→AA, n=52→AZ, n=53→BA
    // 10^156: digits[52]=1, 他は 0 → len=53, n=52 → unitLabel(52)
    // unitLabel(52): 52-1=51, 51%26=25→'Z', 51/26=1→1-1=0, 0%26=0→'A' → 'AZ'
    // 実際 10^156 = 10^(52*3) なので len=53, n=52 → 'AZ'
    const digits52: number[] = new Array(53).fill(0);
    digits52[52] = 1;
    const b52 = BigNum.fromJSON(digits52);
    expect(b52.toDisplay()).toBe('1.00AZ');
  });

  it('10^159 = 1.00BA', () => {
    // 10^159: digits[53]=1, len=54, n=53 → unitLabel(53)
    // 53-1=52, 52%26=0→'A', 52/26=2→2-1=1, 1%26=1→'B' → 'BA'
    const digits: number[] = new Array(54).fill(0);
    digits[53] = 1;
    const b = BigNum.fromJSON(digits);
    expect(b.toDisplay()).toBe('1.00BA');
  });
});

// ---------------------------------------------------------------------------
// Edge cases / normalization
// ---------------------------------------------------------------------------

describe('normalization', () => {
  it('[0, 500, 0] → [0, 500]', () => {
    expect(BigNum.fromJSON([0, 500, 0]).toJSON()).toEqual([0, 500]);
  });

  it('[0, 0, 0] → []', () => {
    expect(BigNum.fromJSON([0, 0, 0]).toJSON()).toEqual([]);
  });

  it('[1000] → [0, 1] (繰り上げ)', () => {
    expect(BigNum.fromJSON([1000]).toJSON()).toEqual([0, 1]);
  });
});

// ---------------------------------------------------------------------------
// Floating-point precision guard
// ---------------------------------------------------------------------------

describe('floating-point precision guard', () => {
  it('0.1 + 0.2 の誤差が BigNum に波及しない', () => {
    // rationalize は string ベースなので 0.3 も正確
    const { num: num1, den: den1 } = rationalize(0.1);
    const { num: num2, den: den2 } = rationalize(0.2);
    // mulRational は整数演算なので誤差なし
    const a = BigNum.fromNumber(1000);
    const r1 = a.mulRational(num1, den1); // × 1/10 = 100
    const r2 = r1.mulRational(num2, den2); // × 1/5 = 20 (切り上げで 20)

    // 1000 × 0.1 = 100（切り上げなし）
    expect(r1.toString()).toBe('100');
    // 100 × 0.2 = 20（切り上げなし）
    expect(r2.toString()).toBe('20');
  });

  it('1500000 × 1.02 が JS Number 演算と一致しない（BigNum の方が正確）', () => {
    // JS: 1500000 * 1.02 = 1530000.0000000002 → 整数としては誤差
    // BigNum: 1530000 ぴったり
    const a = BigNum.fromNumber(1_500_000);
    expect(a.mulNumber(1.02).toString()).toBe('1530000');
  });
});

// ---------------------------------------------------------------------------
// Static factories: one / fromDigits
// ---------------------------------------------------------------------------

describe('BigNum.one', () => {
  it('BigNum.one() が BigNum.fromNumber(1) と等値になる', () => {
    expect(BigNum.one().eq(BigNum.fromNumber(1))).toBe(true);
  });

  it('BigNum.one().toString() === "1"', () => {
    expect(BigNum.one().toString()).toBe('1');
  });

  it('BigNum.one() を 3 回 add すると 3 になる', () => {
    const result = BigNum.one().add(BigNum.one()).add(BigNum.one());
    expect(result.toString()).toBe('3');
  });

  it('BigNum.one() は isZero() === false', () => {
    expect(BigNum.one().isZero()).toBe(false);
  });
});

describe('BigNum.fromDigits', () => {
  it('fromDigits([1]) が 1 になる', () => {
    expect(BigNum.fromDigits([1]).toString()).toBe('1');
  });

  it('fromDigits([1, 2]) が digits [1, 2] の内部表現と一致する（= 2001）', () => {
    // LSB-first: digits[0]=1, digits[1]=2 → 1 + 2×1000 = 2001
    const b = BigNum.fromDigits([1, 2]);
    expect(b.toString()).toBe('2001');
  });

  it('fromDigits([0, 0, 1]) が 1000000 になる', () => {
    // digits[2]=1 → 1×1000^2 = 1000000
    expect(BigNum.fromDigits([0, 0, 1]).toString()).toBe('1000000');
  });

  it('fromDigits([]) が ZERO になる', () => {
    expect(BigNum.fromDigits([]).isZero()).toBe(true);
  });

  it('fromDigits([999]) が 999 になる', () => {
    expect(BigNum.fromDigits([999]).toString()).toBe('999');
  });

  it('fromDigits([500, 1]) が fromNumber(1500) と等値になる', () => {
    // LSB-first: 500 + 1×1000 = 1500
    expect(BigNum.fromDigits([500, 1]).eq(BigNum.fromNumber(1500))).toBe(true);
  });
});
