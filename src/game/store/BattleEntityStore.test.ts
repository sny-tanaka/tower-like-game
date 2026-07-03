import { describe, expect, it, vi } from 'vitest';

import { areVisibleIdSetsEqual, BattleEntityStore } from './BattleEntityStore';

import type { DamageEvent } from '@/components/organisms/BattleField';
import { MutableEnemy } from '@/game/types';
import type { SpawnedEnemyInit } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// テスト用の MutableEnemy 生成 helper (Phase 3-A の subscribeEnemy* / addEnemy 系で使う)
function makeEnemyInit(id: string, hp = 100, maxHp = 100): SpawnedEnemyInit {
  return {
    id,
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
  };
}

function makeEnemy(overrides: {
  id: string;
  hp?: number;
  maxHp?: number;
  frozen?: boolean;
  burn?: boolean;
}) {
  const init = makeEnemyInit(overrides.id, overrides.hp ?? 100, overrides.maxHp ?? 100);
  init.frozenUntilMs = overrides.frozen ? 10_000 : undefined;
  init.burnUntilMs = overrides.burn ? 10_000 : undefined;
  return new MutableEnemy(init);
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
  it('setEnemies / getEnemies で配列を保持できる (Phase 3-B: clearEnemies + addEnemy にラップされた挙動)', () => {
    const store = new BattleEntityStore();
    expect(store.getEnemies()).toEqual([]);
    const enemies = [new MutableEnemy(makeEnemyInit('e-1'))];
    store.setEnemies(enemies);
    // Phase 3-B: setEnemies は内部で clearEnemies + addEnemy(個別) にラップされるため
    // 「渡した配列がそのまま返る」 参照同一性は保証されない (= 内部 mutable 配列に追加される)。
    // 中身 (個々の敵オブジェクト) は同一参照で保持される。
    const got = store.getEnemies();
    expect(got).toHaveLength(1);
    expect(got[0]).toBe(enemies[0]);
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
    store.setEnemies([new MutableEnemy(makeEnemyInit('e-1'))]);
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

describe('BattleEntityStore — clearEnemies (Phase 3-B)', () => {
  it('clearEnemies で enemies / enemyById / listener Set / snapshotCache を全消し + enemyListVersion +1', () => {
    const store = new BattleEntityStore();
    const e1 = makeEnemy({ id: 'e-1' });
    const e2 = makeEnemy({ id: 'e-2' });
    store.addEnemy(e1);
    store.addEnemy(e2);
    store.subscribeEnemyPosition('e-1', () => undefined);
    store.subscribeEnemyStatus('e-2', () => undefined);
    store.getEnemyStatusSnapshot('e-1'); // キャッシュを温める
    store.markEnemyMoved('e-1');
    store.markEnemyStatusChanged('e-2');
    const versionBefore = store.getEnemyListVersion();

    store.clearEnemies();

    expect(store.getEnemies()).toEqual([]);
    expect(store.getEnemyById('e-1')).toBeUndefined();
    expect(store.getEnemyById('e-2')).toBeUndefined();
    expect(store.getEnemyStatusSnapshot('e-1')).toBeNull();
    expect(store.getEnemyListVersion()).toBeGreaterThan(versionBefore);
  });

  it('clearEnemies は notify を起こさない (= 単発 React render を発生させない)', () => {
    const store = new BattleEntityStore();
    const listener = vi.fn();
    store.subscribe(listener);
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    listener.mockReset();
    store.clearEnemies();
    expect(listener).not.toHaveBeenCalled();
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

// ---------------------------------------------------------------------------
// v1.4.8: 敵スプライト描画キャップの可視 ID 集合 API
// ---------------------------------------------------------------------------
describe('BattleEntityStore — setVisibleEnemyIds / getVisibleEnemyIds / isEnemyVisible (v1.4.8)', () => {
  it('初期値は null (= 全敵可視の fast path)', () => {
    const store = new BattleEntityStore();
    expect(store.getVisibleEnemyIds()).toBeNull();
    expect(store.isEnemyVisible('anything')).toBe(true);
  });

  it('setVisibleEnemyIds で集合をセットでき、 isEnemyVisible が反映される', () => {
    const store = new BattleEntityStore();
    store.setVisibleEnemyIds(new Set(['e-1', 'e-2']));
    expect(store.isEnemyVisible('e-1')).toBe(true);
    expect(store.isEnemyVisible('e-2')).toBe(true);
    expect(store.isEnemyVisible('e-3')).toBe(false);
  });

  it('null をセットし直すと再び全敵可視に戻る', () => {
    const store = new BattleEntityStore();
    store.setVisibleEnemyIds(new Set(['e-1']));
    expect(store.isEnemyVisible('e-2')).toBe(false);
    store.setVisibleEnemyIds(null);
    expect(store.isEnemyVisible('e-2')).toBe(true);
  });

  it('内容が変化した場合のみ getEnemyListAndVisibilityVersion が増える', () => {
    const store = new BattleEntityStore();
    const v0 = store.getEnemyListAndVisibilityVersion();
    store.setVisibleEnemyIds(new Set(['e-1']));
    const v1 = store.getEnemyListAndVisibilityVersion();
    expect(v1).toBeGreaterThan(v0);

    // 内容が同じ (別インスタンスだが同じ要素) 集合を再セットしても変化しない
    store.setVisibleEnemyIds(new Set(['e-1']));
    const v2 = store.getEnemyListAndVisibilityVersion();
    expect(v2).toBe(v1);

    // 内容が変わればまた増える
    store.setVisibleEnemyIds(new Set(['e-1', 'e-2']));
    const v3 = store.getEnemyListAndVisibilityVersion();
    expect(v3).toBeGreaterThan(v2);
  });

  it('null → null の再セットも no-op (バージョン変化なし)', () => {
    const store = new BattleEntityStore();
    const v0 = store.getEnemyListAndVisibilityVersion();
    store.setVisibleEnemyIds(null);
    expect(store.getEnemyListAndVisibilityVersion()).toBe(v0);
  });

  it('getEnemyListAndVisibilityVersion は enemyListVersion の変化にも反応する', () => {
    const store = new BattleEntityStore();
    const v0 = store.getEnemyListAndVisibilityVersion();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    const v1 = store.getEnemyListAndVisibilityVersion();
    expect(v1).toBeGreaterThan(v0);
  });

  it('clearEnemies で可視集合が null にリセットされる (敵ゼロで残留 ID を持たない)', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    store.setVisibleEnemyIds(new Set(['e-1']));
    expect(store.getVisibleEnemyIds()).not.toBeNull();

    store.clearEnemies();
    expect(store.getVisibleEnemyIds()).toBeNull();
  });

  it('reset (= clearEnemies 経由) でも可視集合がリセットされる', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    store.setVisibleEnemyIds(new Set(['e-1']));
    store.reset();
    expect(store.getVisibleEnemyIds()).toBeNull();
  });
});

describe('areVisibleIdSetsEqual (v1.4.8)', () => {
  it('両方 null なら true', () => {
    expect(areVisibleIdSetsEqual(null, null)).toBe(true);
  });

  it('片方だけ null なら false', () => {
    expect(areVisibleIdSetsEqual(null, new Set(['a']))).toBe(false);
    expect(areVisibleIdSetsEqual(new Set(['a']), null)).toBe(false);
  });

  it('同一参照なら true (中身を比較せず早期 return)', () => {
    const s = new Set(['a', 'b']);
    expect(areVisibleIdSetsEqual(s, s)).toBe(true);
  });

  it('サイズが違えば false', () => {
    expect(areVisibleIdSetsEqual(new Set(['a']), new Set(['a', 'b']))).toBe(false);
  });

  it('サイズ同じでも要素が違えば false', () => {
    expect(areVisibleIdSetsEqual(new Set(['a', 'b']), new Set(['a', 'c']))).toBe(false);
  });

  it('要素が完全一致 (順序不問) なら true', () => {
    expect(areVisibleIdSetsEqual(new Set(['a', 'b', 'c']), new Set(['c', 'b', 'a']))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// v1.4.8: notifyFrame / consumePendingRemovals の double-buffer 化 回帰テスト
// ---------------------------------------------------------------------------
//
// 目的: 「毎フレーム new Set() していたのを 2 個の常駐 Set の swap に変更」 しても、
// 外部から観測できる挙動 (listener 発火タイミング、 取り出した Set の中身、 次フレームとの
// 独立性) が完全に不変であることを保証する。
describe('BattleEntityStore — pendingMovedIds / pendingStatusChangedIds double-buffer 回帰 (v1.4.8)', () => {
  it('複数フレームに渡って mark → notifyFrame を繰り返しても取りこぼしがない', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    store.addEnemy(makeEnemy({ id: 'e-2' }));
    const calls: string[][] = [];
    store.subscribeEnemyPosition('e-1', () => calls.push(['e-1']));
    store.subscribeEnemyPosition('e-2', () => calls.push(['e-2']));

    // frame 1: e-1 のみ moved
    store.markEnemyMoved('e-1');
    store.notifyFrame();
    // frame 2: e-2 のみ moved
    store.markEnemyMoved('e-2');
    store.notifyFrame();
    // frame 3: 両方 moved
    store.markEnemyMoved('e-1');
    store.markEnemyMoved('e-2');
    store.notifyFrame();
    // frame 4: mark なし
    store.notifyFrame();

    expect(calls).toEqual([['e-1'], ['e-2'], ['e-1'], ['e-2']]);
  });

  it('swap 後の書き込み先が前回の残留 id を引き継がない (double-buffer の clear 漏れがない)', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    store.addEnemy(makeEnemy({ id: 'e-2' }));
    const l1 = vi.fn();
    const l2 = vi.fn();
    store.subscribeEnemyPosition('e-1', l1);
    store.subscribeEnemyPosition('e-2', l2);

    // frame 1: e-1 mark → notify (内部で swap 発生、 旧 Set が次回の書き込み先候補になる)
    store.markEnemyMoved('e-1');
    store.notifyFrame();
    expect(l1).toHaveBeenCalledTimes(1);
    expect(l2).toHaveBeenCalledTimes(0);

    // frame 2: 何も mark せず notify → 前回 mark した e-1 が再度紛れ込んでいないか確認
    store.notifyFrame();
    expect(l1).toHaveBeenCalledTimes(1); // 増えない
    expect(l2).toHaveBeenCalledTimes(0);

    // frame 3: e-2 のみ mark → e-1 は呼ばれないことを確認 (swap 元の残留がない証拠)
    store.markEnemyMoved('e-2');
    store.notifyFrame();
    expect(l1).toHaveBeenCalledTimes(1);
    expect(l2).toHaveBeenCalledTimes(1);
  });

  it('status 側も同様に double-buffer 後の取りこぼし / 混線がない', () => {
    const store = new BattleEntityStore();
    store.addEnemy(makeEnemy({ id: 'e-1' }));
    const listener = vi.fn();
    store.subscribeEnemyStatus('e-1', listener);

    for (let i = 0; i < 5; i++) {
      store.markEnemyStatusChanged('e-1');
      store.notifyFrame();
    }
    expect(listener).toHaveBeenCalledTimes(5);

    // mark しないフレームでは増えない
    store.notifyFrame();
    expect(listener).toHaveBeenCalledTimes(5);
  });
});

describe('BattleEntityStore — consumePendingRemovals double-buffer 回帰 (v1.4.8)', () => {
  it('複数フレームに渡って queueRemoval → consumePendingRemovals を繰り返しても取りこぼしがない', () => {
    const store = new BattleEntityStore();

    store.queueRemoval('damage', 'de-1');
    const frame1 = store.consumePendingRemovals('damage');
    expect(frame1.size).toBe(1);
    expect(frame1.has('de-1')).toBe(true);

    // 同フレームで取り出した Set は、 次回 consume 時に「新しい書き込み先」 として
    // 再利用され clear() される。 直前に取り出した Set の中身は不変であることを確認
    // (呼び出し側が filter などで即座に消費し終えた後の話なので、 ここでは
    //  「同フレーム内で読み取り続けても壊れない」 ことだけ検証する)。
    expect(frame1.has('de-1')).toBe(true);

    store.queueRemoval('damage', 'de-2');
    const frame2 = store.consumePendingRemovals('damage');
    expect(frame2.size).toBe(1);
    expect(frame2.has('de-2')).toBe(true);
    expect(frame2.has('de-1')).toBe(false); // 前フレームの id が紛れ込んでいない

    // frame1 で取り出した Set (= 今は内部の書き込み先として再利用されている) が
    // consume 時に clear() されている想定。 直接は observable ではないが、
    // 3 フレーム目でも取りこぼしがないことで間接的に保証する。
    store.queueRemoval('damage', 'de-3');
    const frame3 = store.consumePendingRemovals('damage');
    expect(frame3.size).toBe(1);
    expect(frame3.has('de-3')).toBe(true);
  });

  it('種別ごとに独立した swap バッファを持つ (damage の swap と death の swap が混ざらない)', () => {
    const store = new BattleEntityStore();
    store.queueRemoval('damage', 'de-1');
    store.queueRemoval('death', 'dh-1');
    const damageFrame1 = store.consumePendingRemovals('damage');
    const deathFrame1 = store.consumePendingRemovals('death');
    expect(damageFrame1.has('de-1')).toBe(true);
    expect(deathFrame1.has('dh-1')).toBe(true);

    store.queueRemoval('damage', 'de-2');
    store.queueRemoval('death', 'dh-2');
    const damageFrame2 = store.consumePendingRemovals('damage');
    const deathFrame2 = store.consumePendingRemovals('death');
    expect(damageFrame2.size).toBe(1);
    expect(damageFrame2.has('de-2')).toBe(true);
    expect(deathFrame2.size).toBe(1);
    expect(deathFrame2.has('dh-2')).toBe(true);
  });

  it('何も queue していないフレームで consume すると空 Set を返す (毎回新規判定できる)', () => {
    const store = new BattleEntityStore();
    store.queueRemoval('projectile', 'pj-1');
    store.consumePendingRemovals('projectile');
    const empty = store.consumePendingRemovals('projectile');
    expect(empty.size).toBe(0);
  });
});
