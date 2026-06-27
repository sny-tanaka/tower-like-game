import { describe, expect, it, vi } from 'vitest';

import { BattleEntityStore } from './BattleEntityStore';

import type { DamageEvent } from '@/components/organisms/BattleField';
import { BigNum } from '@/lib/bignum/BigNum';

describe('BattleEntityStore — subscribe / notify', () => {
  it('subscribe した listener が notifyFrame で呼ばれる', () => {
    const store = new BattleEntityStore();
    const listener = vi.fn();
    store.subscribe(listener);
    expect(listener).not.toHaveBeenCalled();

    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(1);

    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('複数 listener 全員に通知される', () => {
    const store = new BattleEntityStore();
    const a = vi.fn();
    const b = vi.fn();
    const c = vi.fn();
    store.subscribe(a);
    store.subscribe(b);
    store.subscribe(c);

    store.notifyFrame();
    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
    expect(c).toHaveBeenCalledTimes(1);
  });

  it('subscribe の戻り値で unsubscribe できる', () => {
    const store = new BattleEntityStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(1); // unsub 後は呼ばれない
  });

  it('getListenerCount が unsubscribe で減る', () => {
    const store = new BattleEntityStore();
    const u1 = store.subscribe(() => undefined);
    const u2 = store.subscribe(() => undefined);
    expect(store.getListenerCount()).toBe(2);
    u1();
    expect(store.getListenerCount()).toBe(1);
    u2();
    expect(store.getListenerCount()).toBe(0);
  });
});

describe('BattleEntityStore — getSnapshot', () => {
  it('初期値は 0', () => {
    const store = new BattleEntityStore();
    expect(store.getSnapshot()).toBe(0);
  });

  it('notifyFrame で frameVersion が +1 される', () => {
    const store = new BattleEntityStore();
    expect(store.getSnapshot()).toBe(0);
    store.notifyFrame();
    expect(store.getSnapshot()).toBe(1);
    store.notifyFrame();
    expect(store.getSnapshot()).toBe(2);
  });

  it('getSnapshot は number を返すので Object.is で安定判定可能', () => {
    const store = new BattleEntityStore();
    const a = store.getSnapshot();
    const b = store.getSnapshot();
    // 同じ frame では同じ値 (Object.is true)
    expect(Object.is(a, b)).toBe(true);
    store.notifyFrame();
    const c = store.getSnapshot();
    expect(Object.is(a, c)).toBe(false); // notify 後は別の値
  });
});

describe('BattleEntityStore — mutation API', () => {
  it('setEnemies / getEnemies で配列を保持できる', () => {
    const store = new BattleEntityStore();
    expect(store.getEnemies()).toEqual([]);
    const enemies = [
      {
        id: 'e-1',
        kind: 'normal' as const,
        position: { x: 50, y: 50 },
        hp: BigNum.fromNumber(100),
        maxHp: BigNum.fromNumber(100),
        atk: BigNum.fromNumber(10),
        speed: 1,
        reward: { screw: 1, bolt: 0, alloyChance: 0, alloyAmount: 0 },
        hitRadius: 1.03,
        spawnedAtMs: 0,
      },
    ];
    store.setEnemies(enemies);
    expect(store.getEnemies()).toBe(enemies);
  });

  it('setDamageEvents / getDamageEvents で events を保持', () => {
    const store = new BattleEntityStore();
    const events: DamageEvent[] = [{ id: 'd1', x: 10, y: 20, value: BigNum.fromNumber(50) }];
    store.setDamageEvents(events);
    expect(store.getDamageEvents()).toBe(events);
  });

  it('setWaveElapsedSec / getWaveElapsedSec で秒数を保持', () => {
    const store = new BattleEntityStore();
    store.setWaveElapsedSec(12.5);
    expect(store.getWaveElapsedSec()).toBe(12.5);
  });
});

describe('BattleEntityStore — queueRemoval / consumePendingRemovals (Phase 2-A)', () => {
  it('queueRemoval で削除キューに ID を積める', () => {
    const store = new BattleEntityStore();
    expect(store.getPendingRemovalCount('damage')).toBe(0);
    store.queueRemoval('damage', 'de-1');
    store.queueRemoval('damage', 'de-2');
    expect(store.getPendingRemovalCount('damage')).toBe(2);
  });

  it('queueRemoval は notify を起こさない', () => {
    const store = new BattleEntityStore();
    const listener = vi.fn();
    store.subscribe(listener);
    store.queueRemoval('damage', 'de-1');
    expect(listener).not.toHaveBeenCalled();
  });

  it('consumePendingRemovals で取り出すと内部キューがクリアされる (atomic)', () => {
    const store = new BattleEntityStore();
    store.queueRemoval('death', 'dh-1');
    store.queueRemoval('death', 'dh-2');
    const consumed = store.consumePendingRemovals('death');
    expect(consumed.size).toBe(2);
    expect(consumed.has('dh-1')).toBe(true);
    expect(consumed.has('dh-2')).toBe(true);
    expect(store.getPendingRemovalCount('death')).toBe(0);
  });

  it('種別ごとに独立 (damage と death は混ざらない)', () => {
    const store = new BattleEntityStore();
    store.queueRemoval('damage', 'de-1');
    store.queueRemoval('death', 'dh-1');
    store.queueRemoval('projectile', 'pj-1');
    store.queueRemoval('appearance', 'ap-1');
    expect(store.consumePendingRemovals('damage').size).toBe(1);
    expect(store.consumePendingRemovals('death').size).toBe(1);
    expect(store.consumePendingRemovals('projectile').size).toBe(1);
    expect(store.consumePendingRemovals('appearance').size).toBe(1);
  });

  it('reset() で削除キューも掃除される', () => {
    const store = new BattleEntityStore();
    store.queueRemoval('damage', 'de-1');
    store.queueRemoval('projectile', 'pj-1');
    store.reset();
    expect(store.getPendingRemovalCount('damage')).toBe(0);
    expect(store.getPendingRemovalCount('projectile')).toBe(0);
  });
});

describe('BattleEntityStore — reset', () => {
  it('reset で全状態がクリアされる', () => {
    const store = new BattleEntityStore();
    store.setEnemies([
      {
        id: 'e-1',
        kind: 'normal',
        position: { x: 50, y: 50 },
        hp: BigNum.fromNumber(100),
        maxHp: BigNum.fromNumber(100),
        atk: BigNum.fromNumber(10),
        speed: 1,
        reward: { screw: 1, bolt: 0, alloyChance: 0, alloyAmount: 0 },
        hitRadius: 1.03,
        spawnedAtMs: 0,
      },
    ]);
    store.setWaveElapsedSec(20);
    store.reset();
    expect(store.getEnemies()).toEqual([]);
    expect(store.getWaveElapsedSec()).toBe(0);
  });

  it('reset でも frameVersion は単調増加する (購読側 Object.is 誤判定防止)', () => {
    const store = new BattleEntityStore();
    store.notifyFrame();
    store.notifyFrame();
    const before = store.getSnapshot();
    store.reset();
    const after = store.getSnapshot();
    expect(after).toBeGreaterThan(before);
  });

  it('reset すると listener にも通知が飛ぶ', () => {
    const store = new BattleEntityStore();
    const listener = vi.fn();
    store.subscribe(listener);
    store.reset();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
