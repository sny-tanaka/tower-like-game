import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import type { DamageEvent, DeathEvent, HitEvent, ProjectileEvent } from './index';
import { BattleField } from './index';

import { createEnemyTemplate, spawnEnemy } from '@/game/enemies';
import { BattleEntityStore } from '@/game/store/BattleEntityStore';
import { BattleEntityStoreProvider } from '@/game/store/BattleEntityStoreContext';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// ヘルパー: 固定位置の SpawnedEnemy を作る
// ---------------------------------------------------------------------------

function makeEnemy(id: string, kind: 'normal' | 'elite' | 'miniboss' | 'boss', x = 50, y = 30) {
  const template = createEnemyTemplate(1, 1, kind, kind === 'normal' ? 'standard' : undefined);
  const enemy = spawnEnemy(template, id, 0, () => 0.5);
  return { ...enemy, position: { x, y } };
}

// ---------------------------------------------------------------------------
// v1.3.7 (Phase 2-B): BattleField が entityStore を Context から取得するようになったため、
// テストは Provider 経由で render する。 props (enemies / damageEvents 等) を store に
// 注入してから wrap する。 onXDone コールバックは Phase 2-B では BattleField props として
// 残っているが、 内部 3 layer は entityStore 経由なので呼び出しは onHitDone のみ生きている。
// ---------------------------------------------------------------------------

interface RenderProps {
  enemies?: SpawnedEnemy[];
  damageEvents?: DamageEvent[];
  hitEvents?: HitEvent[];
  deathEvents?: DeathEvent[];
  projectileEvents?: ProjectileEvent[];
  range?: number;
  showCutterOrbit?: boolean;
  showOverdriveAura?: boolean;
  machineHitKey?: number;
  cutterRotateMs?: number;
  machinePosition?: { x: number; y: number };
  onHitDone?: (id: string) => void;
  store?: BattleEntityStore;
}

function renderBattleField(props: RenderProps = {}) {
  const store = props.store ?? new BattleEntityStore();
  if (props.enemies) store.setEnemies(props.enemies);
  if (props.damageEvents) store.setDamageEvents(props.damageEvents);
  if (props.deathEvents) store.setDeathEvents(props.deathEvents);
  if (props.projectileEvents) store.setProjectileEvents(props.projectileEvents);
  return render(
    <BattleEntityStoreProvider store={store}>
      <BattleField
        range={props.range ?? 25}
        hitEvents={props.hitEvents ?? []}
        showCutterOrbit={props.showCutterOrbit}
        showOverdriveAura={props.showOverdriveAura}
        machineHitKey={props.machineHitKey}
        cutterRotateMs={props.cutterRotateMs}
        machinePosition={props.machinePosition}
        onHitDone={props.onHitDone}
      />
    </BattleEntityStoreProvider>
  );
}

// ---------------------------------------------------------------------------
// レンダリング
// ---------------------------------------------------------------------------

describe('BattleField — レンダリング', () => {
  test('マシン (aria-label="マシン") が表示される', () => {
    renderBattleField();
    expect(screen.getByLabelText('マシン')).toBeInTheDocument();
  });

  test('バトルフィールド root が role="img" aria-label="バトルフィールド"', () => {
    renderBattleField();
    expect(screen.getByRole('img', { name: 'バトルフィールド' })).toBeInTheDocument();
  });

  test('敵 0 体のとき敵要素が存在しない', () => {
    const { container } = renderBattleField();
    expect(container.querySelectorAll('[data-enemy-type]').length).toBe(0);
  });

  test('通常敵 3 体が表示される (Enemy コンポーネント → standard enemy ラベル)', () => {
    const enemies = [
      makeEnemy('e1', 'normal', 20, 30),
      makeEnemy('e2', 'normal', 50, 50),
      makeEnemy('e3', 'normal', 80, 20),
    ];
    renderBattleField({ enemies });
    expect(screen.getAllByLabelText('standard enemy')).toHaveLength(3);
  });

  test('elite 敵が表示される', () => {
    const enemies = [makeEnemy('e1', 'elite', 50, 30)];
    renderBattleField({ enemies });
    expect(screen.getByLabelText('elite enemy')).toBeInTheDocument();
  });

  test('boss 敵が表示される', () => {
    const enemies = [makeEnemy('b1', 'boss', 50, 20)];
    renderBattleField({ enemies });
    expect(screen.getByLabelText('boss enemy')).toBeInTheDocument();
  });

  test('miniboss 敵が表示される', () => {
    const enemies = [makeEnemy('mb1', 'miniboss', 50, 25)];
    renderBattleField({ enemies });
    expect(screen.getByLabelText('miniboss enemy')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// MachineHitFx の配線 (machineHitKey で再マウント発火)
// ---------------------------------------------------------------------------

describe('BattleField — MachineHitFx 配線', () => {
  // Issue #87 で <style> 動的注入を廃止。 MachineHitFx は --mhf-x / --mhf-y を
  // 持つ aria-hidden な div を出力するので、 そのセレクタで存在判定する。
  const MHF_SELECTOR = '[aria-hidden="true"][style*="--mhf-x"]';

  test('machineHitKey=0 (初期) では MachineHitFx をマウントしない', () => {
    const { container } = renderBattleField({ machineHitKey: 0 });
    expect(container.querySelectorAll(MHF_SELECTOR).length).toBe(0);
  });

  test('machineHitKey=1 で MachineHitFx がマウントされる', () => {
    const { container } = renderBattleField({ machineHitKey: 1 });
    expect(container.querySelectorAll(MHF_SELECTOR).length).toBe(1);
  });

  test('machineHitKey 増分で MachineHitFx が再マウント (key で別 instance)', () => {
    // 同一 store を再利用 (key 増分のみテスト)
    const store = new BattleEntityStore();
    const { container, rerender } = renderBattleField({ store, machineHitKey: 1 });
    const first = container.querySelector(MHF_SELECTOR);
    expect(first).not.toBeNull();
    rerender(
      <BattleEntityStoreProvider store={store}>
        <BattleField
          range={25}
          hitEvents={[]}
          machineHitKey={2}
        />
      </BattleEntityStoreProvider>
    );
    const second = container.querySelector(MHF_SELECTOR);
    expect(second).not.toBeNull();
    // 同一 key なら同じ DOM ノード、 key 増分で React が別 fiber として作り直す
    expect(second).not.toBe(first);
  });

  test('cx/cy = machinePosition が CSS 変数 (--mhf-x / --mhf-y) に反映される', () => {
    const { container } = renderBattleField({
      machinePosition: { x: 50, y: 50 },
      machineHitKey: 1,
    });
    const mhf = container.querySelector<HTMLElement>(MHF_SELECTOR);
    expect(mhf?.style.getPropertyValue('--mhf-x')).toBe('50%');
    expect(mhf?.style.getPropertyValue('--mhf-y')).toBe('50%');
  });
});

// ---------------------------------------------------------------------------
// machinePosition
// ---------------------------------------------------------------------------

describe('BattleField — machinePosition', () => {
  test('デフォルト (50, 50) で left/top がスタイルに含まれる', () => {
    renderBattleField();
    const machine = screen.getByLabelText('マシン');
    expect(machine).toHaveStyle({ left: '50%', top: '50%' });
  });

  test('カスタム位置が反映される', () => {
    renderBattleField({ machinePosition: { x: 30, y: 60 } });
    const machine = screen.getByLabelText('マシン');
    expect(machine).toHaveStyle({ left: '30%', top: '60%' });
  });
});

// ---------------------------------------------------------------------------
// Fx イベント (Phase 2-B: 内部 3 layer に分割。 entityStore 経由で配信される)
// ---------------------------------------------------------------------------

describe('BattleField — Fx イベント', () => {
  test('DamagePopFx が damageEvents 分だけレンダリングされる (entityStore 経由)', () => {
    const damageEvents: DamageEvent[] = [
      { id: 'd1', x: 30, y: 40, value: BigNum.fromNumber(100) },
      { id: 'd2', x: 60, y: 30, value: BigNum.fromNumber(200), crit: true },
    ];
    const { container } = renderBattleField({ damageEvents });
    // DamagePopFx は --pop-x / --pop-y / --pop-duration の CSS 変数を持つ div を出す
    const popEls = container.querySelectorAll<HTMLElement>('[style*="--pop-x"]');
    expect(popEls.length).toBe(damageEvents.length);
  });

  test('onHitDone コールバックが props として受け取れる (現状 EMPTY_HIT_EVENTS のため未呼出)', () => {
    const onHitDone = vi.fn();
    renderBattleField({ onHitDone });
    expect(onHitDone).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// range (索敵円)
// ---------------------------------------------------------------------------

describe('BattleField — 索敵円', () => {
  test('range=50 のとき width / height とも 50% (range = 直径 % をそのまま rangeCircle に流す)', () => {
    const { container } = renderBattleField({ range: 50 });
    const circle = container.querySelector('[aria-hidden]');
    expect(circle).toHaveStyle({ width: '50%', height: '50%' });
  });

  test('range=80 のとき width / height とも 80%', () => {
    const { container } = renderBattleField({ range: 80 });
    const circle = container.querySelector('[aria-hidden]');
    expect(circle).toHaveStyle({ width: '80%', height: '80%' });
  });
});
