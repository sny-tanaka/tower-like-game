import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { vibrate } from './vibrate';

import { useStore } from '@/store/index';

describe('vibrate', () => {
  let vibrateSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vibrateSpy = vi.fn();
    Object.defineProperty(navigator, 'vibrate', {
      value: vibrateSpy,
      writable: true,
      configurable: true,
    });
    // デフォルトは vibrationEnabled = true
    useStore.setState({ vibrationEnabled: true });
  });

  afterEach(() => {
    // navigator.vibrate を関数に戻しておく（テスト間の汚染防止）
    Object.defineProperty(navigator, 'vibrate', {
      value: vi.fn(),
      writable: true,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  // ---- gate ----------------------------------------------------------------

  it('vibrationEnabled = true のとき navigator.vibrate が呼ばれる', () => {
    vibrate(20);
    expect(vibrateSpy).toHaveBeenCalledWith(20);
  });

  it('vibrationEnabled = false のとき navigator.vibrate が呼ばれない', () => {
    useStore.setState({ vibrationEnabled: false });
    vibrate(20);
    expect(vibrateSpy).not.toHaveBeenCalled();
  });

  // ---- 存在チェック / try/catch --------------------------------------------

  it('navigator.vibrate が undefined (iOS Safari 相当) のとき例外が起きない', () => {
    Object.defineProperty(navigator, 'vibrate', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    expect(() => vibrate(20)).not.toThrow();
  });

  it('navigator.vibrate が undefined のとき呼び出し自体が発生しない', () => {
    const notAFunction = undefined;
    Object.defineProperty(navigator, 'vibrate', {
      value: notAFunction,
      writable: true,
      configurable: true,
    });
    // vibrateSpy はもう navigator.vibrate ではないが、呼ばれていないことを確認
    vibrate(20);
    expect(vibrateSpy).not.toHaveBeenCalled();
  });

  it('navigator.vibrate が例外を投げても呼び出し元が落ちない', () => {
    vibrateSpy.mockImplementation(() => {
      throw new Error('vibrate failed');
    });
    expect(() => vibrate(20)).not.toThrow();
  });

  it('navigator.vibrate が例外を投げても vibrationEnabled=false 判定は正常に動作する', () => {
    vibrateSpy.mockImplementation(() => {
      throw new Error('vibrate failed');
    });
    useStore.setState({ vibrationEnabled: false });
    // gate で早期 return されるため例外は発生しない（try/catch を通らない）
    expect(() => vibrate(20)).not.toThrow();
    expect(vibrateSpy).not.toHaveBeenCalled();
  });

  // ---- パターン値 ----------------------------------------------------------

  it('number[] パターンをそのまま navigator.vibrate に渡す', () => {
    vibrate([40, 30, 40]);
    expect(vibrateSpy).toHaveBeenCalledWith([40, 30, 40]);
  });

  it('[100, 50, 100, 50, 100] (machineDown パターン) を正しく渡す', () => {
    vibrate([100, 50, 100, 50, 100]);
    expect(vibrateSpy).toHaveBeenCalledWith([100, 50, 100, 50, 100]);
  });

  it('vibrate(0) は navigator.vibrate(0) として呼ばれる（停止呼び出し）', () => {
    vibrate(0);
    expect(vibrateSpy).toHaveBeenCalledWith(0);
  });

  // ---- 連続発火 ------------------------------------------------------------

  it('連続して呼ばれた場合、各呼び出しが navigator.vibrate に届く (last wins)', () => {
    vibrate(8);
    vibrate(20);
    expect(vibrateSpy).toHaveBeenCalledTimes(2);
    expect(vibrateSpy).toHaveBeenNthCalledWith(1, 8);
    expect(vibrateSpy).toHaveBeenNthCalledWith(2, 20);
  });

  it('vibrationEnabled が途中で false に変わると以降は呼ばれない', () => {
    vibrate(8);
    useStore.setState({ vibrationEnabled: false });
    vibrate(20);
    expect(vibrateSpy).toHaveBeenCalledTimes(1);
    expect(vibrateSpy).toHaveBeenCalledWith(8);
  });
});
