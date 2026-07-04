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
  | { type: 'onKill'; enemyKind: EnemyKind; hpRegen: BigNum }
  | { type: 'onDropRoll'; baseDrops: { screw: number; bolt: number; alloy: number } }
  | { type: 'interval'; deltaMs: number }
  /**
   * ウェーブクリア時に 1 回 発火。
   * v1.5.0: shieldRegen / boltCast はパッシブ化 (getShieldRegenMultiplier /
   * getBoltGainMultiplier) されたため、 現在このトリガーで発火するパッチ効果はない。
   * 将来 onWaveClear 型パッチを追加する可能性を考慮して型自体は残す。
   */
  | { type: 'onWaveClear' };

// ---------------------------------------------------------------------------
// パッチ効果
// ---------------------------------------------------------------------------

/** パッチ効果の結果 */
export interface PatchEffect {
  /** 出撃ダメージへの倍率上乗せ */
  damageMultiplier?: number;
  /** 即死フラグ（対象への即死適用。従来どおり攻撃対象 1 体） */
  instantKill?: boolean;
  /**
   * instantKill のオーバーフロー分（p-1 以降の超過確率が繰り越した「追加即死数」）。
   * ループ側で「フィールド上の生存 normal 敵からランダムに N 体」即死させる。
   * マージは加算。
   */
  extraInstantKills?: number;
  /** HP 回復量 */
  heal?: BigNum;
  /**
   * ドロップ倍率（bonusDrop）。
   * `1 + rollOverflowCount(p, rng)` として算出済みの値（発動しなければ effect 自体を返さない = 従来どおり）。
   */
  dropMultiplier?: number;
  /**
   * boltCast による ボルト 獲得量 (currencies.addBolt に加算)。
   * onWaveClear で評価。
   */
  boltGain?: BigNum;
  /**
   * 追加発射数（doubleShot のオーバーフロー分）。
   * 最終ダメージは `damage × (1 + extraShots)` に一般化する。マージは加算。
   */
  extraShots?: number;
  /** 凍結発動 */
  freeze?: boolean;
  /** 凍結秒数 */
  freezeSec?: number;
  /** 燃焼発動（DoT 秒数） */
  burnSec?: number;
  /**
   * 燃焼 DoT 係数（与ダメに対する割合。0.30 = 30%/秒）。
   * マージは大きい方を採用。
   */
  burnDotFraction?: number;
}
