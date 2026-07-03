/**
 * v1.4.7: SE (効果音) 生成関数の Web Audio ノード disconnect 漏れ回帰テスト。
 *
 * 背景: v1.1.4 で BGM 側 (bgm/helpers.ts) と共通ヘルパー tone()/noiseBurst()
 * (sounds/helpers.ts) には「onended で disconnect する」対策が入ったが、
 * SE 関数の中で ctx.createOscillator() 等を直接呼んでいる箇所には適用されておらず、
 * stop() 後もノードが audio graph に強参照されたまま蓄積していた。
 * 戦闘中は laserShoot / cutterShoot が毎秒最大 20 回発火するため蓄積が顕著で、
 * iOS 実機のメモリ枯渇 (jetsam) の一因になっていた。
 *
 * このテストは、各 SE 関数が生成する全ノードについて、
 * source の onended 発火後に disconnect() が呼ばれることを保証する。
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { activeCutter, activeLaser } from './active';
import { bossWarn, machineDown } from './battle';
import { resultRetreat } from './result';
import { dialogClose, dialogOpen } from './ui';
import { cutterShoot, laserShoot } from './weapon';

// ---- モック AudioContext: 生成した全ノードを記録する ----

type RecordedNode = {
  kind: 'oscillator' | 'gain' | 'filter' | 'bufferSource';
  disconnect: ReturnType<typeof vi.fn>;
  onended: (() => void) | null;
};

function createRecordingAudioContext() {
  const nodes: RecordedNode[] = [];
  const sources: RecordedNode[] = [];

  function baseNode(kind: RecordedNode['kind']): RecordedNode {
    const node: RecordedNode = {
      kind,
      disconnect: vi.fn(),
      onended: null,
    };
    nodes.push(node);
    return node;
  }

  const ctx = {
    sampleRate: 48000,
    createOscillator: vi.fn(() => {
      const node = baseNode('oscillator');
      sources.push(node);
      return {
        type: 'sine',
        frequency: {
          setValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn().mockReturnThis(),
        disconnect: node.disconnect,
        start: vi.fn(),
        stop: vi.fn(),
        get onended() {
          return node.onended;
        },
        set onended(fn: (() => void) | null) {
          node.onended = fn;
        },
      };
    }),
    createGain: vi.fn(() => {
      const node = baseNode('gain');
      return {
        gain: {
          value: 0,
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn().mockReturnThis(),
        disconnect: node.disconnect,
      };
    }),
    createBiquadFilter: vi.fn(() => {
      const node = baseNode('filter');
      return {
        type: 'lowpass',
        frequency: { value: 0 },
        Q: { value: 1 },
        connect: vi.fn().mockReturnThis(),
        disconnect: node.disconnect,
      };
    }),
    createBufferSource: vi.fn(() => {
      const node = baseNode('bufferSource');
      sources.push(node);
      return {
        buffer: null,
        connect: vi.fn().mockReturnThis(),
        disconnect: node.disconnect,
        start: vi.fn(),
        stop: vi.fn(),
        get onended() {
          return node.onended;
        },
        set onended(fn: (() => void) | null) {
          node.onended = fn;
        },
      };
    }),
    createBuffer: vi.fn((_ch: number, length: number) => ({
      getChannelData: () => new Float32Array(length),
    })),
  };

  return { ctx: ctx as unknown as AudioContext, nodes, sources };
}

/** 全 source (oscillator / bufferSource) の onended を発火させる */
function fireAllOnEnded(sources: RecordedNode[]): void {
  for (const source of sources) {
    source.onended?.();
  }
}

describe('SE 関数の Web Audio ノード disconnect 漏れ回帰テスト (v1.4.7)', () => {
  const dest = { connect: vi.fn() } as unknown as AudioNode;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const cases: { name: string; fn: (ctx: AudioContext, dest: AudioNode, now: number) => void }[] =
    [
      { name: 'laserShoot (weapon.ts)', fn: laserShoot },
      { name: 'cutterShoot (weapon.ts)', fn: cutterShoot },
      { name: 'bossWarn (battle.ts)', fn: bossWarn },
      { name: 'machineDown (battle.ts)', fn: machineDown },
      { name: 'activeLaser (active.ts)', fn: activeLaser },
      { name: 'activeCutter (active.ts)', fn: activeCutter },
      { name: 'dialogOpen (ui.ts)', fn: dialogOpen },
      { name: 'dialogClose (ui.ts)', fn: dialogClose },
      { name: 'resultRetreat (result.ts)', fn: resultRetreat },
    ];

  for (const { name, fn } of cases) {
    it(`${name}: 生成した全ノードが source の onended 発火後に disconnect される`, () => {
      const { ctx, nodes, sources } = createRecordingAudioContext();

      fn(ctx, dest, 0);

      // 生成されたノードがあること (テスト自体が無意味にならないためのガード)
      expect(nodes.length).toBeGreaterThan(0);
      expect(sources.length).toBeGreaterThan(0);

      // まだ disconnect は呼ばれていないはず
      for (const node of nodes) {
        expect(node.disconnect).not.toHaveBeenCalled();
      }

      fireAllOnEnded(sources);

      // 全ノード (oscillator / gain / filter / bufferSource) が disconnect されたこと
      for (const node of nodes) {
        expect(node.disconnect, `${node.kind} が disconnect されていない`).toHaveBeenCalled();
      }
    });
  }
});
