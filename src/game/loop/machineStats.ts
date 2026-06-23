import type { MachineStats } from '@/game/damage.types';
import { BigNum } from '@/lib/bignum';

/**
 * useBattleLoop が calcOutgoingDamage / 各武器の normalAttack に渡す MachineStats
 * を構築するヘルパー。
 *
 * 現状は永続強化 (machine slice) からの値反映が未配線のため、 暫定的に baseAttack
 * 等は placeholder の最低値を使う。 machineMaxHp だけ battle slice の値を
 * 渡せるようにしている。
 *
 * 永続強化の各値 (baseAttack / defense / damageReduction / critRate / critMultiplier
 * / hpRegen) を machine slice から取り込む置き換えは別 issue で対応する。
 */
export interface BuildMachineStatsOpts {
  /** machineMaxHp (= base × RunWorkshop hpMul) を MachineStats.maxHp に流す */
  machineMaxHp: BigNum;
}

const PLACEHOLDER_BASE_ATTACK = 10;
const PLACEHOLDER_CRIT_RATE = 0.05;
const PLACEHOLDER_CRIT_MULTIPLIER = 1.5;

export function buildMachineStats({ machineMaxHp }: BuildMachineStatsOpts): MachineStats {
  return {
    baseAttack: BigNum.fromNumber(PLACEHOLDER_BASE_ATTACK),
    defense: BigNum.ZERO,
    damageReduction: 0,
    critRate: PLACEHOLDER_CRIT_RATE,
    critMultiplier: PLACEHOLDER_CRIT_MULTIPLIER,
    maxHp: machineMaxHp.isZero() ? BigNum.fromNumber(1) : machineMaxHp,
    hpRegen: BigNum.ZERO,
  };
}
