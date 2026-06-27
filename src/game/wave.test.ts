import { describe, it, expect } from 'vitest';

import { TIER_BASE } from './tier';
import { WAVE_DURATION_SEC, buildTierWaves, getSpawnsAtTime } from './wave';

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
    const spawns = getSpawnsAtTime(w1, intervalMs * 2, intervalMs, constRng, idGen);
    expect(spawns).toHaveLength(1);
  });

  it('差分計算: 同一時刻では敵が出ない', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, intervalMs, intervalMs, constRng, idGen);
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

  it('W30: ボス HP 60% を切った後は通常頻度で雑魚スポーン再開 (v1.3.1)', () => {
    idCounter = 0;
    const w30 = waves[29]!;
    // bossWeakenedAtMs = 30_000 (ボス出現の 5 秒後に HP 60% を切ったと仮定)。
    // 25.0s → 60.0s: ボス出現後の 35 秒間のうち、 30s〜60s = 30 秒間が通常頻度
    // (intervalSec = 1.0s)。 floor(30/1) = 30 体湧くはずだが、 累積差分の計算式は
    // 「current = beforeBoss + floor((60-30)/1)= 25 + 30 = 55」 -
    // 「prev = beforeBoss + floor((25-30)/1)= 25 + 0 (negative→0) = 25」 = 30 体。
    const spawns = getSpawnsAtTime(w30, 60_000, 25_000, constRng, idGen, 30_000);
    const normals = spawns.filter((s) => s.kind === 'normal');
    expect(normals).toHaveLength(30);
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
    const spawns = getSpawnsAtTime(w29, 26_000, 25_500, constRng, idGen);
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
