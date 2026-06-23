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
    vi.restoreAllMocks();
  });

  it('vibrationEnabled = true のとき navigator.vibrate が呼ばれる', () => {
    vibrate(20);
    expect(vibrateSpy).toHaveBeenCalledWith(20);
  });

  it('vibrationEnabled = false のとき navigator.vibrate が呼ばれない', () => {
    useStore.setState({ vibrationEnabled: false });
    vibrate(20);
    expect(vibrateSpy).not.toHaveBeenCalled();
  });

  it('navigator.vibrate が undefined (iOS Safari 相当) のとき例外が起きない', () => {
    Object.defineProperty(navigator, 'vibrate', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    expect(() => vibrate(20)).not.toThrow();
  });

  it('navigator.vibrate が例外を投げても呼び出し元が落ちない', () => {
    vibrateSpy.mockImplementation(() => {
      throw new Error('vibrate failed');
    });
    expect(() => vibrate(20)).not.toThrow();
  });
});
