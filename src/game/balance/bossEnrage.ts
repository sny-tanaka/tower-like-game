/**
 * Tier ボス (W30) のソフトエンレイジ (v1.5.0)。
 *
 * 「耐久していればいつか勝てる」構造の排除。 **Tier ボスのみ** が対象
 * (elite / miniboss は対象外)。
 *
 * - ボス出現から `BOSS_ENRAGE_GRACE_SEC` (60 秒) 間は等倍 (猶予)。
 * - 以降 `BOSS_ENRAGE_STEP_SEC` (30 秒) ごとに ATK を `BOSS_ENRAGE_STEP_MUL` (×1.4)
 *   累積乗算する (上限なし)。
 * - 凍結・ノックバック中もタイマー (= ボス出現からの経過時間) は進行する
 *   (特別扱いしない = 呼び出し側は spawnedAtMs 基準の経過秒をそのまま渡すだけでよい)。
 *
 * | 経過 | stage | 倍率 |
 * |---:|---:|---:|
 * | 0〜59.99 秒 | 0 | ×1.0 |
 * | 90 秒 | 1 | ×1.4 |
 * | 120 秒 | 2 | ×1.96 |
 * | 180 秒 | 4 | ×3.84 |
 * | 300 秒 | 8 | ×14.76 |
 *
 * 仕様参照: design-docs/tower-like-game/15-balance-v1.5.0.md §2.1
 */

import { BigNum } from '@/lib/bignum';

/** エンレイジ発動までの猶予秒数 (この間は等倍) */
export const BOSS_ENRAGE_GRACE_SEC = 60;

/** エンレイジ発動後、 段階が 1 つ進むごとの秒数 */
export const BOSS_ENRAGE_STEP_SEC = 30;

/** エンレイジ 1 段階あたりの ATK 倍率基数 (累積乗算) */
export const BOSS_ENRAGE_STEP_MUL = 1.4;

/**
 * ボス出現からの経過秒からエンレイジ段階数を求める。
 *
 * @param elapsedSecSinceSpawn  ボス出現からの経過秒
 * @returns エンレイジ段階数 (0 = 未発動)
 */
export function bossEnrageStage(elapsedSecSinceSpawn: number): number {
  const over = Math.max(0, elapsedSecSinceSpawn - BOSS_ENRAGE_GRACE_SEC);
  return Math.floor(over / BOSS_ENRAGE_STEP_SEC);
}

/**
 * ボス出現からの経過秒から ATK 倍率を求める (`BOSS_ENRAGE_STEP_MUL ^ stage`)。
 *
 * @param elapsedSecSinceSpawn  ボス出現からの経過秒
 * @returns ATK 倍率 (1.0 以上)
 */
export function bossEnrageMultiplier(elapsedSecSinceSpawn: number): number {
  const stage = bossEnrageStage(elapsedSecSinceSpawn);
  return Math.pow(BOSS_ENRAGE_STEP_MUL, stage);
}

/**
 * ボスの ATK にエンレイジ倍率を乗算した「実効 ATK」を返す (読み取り時のみの乗算、
 * 元の `atk` は mutate しない)。
 *
 * `enemy.kind === 'boss'` の場合のみ呼び出すこと (elite / miniboss は対象外)。
 *
 * @param atk                    敵の素の ATK (BigNum)
 * @param elapsedSecSinceSpawn   ボス出現からの経過秒
 * @returns エンレイジ適用後の実効 ATK (BigNum)
 */
export function applyBossEnrageToAtk(atk: BigNum, elapsedSecSinceSpawn: number): BigNum {
  return atk.mulNumber(bossEnrageMultiplier(elapsedSecSinceSpawn));
}
