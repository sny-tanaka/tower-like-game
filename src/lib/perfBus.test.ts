import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  _resetPerfBusForTest,
  drainTickStats,
  getProjectileCount,
  markTickEnd,
  markTickStart,
  setProjectileCount,
} from './perfBus';

describe('perfBus', () => {
  beforeEach(() => {
    _resetPerfBusForTest();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('初期状態では drainTickStats が ゼロ値を返す', () => {
    expect(drainTickStats()).toEqual({ avgMs: 0, maxMs: 0, count: 0 });
  });

  it('markTickStart → markTickEnd の 1 区間で count=1 / 正の avg と max が立つ', () => {
    // performance.now を 0 → 4 にモックして区間幅 4ms を作る
    const spy = vi.spyOn(performance, 'now');
    spy.mockReturnValueOnce(0); // markTickStart
    spy.mockReturnValueOnce(4); // markTickEnd

    markTickStart();
    markTickEnd();

    const stats = drainTickStats();
    expect(stats.count).toBe(1);
    expect(stats.avgMs).toBeCloseTo(4, 5);
    expect(stats.maxMs).toBeCloseTo(4, 5);
  });

  it('複数 tick の累積で avg は平均、 max は最大区間を取る', () => {
    const spy = vi.spyOn(performance, 'now');
    // 3 区間: 2ms / 8ms / 5ms → avg=5, max=8
    spy.mockReturnValueOnce(0).mockReturnValueOnce(2);
    spy.mockReturnValueOnce(10).mockReturnValueOnce(18);
    spy.mockReturnValueOnce(100).mockReturnValueOnce(105);

    markTickStart();
    markTickEnd();
    markTickStart();
    markTickEnd();
    markTickStart();
    markTickEnd();

    const stats = drainTickStats();
    expect(stats.count).toBe(3);
    expect(stats.avgMs).toBeCloseTo(5, 5);
    expect(stats.maxMs).toBeCloseTo(8, 5);
  });

  it('drainTickStats を呼ぶと内部 accumulator がリセットされる', () => {
    const spy = vi.spyOn(performance, 'now');
    spy.mockReturnValueOnce(0).mockReturnValueOnce(3);

    markTickStart();
    markTickEnd();
    drainTickStats();

    // 直後に drain を呼ぶと again ゼロが返る
    expect(drainTickStats()).toEqual({ avgMs: 0, maxMs: 0, count: 0 });
  });

  it('markTickEnd 単発 (= start なし) は無視される', () => {
    markTickEnd();
    expect(drainTickStats()).toEqual({ avgMs: 0, maxMs: 0, count: 0 });
  });

  it('markTickStart を 2 連発した場合、 後者の start から区間がカウントされる', () => {
    const spy = vi.spyOn(performance, 'now');
    spy.mockReturnValueOnce(0); // 1 回目の start (上書きされて捨てられる)
    spy.mockReturnValueOnce(10); // 2 回目の start
    spy.mockReturnValueOnce(13); // end

    markTickStart();
    markTickStart();
    markTickEnd();

    const stats = drainTickStats();
    expect(stats.count).toBe(1);
    expect(stats.avgMs).toBeCloseTo(3, 5);
  });

  it('setProjectileCount → getProjectileCount で最終値が読める (リセットなし)', () => {
    setProjectileCount(5);
    expect(getProjectileCount()).toBe(5);
    setProjectileCount(12);
    expect(getProjectileCount()).toBe(12);
    // drainTickStats を呼んでもリセットされない
    drainTickStats();
    expect(getProjectileCount()).toBe(12);
  });
});
