import { describe, it, expect } from 'vitest';

import { TIER_BASE } from './tier';
import {
  BOSS_WEAKENED_SPAWN_INTERVAL_MUL,
  WAVE_DURATION_SEC,
  buildTierWaves,
  countBossNormalSpawns,
  getSpawnsAtTime,
  waveQuota,
} from './wave';

// ---------------------------------------------------------------------------
// buildTierWaves
// ---------------------------------------------------------------------------

describe('buildTierWaves', () => {
  it('30 ウェーブが生成される', () => {
    const waves = buildTierWaves(1);
    expect(waves).toHaveLength(30);
  });

  it('waveIndex が 1〜30 の連番になっている', () => {
    const waves = buildTierWaves(1);
    for (let i = 0; i < 30; i++) {
      expect(waves[i]!.waveIndex).toBe(i + 1);
    }
  });

  it('tier フィールドが引数と一致する', () => {
    const waves = buildTierWaves(5);
    for (const w of waves) {
      expect(w.tier).toBe(5);
    }
  });

  it('全ウェーブの durationSec が WAVE_DURATION_SEC と一致', () => {
    const waves = buildTierWaves(1);
    for (const w of waves) {
      expect(w.durationSec).toBe(WAVE_DURATION_SEC);
    }
  });

  // --- エリート出現チェック ---
  it('W5 に eliteKind="elite" が設定される', () => {
    const waves = buildTierWaves(1);
    expect(waves[4]!.eliteKind).toBe('elite');
  });

  it('W15 に eliteKind="elite" が設定される', () => {
    const waves = buildTierWaves(1);
    expect(waves[14]!.eliteKind).toBe('elite');
  });

  it('W25 に eliteKind="elite" が設定される', () => {
    const waves = buildTierWaves(1);
    expect(waves[24]!.eliteKind).toBe('elite');
  });

  it('W10 に eliteKind="miniboss" が設定される', () => {
    const waves = buildTierWaves(1);
    expect(waves[9]!.eliteKind).toBe('miniboss');
  });

  it('W20 に eliteKind="miniboss" が設定される', () => {
    const waves = buildTierWaves(1);
    expect(waves[19]!.eliteKind).toBe('miniboss');
  });

  it('W30 に eliteKind="boss" が設定される', () => {
    const waves = buildTierWaves(1);
    expect(waves[29]!.eliteKind).toBe('boss');
  });

  it('W1 に eliteKind が設定されない', () => {
    const waves = buildTierWaves(1);
    expect(waves[0]!.eliteKind).toBeUndefined();
  });

  it('W6 に eliteKind が設定されない', () => {
    const waves = buildTierWaves(1);
    expect(waves[5]!.eliteKind).toBeUndefined();
  });

  // --- 通常敵スポーンテーブル ---
  it('W1〜W4 は standard 100% のテーブル', () => {
    const waves = buildTierWaves(1);
    for (let i = 0; i < 4; i++) {
      const table = waves[i]!.normalSpawnTable;
      expect(table).toHaveLength(1);
      expect(table[0]!.subtype).toBe('standard');
      expect(table[0]!.weight).toBe(1.0);
    }
  });

  it('W5〜W9 は standard+swift 2 行テーブル', () => {
    const waves = buildTierWaves(1);
    for (let i = 4; i < 9; i++) {
      const table = waves[i]!.normalSpawnTable;
      expect(table).toHaveLength(2);
      const subtypes = table.map((r) => r.subtype);
      expect(subtypes).toContain('standard');
      expect(subtypes).toContain('swift');
    }
  });

  it('W10〜W30 は standard+swift+tough 3 行テーブル', () => {
    const waves = buildTierWaves(1);
    for (let i = 9; i < 30; i++) {
      const table = waves[i]!.normalSpawnTable;
      expect(table).toHaveLength(3);
    }
  });

  it('W10〜W30 のテーブル重みの合計が 1.0', () => {
    const waves = buildTierWaves(1);
    for (let i = 9; i < 30; i++) {
      const total = waves[i]!.normalSpawnTable.reduce((s, r) => s + r.weight, 0);
      expect(total).toBeCloseTo(1.0, 5);
    }
  });

  // --- スポーン間隔 ---
  it('W1 のスポーン間隔は SPAWN_base / 1.0 = 0.5 秒', () => {
    const waves = buildTierWaves(1);
    expect(waves[0]!.spawnIntervalSec).toBeCloseTo(TIER_BASE.SPAWN_INTERVAL, 5);
  });

  it('W30 のスポーン間隔は W1 より短い（スポーン頻度が高い）', () => {
    const waves = buildTierWaves(1);
    const w1 = waves[0]!.spawnIntervalSec;
    const w30 = waves[29]!.spawnIntervalSec;
    expect(w30).toBeLessThan(w1);
  });

  it('W30 のスポーン間隔は SPAWN_base / 2.0 ≈ 0.25 秒', () => {
    const waves = buildTierWaves(1);
    const w30 = waves[29]!.spawnIntervalSec;
    expect(w30).toBeCloseTo(TIER_BASE.SPAWN_INTERVAL / 2.0, 2);
  });
});

// ---------------------------------------------------------------------------
// getSpawnsAtTime
// ---------------------------------------------------------------------------

describe('getSpawnsAtTime', () => {
  const waves = buildTierWaves(1);
  const w1 = waves[0]!; // W1: spawnIntervalSec = TIER_BASE.SPAWN_INTERVAL

  // W1 での 1 体あたりの spawn 間隔 (ms)。 定数調整に追従するよう TIER_BASE 由来で計算。
  const intervalMs = TIER_BASE.SPAWN_INTERVAL * 1000;

  // deterministic rng: 常に 0.3 を返す → x=0, y=30
  const constRng = () => 0.3;
  let idCounter = 0;
  const idGen = () => `enemy-${++idCounter}`;

  it('経過 0ms では敵が出ない（前回も 0ms）', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, 0, 0, constRng, idGen);
    expect(spawns).toHaveLength(0);
  });

  it('0 〜 spawn 間隔 1 回分の間に通常敵が 1 体スポーンする', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, intervalMs, 0, constRng, idGen);
    expect(spawns).toHaveLength(1);
    expect(spawns[0]!.kind).toBe('normal');
  });

  it('0 〜 spawn 間隔 2 回分の間に通常敵が 2 体スポーンする', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, intervalMs * 2, 0, constRng, idGen);
    expect(spawns).toHaveLength(2);
  });

  it('差分計算: 間隔 1 回分 〜 間隔 2 回分の間に 1 体スポーンする', () => {
    idCounter = 0;
    // v1.5.0: 非 boss wave の差分基準は prevElapsedMs ではなく「実際に湧いた累積数」
    // (spawnedNormalCount)。 間隔 1 回分時点で 1 体湧いた状態を渡す。
    const spawns = getSpawnsAtTime(w1, intervalMs * 2, intervalMs, constRng, idGen, null, false, 1);
    expect(spawns).toHaveLength(1);
  });

  it('差分計算: 湧き済み累積数が時間ベースに追いついていれば敵が出ない', () => {
    idCounter = 0;
    // 間隔 1 回分の時点で既に 1 体湧いている → 追加スポーンなし
    const spawns = getSpawnsAtTime(w1, intervalMs, intervalMs, constRng, idGen, null, false, 1);
    expect(spawns).toHaveLength(0);
  });

  it('elite ウェーブ（W5）の末尾でエリートが 1 体スポーンする', () => {
    idCounter = 0;
    const w5 = waves[4]!; // eliteKind = 'elite', durationSec = 26
    // UPPER_ENEMY_LEAD_SEC = 1 → upperSpawnSec = 25
    // prevElapsed = 24.9s, elapsed = 25.1s でエリートが出現
    const spawns = getSpawnsAtTime(w5, 25100, 24900, constRng, idGen);
    const elites = spawns.filter((s) => s.kind === 'elite');
    expect(elites).toHaveLength(1);
  });

  it('elite は 1 秒前後を跨がなければスポーンしない', () => {
    idCounter = 0;
    const w5 = waves[4]!;
    // 24s〜24.9s: まだ upperSpawnSec=25 を跨いでいない
    const spawns = getSpawnsAtTime(w5, 24900, 24000, constRng, idGen);
    const elites = spawns.filter((s) => s.kind === 'elite');
    expect(elites).toHaveLength(0);
  });

  it('boss ウェーブ（W30）の末尾でボスが 1 体スポーンする', () => {
    idCounter = 0;
    const w30 = waves[29]!; // eliteKind = 'boss'
    const spawns = getSpawnsAtTime(w30, 25100, 24900, constRng, idGen);
    const bosses = spawns.filter((s) => s.kind === 'boss');
    expect(bosses).toHaveLength(1);
  });

  // ボス wave の通常敵スポーン仕様 (v1.1.2):
  // ボスは upperSpawnSec=25s に出現。 それ以降は通常敵スポーンを「通常 wave の半分の頻度」
  // (= spawnIntervalSec × 2) で継続する。 advanceTier は bossAlive===false で判定するので
  // 通常敵が残っていても tier クリアを阻害しない。
  //
  // W30 の spawnIntervalSec = TIER_BASE.SPAWN_INTERVAL(=2) / waveSpawnFactor(30)(≒2.0) ≒ 1.0 秒。
  // ボス後の半頻度 = 1.0 × 2 = 2.0 秒/体。
  it('W30: ボス出現タイミング (25s) 以降も半頻度で通常敵が湧き続ける', () => {
    idCounter = 0;
    const w30 = waves[29]!;
    // v1.3.1: ボス出現後はボス HP 60% 切るまで雑魚 0。 bossWeakenedAtMs を渡さない
    // ケースでは、 ボス出現後 (25.0s 以降) の雑魚は 0 体。
    const spawns = getSpawnsAtTime(w30, 60_000, 25_000, constRng, idGen);
    const normals = spawns.filter((s) => s.kind === 'normal');
    expect(normals).toHaveLength(0);
  });

  it('W30: ボス HP 60% を切った後は半頻度で雑魚スポーン再開 (v1.3.1、 v1.5.0 で半頻度化)', () => {
    idCounter = 0;
    const w30 = waves[29]!;
    // bossWeakenedAtMs = 30_000 (ボス出現の 5 秒後に HP 60% を切ったと仮定)。
    // 25.0s → 60.0s: ボス出現後の 35 秒間のうち、 30s〜60s = 30 秒間が半頻度
    // (intervalSec = 1.0s × BOSS_WEAKENED_SPAWN_INTERVAL_MUL(=2) = 2.0s/体)。
    // floor(30/2) = 15 体。
    const spawns = getSpawnsAtTime(w30, 60_000, 25_000, constRng, idGen, 30_000);
    const normals = spawns.filter((s) => s.kind === 'normal');
    expect(normals).toHaveLength(15);
  });

  it('W30: ボス出現を跨ぐフレームは「ボス前累積」 のみ反映 (HP 60% まだ切ってない)', () => {
    idCounter = 0;
    const w30 = waves[29]!;
    // 24.9s → 25.5s をまたぐ。
    // - 24.9s 時点: ボス前累積 = floor(24.9/1.0) = 24
    // - 25.5s 時点: ボス前累積 = floor(25/1.0) = 25 (ボス後は HP 60% 未満なので 0)
    // 差分 = 1 体 (ボス出現タイミング 25s に湧く 1 体のみ)
    const spawns = getSpawnsAtTime(w30, 25_500, 24_900, constRng, idGen);
    const normals = spawns.filter((s) => s.kind === 'normal');
    expect(normals).toHaveLength(1);
  });

  it('W30: ボス出現後の単発フレームでは雑魚 0 (v1.3.1 ボス HP 60% 未満)', () => {
    idCounter = 0;
    const w30 = waves[29]!;
    // 26s → 30s: 全区間がボス後。 bossWeakenedAtMs null なので雑魚はスポーンしない。
    const spawns = getSpawnsAtTime(w30, 30_000, 26_000, constRng, idGen);
    const normals = spawns.filter((s) => s.kind === 'normal');
    expect(normals).toHaveLength(0);
    expect(spawns.filter((s) => s.kind === 'boss')).toHaveLength(0);
  });

  it('W29 (非 boss wave): wave 終盤でも通常敵スポーンが止まらない', () => {
    idCounter = 0;
    const w29 = waves[28]!; // eliteKind = undefined
    // 25.5s → 26.0s: w30 と同じレンジでも、 W29 では通常敵が湧き続ける
    // (時間どおり湧いてきた場合の 25.5s 時点の累積 = floor(25.5/interval) = 24 体)
    const spawnedAt25_5 = Math.floor(25.5 / w29.spawnIntervalSec);
    const spawns = getSpawnsAtTime(
      w29,
      26_000,
      25_500,
      constRng,
      idGen,
      null,
      false,
      spawnedAt25_5
    );
    const normals = spawns.filter((s) => s.kind === 'normal');
    expect(normals.length).toBeGreaterThan(0);
  });

  it('スポーンした敵の id が一意である', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, 3000, 0, constRng, () => `e-${++idCounter}`);
    const ids = spawns.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

// ---------------------------------------------------------------------------
// waveQuota (v1.5.0: Wave クォータ制)
// ---------------------------------------------------------------------------

describe('waveQuota', () => {
  it('W1〜W29 の全 wave で、 現行の 26 秒間の総湧き数と一致する', () => {
    // 「現行の 26 秒間の総湧き数」 は旧実装と同じ Math.floor(durationSec / spawnIntervalSec)
    // で計算できる (= 現行 pull モデルで 26 秒まで進めたときの累積値)。 これを複数 tier /
    // 複数 wave で実測し、 waveQuota の戻り値と突き合わせる。
    for (const tier of [1, 3, 10]) {
      const waves = buildTierWaves(tier);
      for (let i = 0; i < 29; i++) {
        const schedule = waves[i]!;
        const legacyTotal = Math.floor(schedule.durationSec / schedule.spawnIntervalSec);
        expect(waveQuota(schedule)).toBe(legacyTotal);
      }
    }
  });

  it('W1 のクォータは 13 体 (26 / 2.0)', () => {
    const waves = buildTierWaves(1);
    expect(waveQuota(waves[0]!)).toBe(13);
  });

  it('実際に getSpawnsAtTime を 26 秒分回して集計した総数と waveQuota が一致する (W1〜W29)', () => {
    // fieldEmpty=false (現行と同一挙動) で、 0〜26 秒を 100ms 刻みで進めて集計する。
    // 実ループと同様に「湧いた累積数」 (spawnedNormalCount) を tick を跨いで渡す。
    const rng = () => 0.3;
    let idCounter = 0;
    const idGen = () => `e-${++idCounter}`;
    const waves = buildTierWaves(1);
    for (let i = 0; i < 29; i++) {
      const schedule = waves[i]!;
      idCounter = 0;
      let prevMs = 0;
      let total = 0;
      for (let ms = 100; ms <= 26_000; ms += 100) {
        const spawns = getSpawnsAtTime(schedule, ms, prevMs, rng, idGen, null, false, total);
        total += spawns.filter((s) => s.kind === 'normal').length;
        prevMs = ms;
      }
      expect(total).toBe(waveQuota(schedule));
    }
  });
});

// ---------------------------------------------------------------------------
// getSpawnsAtTime: クォータキャップ / 撃破連鎖の前倒し湧き (v1.5.0)
// ---------------------------------------------------------------------------

describe('getSpawnsAtTime (v1.5.0 Wave クォータ制)', () => {
  const waves = buildTierWaves(1);
  const w1 = waves[0]!;
  const intervalMs = TIER_BASE.SPAWN_INTERVAL * 1000; // W1: 2000ms/体
  const constRng = () => 0.3;
  let idCounter = 0;
  const idGen = () => `enemy-${++idCounter}`;

  it('時間ベースの湧きはクォータ (13 体) でキャップされる (fieldEmpty=false)', () => {
    idCounter = 0;
    const quota = waveQuota(w1); // 13
    // durationSec(26s) を大幅に超える elapsedMs を渡しても quota を超えない
    const spawns = getSpawnsAtTime(w1, 60_000, 0, constRng, idGen, null, false);
    const normals = spawns.filter((s) => s.kind === 'normal');
    expect(normals).toHaveLength(quota);
  });

  it('fieldEmpty=false のときは現行と完全に同一挙動 (キャップ前の範囲で)', () => {
    idCounter = 0;
    // 0 〜 intervalMs (2000ms) の間に 1 体だけスポーンする (現行どおり)
    const spawns = getSpawnsAtTime(w1, intervalMs, 0, constRng, idGen, null, false);
    expect(spawns.filter((s) => s.kind === 'normal')).toHaveLength(1);
  });

  it('fieldEmpty=true でクォータ未消化なら、 EARLY_SPAWN_BURST_MAX (5) 体まで前倒しで湧く', () => {
    idCounter = 0;
    // v1.5.1: 経過 500ms (通常は 0 体) でも fieldEmpty=true なら 5 体まで前倒しで湧く
    const spawns = getSpawnsAtTime(w1, 500, 0, constRng, idGen, null, true);
    expect(spawns.filter((s) => s.kind === 'normal')).toHaveLength(5);
  });

  it('fieldEmpty=true でも 1 tick のバースト上限は EARLY_SPAWN_BURST_MAX (5) 体', () => {
    idCounter = 0;
    // v1.5.1: 時間どおり 3 体湧いた直後 (spawned=3、 t=intervalMs*3) に場が空になったケース。
    // 前倒しは spawned+5 = 8 体目までの 5 体。
    const spawns = getSpawnsAtTime(
      w1,
      intervalMs * 3,
      intervalMs * 3,
      constRng,
      idGen,
      null,
      true,
      3
    );
    expect(spawns.filter((s) => s.kind === 'normal')).toHaveLength(5);
  });

  it('fieldEmpty=true でもクォータ (13 体) を超えて前倒しされない', () => {
    idCounter = 0;
    const quota = waveQuota(w1);
    // 実クォータ全量を湧き切った後は、 fieldEmpty=true でも追加で湧かない
    const spawns = getSpawnsAtTime(w1, 60_000, 59_900, constRng, idGen, null, true, quota);
    expect(spawns.filter((s) => s.kind === 'normal')).toHaveLength(0);
  });

  it('前倒し分は spawnedNormalCount に記憶され、 時間ベースの増分として二重に湧かない', () => {
    idCounter = 0;
    // 1 tick目: fieldEmpty=true で 5 体前倒し (t=500ms, 時間ベースなら 0 体、 v1.5.1)
    const first = getSpawnsAtTime(w1, 500, 0, constRng, idGen, null, true, 0);
    expect(first.filter((s) => s.kind === 'normal')).toHaveLength(5);
    // 2 tick目: t=10000ms (時間ベースなら 5 体目の時刻)。 前倒し分が累積 (spawned=5) に
    // 反映されているため、 時間ベースが追いつくまでは追加で湧かない (target=max(5,5)=5)。
    const second = getSpawnsAtTime(w1, 10000, 500, constRng, idGen, null, false, 5);
    expect(second.filter((s) => s.kind === 'normal')).toHaveLength(0);
  });

  // --- 上位敵の前倒し湧き (W5) ---
  const w5 = waves[4]!; // eliteKind = 'elite'
  const quotaW5 = waveQuota(w5);

  it('W5: 実クォータ全滅済み (spawned=quota, fieldEmpty=true) なら 25 秒より前でもエリートが湧く', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w5, 15_000, 14_900, constRng, idGen, null, true, quotaW5);
    const elites = spawns.filter((s) => s.kind === 'elite');
    expect(elites).toHaveLength(1);
  });

  it('W5: 実クォータ未消化 (spawned=quota-1) なら fieldEmpty=true でもエリートは湧かない', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w5, 15_000, 14_900, constRng, idGen, null, true, quotaW5 - 1);
    const elites = spawns.filter((s) => s.kind === 'elite');
    expect(elites).toHaveLength(0);
  });

  it('W5: 通常どおり 25 秒経過でエリートが湧く (間に合わなかった場合、 fieldEmpty=false)', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w5, 25_100, 24_900, constRng, idGen, null, false);
    const elites = spawns.filter((s) => s.kind === 'elite');
    expect(elites).toHaveLength(1);
  });

  it('W5: upperSpawned=true なら 25 秒跨ぎでも重複して湧かない (前倒し湧き後の時間経過)', () => {
    idCounter = 0;
    // 前倒しでエリートが湧いた後、 wave が 25 秒まで長引いたケース。
    // upperSpawned=true が渡されるため時刻跨ぎでも二重スポーンしない。
    const spawns = getSpawnsAtTime(w5, 25_100, 24_900, constRng, idGen, null, false, quotaW5, true);
    const elites = spawns.filter((s) => s.kind === 'elite');
    expect(elites).toHaveLength(0);
  });

  it('W5: upperSpawned=true なら fieldEmpty=true でも前倒し条件で重複しない', () => {
    idCounter = 0;
    // 前倒しエリートを即撃破 → 場が空、 という tick でも再スポーンしない
    // (実ループではこの tick の進行判定で advanceWave するので通常は到達しないが、 防衛的に保証)
    const spawns = getSpawnsAtTime(w5, 15_100, 15_000, constRng, idGen, null, true, quotaW5, true);
    const elites = spawns.filter((s) => s.kind === 'elite');
    expect(elites).toHaveLength(0);
  });

  // --- boss wave (W30) はクォータ制の適用外 ---
  const w30 = waves[29]!;

  it('W30: fieldEmpty=true を渡してもクォータ制は適用されない (現行の連続湧きロジック維持)', () => {
    idCounter = 0;
    // ボス出現前 (0〜25s) は fieldEmpty の有無に関わらず通常テンポで湧き続ける
    // (クォータでキャップされない = W30 の湧き数は quota(=waveQuota) を上回りうる)
    const spawnsEmptyTrue = getSpawnsAtTime(w30, 25_000, 0, constRng, idGen, null, true);
    idCounter = 0;
    const spawnsEmptyFalse = getSpawnsAtTime(w30, 25_000, 0, constRng, idGen, null, false);
    const normalsTrue = spawnsEmptyTrue.filter((s) => s.kind === 'normal').length;
    const normalsFalse = spawnsEmptyFalse.filter((s) => s.kind === 'normal').length;
    expect(normalsTrue).toBe(normalsFalse);
  });

  it('W30: fieldEmpty=true でもボスは 25 秒前には湧かない (boss wave は前倒し対象外)', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w30, 20_000, 19_900, constRng, idGen, null, true);
    expect(spawns.filter((s) => s.kind === 'boss')).toHaveLength(0);
  });

  // --- ディレクターレビュー指摘の回帰テスト ---

  it('回帰 (不具合1): 前倒し湧きが累積に記憶され、 26 秒まで進めても総湧き数がちょうど quota になる', () => {
    // 再現シナリオ: Wave 開始直後にバーストで数体湧く (fieldEmpty=true が 1 tick 発生)
    // → その後 fieldEmpty=false のまま 26 秒まで時間ベースで進める。
    // 前倒し分が累積カウントに記憶されないと、 時間ベースの増分として二重に湧き、
    // 総量が quota を超える (旧実装では 13 + 前倒し 5 = 18 体)。
    // v1.5.1: バースト上限が EARLY_SPAWN_BURST_MAX = 5 に拡張された。
    idCounter = 0;
    const quota = waveQuota(w1); // 13
    let spawned = 0;
    let prevMs = 0;
    // tick 1 (t=100ms): 場が空 → バーストで 5 体 (EARLY_SPAWN_BURST_MAX) 前倒し
    const burst = getSpawnsAtTime(w1, 100, prevMs, constRng, idGen, null, true, spawned);
    spawned += burst.filter((s) => s.kind === 'normal').length;
    prevMs = 100;
    expect(spawned).toBe(5);
    // 以降 26 秒まで fieldEmpty=false (tough が残って場が埋まったままのケース)
    for (let ms = 200; ms <= 26_000; ms += 100) {
      const spawns = getSpawnsAtTime(w1, ms, prevMs, constRng, idGen, null, false, spawned);
      spawned += spawns.filter((s) => s.kind === 'normal').length;
      prevMs = ms;
    }
    // 総湧き数は quota ちょうど (湧き総量は現行と同一、 15-balance-v1.5.0.md §3)
    expect(spawned).toBe(quota);
  });

  it('回帰 (不具合2): 実クォータ消化済みなら時間ベースが quota 未満でも上位敵が前倒しで湧く', () => {
    // 再現シナリオ: 撃破連鎖で 10 秒までに実クォータ (spawnedNormalCount=quota) を
    // 早期消化した場合。 時間ベースカウントは quota 未満だが、 実際に湧いた累積数が
    // quota に達していれば上位敵は前倒しで湧くべき (時間ベース判定だと 25 秒まで湧かない)。
    idCounter = 0;
    const timeBasedAt10s = Math.floor(10 / w5.spawnIntervalSec);
    expect(timeBasedAt10s).toBeLessThan(quotaW5); // 前提: 時間ベースでは未消化
    const spawns = getSpawnsAtTime(w5, 10_000, 9_900, constRng, idGen, null, true, quotaW5);
    const elites = spawns.filter((s) => s.kind === 'elite');
    expect(elites).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// countBossNormalSpawns: ボス戦中の雑魚湧き半減 (v1.5.0 §2.1 追記分)
// ---------------------------------------------------------------------------

describe('countBossNormalSpawns (v1.5.0: HP60%未満での雑魚湧き半減)', () => {
  const upperSpawnSec = 25;
  const intervalSec = 1.0;

  it('BOSS_WEAKENED_SPAWN_INTERVAL_MUL は 2 (頻度半分)', () => {
    expect(BOSS_WEAKENED_SPAWN_INTERVAL_MUL).toBe(2);
  });

  it('HP60%未満再開後、 intervalSec×2 ごとに 1 体湧く (半頻度)', () => {
    // bossWeakenedSec=25 (ボス出現と同時に弱体化したケース)。
    // 25 → 25 + intervalSec*2 = 27 で 1 体目
    const before = countBossNormalSpawns(26.9, upperSpawnSec, intervalSec, 25);
    const at = countBossNormalSpawns(27.0, upperSpawnSec, intervalSec, 25);
    const beforeBoss = Math.floor(upperSpawnSec / intervalSec);
    expect(before - beforeBoss).toBe(0);
    expect(at - beforeBoss).toBe(1);
  });

  it('境界値: intervalSec×2 のちょうど直前では増えない', () => {
    const beforeBoss = Math.floor(upperSpawnSec / intervalSec);
    const justBefore = countBossNormalSpawns(26.999, upperSpawnSec, intervalSec, 25);
    expect(justBefore - beforeBoss).toBe(0);
  });

  it('境界値: intervalSec×2 の 2 倍 (4 秒後) で 2 体目', () => {
    const beforeBoss = Math.floor(upperSpawnSec / intervalSec);
    const count = countBossNormalSpawns(29.0, upperSpawnSec, intervalSec, 25);
    expect(count - beforeBoss).toBe(2);
  });

  it('ボス出現前 (0〜upperSpawnSec) の湧き頻度は半減の影響を受けない', () => {
    // 0〜25s は通常テンポ (intervalSec=1.0) のまま: floor(25/1.0)=25
    const count = countBossNormalSpawns(25, upperSpawnSec, intervalSec, null);
    expect(count).toBe(25);
  });
});
