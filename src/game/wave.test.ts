import { describe, it, expect } from 'vitest';

import { TIER_BASE } from './tier';
import { buildTierWaves, getSpawnsAtTime } from './wave';

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

  it('全ウェーブの durationSec が 26 秒', () => {
    const waves = buildTierWaves(1);
    for (const w of waves) {
      expect(w.durationSec).toBe(26);
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
  const w1 = waves[0]!; // W1: spawnIntervalSec ≈ 0.5s

  // deterministic rng: 常に 0.3 を返す → x=0, y=30
  const constRng = () => 0.3;
  let idCounter = 0;
  const idGen = () => `enemy-${++idCounter}`;

  it('経過 0ms では敵が出ない（前回も 0ms）', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, 0, 0, constRng, idGen);
    expect(spawns).toHaveLength(0);
  });

  it('0〜500ms の間に通常敵が 1 体スポーンする', () => {
    idCounter = 0;
    // 0ms → 500ms: Math.floor(0.5 / 0.5) - Math.floor(0 / 0.5) = 1 - 0 = 1
    const spawns = getSpawnsAtTime(w1, 500, 0, constRng, idGen);
    expect(spawns).toHaveLength(1);
    expect(spawns[0]!.kind).toBe('normal');
  });

  it('0〜1000ms の間に通常敵が 2 体スポーンする', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, 1000, 0, constRng, idGen);
    expect(spawns).toHaveLength(2);
  });

  it('差分計算: 500ms〜1000ms の間に 1 体スポーンする', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, 1000, 500, constRng, idGen);
    expect(spawns).toHaveLength(1);
  });

  it('差分計算: 0ms 〜 0ms（同一時刻）では敵が出ない', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, 500, 500, constRng, idGen);
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

  it('スポーンした敵の id が一意である', () => {
    idCounter = 0;
    const spawns = getSpawnsAtTime(w1, 3000, 0, constRng, () => `e-${++idCounter}`);
    const ids = spawns.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
