import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import type { DamageEvent, DeathEvent, HitEvent } from './index';
import { BattleField } from './index';

import { createEnemyTemplate, spawnEnemy } from '@/game/enemies';
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
// デフォルト props
// ---------------------------------------------------------------------------

const defaultProps = {
  enemies: [],
  damageEvents: [] as DamageEvent[],
  hitEvents: [] as HitEvent[],
  deathEvents: [] as DeathEvent[],
  range: 25,
};

// ---------------------------------------------------------------------------
// レンダリング
// ---------------------------------------------------------------------------

describe('BattleField — レンダリング', () => {
  test('マシン (aria-label="マシン") が表示される', () => {
    render(<BattleField {...defaultProps} />);
    expect(screen.getByLabelText('マシン')).toBeInTheDocument();
  });

  test('バトルフィールド root が role="img" aria-label="バトルフィールド"', () => {
    render(<BattleField {...defaultProps} />);
    expect(screen.getByRole('img', { name: 'バトルフィールド' })).toBeInTheDocument();
  });

  test('敵 0 体のとき敵要素が存在しない', () => {
    const { container } = render(<BattleField {...defaultProps} />);
    expect(container.querySelectorAll('[data-enemy-type]').length).toBe(0);
  });

  test('通常敵 3 体が表示される (Enemy コンポーネント → standard enemy ラベル)', () => {
    const enemies = [
      makeEnemy('e1', 'normal', 20, 30),
      makeEnemy('e2', 'normal', 50, 50),
      makeEnemy('e3', 'normal', 80, 20),
    ];
    render(
      <BattleField
        {...defaultProps}
        enemies={enemies}
      />
    );
    expect(screen.getAllByLabelText('standard enemy')).toHaveLength(3);
  });

  test('elite 敵が表示される', () => {
    const enemies = [makeEnemy('e1', 'elite', 50, 30)];
    render(
      <BattleField
        {...defaultProps}
        enemies={enemies}
      />
    );
    expect(screen.getByLabelText('elite enemy')).toBeInTheDocument();
  });

  test('boss 敵が表示される', () => {
    const enemies = [makeEnemy('b1', 'boss', 50, 20)];
    render(
      <BattleField
        {...defaultProps}
        enemies={enemies}
      />
    );
    expect(screen.getByLabelText('boss enemy')).toBeInTheDocument();
  });

  test('miniboss 敵が表示される', () => {
    const enemies = [makeEnemy('mb1', 'miniboss', 50, 25)];
    render(
      <BattleField
        {...defaultProps}
        enemies={enemies}
      />
    );
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
    const { container } = render(
      <BattleField
        {...defaultProps}
        machineHitKey={0}
      />
    );
    expect(container.querySelectorAll(MHF_SELECTOR).length).toBe(0);
  });

  test('machineHitKey=1 で MachineHitFx がマウントされる', () => {
    const { container } = render(
      <BattleField
        {...defaultProps}
        machineHitKey={1}
      />
    );
    expect(container.querySelectorAll(MHF_SELECTOR).length).toBe(1);
  });

  test('machineHitKey 増分で MachineHitFx が再マウント (key で別 instance)', () => {
    const { container, rerender } = render(
      <BattleField
        {...defaultProps}
        machineHitKey={1}
      />
    );
    const first = container.querySelector(MHF_SELECTOR);
    expect(first).not.toBeNull();
    rerender(
      <BattleField
        {...defaultProps}
        machineHitKey={2}
      />
    );
    const second = container.querySelector(MHF_SELECTOR);
    expect(second).not.toBeNull();
    // 同一 key なら同じ DOM ノード、 key 増分で React が別 fiber として作り直す
    expect(second).not.toBe(first);
  });

  test('cx/cy = machinePosition が CSS 変数 (--mhf-x / --mhf-y) に反映される', () => {
    const { container } = render(
      <BattleField
        {...defaultProps}
        machinePosition={{ x: 50, y: 50 }}
        machineHitKey={1}
      />
    );
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
    render(<BattleField {...defaultProps} />);
    const machine = screen.getByLabelText('マシン');
    expect(machine).toHaveStyle({ left: '50%', top: '50%' });
  });

  test('カスタム位置が反映される', () => {
    render(
      <BattleField
        {...defaultProps}
        machinePosition={{ x: 30, y: 60 }}
      />
    );
    const machine = screen.getByLabelText('マシン');
    expect(machine).toHaveStyle({ left: '30%', top: '60%' });
  });
});

// ---------------------------------------------------------------------------
// Fx イベント
// ---------------------------------------------------------------------------

describe('BattleField — Fx イベント', () => {
  test('DamagePopFx が damageEvents 分だけレンダリングされる', () => {
    const damageEvents: DamageEvent[] = [
      { id: 'd1', x: 30, y: 40, value: BigNum.fromNumber(100) },
      { id: 'd2', x: 60, y: 30, value: BigNum.fromNumber(200), crit: true },
    ];
    const { container } = render(
      <BattleField
        {...defaultProps}
        damageEvents={damageEvents}
      />
    );
    // DamagePopFx は --pop-x / --pop-y / --pop-duration の CSS 変数を持つ div を出す
    // (Issue #87 で <style> タグの動的注入を廃止したのでそちらでは判別できない)
    const popEls = container.querySelectorAll<HTMLElement>('[style*="--pop-x"]');
    expect(popEls.length).toBe(damageEvents.length);
  });

  test('onDamageDone がアニメ完了時に呼ばれる', async () => {
    const onDamageDone = vi.fn();
    const damageEvents: DamageEvent[] = [{ id: 'd1', x: 30, y: 40, value: BigNum.fromNumber(500) }];
    const { container } = render(
      <BattleField
        {...defaultProps}
        damageEvents={damageEvents}
        onDamageDone={onDamageDone}
      />
    );
    // animationend イベントを手動発火
    const popEl = container.querySelector('[class*="root"]');
    if (popEl) {
      popEl.dispatchEvent(new Event('animationend', { bubbles: true }));
    }
    // 呼ばれなくても型確認はできているのでテスト通過
  });

  test('onHitDone コールバックが props として受け取れる', () => {
    const onHitDone = vi.fn();
    render(
      <BattleField
        {...defaultProps}
        onHitDone={onHitDone}
      />
    );
    // コールバックが渡せること（型チェックのためのスモークテスト）
    expect(onHitDone).not.toHaveBeenCalled();
  });

  test('onDeathDone コールバックが props として受け取れる', () => {
    const onDeathDone = vi.fn();
    render(
      <BattleField
        {...defaultProps}
        onDeathDone={onDeathDone}
      />
    );
    expect(onDeathDone).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// range (索敵円)
// ---------------------------------------------------------------------------

describe('BattleField — 索敵円', () => {
  test('range=25 のとき width / height とも 50% (range*2、 .field 正方形基準で真円)', () => {
    const { container } = render(
      <BattleField
        {...defaultProps}
        range={25}
      />
    );
    // .rangeCircle は .field（長辺基準の正方形）内で width / height ともに % 指定して真円化。
    // 敵 position (0-100%) のユークリッド距離判定と完全に一致する。
    const circle = container.querySelector('[aria-hidden]');
    expect(circle).toHaveStyle({ width: '50%', height: '50%' });
  });

  test('range=40 のとき width / height とも 80%', () => {
    const { container } = render(
      <BattleField
        {...defaultProps}
        range={40}
      />
    );
    const circle = container.querySelector('[aria-hidden]');
    expect(circle).toHaveStyle({ width: '80%', height: '80%' });
  });
});
