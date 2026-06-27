import {
  TIER_BASE,
  tierBaseHp,
  tierBaseAtk,
  tierScrewFactor,
  waveHpFactor,
  waveAtkFactor,
  waveScrewFactor,
} from './tier';
import { MutableEnemy } from './types';
import type { EnemyKind, EnemyTemplate, NormalSubtype, SpawnedEnemy } from './types';

// ---------------------------------------------------------------------------
// 通常敵サブタイプ係数（07-enemies-tiers.md より）
// ---------------------------------------------------------------------------

/** 通常敵サブタイプごとの HP 倍率 */
export const NORMAL_HP_MULT: Record<NormalSubtype, number> = {
  standard: 1.0,
  swift: 0.6,
  tough: 5.0,
};

/** 通常敵サブタイプごとの ATK 倍率 */
export const NORMAL_ATK_MULT: Record<NormalSubtype, number> = {
  standard: 1.0,
  swift: 0.5,
  tough: 1.0,
};

/** 通常敵サブタイプごとの SPD 倍率 */
export const NORMAL_SPD_MULT: Record<NormalSubtype, number> = {
  standard: 1.0,
  swift: 2.0,
  tough: 0.5,
};

// ---------------------------------------------------------------------------
// 上位敵の倍率（07-enemies-tiers.md より）
// ---------------------------------------------------------------------------

/** 上位敵の HP 倍率（Standard を ×1 として） */
export const UPPER_HP_MULT: Record<Exclude<EnemyKind, 'normal'>, number> = {
  elite: 10,
  miniboss: 30,
  boss: 60,
};

/**
 * 上位敵の ATK 倍率 (v1.3.1 で全種別を強化、 ノックバック距離も同倍率で連動)。
 * - elite: 2.5 → 3.0 (×1.2)
 * - miniboss: 5 → 7.5 (×1.5)
 * - boss: 8 → 24 (×3.0、 重い一撃感を更に強める追加調整)
 */
export const UPPER_ATK_MULT: Record<Exclude<EnemyKind, 'normal'>, number> = {
  elite: 3.0,
  miniboss: 7.5,
  boss: 24,
};

/** 上位敵の SPD 倍率 (v1.3.1: boss は 0.1 → 0.12 で ×1.2 加速) */
export const UPPER_SPD_MULT: Record<Exclude<EnemyKind, 'normal'>, number> = {
  elite: 0.5,
  miniboss: 0.2,
  boss: 0.12,
};

/**
 * 敵のヒット判定半径 (% フィールド = 敵 position 0-100 と同じ単位系) v1.3.1。
 *
 * 各武器の距離判定で `dist ≤ targetRadius + enemy.hitRadius` を使うことで、 ボスのような
 * 大きいスプライトの端を弾が通ったときも命中扱いになる (v1.3.1 以前は中心点のみ判定で乖離していた)。
 *
 * 単位換算: ENEMY_SIZE_CQMIN (端末 cqmin 単位 = root 短辺の %) は field 短辺
 * (`width:140cqmin / height:140cqmin`) との比で field 内座標 % に変換する。
 *   hitRadius (field %) = ENEMY_SIZE_CQMIN / 140 / 2 × 0.8
 * = (描画直径 / field 短辺) × 100 / 2 × 0.8
 * = 描画半径 (field 短辺基準 %) × 0.8
 *
 * 係数 0.8 は「描画より一回り内側で判定」 = ギリギリ掠めは外す、 8 割中以内で命中。
 *
 * - normal:   1.03% (= 3.6 / 140 / 2 × 0.8、 standard 基準)
 * - elite:    1.91% (= 6.7 / 140 / 2 × 0.8)
 * - miniboss: 2.63% (= 9.2 / 140 / 2 × 0.8)
 * - boss:     6.17% (= 21.6 / 140 / 2 × 0.8、 v1.3.1 ボスサイズ拡大込み)
 *
 * 適用武器: Cannon splash / Cutter 旋回 / Laser Mega Beam (これら以外の通常攻撃は最寄り敵を
 * 選定して必中するため hitRadius を加味しなくても問題なし)。
 */
export const ENEMY_HIT_RADIUS_PCT: Record<EnemyKind, number> = {
  normal: 1.03,
  elite: 1.91,
  miniboss: 2.63,
  boss: 6.17,
};

/** 上位敵の基礎ドロップ報酬 */
export const UPPER_REWARD: Record<
  Exclude<EnemyKind, 'normal'>,
  { screw: number; bolt: number; alloyChance: number; alloyAmount: number }
> = {
  elite: { screw: 10, bolt: 10, alloyChance: 0.3, alloyAmount: 1 },
  miniboss: { screw: 50, bolt: 50, alloyChance: 1.0, alloyAmount: 1 },
  boss: { screw: 250, bolt: 250, alloyChance: 1.0, alloyAmount: 5 },
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
  subtype?: NormalSubtype
): EnemyTemplate {
  const baseHp = tierBaseHp(tier);
  const baseAtk = tierBaseAtk(tier);
  const hpFactor = waveHpFactor(waveIndex);
  const atkFactor = waveAtkFactor(waveIndex);

  // screw ドロップは wave / tier 進行でスケール (ラン中強化の進行速度確保)
  const screwScale = waveScrewFactor(waveIndex) * tierScrewFactor(tier);

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
        screw: Math.max(1, Math.round(NORMAL_SCREW_REWARD[st] * screwScale)),
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
  const speed = TIER_BASE.SPD * UPPER_SPD_MULT[upperKind];

  const baseReward = UPPER_REWARD[upperKind];

  return {
    kind,
    hp,
    atk,
    speed,
    reward: {
      ...baseReward,
      screw: Math.max(1, Math.round(baseReward.screw * screwScale)),
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
  rng: () => number
): SpawnedEnemy {
  // 画面端（x=0 or x=100）からランダムに出現、y はランダムに配置
  // x: 0（左端）or 100（右端）をランダムに選択
  const x = rng() < 0.5 ? 0 : 100;
  const y = rng() * 100; // 0〜100% の範囲

  // v1.3.7 (Phase 3-B): `MutableEnemy` のインスタンスを返す (plain object → class)。
  // tick 内で `enemy.hp = ...` 等の field 直書きを安全に行うため、 型と実体を class に
  // 揃える (= structural typing 互換に頼らない)。
  return new MutableEnemy({
    ...template,
    id,
    spawnedAtMs,
    position: { x, y },
    maxHp: template.hp,
    thunderStacks: 0,
    hitRadius: ENEMY_HIT_RADIUS_PCT[template.kind],
  });
}

// ---------------------------------------------------------------------------
// T² 報酬スケール（02-currencies.md: 通貨ドロップは Tier² 倍率）
// ---------------------------------------------------------------------------

/**
 * 撃破報酬をTier² スケールで補正した値を返す。
 * ゲームロジック側でこの関数を使って実際の獲得量を計算する。
 */
export function scaledReward(baseAmount: number, tier: number): number {
  return baseAmount * tier * tier;
}
