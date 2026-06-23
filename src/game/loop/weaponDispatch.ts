import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { cannonStats, cannonNormalAttack } from '@/game/weapons/cannon';
import { cutterStats, cutterNormalAttack } from '@/game/weapons/cutter';
import { laserStats, laserNormalAttack } from '@/game/weapons/laser';
import { thunderStats, thunderNormalAttack } from '@/game/weapons/thunder';
import type { BigNum } from '@/lib/bignum';
import type { WeaponType } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// 各武器の hit 形式を統一して扱うための共通インターフェース
// ---------------------------------------------------------------------------

export interface UnifiedHit {
  enemyId: string;
  damage: BigNum;
  crit?: boolean;
}

export interface UnifiedAttackResult {
  hits: UnifiedHit[];
}

// ---------------------------------------------------------------------------
// attackPerSec 取得 (現在 Lv に対する基本値)
//   useBattleLoop 側で attackSpeedMul を乗算して実 attackPerSec にする
// ---------------------------------------------------------------------------

export function getAttackPerSec(weapon: WeaponType, weaponLv: number): number {
  switch (weapon) {
    case 'laser':
      return laserStats(weaponLv).attackPerSec;
    case 'cannon':
      return cannonStats(weaponLv).attackPerSec;
    case 'thunder':
      return thunderStats(weaponLv).attackPerSec;
    case 'cutter':
      return cutterStats(weaponLv).attackPerSec;
  }
}

// ---------------------------------------------------------------------------
// 武器発射: 現在装備武器の normalAttack を呼び、 共通フォーマット (hits[]) で返す
//
//   RunWorkshop attackMul は呼び出し側で stats.damageMul に乗算済みとして渡す。
//   ここでは weaponLv → stats → boostedStats を内部で組み立てる。
// ---------------------------------------------------------------------------

export interface FireWeaponOpts {
  weapon: WeaponType;
  weaponLv: number;
  machine: MachineStats;
  enemiesInRange: SpawnedEnemy[];
  rng: () => number;
  /** Cutter 専用: 現在の旋回角度 (度)。 他武器では無視 */
  cutterAngleDeg?: number;
  /** RunWorkshop attackMul の倍率 (1.0 で素通し) */
  attackMul: number;
}

export function fireWeapon({
  weapon,
  weaponLv,
  machine,
  enemiesInRange,
  rng,
  cutterAngleDeg = 0,
  attackMul,
}: FireWeaponOpts): UnifiedAttackResult {
  switch (weapon) {
    case 'laser': {
      const s = laserStats(weaponLv);
      const boosted = { ...s, damageMul: s.damageMul * attackMul };
      const r = laserNormalAttack(machine, boosted, enemiesInRange, rng);
      return {
        hits: r.hits.map((h) => ({ enemyId: h.enemyId, damage: h.damage, crit: h.crit })),
      };
    }
    case 'cannon': {
      const s = cannonStats(weaponLv);
      const boosted = { ...s, damageMul: s.damageMul * attackMul };
      const r = cannonNormalAttack(machine, boosted, enemiesInRange, rng);
      return {
        hits: r.hits.map((h) => ({ enemyId: h.enemyId, damage: h.damage, crit: h.crit })),
      };
    }
    case 'thunder': {
      const s = thunderStats(weaponLv);
      const boosted = { ...s, damageMul: s.damageMul * attackMul };
      const r = thunderNormalAttack(machine, boosted, enemiesInRange, rng);
      return {
        hits: r.hits.map((h) => ({ enemyId: h.enemyId, damage: h.damage, crit: h.crit })),
      };
    }
    case 'cutter': {
      const s = cutterStats(weaponLv);
      const boosted = { ...s, damageMul: s.damageMul * attackMul };
      const r = cutterNormalAttack(machine, boosted, enemiesInRange, cutterAngleDeg, rng);
      return {
        hits: r.hits.map((h) => ({ enemyId: h.enemyId, damage: h.damage, crit: h.crit })),
      };
    }
  }
}
