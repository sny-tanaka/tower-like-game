import type { IconName } from '@/components/atoms/Icon';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type RunWorkshopKey = 'attackMul' | 'attackSpeedMul' | 'hpMul' | 'screwGainMul';

/** RunWorkshop 4 項目の現在 Lv マップ */
export type RunWorkshopLevels = {
  [K in RunWorkshopKey]: number;
};

export interface RunWorkshopItem {
  key: RunWorkshopKey;
  title: string;
  iconName: IconName;
  /** Lv 0 → Lv 1 のコスト計算に使う base */
  baseCost: number;
  /** コスト上昇率 (cost(Lv) = baseCost × costGrowth^Lv) */
  costGrowth: number;
}

// ---------------------------------------------------------------------------
// 4 項目定義
// 仕様: design-docs/tower-like-game/04-run-workshop.md
//   主 3 項目: base=10, growth=1.30
//   ネジ獲得倍率: base=50, growth=1.40
// ---------------------------------------------------------------------------

export const RUN_WORKSHOP_ITEMS: readonly RunWorkshopItem[] = [
  {
    key: 'attackMul',
    title: '攻撃力倍率',
    iconName: 'laser',
    baseCost: 10,
    costGrowth: 1.3,
  },
  {
    key: 'attackSpeedMul',
    title: '攻撃速度倍率',
    iconName: 'lightning',
    baseCost: 10,
    costGrowth: 1.3,
  },
  {
    key: 'hpMul',
    title: 'HP 倍率',
    iconName: 'heart',
    baseCost: 10,
    costGrowth: 1.3,
  },
  {
    key: 'screwGainMul',
    title: 'ネジ獲得倍率',
    iconName: 'screw',
    baseCost: 50,
    costGrowth: 1.4,
  },
];

// ---------------------------------------------------------------------------
// ヘルパー: コスト計算
// ---------------------------------------------------------------------------

/**
 * Lv → Lv+1 のコストを返す（切り上げ整数）。
 * cost(Lv) = baseCost × costGrowth^Lv
 */
export function calcRunWorkshopCost(item: RunWorkshopItem, lv: number): number {
  return Math.ceil(item.baseCost * Math.pow(item.costGrowth, lv));
}

/**
 * 指定 Lv での倍率を返す。
 * 倍率 = 1.0 + 0.1 × Lv（全項目共通）
 */
export function calcRunWorkshopMultiplier(lv: number): number {
  return 1.0 + 0.1 * lv;
}

/**
 * +delta Lv 分のコスト合計を計算する。
 */
export function calcRunWorkshopMultiLvCost(
  item: RunWorkshopItem,
  currentLv: number,
  delta: number
): number {
  let total = 0;
  for (let i = 0; i < delta; i++) {
    total += calcRunWorkshopCost(item, currentLv + i);
  }
  return total;
}

/**
 * 現在のネジ残高（BigNum）で購入可能な最大 Lv 数と合計コスト (BigNum) を返す。
 */
export function calcRunWorkshopMaxLv(
  item: RunWorkshopItem,
  currentLv: number,
  availableScrew: BigNum
): { lvDelta: number; totalCost: BigNum } {
  let totalCost = BigNum.ZERO;
  let lvDelta = 0;
  while (true) {
    const cost = BigNum.fromNumber(calcRunWorkshopCost(item, currentLv + lvDelta));
    const next = totalCost.add(cost);
    if (next.gt(availableScrew)) break;
    totalCost = next;
    lvDelta++;
    // 念のため上限（現実的に十分大きい数）
    if (lvDelta >= 10000) break;
  }
  return { lvDelta, totalCost };
}
