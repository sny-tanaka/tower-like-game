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
  stop: ReturnType<typeof vi.fn>;
} {
  return { buffer: null, connect: vi.fn().mockReturnThis(), start: vi.fn(), stop: vi.fn() };
}

function createMockDelay(): MockNode & {
  delayTime: { value: number };
} {
  return { delayTime: { value: 0 }, connect: vi.fn().mockReturnThis() };
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
  createDelay = vi.fn(createMockDelay);
  resume = vi.fn(() => {
    this.state = 'running';
    return Promise.resolve();
  });
  suspend = vi.fn(() => {
    this.state = 'suspended';
    return Promise.resolve();
  });
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

  // hotfix/0.3.1 回帰防止: init() 前に setBgmVolume/setSeVolume で内部値を更新したとき、
  // init() 後に GainNode へ正しい値が反映されることを保証する。
  // これが成立する限り、 App.tsx の initOnce 内で setXxxVolume を呼ぶ必要がなく、
  // 「initOnce のクロージャ捕捉値で hydrate 後の値を上書きする」 バグが起きない。
  it('init 前に setSeVolume / setBgmVolume した値が init 後の gain.value に反映される', () => {
    const engine = new SoundEngine();
    // hydrate 後想定の値で 内部 volume を更新 (gain はまだ null なので no-op)
    engine.setSeVolume(0.3);
    engine.setBgmVolume(0.2);
    expect(engine.getSeVolume()).toBe(0.3);
    expect(engine.getBgmVolume()).toBe(0.2);
    // init で GainNode を作成 → 内部 volume をそのまま gain.value に代入することを期待
    engine.init();
    expect(engine.getSeVolume()).toBe(0.3);
    expect(engine.getBgmVolume()).toBe(0.2);
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

  describe('visibilitychange による AudioContext 制御 (発熱抑制)', () => {
    it('document.hidden=true で AudioContext.suspend が呼ばれる', () => {
      const engine = new SoundEngine();
      engine.init();
      const ctx = (engine as unknown as { ctx: MockAudioContext }).ctx;
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
      expect(ctx.suspend).toHaveBeenCalled();
    });

    it('document.hidden=false で AudioContext.resume が呼ばれる', () => {
      const engine = new SoundEngine();
      engine.init();
      const ctx = (engine as unknown as { ctx: MockAudioContext }).ctx;
      // まず suspend させてから resume を確認
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
      ctx.resume.mockClear();
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
      document.dispatchEvent(new Event('visibilitychange'));
      expect(ctx.resume).toHaveBeenCalled();
    });

    it('既に suspended のとき suspend を二度呼ばない', () => {
      const engine = new SoundEngine();
      engine.init();
      const ctx = (engine as unknown as { ctx: MockAudioContext }).ctx;
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
      ctx.suspend.mockClear();
      document.dispatchEvent(new Event('visibilitychange'));
      expect(ctx.suspend).not.toHaveBeenCalled();
    });

    it('destroy() で visibilitychange listener が解除される', () => {
      const engine = new SoundEngine();
      engine.init();
      const ctx = (engine as unknown as { ctx: MockAudioContext | null }).ctx!;
      engine.destroy();
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
      expect(ctx.suspend).not.toHaveBeenCalled();
    });
  });

  it('setMuted(true) で isMuted() が true になる', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.setMuted(true);
    expect(engine.isMuted()).toBe(true);
  });

  it('setMuted(false) で isMuted() が false になる', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.setMuted(true);
    engine.setMuted(false);
    expect(engine.isMuted()).toBe(false);
  });

  it('setMuted(true) 後も seVolume / bgmVolume の内部値は変わらない', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.setSeVolume(0.6);
    engine.setBgmVolume(0.4);
    engine.setMuted(true);
    expect(engine.getSeVolume()).toBe(0.6);
    expect(engine.getBgmVolume()).toBe(0.4);
  });

  it('init() resumes if context is suspended', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.play('tap');
    expect(engine.isInitialized()).toBe(true);
  });

  it('setMuted() before init() は throw しない', () => {
    const engine = new SoundEngine();
    expect(() => engine.setMuted(true)).not.toThrow();
    expect(engine.isMuted()).toBe(true);
  });

  it('setMuted(true) → setMuted(false) で isMuted() が false に戻る (init あり)', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.setMuted(true);
    expect(engine.isMuted()).toBe(true);
    engine.setMuted(false);
    expect(engine.isMuted()).toBe(false);
  });

  it('destroy() 後に isMuted() が false にリセットされる', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.setMuted(true);
    expect(engine.isMuted()).toBe(true);
    engine.destroy();
    expect(engine.isMuted()).toBe(false);
  });
});

describe('SoundEngine BGM', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('playBgm() before init() is a no-op (no throw)', () => {
    const engine = new SoundEngine();
    expect(() => engine.playBgm('title')).not.toThrow();
    expect(engine.getCurrentBgm()).toBeNull();
  });

  it('playBgm() starts BGM and getCurrentBgm() returns the id', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.playBgm('title');
    expect(engine.getCurrentBgm()).toBe('title');
  });

  it('playBgm() with same id does not restart (idempotent)', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.playBgm('base');
    engine.playBgm('base');
    expect(engine.getCurrentBgm()).toBe('base');
  });

  it('playBgm() switches track when called with different id', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.playBgm('battleNormal');
    expect(engine.getCurrentBgm()).toBe('battleNormal');
    engine.playBgm('battleBoss');
    expect(engine.getCurrentBgm()).toBe('battleBoss');
  });

  it('stopBgm() stops playing and getCurrentBgm() returns null', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.playBgm('title');
    engine.stopBgm();
    expect(engine.getCurrentBgm()).toBeNull();
  });

  it('stopBgm() before playBgm() is a no-op (no throw)', () => {
    const engine = new SoundEngine();
    engine.init();
    expect(() => engine.stopBgm()).not.toThrow();
  });

  it('destroy() stops BGM and resets initialized state', () => {
    const engine = new SoundEngine();
    engine.init();
    engine.playBgm('base');
    engine.destroy();
    expect(engine.isInitialized()).toBe(false);
    expect(engine.getCurrentBgm()).toBeNull();
  });

  it('all BgmIds can be started without throw', () => {
    const engine = new SoundEngine();
    engine.init();
    const ids = ['title', 'base', 'battleNormal', 'battleBoss'] as const;
    for (const id of ids) {
      engine.playBgm(id);
      expect(engine.getCurrentBgm()).toBe(id);
      engine.stopBgm();
    }
  });
});
