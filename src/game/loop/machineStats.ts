import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
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
}: BuildMachineStatsOpts): MachineStats {
  return {
    baseAttack: BigNum.fromNumber(effect('baseAttack', machineLevels.baseAttack, 1)),
    defense: BigNum.fromNumber(effect('defense', machineLevels.defense, 1)),
    damageReduction: effect('damageReduction', machineLevels.damageReduction, 0),
    critRate: effect('critRate', machineLevels.critRate, 0),
    critMultiplier: effect('critMultiplier', machineLevels.critMultiplier, 1.5),
    maxHp: machineMaxHp.isZero() ? BigNum.fromNumber(1) : machineMaxHp,
    hpRegen: BigNum.fromNumber(effect('hpRegen', machineLevels.hpRegen, 1)),
  };
}
