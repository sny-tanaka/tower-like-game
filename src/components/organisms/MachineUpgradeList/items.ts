import type { IconName } from '@/components/atoms/Icon';
import type { MachineUpgradeKey } from '@/data/schema';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type MachineUpgradeCategory = 'defense' | 'offense' | 'active' | 'economy' | 'slot';

export interface MachineUpgradeItem {
  key: MachineUpgradeKey;
  title: string; // 日本語表記
  description?: string;
  category: MachineUpgradeCategory;
  /** Lv 0 の効果値 */
  baseValue: number;
  /** Lv ごとの上昇係数（growthType によって意味が変わる） */
  growthFactor: number;
  /** 効果スケールの種類 */
  growthType:
    | 'multiply'
    | 'linear'
    | 'asymptotic'
    | 'asymptotic_half'
    | 'range_asymptotic'
    | 'fixed_step';
  /** Lv 1 のコスト（cost(Lv→Lv+1) = baseCost × costGrowth^Lv で切り上げ） */
  baseCost: number;
  /** Lv ごとのコスト上昇率 */
  costGrowth: number;
  /** 表示用単位（'%', '×', '/s', 'px' 等） */
  unit?: string;
  /** 最大 Lv（patchSlots のみ 5） */
  maxLv?: number;
  /** アイコン名 */
  iconName?: IconName;
}

// ---------------------------------------------------------------------------
// カテゴリラベル（表示用）
// ---------------------------------------------------------------------------

export const CATEGORY_LABELS: Record<MachineUpgradeCategory, string> = {
  defense: '防御',
  offense: '攻撃',
  active: 'アクティブ',
  economy: '経済',
  slot: 'スロット',
};

// ---------------------------------------------------------------------------
// 16 項目定義
// 仕様: design-docs/tower-like-game/03-machine.md
// コストカーブ: cost(Lv→Lv+1) = baseCost × costGrowth^Lv (切り上げ整数)
// D/O/A 系: baseCost=100, costGrowth=1.10
// Economic 系: baseCost=200, costGrowth=1.15
// Slot 系: 個別コスト (Lv0→1:2000, ×10 ジャンプ)
// ---------------------------------------------------------------------------

export const MACHINE_UPGRADE_ITEMS: readonly MachineUpgradeItem[] = [
  // --- 防御系 (4 項目) ---
  {
    key: 'maxHp',
    title: '最大 HP',
    category: 'defense',
    baseValue: 100,
    growthFactor: 1.02, // 乗算 ×1.02 / Lv
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    iconName: 'heart',
  },
  {
    key: 'hpRegen',
    title: 'HP リジェネ/秒',
    category: 'defense',
    baseValue: 1.0,
    growthFactor: 1.02, // 乗算 ×1.02 / Lv
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '/s',
    iconName: 'spark',
  },
  {
    key: 'damageReduction',
    title: '被ダメ軽減',
    category: 'defense',
    baseValue: 0,
    growthFactor: 0.01, // 漸近 α=0.01 → r = 0.01 × Lv, 値 = 1 - 1/(1+r)
    growthType: 'asymptotic',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '%',
    iconName: 'shield',
  },
  {
    key: 'defense',
    title: '防御力',
    category: 'defense',
    baseValue: 1,
    growthFactor: 1.02, // 乗算 ×1.02 / Lv
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    iconName: 'shield',
  },

  // --- 攻撃系 (5 項目) ---
  {
    key: 'baseAttack',
    title: '基礎攻撃力',
    category: 'offense',
    baseValue: 1,
    growthFactor: 1.02, // 乗算 ×1.02 / Lv
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    iconName: 'laser',
  },
  {
    key: 'attackSpeed',
    title: '攻撃速度',
    category: 'offense',
    baseValue: 1.0,
    growthFactor: 1.02, // 乗算 ×1.02 / Lv
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '/s',
    iconName: 'lightning',
  },
  {
    key: 'range',
    title: '索敵距離',
    category: 'offense',
    baseValue: 150, // base=150, max=400, α=0.01 の索敵漸近
    growthFactor: 0.01,
    growthType: 'range_asymptotic',
    baseCost: 100,
    costGrowth: 1.1,
    unit: 'px',
    iconName: 'target',
  },
  {
    key: 'critRate',
    title: 'クリ率',
    category: 'offense',
    baseValue: 0,
    growthFactor: 0.01, // 漸近 α=0.01
    growthType: 'asymptotic',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '%',
    iconName: 'target',
  },
  {
    key: 'critMultiplier',
    title: 'クリ倍率',
    category: 'offense',
    baseValue: 1.5,
    growthFactor: 0.05, // 線形 +0.05 / Lv
    growthType: 'linear',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '×',
    iconName: 'laser',
  },

  // --- アクティブ系 (2 項目) ---
  {
    key: 'activePower',
    title: 'アクティブ威力',
    category: 'active',
    baseValue: 1.0,
    growthFactor: 0.03, // 線形 +0.03 / Lv
    growthType: 'linear',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '×',
    iconName: 'flame',
  },
  {
    key: 'activeCdReduction',
    title: 'アクティブ CD 減少',
    category: 'active',
    baseValue: 0,
    growthFactor: 0.01, // CD 漸近 α=0.01, cap 50%
    growthType: 'asymptotic_half',
    baseCost: 100,
    costGrowth: 1.1,
    unit: '%',
    iconName: 'spark',
  },

  // --- 経済系 (4 項目) ---
  {
    key: 'screwGain',
    title: 'ネジ獲得倍率',
    category: 'economy',
    baseValue: 1.0,
    growthFactor: 0.03, // 線形 +0.03 / Lv
    growthType: 'linear',
    baseCost: 200, // 経済系 base=200
    costGrowth: 1.15,
    unit: '×',
    iconName: 'screw',
  },
  {
    key: 'boltGain',
    title: 'ボルト獲得倍率',
    category: 'economy',
    baseValue: 1.0,
    growthFactor: 0.03, // 線形 +0.03 / Lv
    growthType: 'linear',
    baseCost: 200, // 経済系 base=200
    costGrowth: 1.15,
    unit: '×',
    iconName: 'bolt',
  },
  {
    key: 'alloyGain',
    title: '超合金獲得倍率',
    category: 'economy',
    baseValue: 1.0,
    growthFactor: 0.03, // 線形 +0.03 / Lv
    growthType: 'linear',
    baseCost: 200, // 経済系 base=200
    costGrowth: 1.15,
    unit: '×',
    iconName: 'spark',
  },
  {
    key: 'patchDropRate',
    title: 'パッチドロップ率',
    category: 'economy',
    baseValue: 1.0,
    growthFactor: 0.03, // 線形 +0.03 / Lv（乗算でベースドロップ確率に掛かる）
    growthType: 'linear',
    baseCost: 200, // 経済系 base=200
    costGrowth: 1.15,
    unit: '×',
    iconName: 'spark',
  },

  // --- スロット系 (1 項目) ---
  {
    key: 'patchSlots',
    title: 'パッチスロット数',
    category: 'slot',
    baseValue: 1, // Lv 0 = 1 スロット
    growthFactor: 1, // +1 / Lv (fixed_step)
    growthType: 'fixed_step',
    baseCost: 2000, // Lv 0→1: 2,000
    costGrowth: 10, // 暫定: Lv ごとに ×10 ジャンプ
    maxLv: 5, // Lv 5 でハードキャップ（= 6 スロット）
    iconName: 'shield',
  },
];

// ---------------------------------------------------------------------------
// ヘルパー: 効果値計算
// ---------------------------------------------------------------------------

/**
 * Lv k での「multiply 差分」を計算する。
 * Lv (k-1) → Lv k での増分: ceil(base × factor^k) - ceil(base × factor^(k-1))。
 * 最低でも +1 を保証 (= base 値が 1 のときでも Lv up で必ず +1 上がる)。
 *
 * NOTE: 浮動小数誤差で 100 × 1.02 = 102.0000...18 のように ceil で +1 ずれることがあるため、
 *       EPSILON を引いてから ceil する。
 */
const MULTIPLY_EPSILON = 1e-9;
function multiplyDelta(baseValue: number, growthFactor: number, k: number): number {
  const cur = Math.ceil(baseValue * Math.pow(growthFactor, k) - MULTIPLY_EPSILON);
  const prev = Math.ceil(baseValue * Math.pow(growthFactor, k - 1) - MULTIPLY_EPSILON);
  return Math.max(1, cur - prev);
}

/**
 * 指定 Lv での効果値を返す。
 * - multiply: value(0) = ceil(baseValue)、 value(Lv) = value(Lv-1) + multiplyDelta(base, factor, Lv)
 *             「base 保証 + 緩やかな指数差分」 で、 Lv up で必ず value が増える。
 * - linear / fixed_step: baseValue + growthFactor × Lv
 * - asymptotic: r = growthFactor × Lv, 値 = 1 - 1/(1+r)（割合、0〜1）
 * - asymptotic_half: r = growthFactor × Lv, 値 = 0.5 × (1 - 1/(1+r))（割合、0〜0.5）
 * - range_asymptotic: r = growthFactor × Lv, 値 = 150 + 250 × (1 - 1/(1+r))
 */
export function calcEffectValue(item: MachineUpgradeItem, lv: number): number {
  switch (item.growthType) {
    case 'multiply': {
      let value = Math.ceil(item.baseValue);
      for (let k = 1; k <= lv; k++) {
        value += multiplyDelta(item.baseValue, item.growthFactor, k);
      }
      return value;
    }
    case 'linear':
    case 'fixed_step':
      return item.baseValue + item.growthFactor * lv;
    case 'asymptotic': {
      const r = item.growthFactor * lv;
      return 1 - 1 / (1 + r);
    }
    case 'asymptotic_half': {
      const r = item.growthFactor * lv;
      return 0.5 * (1 - 1 / (1 + r));
    }
    case 'range_asymptotic': {
      const base = 150;
      const max = 400;
      const r = item.growthFactor * lv;
      return Math.ceil(base + (max - base) * (1 - 1 / (1 + r)));
    }
    default:
      return item.baseValue;
  }
}

/**
 * Lv → Lv+1 のコストを返す（切り上げ整数）。
 * cost(Lv) = baseCost × costGrowth^Lv
 */
export function calcCost(item: MachineUpgradeItem, lv: number): number {
  return Math.ceil(item.baseCost * Math.pow(item.costGrowth, lv));
}

/**
 * Lv → Lv+n の累積コストを返す（n 回分の和、切り上げ整数）。
 * 上限 (maxLv) を超える分は無視。
 */
export function calcCostForN(item: MachineUpgradeItem, currentLv: number, n: number): number {
  let total = 0;
  for (let i = 0; i < n; i++) {
    if (item.maxLv != null && currentLv + i >= item.maxLv) break;
    total += calcCost(item, currentLv + i);
  }
  return total;
}

/**
 * 残コインで購入可能な最大 Lv 数を返す。0 以上の整数。
 * maxLv がある場合はそれを上限とする。
 */
export function calcMaxAffordableLevels(
  item: MachineUpgradeItem,
  currentLv: number,
  available: number
): number {
  let bought = 0;
  let remaining = available;
  let lv = currentLv;
  while (true) {
    if (item.maxLv != null && lv >= item.maxLv) break;
    const cost = calcCost(item, lv);
    if (cost > remaining) break;
    remaining -= cost;
    lv += 1;
    bought += 1;
  }
  return bought;
}

/**
 * BigNum 残高で購入可能な最大 Lv 数を返す（インフレ対応版）。
 * Tier 後半でコストが BigNum スケールになっても安全に比較できる。
 */
export function calcMaxAffordableBigNum(
  item: MachineUpgradeItem,
  currentLv: number,
  available: BigNum
): number {
  let bought = 0;
  let remaining = available;
  let lv = currentLv;
  // 安全のため最大 10000 反復で止める（実用上 lv 上限はずっと少ないが念のため）
  for (let i = 0; i < 10000; i++) {
    if (item.maxLv != null && lv >= item.maxLv) break;
    const cost = BigNum.fromNumber(calcCost(item, lv));
    if (remaining.lt(cost)) break;
    remaining = remaining.sub(cost);
    lv += 1;
    bought += 1;
  }
  return bought;
}
