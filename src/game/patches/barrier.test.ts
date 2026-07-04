import { describe, expect, it } from 'vitest';

import { consumeBarrierStock, refillBarrierStock, stepBarrierEpisodes } from './barrier';

describe('consumeBarrierStock', () => {
  it('stock > 0 → 消費できる。残数 -1', () => {
    expect(consumeBarrierStock(3)).toEqual({ consumed: true, nextStock: 2 });
  });

  it('stock === 0 → 消費できない', () => {
    expect(consumeBarrierStock(0)).toEqual({ consumed: false, nextStock: 0 });
  });

  it('stock < 0 (異常値) → 消費できない、そのまま維持', () => {
    expect(consumeBarrierStock(-1)).toEqual({ consumed: false, nextStock: -1 });
  });
});

describe('refillBarrierStock', () => {
  it('capacity をそのまま返す', () => {
    expect(refillBarrierStock(5)).toBe(5);
  });

  it('capacity <= 0 (未装着) → 0', () => {
    expect(refillBarrierStock(0)).toBe(0);
    expect(refillBarrierStock(-3)).toBe(0);
  });
});

describe('stepBarrierEpisodes', () => {
  it('新規接触 1 体 + バリア残数あり → 1 枚消費し無効化中集合に追加', () => {
    const result = stepBarrierEpisodes({
      newContactIds: ['e1'],
      currentContactIds: ['e1'],
      barrierStock: 3,
      immunizedIds: new Set(),
    });
    expect(result.nextBarrierStock).toBe(2);
    expect(result.nextImmunizedIds.has('e1')).toBe(true);
  });

  it('新規接触だがバリア残数 0 → 消費されず無効化中集合にも追加されない', () => {
    const result = stepBarrierEpisodes({
      newContactIds: ['e1'],
      currentContactIds: ['e1'],
      barrierStock: 0,
      immunizedIds: new Set(),
    });
    expect(result.nextBarrierStock).toBe(0);
    expect(result.nextImmunizedIds.has('e1')).toBe(false);
  });

  it('継続接触中の敵 (newContactIds に含まれない) はバリアを消費しない', () => {
    const result = stepBarrierEpisodes({
      newContactIds: [],
      currentContactIds: ['e1'],
      barrierStock: 3,
      immunizedIds: new Set(['e1']),
    });
    expect(result.nextBarrierStock).toBe(3);
    expect(result.nextImmunizedIds.has('e1')).toBe(true);
  });

  it('接触が途切れた敵 (currentContactIds に含まれない) は無効化中集合から除去される', () => {
    const result = stepBarrierEpisodes({
      newContactIds: [],
      currentContactIds: [],
      barrierStock: 3,
      immunizedIds: new Set(['e1']),
    });
    expect(result.nextImmunizedIds.has('e1')).toBe(false);
  });

  it('複数体が同時新規接触 → バリア残数の範囲内でのみ消費', () => {
    const result = stepBarrierEpisodes({
      newContactIds: ['e1', 'e2', 'e3'],
      currentContactIds: ['e1', 'e2', 'e3'],
      barrierStock: 2,
      immunizedIds: new Set(),
    });
    expect(result.nextBarrierStock).toBe(0);
    expect(result.nextImmunizedIds.size).toBe(2);
  });

  it('入力の immunizedIds を mutate しない (新規 Set を返す)', () => {
    const original = new Set(['e1']);
    stepBarrierEpisodes({
      newContactIds: [],
      currentContactIds: ['e1'],
      barrierStock: 0,
      immunizedIds: original,
    });
    expect(original.has('e1')).toBe(true);
  });
});
