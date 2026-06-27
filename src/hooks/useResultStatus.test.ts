/**
 * useResultStatus (v1.3.7 Phase 4-D) 単体テスト。
 *
 * Page (pages/battle/index.tsx) のリザルト関連ロジックを集約した hook。
 * 自動 status 判定 (gameover) / 手動 set (retreat / clear) / finalize snapshot / SE 再生 /
 * 重複 finalize ガードの仕様を hook 単体で検証する。
 */
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { useResultStatus } from './useResultStatus';

import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

vi.mock('@/store/sync', () => ({
  flushAfterRun: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/audio', () => ({
  soundEngine: {
    play: vi.fn(),
    playBgm: vi.fn(),
    stopBgm: vi.fn(),
    init: vi.fn(),
  },
}));

const defaultOpts = {
  getKillCount: () => 42,
  getRunElapsedSec: () => 30,
  getDroppedPatches: () => [],
};

describe('useResultStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().endRun();
    useStore.setState({ highestTier: 0, highestWave: 0 });
  });
  afterEach(() => {
    resetBattleState();
    vi.clearAllMocks();
  });

  test('初期状態: effectiveResultStatus は null / isResultOpen は false', () => {
    // isRunActive=false のラン外状態では gameover 自動判定が走らない
    seedBattleState({ machineHp: BigNum.ZERO });
    const { result } = renderHook(() => useResultStatus(defaultOpts));
    expect(result.current.effectiveResultStatus).toBeNull();
    expect(result.current.isResultOpen).toBe(false);
  });

  test('isRunActive=true + machineHp<=0 で effectiveResultStatus が gameover になる', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
    });
    // startRun 直後は machineHp = maxHp = 100。 ここで 0 に落とす
    const { result } = renderHook(() => useResultStatus(defaultOpts));
    act(() => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });
    expect(result.current.effectiveResultStatus).toBe('gameover');
    expect(result.current.isResultOpen).toBe(true);
  });

  test('isRunActive=false なら machineHp<=0 でも gameover にならない', () => {
    // isRunActive=false + machineHp=0 (= defaultBattleState の状態) で
    // ラン開始前に誤ってリザルトを出さないことを確認
    expect(useStore.getState().isRunActive).toBe(false);
    const { result } = renderHook(() => useResultStatus(defaultOpts));
    expect(result.current.effectiveResultStatus).toBeNull();
  });

  test('setRetreat() で effectiveResultStatus が retreat になる', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
    });
    const { result } = renderHook(() => useResultStatus(defaultOpts));
    expect(result.current.effectiveResultStatus).toBeNull();

    act(() => {
      result.current.setRetreat();
    });

    expect(result.current.effectiveResultStatus).toBe('retreat');
    expect(result.current.isResultOpen).toBe(true);
  });

  test('finalizeAsClear() で effectiveResultStatus が clear になり endRun が呼ばれる', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 2,
    });
    useStore.setState({ currentWave: 30 });

    const { result } = renderHook(() => useResultStatus(defaultOpts));

    act(() => {
      result.current.finalizeAsClear();
    });

    expect(result.current.effectiveResultStatus).toBe('clear');
    // endRun() が呼ばれて isRunActive=false に
    expect(useStore.getState().isRunActive).toBe(false);
    // updateHighest が呼ばれて highestTier/Wave が記録される
    expect(useStore.getState().highestTier).toBe(2);
    expect(useStore.getState().highestWave).toBe(30);
  });

  test('finalize スナップショット: reachedTier / reachedWave は endRun 後も保持される', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 3,
    });
    useStore.setState({ currentWave: 15 });

    const { result } = renderHook(() => useResultStatus(defaultOpts));

    act(() => {
      result.current.finalizeAsClear();
    });

    // endRun() で currentTier=1 / currentWave=1 にリセットされるが、 snapshot は 3 / 15 を保持
    expect(useStore.getState().currentTier).toBe(1);
    expect(useStore.getState().currentWave).toBe(1);
    expect(result.current.reachedTier).toBe(3);
    expect(result.current.reachedWave).toBe(15);
  });

  test('finalize スナップショット: earnedBolt / earnedAlloy は runStart からの差分を保持する', () => {
    // ラン開始時 bolt=100 / alloy=50 から、 ラン中に bolt=300 / alloy=120 まで増えた状態を作る
    useStore.setState({
      bolt: BigNum.fromNumber(100),
      alloy: BigNum.fromNumber(50),
    });
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
    });
    // 上記 startRun で runStartBolt=100, runStartAlloy=50 が記録される
    useStore.setState({
      bolt: BigNum.fromNumber(300),
      alloy: BigNum.fromNumber(120),
    });

    const { result } = renderHook(() => useResultStatus(defaultOpts));

    act(() => {
      result.current.finalizeAsClear();
    });

    // 獲得 = 300 - 100 = 200 / 120 - 50 = 70 で snapshot される
    expect(result.current.earnedBolt.eq(BigNum.fromNumber(200))).toBe(true);
    expect(result.current.earnedAlloy.eq(BigNum.fromNumber(70))).toBe(true);
  });

  test('finalize は 1 ラン内で 1 回しか実行されない (重複ガード)', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
    });
    const incrementRunsSpy = vi.spyOn(useStore.getState(), 'incrementRuns');

    const { result } = renderHook(() => useResultStatus(defaultOpts));

    act(() => {
      result.current.finalizeAsClear();
    });
    act(() => {
      result.current.finalizeAsClear();
    });
    act(() => {
      result.current.setRetreat();
    });

    expect(incrementRunsSpy).toHaveBeenCalledTimes(1);
  });

  test('resetFinalize() でガードとスナップショットがリセットされる (次ランで再 finalize 可能)', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
    });
    const incrementRunsSpy = vi.spyOn(useStore.getState(), 'incrementRuns');
    const { result } = renderHook(() => useResultStatus(defaultOpts));

    // 1 回目 finalize
    act(() => {
      result.current.finalizeAsClear();
    });
    expect(incrementRunsSpy).toHaveBeenCalledTimes(1);

    // resetFinalize → 次ラン開始
    act(() => {
      result.current.resetFinalize();
    });
    expect(result.current.effectiveResultStatus).toBeNull();
    expect(result.current.isResultOpen).toBe(false);

    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
    });

    // 2 ラン目の finalize は再度実行される
    act(() => {
      result.current.finalizeAsClear();
    });
    expect(incrementRunsSpy).toHaveBeenCalledTimes(2);
  });

  test('addEnemiesKilled / addPlayTimeSec は getter 経由で最新値が渡される', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
    });

    const addEnemiesKilledSpy = vi.spyOn(useStore.getState(), 'addEnemiesKilled');
    const addPlayTimeSpy = vi.spyOn(useStore.getState(), 'addPlayTimeSec');

    // getter が常に最新値を返すよう、 ローカル変数を ref で更新するパターンをシミュレート
    let killCount = 0;
    let runElapsedSec = 0;
    const opts = {
      getKillCount: () => killCount,
      getRunElapsedSec: () => runElapsedSec,
      getDroppedPatches: () => [],
    };
    const { result } = renderHook(() => useResultStatus(opts));

    // finalize 直前に値を更新
    killCount = 123;
    runElapsedSec = 456;

    act(() => {
      result.current.finalizeAsClear();
    });

    expect(addEnemiesKilledSpy).toHaveBeenCalledWith(123);
    expect(addPlayTimeSpy).toHaveBeenCalledWith(456);
  });
});
