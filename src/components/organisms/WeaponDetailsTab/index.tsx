import styles from './style.module.scss';

import { WeaponPreview } from '@/components/molecules/WeaponPreview';
import type { WeaponStat } from '@/components/molecules/WeaponPreview';
import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { cannonStats } from '@/game/weapons/cannon';
import { CUTTER_BLADES, cutterStats } from '@/game/weapons/cutter';
import { LASER_UPPER_ENEMY_BONUS, laserStats } from '@/game/weapons/laser';
import { WEAPON_RANGE_PCT } from '@/game/weapons/range';
import {
  THUNDER_BASE_CHAIN_COUNT,
  THUNDER_STACK_DMG_PER_STACK,
  THUNDER_STACK_MAX,
  thunderStats,
} from '@/game/weapons/thunder';
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

/** machine の索敵距離 (機体共通の射程) を Lv から算出 (linear: 150→450px, +3/Lv, maxLv 100, v1.3.10) */
export function calcMachineRange(rangeLv: number): number {
  const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range');
  return item != null ? calcEffectValue(item, rangeLv) : 150;
}

/** machine の攻撃速度倍率を Lv から算出 (linear: 1.0 + 0.05/Lv、maxLv 99) */
export function calcMachineAttackSpeed(attackSpeedLv: number): number {
  const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'attackSpeed');
  return item != null ? calcEffectValue(item, attackSpeedLv) : 1;
}

/**
 * 武器ごとの実効射程 (m) を算出 = 中心からの **半径** (最大攻撃距離) をメートル換算。
 *
 * WEAPON_RANGE_PCT は **直径 %** のため、半径換算で /2 する:
 *   machineRange × WEAPON_RANGE_PCT[weapon] / 100 / 2
 *
 * v1.1.1 縮小後の値:
 *   Lv 0 (machineRange=150m):
 *     Cutter 10.89% → 8.2m   Laser/Thunder 27.22% → 20.4m   Cannon 35% → 26.3m
 *   Lv 100 (machineRange=300m, MAX):
 *     Cutter        → 16.3m  Laser/Thunder        → 40.8m   Cannon    → 52.5m
 */
export function calcEffectiveRange(
  weapon: 'laser' | 'cannon' | 'thunder' | 'cutter',
  machineRange: number
): number {
  return (machineRange * WEAPON_RANGE_PCT[weapon]) / 100 / 2;
}

// ---------------------------------------------------------------------------
// 各武器のステ配列生成
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// 武器固有 Lv 強化軸の計算ユーティリティ (v1.1.1 で各武器 1 軸だけ Lv で伸びる)
// ---------------------------------------------------------------------------

/** Laser Critical倍率ボーナス: +0.01 × Lv (Lv 100 で +1.0) */
export function calcLaserCritBonus(weaponLv: number): number {
  return Math.max(0, weaponLv) * 0.01;
}

/** Cannon splash 半径: 30 + 0.5 × Lv (px) */
export function calcCannonSplashRadius(weaponLv: number): number {
  return 30 + Math.max(0, weaponLv) * 0.5;
}

/** Thunder 攻撃時 HP 回復率 (%): 0.1% × Lv */
export function calcThunderHpRegenPct(weaponLv: number): number {
  return Math.max(0, weaponLv) * 0.1;
}

/** Cutter Overdrive 持続秒: 8 + 0.1 × Lv */
export function calcCutterOverdriveDurationSec(weaponLv: number): number {
  return 8 + Math.max(0, weaponLv) * 0.1;
}

// ---------------------------------------------------------------------------
// 各武器の表示用ステ配列生成 (v1.1.1: 固定ステ + Lv 軸 1 つを分けて表示)
// ---------------------------------------------------------------------------

/**
 * 武器カードは 4 ステ固定で表示する (v1.1.1):
 *   DMG / 連射速度 (Cutter は回転速度) / 射程 / 武器固有 Lv 軸
 *
 * 連射速度と射程はマシン強化を反映 (どちらもマシン強化に直接掛け算):
 *   - 連射速度 = weapon.attackPerSec × machine.attackSpeed (倍率)
 *   - 射程     = machine.range × WEAPON_RANGE_PCT[weapon] / 100 / 2 [m] (= 半径)
 */

export function buildLaserStats(
  weaponLv: number,
  baseAttack: number,
  machineRange: number,
  machineAttackSpeed: number
): WeaponStat[] {
  const s = laserStats(weaponLv);
  const effAS = s.attackPerSec * machineAttackSpeed;
  const effRange = calcEffectiveRange('laser', machineRange);
  return [
    { label: 'DMG', value: calcDisplayDamage(baseAttack, s.damageMul), accent: 'primary' },
    { label: '連射速度', value: round1(effAS), suffix: '/s' },
    { label: '射程', value: round1(effRange), suffix: 'm' },
    {
      label: 'Critical倍率ボーナス',
      value: `+${(calcLaserCritBonus(weaponLv) * 100).toFixed(0)}%`,
      accent: 'secondary',
    },
  ];
}

export function buildCannonStats(
  weaponLv: number,
  baseAttack: number,
  machineRange: number,
  machineAttackSpeed: number
): WeaponStat[] {
  const s = cannonStats(weaponLv);
  const effAS = s.attackPerSec * machineAttackSpeed;
  const effRange = calcEffectiveRange('cannon', machineRange);
  return [
    { label: 'DMG', value: calcDisplayDamage(baseAttack, s.damageMul), accent: 'primary' },
    { label: '連射速度', value: round1(effAS), suffix: '/s' },
    { label: '射程', value: round1(effRange), suffix: 'm' },
    { label: '爆発半径', value: round1(s.splashRadius), suffix: 'm', accent: 'secondary' },
  ];
}

export function buildThunderStats(
  weaponLv: number,
  baseAttack: number,
  machineRange: number,
  machineAttackSpeed: number
): WeaponStat[] {
  const s = thunderStats(weaponLv);
  const effAS = s.attackPerSec * machineAttackSpeed;
  const effRange = calcEffectiveRange('thunder', machineRange);
  return [
    { label: 'DMG', value: calcDisplayDamage(baseAttack, s.damageMul), accent: 'primary' },
    { label: '連射速度', value: round1(effAS), suffix: '/s' },
    { label: '射程', value: round1(effRange), suffix: 'm' },
    {
      label: 'HP 回復率',
      value: `${calcThunderHpRegenPct(weaponLv).toFixed(1)}%`,
      accent: 'secondary',
    },
  ];
}

export function buildCutterStats(
  weaponLv: number,
  baseAttack: number,
  machineRange: number,
  machineAttackSpeed: number
): WeaponStat[] {
  const s = cutterStats(weaponLv);
  const effAS = s.attackPerSec * machineAttackSpeed;
  const effRange = calcEffectiveRange('cutter', machineRange);
  return [
    { label: 'DMG', value: calcDisplayDamage(baseAttack, s.damageMul), accent: 'primary' },
    { label: '回転速度', value: round1(effAS), suffix: '/s' },
    { label: '射程', value: round1(effRange), suffix: 'm' },
    {
      label: 'Overdrive 持続',
      value: round1(calcCutterOverdriveDurationSec(weaponLv)),
      suffix: 's',
      accent: 'secondary',
    },
  ];
}

// ---------------------------------------------------------------------------
// 武器固定メタデータ
// ---------------------------------------------------------------------------

export interface WeaponMeta {
  kind: 'laser' | 'cannon' | 'thunder' | 'cutter';
  name: string;
  description: string;
  activeSkillDescription: string;
  buildStats: (
    lv: number,
    baseAttack: number,
    machineRange: number,
    machineAttackSpeed: number
  ) => WeaponStat[];
}

// description は実装定数を参照したテンプレートリテラルで構築する。
// 武器の固定値 (Thunder chainCount、 Cutter blades、 Laser 上位敵バフ倍率) が
// 将来変更されても、 ここの文面が自動で正しい値を指す = 取り残し防止。
const LASER_UPPER_ENEMY_BONUS_PCT = Math.round((LASER_UPPER_ENEMY_BONUS - 1) * 100);
const THUNDER_STACK_MAX_MUL_PCT = Math.round(THUNDER_STACK_DMG_PER_STACK * THUNDER_STACK_MAX * 100);

export const WEAPON_META: WeaponMeta[] = [
  {
    kind: 'laser',
    name: 'LASER',
    description: `単体特化の連射型レーザー (上位敵に +${LASER_UPPER_ENEMY_BONUS_PCT}% ダメ)`,
    activeSkillDescription: '直線上の敵を殲滅する高威力の極太ビームを放つ',
    buildStats: buildLaserStats,
  },
  {
    kind: 'cannon',
    name: 'CANNON',
    description: '爆発範囲にも複数ヒットする',
    activeSkillDescription: '周囲に5発の大きな砲撃を発射する',
    buildStats: buildCannonStats,
  },
  {
    kind: 'thunder',
    name: 'THUNDER',
    description: `最大${THUNDER_BASE_CHAIN_COUNT}体に同時落雷 (同じ敵への連続ヒットで最大 +${THUNDER_STACK_MAX_MUL_PCT}%)`,
    activeSkillDescription: '射程無限の全範囲攻撃',
    buildStats: buildThunderStats,
  },
  {
    kind: 'cutter',
    name: 'CUTTER',
    description: `マシンの周囲を回転する${CUTTER_BLADES}枚の刃`,
    activeSkillDescription: '一定時間回転速度と攻撃力が大幅に増加する',
    buildStats: buildCutterStats,
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
  const machineAttackSpeed = calcMachineAttackSpeed(machineLevels.attackSpeed);

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
          activeSkillDescription={meta.activeSkillDescription}
          stats={meta.buildStats(weaponLv, baseAttack, machineRange, machineAttackSpeed)}
          layout="wide"
        />
      ))}
    </div>
  );
}
