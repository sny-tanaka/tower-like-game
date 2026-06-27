import type { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 敵の種別
// ---------------------------------------------------------------------------

/**
 * 上位敵の種別。
 * - normal:   通常敵（Standard / Swift / Tough のサブタイプを含む）
 * - elite:    エリート（W5 / W15 / W25 に出現）
 * - miniboss: ミニボス（W10 / W20 に出現）
 * - boss:     Tier ボス（W30 で出現。撃破で次 Tier 解放）
 */
export type EnemyKind = 'normal' | 'elite' | 'miniboss' | 'boss';

/**
 * 通常敵のサブタイプ。
 * - standard: 基準。バランス型 (HP×1.0, ATK×1.0, SPD×1.0)
 * - swift:    高速タイプ (HP×0.6, ATK×0.5, SPD×2.0)
 * - tough:    タンクタイプ (HP×5.0, ATK×1.0, SPD×0.5)
 */
export type NormalSubtype = 'standard' | 'swift' | 'tough';

// ---------------------------------------------------------------------------
// 敵テンプレート / スポーン済み敵
// ---------------------------------------------------------------------------

export interface EnemyTemplate {
  kind: EnemyKind;
  /** normal の場合のサブタイプ（elite/miniboss/boss は undefined） */
  subtype?: NormalSubtype;
  hp: BigNum;
  atk: BigNum;
  /** 移動速度 px/s（UI 用の内部物理単位） */
  speed: number;
  /** 撃破時の獲得通貨（T² スケール適用前のベース値） */
  reward: {
    screw: number;
    bolt: number;
    /** 超合金ドロップ確率（0-1）。確定は 1.0 */
    alloyChance: number;
    alloyAmount: number;
  };
}

/**
 * `MutableEnemy` の constructor 引数。 旧 `SpawnedEnemy` interface 相当の plain object 型。
 *
 * v1.3.7 (Phase 3-A): mutation 対象を field 単位で明示するため class 化したが、 既存の
 * `spawnEnemy()` などは依然 plain object を返している。 `MutableEnemy` は class method を
 * 持たず field のみで構成しているため、 structural typing 上 plain object とも互換であり、
 * 既存呼び出しを書き換えずに済む。
 */
export interface SpawnedEnemyInit extends EnemyTemplate {
  id: string;
  spawnedAtMs: number;
  position: { x: number; y: number };
  maxHp: BigNum;
  hp: BigNum;
  frozenUntilMs?: number;
  burnUntilMs?: number;
  burnPerSec?: BigNum;
  burnAccumulatorMs?: number;
  thunderStacks?: number;
  hitRadius: number;
}

/**
 * バトル中に位置・HP・状態異常が更新される「敵」 のクラス表現。
 *
 * v1.3.7 (Phase 3-A): 旧 `interface SpawnedEnemy` を class 化。 不変フィールド (id / kind /
 * subtype / speed / reward / hitRadius / spawnedAtMs / maxHp / atk) は `readonly`、 可変
 * フィールド (hp / position / 状態異常タイマー類) は readonly なし。 `position` はオブジェクト
 * 自体は差し替え可能だが、 x / y を直接書き換えても良い (Phase 3-B で in-place mutation を
 * 使う前提)。
 *
 * 重要 (構造的型互換): 本 class は method を一切持たず、 field 宣言のみで構成する。 これに
 * より plain object とも structural typing 上互換となり、 `export type SpawnedEnemy =
 * MutableEnemy` と書いても既存の plain object を返す `spawnEnemy()` などをそのまま使い続け
 * られる (Phase 3-A では「クラス定義の導入」 にとどめ、 actual instantiation は Phase 3-B
 * 以降)。
 *
 * 各 field の意味は旧 `interface SpawnedEnemy` のコメントを参照。
 */
export class MutableEnemy {
  // ---- 不変フィールド ----
  readonly id: string;
  readonly kind: EnemyKind;
  readonly subtype?: NormalSubtype;
  readonly speed: number;
  readonly reward: {
    screw: number;
    bolt: number;
    alloyChance: number;
    alloyAmount: number;
  };
  readonly hitRadius: number;
  readonly spawnedAtMs: number;
  readonly maxHp: BigNum;
  readonly atk: BigNum;

  // ---- 可変フィールド (Phase 3-B で in-place mutation を使う) ----
  hp: BigNum;
  /**
   * 位置 (パーセント 0-100)。 オブジェクトは readonly ではない (差し替え可)
   * かつ x / y も書き換え可能 (mutate in place)。
   */
  position: { x: number; y: number };
  frozenUntilMs?: number;
  burnUntilMs?: number;
  burnPerSec?: BigNum;
  burnAccumulatorMs?: number;
  thunderStacks?: number;

  constructor(init: SpawnedEnemyInit) {
    this.id = init.id;
    this.kind = init.kind;
    this.subtype = init.subtype;
    this.speed = init.speed;
    this.reward = init.reward;
    this.hitRadius = init.hitRadius;
    this.spawnedAtMs = init.spawnedAtMs;
    this.maxHp = init.maxHp;
    this.atk = init.atk;
    this.hp = init.hp;
    this.position = init.position;
    this.frozenUntilMs = init.frozenUntilMs;
    this.burnUntilMs = init.burnUntilMs;
    this.burnPerSec = init.burnPerSec;
    this.burnAccumulatorMs = init.burnAccumulatorMs;
    this.thunderStacks = init.thunderStacks;
  }
}

/**
 * 既存コードからの import 互換のため、 `SpawnedEnemy` は `MutableEnemy` の type alias として
 * 残す。 `MutableEnemy` が field のみで構成されているため、 plain object も structural typing
 * 上代入可能 (= `spawnEnemy()` の戻り値型変更が不要)。
 */
export type SpawnedEnemy = MutableEnemy;

// ---------------------------------------------------------------------------
// ウェーブスケジュール
// ---------------------------------------------------------------------------

export interface WaveSchedule {
  /** Tier 内ウェーブ番号（1〜30） */
  waveIndex: number;
  tier: number;
  /** ウェーブ持続時間（秒）。デフォルト 26 秒（仕様: ウェーブ間隔 26 秒） */
  durationSec: number;
  /** 通常敵のスポーン間隔（秒/体）。SPAWN_base / WAVE_SPAWN_FACTOR(W) で計算 */
  spawnIntervalSec: number;
  /** このウェーブで出現する通常敵のサブタイプ選択確率テーブル */
  normalSpawnTable: NormalSpawnRow[];
  /** ウェーブ末尾に上位敵が出るか（elite / miniboss / boss） */
  eliteKind?: 'elite' | 'miniboss' | 'boss';
}

/** 通常敵スポーンの出現確率行 */
export interface NormalSpawnRow {
  subtype: NormalSubtype;
  /** 0-1 の確率（合計は 1.0 になること） */
  weight: number;
}

// ---------------------------------------------------------------------------
// Tier 設定
// ---------------------------------------------------------------------------

export interface TierConfig {
  tier: number;
  /** T1W1 Standard を基準とした Tier N の基礎 HP */
  baseHp: BigNum;
  /** T1W1 Standard を基準とした Tier N の基礎 ATK */
  baseAtk: BigNum;
  /** HP の Tier ごとの成長倍率（1.8） */
  hpGrowth: number;
  /** ATK の Tier ごとの成長倍率（1.4） */
  atkGrowth: number;
}
