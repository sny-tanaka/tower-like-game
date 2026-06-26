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
  /**
   * Cutter 専用: sweep 内で刃が敵の角度に達するまでの進行率 (0〜1)。
   * useBattleLoop は DamagePopFx の発火を `progressInSweep × intervalMs` だけ遅延させて
   * 視覚と pop の同期を取る。 他武器では undefined。
   */
  progressInSweep?: number;
  /**
   * Thunder 専用: このヒット後に書き戻すべきスタック数 (1〜THUNDER_STACK_MAX)。
   * useBattleLoop が enemy.thunderStacks に反映する。 他武器では undefined。
   */
  thunderStackAfter?: number;
}

export interface UnifiedAttackResult {
  hits: UnifiedHit[];
  /**
   * 単一着弾点 (現在は cannon のみ設定)。 1 ショットで splash 範囲の複数敵に当たっても、
   * 物理的に飛翔する砲弾は 1 個。 useBattleLoop はこの座標を起点に砲弾飛翔 + 爆発の
   * Fx を 1 セットだけ生成する。
   */
  impactX?: number;
  impactY?: number;
  /**
   * 更新後の刃の角度 (cutter のみ設定)。 useBattleLoop は cutterAngleDegRef に書き戻して
   * 次フレームの fire / 描画 (CutterOrbitFx) に反映する。
   */
  cutterAngle?: number;
  /**
   * Cannon 専用: 発射した砲弾の splash 着弾遅延情報 (v1.1.2)。
   * 発射時には hits は空で、 useBattleLoop が pendingCannonShells に積んで
   * 着弾時 (= flightSec 後) に cannonApplySplash で実ヒットを計算する。
   * flightSec は射撃時の敵速度と shell 速度から予測した飛翔秒数。
   */
  cannonShell?: {
    isCrit: boolean;
    splashRadius: number;
    damageMul: number;
    flightSec: number;
  };
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
  /**
   * Cutter 専用: Overdrive 中のダメージ倍率 (default 1)。
   * cutterStartOverdrive が返す OverdriveState.damageMul を渡す。
   * Overdrive 非アクティブ時は 1。
   */
  cutterOverdriveDamageMul?: number;
}

export function fireWeapon({
  weapon,
  weaponLv,
  machine,
  enemiesInRange,
  rng,
  cutterAngleDeg = 0,
  attackMul,
  cutterOverdriveDamageMul = 1,
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
      // v1.1.2: 発射時は着弾点 + クリ + splash メタデータだけ返す。
      // 実 splash ヒットは着弾時に useBattleLoop が cannonApplySplash で計算する。
      const r = cannonNormalAttack(machine, boosted, enemiesInRange, rng);
      return {
        hits: [],
        impactX: r.blastX,
        impactY: r.blastY,
        cannonShell: {
          isCrit: r.isCrit,
          splashRadius: r.splashRadius,
          damageMul: r.damageMul,
          flightSec: r.flightSec,
        },
      };
    }
    case 'thunder': {
      const s = thunderStats(weaponLv);
      const boosted = { ...s, damageMul: s.damageMul * attackMul };
      const r = thunderNormalAttack(machine, boosted, enemiesInRange, rng);
      return {
        hits: r.hits.map((h) => ({
          enemyId: h.enemyId,
          damage: h.damage,
          crit: h.crit,
          thunderStackAfter: h.stackAfter,
        })),
      };
    }
    case 'cutter': {
      const s = cutterStats(weaponLv);
      // Cutter Overdrive 中は damageMul × overdriveDamageMul (= 3) を追加で乗算
      const boosted = {
        ...s,
        damageMul: s.damageMul * attackMul * cutterOverdriveDamageMul,
      };
      const r = cutterNormalAttack(machine, boosted, enemiesInRange, cutterAngleDeg, rng);
      return {
        hits: r.hits.map((h) => ({
          enemyId: h.enemyId,
          damage: h.damage,
          crit: h.crit,
          progressInSweep: h.progressInSweep,
        })),
        cutterAngle: r.angle,
      };
    }
  }
}
