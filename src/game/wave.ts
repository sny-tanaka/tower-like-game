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

  // 上位敵スポーン: ウェーブの終了 1 秒前（UPPER_ENEMY_LEAD_SEC = 1）に出現
  const UPPER_ENEMY_LEAD_SEC = 1;
  const upperSpawnSec = schedule.durationSec - UPPER_ENEMY_LEAD_SEC;

  // 通常敵スポーン
  // boss wave (W30): ボス出現以降も通常敵を湧かせるが「通常 wave の半分の頻度」 に落とす。
  // 実装: ボス出現タイミング (upperSpawnSec) 以降は spawnIntervalSec を 2 倍にする。
  // 累積本数は「ボス出現前: 通常テンポ、 ボス出現後: 半テンポ」 の合算で計算する。
  // advanceTier は bossAlive===false で判定する (decideWaveAdvance) ので、 ボス出現後に
  // 通常敵が湧き続けても tier クリアを阻害しない (= ボスさえ倒せば残雑魚は無視できる)。
  const BOSS_NORMAL_SPAWN_INTERVAL_MUL = 2;
  const normalCount =
    schedule.eliteKind === 'boss'
      ? countBossNormalSpawns(
          elapsedSec,
          upperSpawnSec,
          schedule.spawnIntervalSec,
          BOSS_NORMAL_SPAWN_INTERVAL_MUL
        )
      : Math.floor(elapsedSec / schedule.spawnIntervalSec);
  const prevNormalCount =
    schedule.eliteKind === 'boss'
      ? countBossNormalSpawns(
          prevElapsedSec,
          upperSpawnSec,
          schedule.spawnIntervalSec,
          BOSS_NORMAL_SPAWN_INTERVAL_MUL
        )
      : Math.floor(prevElapsedSec / schedule.spawnIntervalSec);
  const toSpawn = normalCount - prevNormalCount;

  for (let i = 0; i < toSpawn; i++) {
    const subtype = pickSubtype(schedule.normalSpawnTable, rng);
    const template = createEnemyTemplate(schedule.tier, schedule.waveIndex, 'normal', subtype);
    spawns.push(spawnEnemy(template, idGenerator(), elapsedMs, rng));
  }

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
 * boss wave での通常敵累積スポーン数を計算する。
 * - 0〜upperSpawnSec: 通常テンポ (intervalSec)
 * - upperSpawnSec〜: 半テンポ (intervalSec × intervalMul)
 *
 * elapsedSec が upperSpawnSec 未満なら、 通常テンポでの累積数のみ。
 * elapsedSec が upperSpawnSec 以上なら、 upperSpawnSec までの通常テンポ累積数 +
 * その後の半テンポ累積数 を合算して返す。
 */
function countBossNormalSpawns(
  elapsedSec: number,
  upperSpawnSec: number,
  intervalSec: number,
  intervalMul: number
): number {
  if (elapsedSec <= 0) return 0;
  if (elapsedSec <= upperSpawnSec) {
    return Math.floor(elapsedSec / intervalSec);
  }
  const beforeBoss = Math.floor(upperSpawnSec / intervalSec);
  const afterBossSec = elapsedSec - upperSpawnSec;
  const afterBossInterval = intervalSec * intervalMul;
  const afterBoss = Math.floor(afterBossSec / afterBossInterval);
  return beforeBoss + afterBoss;
}

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
