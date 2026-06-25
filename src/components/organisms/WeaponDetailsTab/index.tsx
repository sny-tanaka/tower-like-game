import styles from './style.module.scss';

import { WeaponPreview } from '@/components/molecules/WeaponPreview';
import type { WeaponStat } from '@/components/molecules/WeaponPreview';
import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { cannonStats } from '@/game/weapons/cannon';
import { cutterStats } from '@/game/weapons/cutter';
import { laserStats } from '@/game/weapons/laser';
import { thunderStats } from '@/game/weapons/thunder';
import { BigNum } from '@/lib/bignum';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// 武器ステ計算ユーティリティ
// game/weapons の Stats 関数を経由してゲーム実値と完全一致させる。
// DMG = machine.baseAttack × weapon.damageMul、 連射速度 = weapon.attackPerSec。
// 仕様: design-docs/tower-like-game/05-weapons.md
// ---------------------------------------------------------------------------

/** 数値を小数 1 桁に丸める (表示用) */
function round1(v: number): number {
  return Math.round(v * 10) / 10;
}

/**
 * 実ダメージ表示用: ゲーム本体と同じ BigNum 計算式 (整数演算 + 端数切り上げ) で
 * baseAttack × damageMul を出して文字列化する。 表示専用に Math.round で number 化すると
 * 例えば baseAttack=1 × damageMul=0.4 が 0 になってしまい、 実際のダメージ (= 1) と乖離する。
 *
 * v1.0.0: BigNum スケール (baseAttack base 100 リベース) になったので toString ではなく
 * toDisplay() でアルファベット表記 ("10.00A" 等) にする。
 */
function calcDisplayDamage(baseAttack: number, damageMul: number): string {
  return BigNum.fromNumber(baseAttack).mulNumber(damageMul).toDisplay();
}

/** machine の基礎攻撃力を Lv から算出 (UI 表示用) */
export function calcMachineBaseAttack(baseAttackLv: number): number {
  const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'baseAttack');
  return item != null ? calcEffectValue(item, baseAttackLv) : 1;
}

/** machine の索敵距離 (機体共通の射程) を Lv から算出 */
export function calcMachineRange(rangeLv: number): number {
  const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range');
  return item != null ? calcEffectValue(item, rangeLv) : 150;
}

// ---------------------------------------------------------------------------
// 各武器のステ配列生成
// ---------------------------------------------------------------------------

export function buildLaserStats(
  weaponLv: number,
  baseAttack: number,
  machineRange: number
): WeaponStat[] {
  const s = laserStats(weaponLv);
  return [
    { label: 'DMG', value: calcDisplayDamage(baseAttack, s.damageMul), accent: 'primary' },
    { label: '貫通', value: s.pierce },
    { label: '射程', value: machineRange, suffix: 'm' },
    { label: '連射速度', value: round1(s.attackPerSec), suffix: '/s' },
  ];
}

export function buildCannonStats(
  weaponLv: number,
  baseAttack: number,
  machineRange: number
): WeaponStat[] {
  const s = cannonStats(weaponLv);
  return [
    { label: 'DMG', value: calcDisplayDamage(baseAttack, s.damageMul), accent: 'primary' },
    { label: '爆発半径', value: round1(s.splashRadius), suffix: 'm' },
    { label: '射程', value: machineRange, suffix: 'm' },
    { label: '連射速度', value: round1(s.attackPerSec), suffix: '/s' },
  ];
}

export function buildThunderStats(
  weaponLv: number,
  baseAttack: number,
  machineRange: number
): WeaponStat[] {
  const s = thunderStats(weaponLv);
  return [
    { label: 'DMG', value: calcDisplayDamage(baseAttack, s.damageMul), accent: 'primary' },
    { label: 'ターゲット数', value: s.chainCount },
    { label: '射程', value: machineRange, suffix: 'm' },
    { label: '連射速度', value: round1(s.attackPerSec), suffix: '/s' },
  ];
}

export function buildCutterStats(weaponLv: number, baseAttack: number): WeaponStat[] {
  const s = cutterStats(weaponLv);
  return [
    { label: 'DMG', value: calcDisplayDamage(baseAttack, s.damageMul), accent: 'primary' },
    { label: '回転半径', value: round1(s.orbitRadius), suffix: 'm' },
    { label: '刃の数', value: s.blades },
    { label: '回転速度', value: round1(s.attackPerSec), suffix: '/s' },
  ];
}

// ---------------------------------------------------------------------------
// 武器固定メタデータ
// ---------------------------------------------------------------------------

interface WeaponMeta {
  kind: 'laser' | 'cannon' | 'thunder' | 'cutter';
  name: string;
  description: string;
  buildStats: (lv: number, baseAttack: number, machineRange: number) => WeaponStat[];
}

const WEAPON_META: WeaponMeta[] = [
  {
    kind: 'laser',
    name: 'LASER',
    description: '弾速が速く貫通する',
    buildStats: buildLaserStats,
  },
  {
    kind: 'cannon',
    name: 'CANNON',
    description: '爆発時に範囲内にもダメージ',
    buildStats: buildCannonStats,
  },
  {
    kind: 'thunder',
    name: 'THUNDER',
    description: '複数の敵を同時に攻撃',
    buildStats: buildThunderStats,
  },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: 'マシンの周辺を回転する刃で攻撃',
    buildStats: (lv, baseAttack) => buildCutterStats(lv, baseAttack),
  },
];

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function WeaponDetailsTab() {
  const weaponLv = useStore((s) => s.weaponLv);
  const machineLevels = useStore((s) => s.machineLevels);
  const baseAttack = calcMachineBaseAttack(machineLevels.baseAttack);
  const machineRange = calcMachineRange(machineLevels.range);

  return (
    <div
      className={styles.tab}
      role="tabpanel"
      aria-label="武器詳細"
    >
      {WEAPON_META.map((meta) => (
        <WeaponPreview
          key={meta.kind}
          weapon={meta.kind}
          name={meta.name}
          description={meta.description}
          stats={meta.buildStats(weaponLv, baseAttack, machineRange)}
          layout="wide"
        />
      ))}
    </div>
  );
}
