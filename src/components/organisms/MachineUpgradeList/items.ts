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
  growthType: 'multiply' | 'linear' | 'asymptotic' | 'asymptotic_half' | 'fixed_step';
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
    // v1.0.0 リバランス: base 100 → 10000 (敵 ATK 100× リスケールに伴う整合)
    baseValue: 10000,
    growthFactor: 1.02,
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    iconName: 'heart',
  },
  {
    key: 'hpRegen',
    title: 'HP リジェネ/秒',
    category: 'defense',
    // v1.0.0 リバランス: base 1 → 100 (+1 floor バグ修正 & 敵 ATK 100× との整合)
    baseValue: 100,
    growthFactor: 1.02,
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
    // v1.0.0 リバランス: 漸近 (100% 不到達) → 線形 +0.5%/Lv MAX Lv 196 = 0→98%
    // The Tower の Defense% 絶対 cap (98%) と同等の上限を採用。
    baseValue: 0,
    growthFactor: 0.005,
    growthType: 'linear',
    maxLv: 196,
    baseCost: 100,
    costGrowth: 1.1,
    unit: '%',
    iconName: 'shield',
  },
  {
    key: 'defense',
    title: '防御力',
    category: 'defense',
    // v1.0.0 リバランス: base 1 → 100 (+1 floor バグ修正 & 敵 ATK 100× との整合)
    baseValue: 100,
    growthFactor: 1.02,
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
    // v1.0.0 リバランス: base 1 → 100 (+1 floor バグ修正 & 敵 HP 100× との整合)
    baseValue: 100,
    growthFactor: 1.02,
    growthType: 'multiply',
    baseCost: 100,
    costGrowth: 1.1,
    iconName: 'laser',
  },
  {
    key: 'attackSpeed',
    title: '攻撃速度',
    category: 'offense',
    // v1.0.0 リバランス: 乗算無限 → 線形 +0.05/Lv MAX Lv 99 = 1.00→5.95×
    // The Tower の Workshop Attack Speed (99 Lv +0.05/Lv 5.95×) と同等の上限を採用。
    // 「明確な MAX を持つステ」 の代表格として攻撃速度をキャップ。
    baseValue: 1.0,
    growthFactor: 0.05,
    growthType: 'linear',
    maxLv: 99,
    baseCost: 100,
    costGrowth: 1.1,
    unit: '×',
    iconName: 'lightning',
  },
  {
    key: 'range',
    title: '索敵距離',
    category: 'offense',
    // v1.3.11: v1.3.10 で Lv 100 = 450 に倒したが旧仕様 (Lv 100 = 300) が正なので合わせ直し。
    // base=150 / +1.5px/Lv / maxLv=100 で Lv 100 = 300px ハードキャップ。
    // 旧仕様 (range_asymptotic, base=150 / max=450 / α=0.01 / maxLv=100) も Lv 100 で 300 だった
    // (理論上限 450 は ∞ Lv 漸近値で到達不可)。 v1.3.10 でその「理論上限 450」 を実 cap に
    // 引き上げてしまったのを元に戻し、 純粋な線形のまま到達可能 cap=300 で揃える。
    // 倍率換算 (WEAPON_RANGE_PCT × range / 150) は Lv 0 で 1.0 / Lv 100 で 2.0。
    baseValue: 150,
    growthFactor: 1.5,
    growthType: 'linear',
    maxLv: 100,
    baseCost: 100,
    costGrowth: 1.1,
    unit: 'px',
    iconName: 'target',
  },
  {
    key: 'critRate',
    title: 'Critical率',
    category: 'offense',
    // v1.0.0 リバランス: 漸近 (100% 不到達) → 線形 +0.5%/Lv MAX Lv 160 = 0→80%
    // The Tower の Critical Chance Workshop MAX (80%) と同等の上限を採用。
    baseValue: 0,
    growthFactor: 0.005,
    growthType: 'linear',
    maxLv: 160,
    baseCost: 100,
    costGrowth: 1.1,
    unit: '%',
    iconName: 'target',
  },
  {
    key: 'critMultiplier',
    title: 'Critical倍率',
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
    // v1.0.0 リバランス: CD 漸近 (50% に近づくのみ) → 線形 +0.5%/Lv MAX Lv 100 = 0→50%
    // 旧仕様の事実上の上限 50% を、 達成可能な MAX として明確化。
    baseValue: 0,
    growthFactor: 0.005,
    growthType: 'linear',
    maxLv: 100,
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
    growthFactor: 0.08, // 線形 +0.08 / Lv（乗算でベースドロップ確率に掛かる）
    growthType: 'linear',
    baseCost: 200, // 経済系 base=200
    costGrowth: 1.15,
    unit: '×',
    iconName: 'spark',
    // Lv 50 で 1.0 + 0.08×50 = 5.0 倍 → ボス素 20% × 5.0 = 100% (確定ドロップ)
    maxLv: 50,
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
    costGrowth: 10, // Lv ごとに ×10 (Lv 0→1: 2k / 1→2: 20k / 2→3: 200k / 3→4: 2M / 4→5: 20M)
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
 *
 * v1.0.0: 旧バージョンでは Math.max(1, ...) で「最低 +1 保証」 をしていたが、
 * baseValue=1.0 の項目 (旧 baseAttack / defense / hpRegen / attackSpeed) で
 * 「Lv ごとに必ず +1」 となり、 ×1.02/Lv の設計意図を大きく超える指数爆発
 * (Lv 10 で 11× → Cannon マシンガン化) を引き起こしていた。
 * v1.0.0 で +1 floor を撤廃し、 純粋な ceil 差分に戻した。
 * 同時に baseValue を 1 → 100 (HP は 10000) に rebase することで、
 * 整数 baseValue でも各 Lv の差分が安定して +1〜+3 になる。
 *
 * NOTE: 浮動小数誤差で 100 × 1.02 = 102.0000...18 のように ceil で +1 ずれることがあるため、
 *       EPSILON を引いてから ceil する。
 */
const MULTIPLY_EPSILON = 1e-9;
function multiplyDelta(baseValue: number, growthFactor: number, k: number): number {
  const cur = Math.ceil(baseValue * Math.pow(growthFactor, k) - MULTIPLY_EPSILON);
  const prev = Math.ceil(baseValue * Math.pow(growthFactor, k - 1) - MULTIPLY_EPSILON);
  return cur - prev;
}

/**
 * 指定 Lv での効果値を返す。
 * - multiply: value(0) = ceil(baseValue)、 value(Lv) = value(Lv-1) + multiplyDelta(base, factor, Lv)
 *             v1.0.0 から +1 floor を撤廃し、 純粋な指数差分。
 * - linear / fixed_step: baseValue + growthFactor × min(Lv, maxLv)
 *             maxLv 指定時は Lv をクランプして MAX 値を超えないようにする。
 * - asymptotic: r = growthFactor × Lv, 値 = 1 - 1/(1+r)（割合、0〜1）※v1.0.0 でいずれの項目も未使用
 * - asymptotic_half: r = growthFactor × Lv, 値 = 0.5 × (1 - 1/(1+r))（割合、0〜0.5）※v1.0.0 で未使用
 *
 * v1.3.10: 旧 'range_asymptotic' は削除 (range は 'linear' + maxLv=100 に統一)。
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
    case 'fixed_step': {
      const cappedLv = item.maxLv != null ? Math.min(lv, item.maxLv) : lv;
      return item.baseValue + item.growthFactor * cappedLv;
    }
    case 'asymptotic': {
      const r = item.growthFactor * lv;
      return 1 - 1 / (1 + r);
    }
    case 'asymptotic_half': {
      const r = item.growthFactor * lv;
      return 0.5 * (1 - 1 / (1 + r));
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
