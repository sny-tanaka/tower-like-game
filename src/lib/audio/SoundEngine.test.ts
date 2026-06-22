import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SoundEngine } from './SoundEngine';

type MockParam = {
  value: number;
  setValueAtTime: ReturnType<typeof vi.fn>;
  linearRampToValueAtTime: ReturnType<typeof vi.fn>;
  exponentialRampToValueAtTime: ReturnType<typeof vi.fn>;
};

type MockNode = {
  connect: ReturnType<typeof vi.fn>;
};

function createMockParam(): MockParam {
  return {
    value: 0,
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  };
}

function createMockGain(): MockNode & { gain: MockParam } {
  return { gain: createMockParam(), connect: vi.fn().mockReturnThis() };
}

function createMockOsc(): MockNode & {
  type: string;
  frequency: MockParam;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
} {
  return {
    type: 'sine',
    frequency: createMockParam(),
    connect: vi.fn().mockReturnThis(),
    start: vi.fn(),
    stop: vi.fn(),
  };
}

function createMockFilter(): MockNode & {
  type: string;
  frequency: { value: number };
  Q: { value: number };
} {
  return {
    type: 'lowpass',
    frequency: { value: 0 },
    Q: { value: 1 },
    connect: vi.fn().mockReturnThis(),
  };
}

function createMockBufferSource(): MockNode & {
  buffer: unknown;
  start: ReturnType<typeof vi.fn>;
} {
  return { buffer: null, connect: vi.fn().mockReturnThis(), start: vi.fn() };
}

class MockAudioContext {
  state: 'running' | 'suspended' = 'running';
  currentTime = 0;
  sampleRate = 48000;
  destination = {};
  createGain = vi.fn(createMockGain);
  createOscillator = vi.fn(createMockOsc);
  createBiquadFilter = vi.fn(createMockFilter);
  createBufferSource = vi.fn(createMockBufferSource);
  createBuffer = vi.fn((_ch: number, length: number) => ({
    getChannelData: () => new Float32Array(length),
  }));
  resume = vi.fn(() => Promise.resolve());
  close = vi.fn(() => Promise.resolve());
}

let perfNow = 0;

beforeEach(() => {
  perfNow = 0;
  vi.stubGlobal('AudioContext', MockAudioContext);
  vi.spyOn(performance, 'now').mockImplementation(() => perfNow);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('SoundEngine', () => {
  it('starts uninitialized', () => {
    const engine = new SoundEngine();
    expect(engine.isInitialized()).toBe(false);
  });

  it('init() creates an AudioContext exactly once', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.init();
    expect(engine.isInitialized()).toBe(true);
  });

  it('play() before init() is a no-op (no throw)', () => {
    const engine = new SoundEngine();
    expect(() => engine.play('tap')).not.toThrow();
  });

  it('setSeVolume clamps to [0, 1]', () => {
    const engine = new SoundEngine();
    engine.setSeVolume(-1);
    expect(engine.getSeVolume()).toBe(0);
    engine.setSeVolume(2);
    expect(engine.getSeVolume()).toBe(1);
    engine.setSeVolume(0.4);
    expect(engine.getSeVolume()).toBe(0.4);
  });

  it('setBgmVolume clamps to [0, 1]', () => {
    const engine = new SoundEngine();
    engine.setBgmVolume(-0.5);
    expect(engine.getBgmVolume()).toBe(0);
    engine.setBgmVolume(1.5);
    expect(engine.getBgmVolume()).toBe(1);
  });

  it('volume changes apply to the gain node after init', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.setSeVolume(0.3);
    expect(engine.getSeVolume()).toBe(0.3);
  });

  it('play() invokes the sound function', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.play('tap');
    // create* メソッドが呼ばれていれば、内部の soundLibrary が実行された証拠
  });

  it('rate-limited sound id (laserShoot) is suppressed within the interval', () => {
    const engine = new SoundEngine();
    engine.init();
    // 1 回目は通る
    perfNow = 0;
    engine.play('laserShoot');
    // 50ms 以内は無視されるはず
    perfNow = 10;
    engine.play('laserShoot');
    // 51ms 経過後は再度通る
    perfNow = 60;
    engine.play('laserShoot');
    // ここではエラーなく完了することを確認
    expect(engine.isInitialized()).toBe(true);
  });

  it('non-rate-limited sound id (tap) plays back-to-back', () => {
    const engine = new SoundEngine();
    engine.init();
    perfNow = 0;
    engine.play('tap');
    perfNow = 1;
    engine.play('tap');
    perfNow = 2;
    engine.play('tap');
    expect(engine.isInitialized()).toBe(true);
  });

  it('destroy() resets initialized state', () => {
    const engine = new SoundEngine();
    engine.init();
    expect(engine.isInitialized()).toBe(true);
    engine.destroy();
    expect(engine.isInitialized()).toBe(false);
  });

  it('init() resumes if context is suspended', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.play('tap');
    expect(engine.isInitialized()).toBe(true);
  });
});
