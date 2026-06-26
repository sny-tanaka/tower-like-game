import { describe, expect, test, vi } from 'vitest';

import { disconnectChainOnEnded } from './helpers';

describe('disconnectChainOnEnded (v1.1.4 audio leak fix)', () => {
  // AudioScheduledSourceNode の最小 mock。 onended プロパティと disconnect() があれば足りる。
  type MockSource = {
    onended: (() => void) | null;
    disconnect: () => void;
  };

  function mockSource(): MockSource {
    return {
      onended: null,
      disconnect: vi.fn(),
    };
  }

  function mockExtra(): { disconnect: () => void } {
    return { disconnect: vi.fn() };
  }

  test('onended 発火で source と全 extras が disconnect される', () => {
    const source = mockSource();
    const gain = mockExtra();
    const filter = mockExtra();
    disconnectChainOnEnded(source as unknown as AudioScheduledSourceNode, gain, filter);
    expect(source.onended).not.toBeNull();
    source.onended!();
    expect(source.disconnect).toHaveBeenCalledTimes(1);
    expect(gain.disconnect).toHaveBeenCalledTimes(1);
    expect(filter.disconnect).toHaveBeenCalledTimes(1);
  });

  test('既に disconnect 済みのノードでもエラーを投げず後続も disconnect する', () => {
    const source = mockSource();
    const gain = mockExtra();
    const filter = mockExtra();
    source.disconnect = vi.fn(() => {
      throw new Error('already disconnected');
    });
    disconnectChainOnEnded(source as unknown as AudioScheduledSourceNode, gain, filter);
    expect(() => source.onended!()).not.toThrow();
    expect(gain.disconnect).toHaveBeenCalledTimes(1);
    expect(filter.disconnect).toHaveBeenCalledTimes(1);
  });

  test('extras 0 個でも source は disconnect される', () => {
    const source = mockSource();
    disconnectChainOnEnded(source as unknown as AudioScheduledSourceNode);
    source.onended!();
    expect(source.disconnect).toHaveBeenCalledTimes(1);
  });
});
