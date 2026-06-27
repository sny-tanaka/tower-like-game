import { act, render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { EnemySprite, FIELD_CQMIN_SCALE, formatEnemyTransform } from './EnemySprite';

import { BattleEntityStore } from '@/game/store/BattleEntityStore';
import { BattleEntityStoreProvider } from '@/game/store/BattleEntityStoreContext';
import { MutableEnemy } from '@/game/types';
import type { SpawnedEnemyInit } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// EnemySprite — Phase 3-C のテスト
//
// 設計確認:
//   - data-enemy-id が DOM に出る
//   - mount 直後に store.getEnemyById の position が transform にあらわれる
//   - markEnemyMoved → notifyFrame で position が transform に再反映される (raw subscribe)
//   - markEnemyStatusChanged → notifyFrame で snapshot 由来の prop が変化して再 render
//   - 該当 id の敵が存在しないと null 描画
// ---------------------------------------------------------------------------

function makeEnemyInit(id: string, overrides: Partial<SpawnedEnemyInit> = {}): SpawnedEnemyInit {
  return {
    id,
    kind: 'normal',
    subtype: 'standard',
    speed: 1,
    reward: { screw: 1, bolt: 0, alloyChance: 0, alloyAmount: 0 },
    hitRadius: 1.03,
    spawnedAtMs: 0,
    hp: BigNum.fromNumber(100),
    maxHp: BigNum.fromNumber(100),
    atk: BigNum.fromNumber(10),
    position: { x: 30, y: 40 },
    ...overrides,
  };
}

function renderEnemySprite(
  store: BattleEntityStore,
  id: string,
  machinePosition = { x: 50, y: 50 }
) {
  return render(
    <BattleEntityStoreProvider store={store}>
      <EnemySprite
        id={id}
        machinePosition={machinePosition}
      />
    </BattleEntityStoreProvider>
  );
}

describe('EnemySprite — レンダリング', () => {
  test('data-enemy-id 属性が ID と一致する', () => {
    const store = new BattleEntityStore();
    store.addEnemy(new MutableEnemy(makeEnemyInit('e-1')));
    const { container } = renderEnemySprite(store, 'e-1');
    const el = container.querySelector('[data-enemy-id="e-1"]');
    expect(el).not.toBeNull();
  });

  test('該当 ID の敵が居なければ何も描画しない', () => {
    const store = new BattleEntityStore();
    const { container } = renderEnemySprite(store, 'missing');
    expect(container.querySelector('[data-enemy-id]')).toBeNull();
    expect(container.querySelector('[data-enemy-type]')).toBeNull();
  });

  test('内部に Enemy molecule (data-enemy-type) がレンダリングされる', () => {
    const store = new BattleEntityStore();
    store.addEnemy(new MutableEnemy(makeEnemyInit('e-1', { kind: 'normal', subtype: 'standard' })));
    const { container } = renderEnemySprite(store, 'e-1');
    const enemy = container.querySelector('[data-enemy-type="standard"]');
    expect(enemy).not.toBeNull();
  });
});

describe('EnemySprite — transform (raw subscribe)', () => {
  test('mount 直後に position から計算された translate3d が style.transform に反映される', () => {
    const store = new BattleEntityStore();
    store.addEnemy(new MutableEnemy(makeEnemyInit('e-1', { position: { x: 25, y: 75 } })));
    const { container } = renderEnemySprite(store, 'e-1');
    const el = container.querySelector<HTMLDivElement>('[data-enemy-id="e-1"]');
    expect(el).not.toBeNull();
    expect(el!.style.transform).toBe(formatEnemyTransform(25, 75));
  });

  test('formatEnemyTransform は FIELD_CQMIN_SCALE (1.4) で cqmin 値に変換する', () => {
    // position 50 → field 中央 → 70cqmin (= 140cqmin の中央)。
    const t = formatEnemyTransform(50, 50);
    expect(t).toBe('translate3d(70cqmin, 70cqmin, 0) translate(-50%, -50%)');
    expect(FIELD_CQMIN_SCALE).toBe(1.4);
  });

  test('markEnemyMoved → notifyFrame で transform が再計算される (React 再 render なし)', () => {
    const store = new BattleEntityStore();
    const enemy = new MutableEnemy(makeEnemyInit('e-1', { position: { x: 10, y: 10 } }));
    store.addEnemy(enemy);
    const { container } = renderEnemySprite(store, 'e-1');
    const el = container.querySelector<HTMLDivElement>('[data-enemy-id="e-1"]');
    expect(el!.style.transform).toBe(formatEnemyTransform(10, 10));

    // 敵の position を in-place mutation で変更し、 markEnemyMoved + notifyFrame
    act(() => {
      enemy.position.x = 80;
      enemy.position.y = 20;
      store.markEnemyMoved('e-1');
      store.notifyFrame();
    });

    expect(el!.style.transform).toBe(formatEnemyTransform(80, 20));
  });
});

describe('EnemySprite — status snapshot 購読 (useSyncExternalStore)', () => {
  test('frozen 状態異常が markEnemyStatusChanged + notifyFrame で反映される', () => {
    const store = new BattleEntityStore();
    const enemy = new MutableEnemy(makeEnemyInit('e-1'));
    store.addEnemy(enemy);
    const { container } = renderEnemySprite(store, 'e-1');

    // 初期は frozen / burning なし → standard
    expect(container.querySelector('[data-status="frozen"]')).toBeNull();

    act(() => {
      enemy.frozenUntilMs = 10_000;
      store.markEnemyStatusChanged('e-1');
      store.notifyFrame();
    });

    expect(container.querySelector('[data-status="frozen"]')).not.toBeNull();
  });
});
