import { TIER_BASE, tierBaseHp, tierBaseAtk, waveHpFactor, waveAtkFactor } from './tier';
import type { EnemyKind, EnemyTemplate, NormalSubtype, SpawnedEnemy } from './types';

// ---------------------------------------------------------------------------
// 通常敵サブタイプ係数（07-enemies-tiers.md より）
// ---------------------------------------------------------------------------

/** 通常敵サブタイプごとの HP 倍率 */
const NORMAL_HP_MULT: Record<NormalSubtype, number> = {
  standard: 1.0,
  swift: 0.6,
  tough: 5.0,
};

/** 通常敵サブタイプごとの ATK 倍率 */
const NORMAL_ATK_MULT: Record<NormalSubtype, number> = {
  standard: 1.0,
  swift: 0.5,
  tough: 1.0,
};

/** 通常敵サブタイプごとの SPD 倍率 */
const NORMAL_SPD_MULT: Record<NormalSubtype, number> = {
  standard: 1.0,
  swift: 2.0,
  tough: 0.5,
};

// ---------------------------------------------------------------------------
// 上位敵の倍率（07-enemies-tiers.md より）
// ---------------------------------------------------------------------------

/** 上位敵の HP 倍率（Standard を ×1 として） */
const UPPER_HP_MULT: Record<Exclude<EnemyKind, 'normal'>, number> = {
  elite: 10,
  miniboss: 50,
  boss: 250,
};

/** 上位敵の ATK 倍率 */
const UPPER_ATK_MULT: Record<Exclude<EnemyKind, 'normal'>, number> = {
  elite: 2.5,
  miniboss: 5,
  boss: 8,
};

// ---------------------------------------------------------------------------
// 報酬ベース値（02-currencies.md T1W1 想定のドロップテーブル）
// ---------------------------------------------------------------------------

/** 通常敵サブタイプごとの基礎ネジドロップ */
const NORMAL_SCREW_REWARD: Record<NormalSubtype, number> = {
  standard: 1,
  swift: 2,
  tough: 5,
};

/** 通常敵サブタイプごとの基礎ボルトドロップ（50% で獲得） */
const NORMAL_BOLT_BASE: Record<NormalSubtype, number> = {
  standard: 1,
  swift: 2,
  tough: 5,
};

// ---------------------------------------------------------------------------
// createEnemyTemplate
// ---------------------------------------------------------------------------

/**
 * Tier × ウェーブ番号 × 種類 × サブタイプ（normal のみ）から敵テンプレートを生成する。
 *
 * HP(T, W, type) = HP_base × TYPE_HP(type) × HP_growth^(T-1) × WAVE_HP_FACTOR(W)
 * ATK(T, W, type) = ATK_base × TYPE_ATK(type) × ATK_growth^(T-1) × WAVE_ATK_FACTOR(W)
 */
export function createEnemyTemplate(
  tier: number,
  waveIndex: number,
  kind: EnemyKind,
  subtype?: NormalSubtype,
): EnemyTemplate {
  const baseHp = tierBaseHp(tier);
  const baseAtk = tierBaseAtk(tier);
  const hpFactor = waveHpFactor(waveIndex);
  const atkFactor = waveAtkFactor(waveIndex);

  if (kind === 'normal') {
    const st = subtype ?? 'standard';
    const hp = baseHp.mulNumber(NORMAL_HP_MULT[st]).mulNumber(hpFactor);
    const atk = baseAtk.mulNumber(NORMAL_ATK_MULT[st]).mulNumber(atkFactor);
    const speed = TIER_BASE.SPD * NORMAL_SPD_MULT[st];

    return {
      kind: 'normal',
      subtype: st,
      hp,
      atk,
      speed,
      reward: {
        screw: NORMAL_SCREW_REWARD[st],
        bolt: NORMAL_BOLT_BASE[st],
        alloyChance: 0,
        alloyAmount: 0,
      },
    };
  }

  // elite / miniboss / boss
  const upperKind = kind as Exclude<EnemyKind, 'normal'>;
  const hp = baseHp.mulNumber(UPPER_HP_MULT[upperKind]).mulNumber(hpFactor);
  const atk = baseAtk.mulNumber(UPPER_ATK_MULT[upperKind]).mulNumber(atkFactor);
  const speed = TIER_BASE.SPD; // 上位敵は standard 速度（仕様に特記なし）

  let screw: number;
  let bolt: number;
  let alloyChance: number;
  let alloyAmount: number;

  if (kind === 'elite') {
    screw = 10;
    bolt = 10;
    alloyChance = 0.3;
    alloyAmount = 1;
  } else if (kind === 'miniboss') {
    screw = 50;
    bolt = 50;
    alloyChance = 1.0;
    alloyAmount = 1;
  } else {
    // boss
    screw = 250;
    bolt = 250;
    alloyChance = 1.0;
    alloyAmount = 5;
  }

  return {
    kind,
    hp,
    atk,
    speed,
    reward: {
      screw,
      bolt,
      alloyChance,
      alloyAmount,
    },
  };
}

// ---------------------------------------------------------------------------
// spawnEnemy
// ---------------------------------------------------------------------------

/**
 * テンプレートからスポーン済み敵を生成する。
 * 位置はランダムだが rng（引数）で再現可能。
 *
 * @param template  createEnemyTemplate で作成したテンプレート
 * @param id        一意の ID（呼び出し元が生成）
 * @param spawnedAtMs  ラン開始からの経過 ms
 * @param rng       0〜1 の擬似乱数関数（テスト再現性のため外部注入）
 */
export function spawnEnemy(
  template: EnemyTemplate,
  id: string,
  spawnedAtMs: number,
  rng: () => number,
): SpawnedEnemy {
  // 画面端（x=0 or x=100）からランダムに出現、y はランダムに配置
  // x: 0（左端）or 100（右端）をランダムに選択
  const x = rng() < 0.5 ? 0 : 100;
  const y = rng() * 100; // 0〜100% の範囲

  return {
    ...template,
    id,
    spawnedAtMs,
    position: { x, y },
  };
}

// ---------------------------------------------------------------------------
// T² 報酬スケール（02-currencies.md: 通貨ドロップは Tier² 倍率）
// ---------------------------------------------------------------------------

/**
 * 撃破報酬をTier² スケールで補正した値を返す。
 * ゲームロジック側でこの関数を使って実際の獲得量を計算する。
 */
export function scaledReward(
  baseAmount: number,
  tier: number,
): number {
  return baseAmount * tier * tier;
}

// 型の再エクスポートはしない（index.ts でまとめる）
// 内部ユーティリティ: 上位敵の倍率テーブルを外から参照したい場合のみエクスポート
export { UPPER_HP_MULT, UPPER_ATK_MULT, NORMAL_HP_MULT, NORMAL_ATK_MULT, NORMAL_SPD_MULT };

