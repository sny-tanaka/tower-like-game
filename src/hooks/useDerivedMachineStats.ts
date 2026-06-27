import { useMemo } from 'react';

import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// useDerivedMachineStats
// ---------------------------------------------------------------------------
//
// v1.3.7 Phase 5: Page から「マシン索敵距離 (px)」 と「マシン攻撃速度倍率」 の useMemo /
// machineLevels selector を撤去し、 hook に集約する。
//
// 旧 Page 側:
//   const machineLevels = useStore((s) => s.machineLevels);
//   const machineRangePx = useMemo(() => calcEffectValue(rangeItem, machineLevels.range), [...]);
//   const machineAttackSpeedMul = useMemo(() => calcEffectValue(asItem, machineLevels.attackSpeed),
//     [...]);
//
// 新:
//   const { machineRangePx, machineAttackSpeedMul } = useDerivedMachineStats();
//
// 利点:
//   - 「machineLevels.range」 / 「machineLevels.attackSpeed」 だけをピンポイント subscribe する
//     (= 他の machineLevels フィールドの更新では再 render しない)
//   - Page の useStore selector が 1 本減る (machineLevels 全体)
//   - 派生計算ロジックがテスト可能な hook 単位に閉じ込められる
//
// ---------------------------------------------------------------------------

/**
 * マシン強化「索敵範囲」 のデフォルト値 (Lv 0)。
 * MACHINE_UPGRADE_ITEMS から item が見つからなかった fallback で使う。
 */
export const DEFAULT_MACHINE_RANGE_PX = 150;

/**
 * マシン強化「攻撃速度」 のデフォルト倍率 (Lv 0)。
 * MACHINE_UPGRADE_ITEMS から item が見つからなかった fallback で使う。
 */
export const DEFAULT_MACHINE_ATTACK_SPEED_MUL = 1;

export interface DerivedMachineStats {
  /**
   * マシン索敵距離 (px)。 range_asymptotic: 150 → 450 px (Lv 100 で 300)。
   * BattleField の `range` props は **直径 %** = `WEAPON_RANGE_PCT × (machineRangePx / 150)` で計算する。
   */
  machineRangePx: number;
  /**
   * マシン強化「攻撃速度」 倍率 (linear: 1.0 + 0.05/Lv, maxLv 99)。
   * Cutter の rotateMs / その他武器の attackPerSec 等で使う。
   */
  machineAttackSpeedMul: number;
}

/**
 * マシン強化レベルからの派生計算 (索敵距離 / 攻撃速度倍率)。
 *
 * Page から「machineLevels 全体」 を subscribe していた箇所を、 hook 内部で
 * 「machineLevels.range」 「machineLevels.attackSpeed」 にピンポイント subscribe するように
 * 変更したため、 他のマシン強化レベル変化 (e.g. activeCdReduction) で Page が再 render しなくなる。
 */
export function useDerivedMachineStats(): DerivedMachineStats {
  const rangeLv = useStore((s) => s.machineLevels.range);
  const attackSpeedLv = useStore((s) => s.machineLevels.attackSpeed);

  const machineRangePx = useMemo(() => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range');
    if (item == null) return DEFAULT_MACHINE_RANGE_PX;
    return calcEffectValue(item, rangeLv);
  }, [rangeLv]);

  const machineAttackSpeedMul = useMemo(() => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'attackSpeed');
    if (item == null) return DEFAULT_MACHINE_ATTACK_SPEED_MUL;
    return calcEffectValue(item, attackSpeedLv);
  }, [attackSpeedLv]);

  return { machineRangePx, machineAttackSpeedMul };
}
