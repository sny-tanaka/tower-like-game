import { describe, expect, it, vi } from 'vitest';

import { BattleEntityStore } from './BattleEntityStore';

import type { DamageEvent } from '@/components/organisms/BattleField';
import { MutableEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// テスト用の MutableEnemy 生成 helper (Phase 3-A の subscribeEnemy* / addEnemy 系で使う)
function makeEnemy(overrides: {
  id: string;
  hp?: number;
  maxHp?: number;
  frozen?: boolean;
  burn?: boolean;
}) {
  const hp = overrides.hp ?? 100;
  const maxHp = overrides.maxHp ?? 100;
  return new MutableEnemy({
    id: overrides.id,
    kind: 'normal',
    subtype: 'standard',
    speed: 1,
    reward: { screw: 1, bolt: 0, alloyChance: 0, alloyAmount: 0 },
    hitRadius: 1.03,
    spawnedAtMs: 0,
    hp: BigNum.fromNumber(hp),
    maxHp: BigNum.fromNumber(maxHp),
    atk: BigNum.fromNumber(10),
    position: { x: 50, y: 50 },
    frozenUntilMs: overrides.frozen ? 10_000 : undefined,
    burnUntilMs: overrides.burn ? 10_000 : undefined,
  });
}

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

// ---------------------------------------------------------------------------
// v1.3.7 (Phase 3-A): 敵単位 listener / mutation
// ---------------------------------------------------------------------------

describe('BattleEntityStore — subscribeEnemyPosition / markEnemyMoved (Phase 3-A)', () => {
  it('markEnemyMoved した敵の position listener が notifyFrame で呼ばれる', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    const listener = vi.fn();
    store.subscribeEnemyPosition('e-1', listener);

    store.markEnemyMoved('e-1');
    expect(listener).not.toHaveBeenCalled(); // mark だけでは呼ばれない

    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('markEnemyMoved していない敵の listener は呼ばれない', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    store.addEnemy(makeEnemy({ id: 'e-2' }));
    const l1 = vi.fn();
    const l2 = vi.fn();
    store.subscribeEnemyPosition('e-1', l1);
    store.subscribeEnemyPosition('e-2', l2);

    store.markEnemyMoved('e-1');
    store.notifyFrame();
    expect(l1).toHaveBeenCalledTimes(1);
    expect(l2).not.toHaveBeenCalled();
  });

  it('subscribeEnemyPosition の戻り値で listener が外れる', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    const listener = vi.fn();
    const unsubscribe = store.subscribeEnemyPosition('e-1', listener);

    store.markEnemyMoved('e-1');
    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.markEnemyMoved('e-1');
    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(1); // unsub 後は呼ばれない
  });

  it('notifyFrame 後は pendingMovedIds が空になる (mark しないと次フレで通知されない)', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    const listener = vi.fn();
    store.subscribeEnemyPosition('e-1', listener);

    store.markEnemyMoved('e-1');
    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(1);

    // 次フレで mark しなければ呼ばれない
    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('BattleEntityStore — subscribeEnemyStatus / markEnemyStatusChanged (Phase 3-A)', () => {
  it('markEnemyStatusChanged した敵の status listener が notifyFrame で呼ばれる', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    const listener = vi.fn();
    store.subscribeEnemyStatus('e-1', listener);

    store.markEnemyStatusChanged('e-1');
    expect(listener).not.toHaveBeenCalled();

    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('position と status の listener Set は独立 (markEnemyMoved は status listener を呼ばない)', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    const posListener = vi.fn();
    const statusListener = vi.fn();
    store.subscribeEnemyPosition('e-1', posListener);
    store.subscribeEnemyStatus('e-1', statusListener);

    store.markEnemyMoved('e-1');
    store.notifyFrame();
    expect(posListener).toHaveBeenCalledTimes(1);
    expect(statusListener).not.toHaveBeenCalled();

    store.markEnemyStatusChanged('e-1');
    store.notifyFrame();
    expect(posListener).toHaveBeenCalledTimes(1); // 増えない
    expect(statusListener).toHaveBeenCalledTimes(1);
  });
});

describe('BattleEntityStore — addEnemy / removeEnemy / getEnemyById (Phase 3-A)', () => {
  it('addEnemy で enemyListVersion が +1 + getEnemies に含まれる + getEnemyById で取れる', () => {
    const store = new BattleEntityStore();
    expect(store.getEnemyListVersion()).toBe(0);
    const enemy = makeEnemy({ id: 'e-1' });
    store.addEnemy(enemy);
    expect(store.getEnemyListVersion()).toBe(1);
    expect(store.getEnemies()).toContain(enemy);
    expect(store.getEnemyById('e-1')).toBe(enemy);
  });

  it('removeEnemy で enemyListVersion が +1 + listener Set が削除される', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    const posListener = vi.fn();
    const statusListener = vi.fn();
    store.subscribeEnemyPosition('e-1', posListener);
    store.subscribeEnemyStatus('e-1', statusListener);
    expect(store.getEnemyListVersion()).toBe(1);

    store.removeEnemy('e-1');
    expect(store.getEnemyListVersion()).toBe(2);
    expect(store.getEnemyById('e-1')).toBeUndefined();
    expect(store.getEnemies().find((e) => e.id === 'e-1')).toBeUndefined();

    // removeEnemy 後に mark しても listener Set が空なので呼ばれない
    store.markEnemyMoved('e-1');
    store.markEnemyStatusChanged('e-1');
    store.notifyFrame();
    expect(posListener).not.toHaveBeenCalled();
    expect(statusListener).not.toHaveBeenCalled();
  });
});

describe('BattleEntityStore — getEnemyStatusSnapshot (Phase 3-A lazy cache)', () => {
  it('該当 id の敵が居ない場合は null を返す', () => {
    const store = new BattleEntityStore();
    expect(store.getEnemyStatusSnapshot('missing')).toBeNull();
  });

  it('markEnemyStatusChanged を呼ばない限り同一参照を返す (Object.is 安定)', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1', hp: 50, maxHp: 100, frozen: true, burn: false }));
    const s1 = store.getEnemyStatusSnapshot('e-1');
    const s2 = store.getEnemyStatusSnapshot('e-1');
    expect(s1).not.toBeNull();
    expect(Object.is(s1, s2)).toBe(true);
    expect(s1?.hpRatio).toBeCloseTo(0.5);
    expect(s1?.isFrozen).toBe(true);
    expect(s1?.isBurning).toBe(false);
    expect(s1?.kind).toBe('normal');
    expect(s1?.subtype).toBe('standard');
  });

  it('markEnemyStatusChanged 後は再計算され別参照になる', () => {
    const store = new BattleEntityStore();
    const enemy = makeEnemy({ id: 'e-1', hp: 100, maxHp: 100 });
    store.addEnemy(enemy);
    const before = store.getEnemyStatusSnapshot('e-1');
    expect(before?.hpRatio).toBeCloseTo(1.0);

    // HP を mutate (Phase 3-B 想定の in-place mutation)
    enemy.hp = BigNum.fromNumber(20);
    // mark しないとキャッシュは更新されない
    expect(store.getEnemyStatusSnapshot('e-1')).toBe(before);

    store.markEnemyStatusChanged('e-1');
    const after = store.getEnemyStatusSnapshot('e-1');
    expect(after).not.toBeNull();
    expect(Object.is(before, after)).toBe(false);
    expect(after?.hpRatio).toBeCloseTo(0.2);
  });
});

describe('BattleEntityStore — reset で Phase 3-A 内部状態も掃除される', () => {
  it('reset で enemyById / listener Set / snapshot キャッシュ / pending が空になる', () => {
    const store = new BattleEntityStore();
    const enemy = makeEnemy({ id: 'e-1' });
    store.addEnemy(enemy);
    store.subscribeEnemyPosition('e-1', () => undefined);
    store.subscribeEnemyStatus('e-1', () => undefined);
    store.getEnemyStatusSnapshot('e-1'); // キャッシュを温める
    store.markEnemyMoved('e-1');
    store.markEnemyStatusChanged('e-1');

    store.reset();

    expect(store.getEnemyById('e-1')).toBeUndefined();
    expect(store.getEnemies()).toEqual([]);
    expect(store.getEnemyStatusSnapshot('e-1')).toBeNull();

    // reset 後に同じ id で listener を張り直し、 mark + notifyFrame しても、 前回登録した
    // listener はもう呼ばれない (clear 済み)
    const newListener = vi.fn();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    store.subscribeEnemyPosition('e-1', newListener);
    store.markEnemyMoved('e-1');
    store.notifyFrame();
    expect(newListener).toHaveBeenCalledTimes(1);
  });

  it('reset でも enemyListVersion は単調増加 (購読側 Object.is 誤判定防止)', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    const before = store.getEnemyListVersion();
    store.reset();
    const after = store.getEnemyListVersion();
    expect(after).toBeGreaterThanOrEqual(before);
  });
});
