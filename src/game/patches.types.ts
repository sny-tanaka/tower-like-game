import type { EnemyKind } from '@/game/types';
import type { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// パッチ名・装着データ
// ---------------------------------------------------------------------------

export type PatchName =
  | 'instantKill'
  | 'bossKiller'
  | 'doubleShot'
  | 'damageImmune'
  | 'killHeal'
  | 'shieldRegen'
  | 'bonusDrop'
  | 'boltCast'
  | 'freezeHit'
  | 'burnHit';

export interface EquippedPatch {
  name: PatchName;
  tier: number;
}

// ---------------------------------------------------------------------------
// トリガー種別
// ---------------------------------------------------------------------------

/** パッチが発火するイベント種別 */
export type PatchTrigger =
  | { type: 'onAttack'; enemyKind: EnemyKind }
  | { type: 'onHit'; receivedDamage: BigNum }
  | { type: 'onKill'; enemyKind: EnemyKind }
  | { type: 'onDropRoll'; baseDrops: { screw: number; bolt: number; alloy: number } }
  | { type: 'interval'; deltaMs: number }
  /** ウェーブクリア時に 1 回 発火 (shieldRegen / boltCast 用) */
  | { type: 'onWaveClear' };

// ---------------------------------------------------------------------------
// パッチ効果
// ---------------------------------------------------------------------------

/** パッチ効果の結果 */
export interface PatchEffect {
  /** 出撃ダメージへの倍率上乗せ */
  damageMultiplier?: number;
  /** 即死フラグ */
  instantKill?: boolean;
  /** 被ダメをこの値に上書き（damageImmune で 0） */
  overrideReceivedDamage?: BigNum;
  /** HP 回復量 */
  heal?: BigNum;
  /** ドロップ倍率（bonusDrop） */
  dropMultiplier?: number;
  /**
   * boltCast による ボルト 獲得量 (currencies.addBolt に加算)。
   * onWaveClear で評価。
   */
  boltGain?: BigNum;
  /** 2 連射フラグ */
  extraShot?: boolean;
  /** 凍結発動 */
  freeze?: boolean;
  /** 凍結秒数 */
  freezeSec?: number;
  /** 燃焼発動（DoT 秒数） */
  burnSec?: number;
}
