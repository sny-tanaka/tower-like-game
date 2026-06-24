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

export interface SpawnedEnemy extends EnemyTemplate {
  /** ウェーブ内でユニークな ID */
  id: string;
  /** ラン開始からの経過 ms */
  spawnedAtMs: number;
  /** 位置をパーセントで表現（0-100） */
  position: { x: number; y: number };
  /**
   * spawn 時点の最大 HP (= template.hp のスナップショット)。
   * HP バーの残量比 (current / max) 算出に使う。 現在 HP (hp) が減っても変わらない。
   */
  maxHp: BigNum;
  /**
   * 凍結解除時刻 (ラン開始からの経過 ms)。
   * 現在の経過 ms より大きい間、 敵は移動を停止する (近接ダメは止めない仕様)。
   * 期限切れ後は undefined に戻る。
   */
  frozenUntilMs?: number;
  /** 燃焼継続終了時刻 (ラン開始からの経過 ms)。 期限切れ後は undefined に戻る */
  burnUntilMs?: number;
  /** 燃焼中の毎秒ダメージ量 (BigNum)。 burnUntilMs と組で有効 */
  burnPerSec?: BigNum;
  /**
   * 燃焼 tick 用の累積 ms。 BigNum は整数演算で `mulNumber(deltaSec)` が天井丸めされて
   * 60FPS で +60 倍暴走するため、 HP リジェネと同様に「1 秒ごとに `burnPerSec` を 1 回適用」
   * する累積カウンタを敵ごとに持つ。 burn 付与時に 0 リセット、 期限切れで undefined。
   */
  burnAccumulatorMs?: number;
}

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
