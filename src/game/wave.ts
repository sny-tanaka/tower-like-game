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
// waveQuota（v1.5.0: Wave クォータ制）
// ---------------------------------------------------------------------------

/**
 * ウェーブで湧く通常敵の総数（クォータ）を返す（design-docs/15-balance-v1.5.0.md §3）。
 *
 * `N(W) = floor(durationSec / spawnIntervalSec)`。
 * 現行の pull モデル（`Math.floor(elapsedSec / spawnIntervalSec)`）で
 * `elapsedSec = durationSec` まで進めたときの累積数と完全に一致する定義であり、
 * 湧き総量は現行と変わらない（wave.test.ts で実測して保証する）。
 *
 * boss wave (W30) はクォータ制の適用外（呼び出し側で使用しないこと）。
 */
export function waveQuota(schedule: WaveSchedule): number {
  return Math.floor(schedule.durationSec / schedule.spawnIntervalSec);
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
 * v1.5.0（Wave クォータ制、design-docs/15-balance-v1.5.0.md §3）:
 * - boss wave (W30) 以外は、「その wave で実際に湧いた通常敵の累積数」(`spawnedNormalCount`、
 *   呼び出し側が tick を跨いで保持) を基準にした pull モデルで湧かす:
 *   `target = min(quota, max(timeBasedCount, spawnedNormalCount + (fieldEmpty ? 1 : 0)))`、
 *   `toSpawn = max(0, target - spawnedNormalCount)`。
 *   前倒し分が spawnedNormalCount に反映されるため二重湧きが構造的に起きず、
 *   総湧き数は必ず quota 以下（= 湧き総量は現行と同一）。
 * - `fieldEmpty=true`（場に生存敵が 0）かつクォータ未消化なら +1 体前倒しで湧く
 *   （撃破連鎖の前倒し湧き。1 tick に前倒しで湧くのは 1 体のみ）。
 * - 上位敵は「通常の 25 秒（durationSec - 1）」または
 *   「実クォータを湧き切り済み (spawnedNormalCount >= quota) かつ fieldEmpty」の早い方で
 *   スポーンする。既に湧いた場合は `upperSpawned=true` を渡して重複スポーンを防ぐ。
 * - prevElapsedMs は boss wave（W30、現行の prev/current 差分方式を維持）と
 *   上位敵の時刻跨ぎ判定でのみ使用する。
 *
 * @param schedule       buildTierWaves で生成したスケジュール
 * @param elapsedMs      ウェーブ開始からの経過ミリ秒
 * @param prevElapsedMs  前回 getSpawnsAtTime を呼んだときの経過ミリ秒
 *   （boss wave の差分計算・上位敵の時刻跨ぎ判定用）
 * @param rng            0〜1 の擬似乱数（再現性のため外部注入）
 * @param idGenerator    ユニーク ID 生成関数（外部注入）
 * @param bossWeakenedAtMs ボス HP が 60% を切った wave 内経過 ms (boss wave 専用)。
 *   - null: まだ切ってない → ボス出現以降の通常敵スポーンを抑止
 *   - 値あり: その時刻以降は半頻度 (×0.5、v1.5.0) で雑魚スポーン再開
 *   boss wave 以外では無視される。
 * @param fieldEmpty     場（enemiesRef.current）に生存敵が 0 か（v1.5.0 早回し用）。
 *   boss wave では無視される（クォータ制の適用外のため）。デフォルト false = 現行と同一挙動。
 * @param spawnedNormalCount その wave で実際に湧いた通常敵の累積数（v1.5.0、
 *   ループ側の waveSpawnedNormalCountRef.current）。 boss wave では無視される。
 * @param upperSpawned   その wave の上位敵が既に湧いたか（v1.5.0、
 *   ループ側の waveUpperSpawnedRef.current）。 boss wave では無視される
 *   （W30 は従来どおり prev/current の時刻跨ぎで 1 回だけ湧く）。
 */
export function getSpawnsAtTime(
  schedule: WaveSchedule,
  elapsedMs: number,
  prevElapsedMs: number,
  rng: () => number,
  idGenerator: () => string,
  bossWeakenedAtMs: number | null = null,
  fieldEmpty = false,
  spawnedNormalCount = 0,
  upperSpawned = false
): SpawnedEnemy[] {
  const spawns: SpawnedEnemy[] = [];
  const elapsedSec = elapsedMs / 1000;
  const prevElapsedSec = prevElapsedMs / 1000;
  const isBossWave = schedule.eliteKind === 'boss';

  // 上位敵スポーン: ウェーブの終了 1 秒前（UPPER_ENEMY_LEAD_SEC = 1）に出現
  const UPPER_ENEMY_LEAD_SEC = 1;
  const upperSpawnSec = schedule.durationSec - UPPER_ENEMY_LEAD_SEC;

  // 通常敵スポーン
  // boss wave (W30, v1.3.1): ボス出現後はボス HP 60% を切るまで雑魚 0、
  // 切った後は半頻度 (v1.5.0) で再開する。 ボス HP 60% を切った時刻は
  // bossWeakenedAtMs (wave 内経過 ms) で渡される。 null の間はボス出現後 0 を返す。
  // advanceTier は bossAlive===false で判定する (decideWaveAdvance) ので、 ボス HP 60% 切った後に
  // 通常敵が湧き続けても tier クリアを阻害しない (= ボスさえ倒せば残雑魚は無視できる)。
  const bossWeakenedSec = bossWeakenedAtMs != null ? bossWeakenedAtMs / 1000 : null;

  let toSpawn: number;
  if (isBossWave) {
    // v1.5.0: クォータ制の適用外。 現行の prev/current 差分方式を維持する。
    const normalCount = countBossNormalSpawns(
      elapsedSec,
      upperSpawnSec,
      schedule.spawnIntervalSec,
      bossWeakenedSec
    );
    const prevNormalCount = countBossNormalSpawns(
      prevElapsedSec,
      upperSpawnSec,
      schedule.spawnIntervalSec,
      bossWeakenedSec
    );
    toSpawn = normalCount - prevNormalCount;
  } else {
    // v1.5.0: 「実際に湧いた累積数 (spawnedNormalCount)」 を基準にした pull モデル。
    // 前倒しで湧いた分も spawnedNormalCount に反映される (呼び出し側が加算する) ため、
    // 時間ベースの増分として二重に湧くことがなく、 総湧き数は必ず quota 以下になる。
    const quota = waveQuota(schedule);
    const timeBasedCount = Math.min(Math.floor(elapsedSec / schedule.spawnIntervalSec), quota);
    // 撃破連鎖の前倒し湧き: 場が空なら spawnedNormalCount + 1 を目標にする
    // (1 tick に前倒しで湧くのは 1 体のみ。 全滅→1 体湧く→即殲滅→次 tick でまた 1 体、
    //  の連鎖で十分速い)。 時間ベースが先行していればそちらに追従する。
    const target = Math.min(
      quota,
      Math.max(timeBasedCount, spawnedNormalCount + (fieldEmpty ? 1 : 0))
    );
    toSpawn = Math.max(0, target - spawnedNormalCount);
  }

  for (let i = 0; i < toSpawn; i++) {
    const subtype = pickSubtype(schedule.normalSpawnTable, rng);
    const template = createEnemyTemplate(schedule.tier, schedule.waveIndex, 'normal', subtype);
    spawns.push(spawnEnemy(template, idGenerator(), elapsedMs, rng));
  }

  if (schedule.eliteKind !== undefined) {
    let shouldSpawnUpperNow: boolean;
    if (isBossWave) {
      // W30: 現行どおり (prev/current の時刻跨ぎ判定のみ。 前倒しなし)。
      shouldSpawnUpperNow = prevElapsedSec < upperSpawnSec && elapsedSec >= upperSpawnSec;
    } else {
      // v1.5.0: 上位敵の前倒し湧き。 まだ湧いていない (upperSpawned=false) 前提で、
      // 次のいずれかを満たせばスポーンする:
      // - 通常の 25 秒 (upperSpawnSec) を跨いだ
      // - または、 fieldEmpty かつ実クォータ N 体を湧き切り済み
      //   (spawnedNormalCount >= quota。 時間ベースではなく実際に湧いた数で判定する)
      const quota = waveQuota(schedule);
      shouldSpawnUpperNow =
        !upperSpawned &&
        ((prevElapsedSec < upperSpawnSec && elapsedSec >= upperSpawnSec) ||
          (fieldEmpty && spawnedNormalCount >= quota));
    }
    if (shouldSpawnUpperNow) {
      const template = createEnemyTemplate(schedule.tier, schedule.waveIndex, schedule.eliteKind);
      spawns.push(spawnEnemy(template, idGenerator(), elapsedMs, rng));
    }
  }

  return spawns;
}

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

/**
 * boss wave 中、 ボス HP 60% 未満で再開する雑魚スポーンの間隔倍率 (v1.5.0)。
 * design-docs/15-balance-v1.5.0.md §2.1: 「現行の 2 倍（頻度半分）」。
 * ボス出現前 (0〜upperSpawnSec) の湧きには適用しない。
 */
export const BOSS_WEAKENED_SPAWN_INTERVAL_MUL = 2;

/**
 * boss wave での通常敵累積スポーン数を計算する (v1.3.1、 v1.5.0 で半頻度化)。
 * - 0〜upperSpawnSec: 通常テンポ (intervalSec) で雑魚スポーン
 * - upperSpawnSec〜bossWeakenedSec: ボス HP 60% 切るまで雑魚 0 (= スポーン抑止)
 * - bossWeakenedSec〜: ボス HP 60% 切った後、 半頻度 (intervalSec × 2、 v1.5.0) で再開
 *
 * bossWeakenedSec が null の間 (ボス HP まだ 60% 切ってない) はボス出現以降の雑魚は
 * 出ない。 値が入ったらその時刻以降は半頻度で湧き始める。
 */
export function countBossNormalSpawns(
  elapsedSec: number,
  upperSpawnSec: number,
  intervalSec: number,
  bossWeakenedSec: number | null
): number {
  if (elapsedSec <= 0) return 0;
  // ボス出現前: 通常テンポでの累積
  if (elapsedSec <= upperSpawnSec) {
    return Math.floor(elapsedSec / intervalSec);
  }
  const beforeBoss = Math.floor(upperSpawnSec / intervalSec);
  // ボス HP 60% まだ切ってない: ボス出現以降は雑魚 0
  if (bossWeakenedSec == null || elapsedSec <= bossWeakenedSec) {
    return beforeBoss;
  }
  // ボス HP 60% 切った後: 半頻度 (v1.5.0) で再開
  const afterWeakenedSec = elapsedSec - bossWeakenedSec;
  const afterWeakened = Math.floor(
    afterWeakenedSec / (intervalSec * BOSS_WEAKENED_SPAWN_INTERVAL_MUL)
  );
  return beforeBoss + afterWeakened;
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
