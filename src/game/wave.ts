import { createEnemyTemplate } from './enemies';
import { spawnEnemy } from './enemies';
import { TIER_BASE, waveSpawnFactor } from './tier';
import type { WaveSchedule, NormalSpawnRow, SpawnedEnemy } from './types';

// ---------------------------------------------------------------------------
// ウェーブ定数（07-enemies-tiers.md より）
// ---------------------------------------------------------------------------

/** 1 Tier 内のウェーブ数 */
const WAVES_PER_TIER = 30;

/** ウェーブ持続時間（秒）。仕様: ウェーブ間隔 26 秒 */
export const WAVE_DURATION_SEC = 26;

// ---------------------------------------------------------------------------
// 通常敵の出現テーブル
// ---------------------------------------------------------------------------

/**
 * ウェーブ番号に応じた通常敵スポーンテーブルを返す（07-enemies-tiers.md）。
 * W1〜W4: Standard 100%
 * W5〜W9: Standard 70%, Swift 30%
 * W10〜W30: Standard 50%, Swift 30%, Tough 20%
 */
function buildNormalSpawnTable(waveIndex: number): NormalSpawnRow[] {
  if (waveIndex <= 4) {
    return [{ subtype: 'standard', weight: 1.0 }];
  } else if (waveIndex <= 9) {
    return [
      { subtype: 'standard', weight: 0.7 },
      { subtype: 'swift', weight: 0.3 },
    ];
  } else {
    return [
      { subtype: 'standard', weight: 0.5 },
      { subtype: 'swift', weight: 0.3 },
      { subtype: 'tough', weight: 0.2 },
    ];
  }
}

// ---------------------------------------------------------------------------
// buildTierWaves
// ---------------------------------------------------------------------------

/**
 * Tier N の全ウェーブスケジュール（30 波分）を生成する。
 *
 * ウェーブ進行（07-enemies-tiers.md）:
 * - W1〜W4:  通常（Standard のみ）
 * - W5:      エリート + 通常
 * - W6〜W9:  通常（Standard + Swift）
 * - W10:     ミニボス + 通常
 * - W11〜W14: 通常（3 タイプ）
 * - W15:     エリート + 通常
 * - W16〜W19: 通常（3 タイプ）
 * - W20:     ミニボス + 通常
 * - W21〜W24: 通常（3 タイプ）
 * - W25:     エリート + 通常
 * - W26〜W29: 通常（3 タイプ）
 * - W30:     Tier ボス
 */
export function buildTierWaves(tier: number): WaveSchedule[] {
  const schedules: WaveSchedule[] = [];

  for (let w = 1; w <= WAVES_PER_TIER; w++) {
    const spawnFactor = waveSpawnFactor(w);
    // SPAWN_INTERVAL(W) = SPAWN_base / WAVE_SPAWN_FACTOR(W)
    const spawnIntervalSec = TIER_BASE.SPAWN_INTERVAL / spawnFactor;
    const normalTable = buildNormalSpawnTable(w);

    let eliteKind: WaveSchedule['eliteKind'];
    if (w === 5 || w === 15 || w === 25) {
      eliteKind = 'elite';
    } else if (w === 10 || w === 20) {
      eliteKind = 'miniboss';
    } else if (w === 30) {
      eliteKind = 'boss';
    }

    schedules.push({
      waveIndex: w,
      tier,
      durationSec: WAVE_DURATION_SEC,
      spawnIntervalSec,
      normalSpawnTable: normalTable,
      eliteKind,
    });
  }

  return schedules;
}

// ---------------------------------------------------------------------------
// getSpawnsAtTime（pull モデル）
// ---------------------------------------------------------------------------

/**
 * ウェーブスケジュールと現在の経過時刻から、
 * 「その tick（1 回の呼び出し間隔）でスポーンすべき敵リスト」を返す。
 *
 * シンプルな pull モデル:
 * - 経過時刻から「これまでにスポーンすべきだった通常敵の累積数」を計算し、
 *   前回取得分との差分だけスポーンさせる。
 * - 上位敵（elite / miniboss / boss）は waveIndex の末尾 1 秒前後に出現する。
 *   ここでは「ウェーブ終了時刻 - UPPER_ENEMY_LEAD_SEC」で判定する。
 *
 * @param schedule       buildTierWaves で生成したスケジュール
 * @param elapsedMs      ウェーブ開始からの経過ミリ秒
 * @param prevElapsedMs  前回 getSpawnsAtTime を呼んだときの経過ミリ秒（差分計算用）
 * @param rng            0〜1 の擬似乱数（再現性のため外部注入）
 * @param idGenerator    ユニーク ID 生成関数（外部注入）
 */
export function getSpawnsAtTime(
  schedule: WaveSchedule,
  elapsedMs: number,
  prevElapsedMs: number,
  rng: () => number,
  idGenerator: () => string
): SpawnedEnemy[] {
  const spawns: SpawnedEnemy[] = [];
  const elapsedSec = elapsedMs / 1000;
  const prevElapsedSec = prevElapsedMs / 1000;

  // 通常敵スポーン
  const normalCount = Math.floor(elapsedSec / schedule.spawnIntervalSec);
  const prevNormalCount = Math.floor(prevElapsedSec / schedule.spawnIntervalSec);
  const toSpawn = normalCount - prevNormalCount;

  for (let i = 0; i < toSpawn; i++) {
    const subtype = pickSubtype(schedule.normalSpawnTable, rng);
    const template = createEnemyTemplate(schedule.tier, schedule.waveIndex, 'normal', subtype);
    spawns.push(spawnEnemy(template, idGenerator(), elapsedMs, rng));
  }

  // 上位敵スポーン: ウェーブの終了 1 秒前（UPPER_ENEMY_LEAD_SEC = 1）に出現
  const UPPER_ENEMY_LEAD_SEC = 1;
  const upperSpawnSec = schedule.durationSec - UPPER_ENEMY_LEAD_SEC;

  if (
    schedule.eliteKind !== undefined &&
    prevElapsedSec < upperSpawnSec &&
    elapsedSec >= upperSpawnSec
  ) {
    const template = createEnemyTemplate(schedule.tier, schedule.waveIndex, schedule.eliteKind);
    spawns.push(spawnEnemy(template, idGenerator(), elapsedMs, rng));
  }

  return spawns;
}

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

/**
 * 重み付きランダムでサブタイプを選択する。
 * rng() が 0〜1 の一様乱数を返すことを前提とする。
 */
function pickSubtype(table: NormalSpawnRow[], rng: () => number): import('./types').NormalSubtype {
  const r = rng();
  let cumulative = 0;
  for (const row of table) {
    cumulative += row.weight;
    if (r < cumulative) {
      return row.subtype;
    }
  }
  // 浮動小数の誤差で到達した場合は最後のサブタイプを返す
  return table[table.length - 1]!.subtype;
}
