import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { PatchInventoryTab } from './index';

import type { PatchEntry } from '@/store/slices/patches';

function makePatches(): Map<string, PatchEntry> {
  return new Map([
    ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 8 }],
    ['freezeHit#2', { name: 'freezeHit', tier: 2, count: 5 }],
    ['instantKill#3', { name: 'instantKill', tier: 3, count: 2 }],
  ]);
}

describe('PatchInventoryTab', () => {
  it('在庫なし時は「パッチを所持していません」を表示', () => {
    render(
      <PatchInventoryTab
        overridePatches={new Map()}
        overrideEquipped={new Map()}
      />
    );
    expect(screen.getByText('パッチを所持していません')).toBeDefined();
  });

  it('在庫数ぶんだけカードを表示', () => {
    render(
      <PatchInventoryTab
        overridePatches={makePatches()}
        overrideEquipped={new Map()}
      />
    );
    // 3種類表示される
    expect(screen.getByText('3 種類')).toBeDefined();
  });

  it('装着済みパッチは 「装備中」 バッジ付きで通常表示 (v1.3.4)', () => {
    render(
      <PatchInventoryTab
        overridePatches={makePatches()}
        overrideEquipped={new Map([[0, { name: 'damageImmune', tier: 1 }]])}
      />
    );
    // v1.3.4: ??? ではなく「装備中」 バッジが表示される
    expect(screen.getAllByText('装備中').length).toBeGreaterThan(0);
    expect(screen.queryByText('???')).toBeNull();
  });

  it('カードをクリックすると onSelect が呼ばれる', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <PatchInventoryTab
        overridePatches={makePatches()}
        overrideEquipped={new Map()}
        selectedId={null}
        onSelect={onSelect}
      />
    );
    // 最初のボタン（カード）をクリック
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('選択済みカードをもう一度クリックすると null で onSelect が呼ばれる', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    // v1.5.4: カードは種別 (PATCH_POOL 順) → tier 降順で並ぶ。
    // instantKill が最先頭に来るのでそれを selected にして再クリック挙動を検証する。
    render(
      <PatchInventoryTab
        overridePatches={makePatches()}
        overrideEquipped={new Map()}
        selectedId={'instantKill#3'}
        onSelect={onSelect}
      />
    );
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(onSelect).toHaveBeenCalledWith(null);
  });
});
