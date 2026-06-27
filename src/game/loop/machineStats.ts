import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { calcTierDiffAttackMul } from '@/game/balance/tierDiffAttackMul';
import type { MachineStats } from '@/game/damage.types';
import { BigNum } from '@/lib/bignum';
import type { MachineLevels } from '@/store/slices/machine';

/**
 * useBattleLoop が calcOutgoingDamage / 各武器の normalAttack に渡す MachineStats を構築する。
 *
 * 永続強化 (machine slice の machineLevels) と RunWorkshop で適用済みの machineMaxHp を
 * 組み合わせて MachineStats (BigNum / number) を返す。
 *
 * - baseAttack / defense / hpRegen は multiply (累積差分式) を BigNum 化して渡す
 * - damageReduction / critRate / critMultiplier は number (0〜1 や倍率)
 * - maxHp だけは RunWorkshop hpMul の倍率を適用済みの値 (battle slice machineMaxHp) を流す
 */
export interface BuildMachineStatsOpts {
  /** machineMaxHp (= base × RunWorkshop hpMul) を MachineStats.maxHp に流す */
  machineMaxHp: BigNum;
  /** 永続強化 Lv (machine slice) */
  machineLevels: MachineLevels;
  /**
   * Tier 差分による baseAttack バフ用 (v1.3.4)。 最新未クリア Tier (store.highestTier)。
   * 省略時は 0 (差 0 → 倍率 1.0) で扱う。
   */
  highestTier?: number;
  /**
   * Tier 差分による baseAttack バフ用 (v1.3.4)。 出撃中 Tier (store.currentTier)。
   * highestTier との差が大きいほど baseAttack が指数的に増える (基数 1.2)。
   * 省略時は 0 (差 0 → 倍率 1.0) で扱う。
   */
  currentTier?: number;
}

/** MACHINE_UPGRADE_ITEMS から指定 key の item を引いて Lv → 値を返すヘルパー */
function effect(key: string, lv: number, fallback: number): number {
  const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === key);
  if (item == null) return fallback;
  return calcEffectValue(item, lv);
}

export function buildMachineStats({
  machineMaxHp,
  machineLevels,
  highestTier = 0,
  currentTier = 0,
}: BuildMachineStatsOpts): MachineStats {
  // v1.0.0 リバランス: fallback 値も baseValue rebase に追随
  //   baseAttack / defense / hpRegen: 1 → 100
  //   maxHp: 1 → 10000
  //   attackSpeed: Lv 0 値は 1.0 のまま
  // v1.3.4: 最高 Tier 更新インセンティブとして、 baseAttack に
  //   1.2^(highestTier - currentTier) の累積倍率を乗算する。
  //   仕様: src/game/balance/tierDiffAttackMul.ts
  const baseAttackRaw = effect('baseAttack', machineLevels.baseAttack, 100);
  const tierDiffMul = calcTierDiffAttackMul(highestTier, currentTier);
  return {
    baseAttack: BigNum.fromNumber(baseAttackRaw).mulNumber(tierDiffMul),
    defense: BigNum.fromNumber(effect('defense', machineLevels.defense, 100)),
    damageReduction: effect('damageReduction', machineLevels.damageReduction, 0),
    critRate: effect('critRate', machineLevels.critRate, 0),
    critMultiplier: effect('critMultiplier', machineLevels.critMultiplier, 1.5),
    maxHp: machineMaxHp.isZero() ? BigNum.fromNumber(10000) : machineMaxHp,
    hpRegen: BigNum.fromNumber(effect('hpRegen', machineLevels.hpRegen, 100)),
    attackSpeed: effect('attackSpeed', machineLevels.attackSpeed, 1),
    activePower: effect('activePower', machineLevels.activePower, 1),
    activeCdReduction: effect('activeCdReduction', machineLevels.activeCdReduction, 0),
    // 索敵距離 (range_asymptotic): Lv 0 = 150、漸近上限 400 (px)
    range: effect('range', machineLevels.range, 150),
  };
}
