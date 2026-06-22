import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { PatchEquipTab } from './index';

import { useStore } from '@/store';
import type { PatchEntry } from '@/store/slices/patches';

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

function makePatches(): Map<string, PatchEntry> {
  return new Map([
    ['damageImmune#1', { name: 'damageImmune', tier: 1, count: 4 }],
    ['freezeHit#2', { name: 'freezeHit', tier: 2, count: 2 }],
  ]);
}

describe('PatchEquipTab', () => {
  it('patchSlotsLv=0 のとき解放スロットが 1 つ', () => {
    render(
      <PatchEquipTab
        overridePatches={makePatches()}
        overrideEquipped={new Map()}
        overridePatchSlotsLv={0}
      />
    );
    // Slot 1 が表示される
    expect(screen.getByLabelText(/Slot 1/i)).toBeDefined();
    // Slot 2 以降はロック
    const lockedSlots = screen.getAllByLabelText(/locked/i);
    expect(lockedSlots.length).toBe(5);
  });

  it('patchSlotsLv=5 のとき全スロット(6)が解放', () => {
    render(
      <PatchEquipTab
        overridePatches={makePatches()}
        overrideEquipped={new Map()}
        overridePatchSlotsLv={5}
      />
    );
    const lockedSlots = screen.queryAllByLabelText(/locked/i);
    expect(lockedSlots.length).toBe(0);
  });

  it('装着済みスロットをクリックすると unequipPatch が呼ばれる', async () => {
    const user = userEvent.setup();
    // storeをリセット
    useStore.setState({
      equippedPatches: new Map([[0, { name: 'damageImmune', tier: 1 }]]),
    });

    const equipped = new Map<number, { name: string; tier: number }>([
      [0, { name: 'damageImmune', tier: 1 }],
    ]);
    const { rerender } = render(
      <PatchEquipTab
        overridePatches={makePatches()}
        overrideEquipped={equipped}
        overridePatchSlotsLv={5}
      />
    );

    // Slot 1 が filled でクリック可能
    const slot1 = screen.getByLabelText(/Slot 1: damageImmune/i);
    await user.click(slot1);

    // rerender after state update
    rerender(
      <PatchEquipTab
        overridePatches={makePatches()}
        overrideEquipped={new Map()}
        overridePatchSlotsLv={5}
      />
    );
    // 取り外し後は empty になる
    expect(screen.getByLabelText(/Slot 1 \(empty\)/i)).toBeDefined();
  });

  it('空きスロットには「Slot N」というラベルが表示される', () => {
    render(
      <PatchEquipTab
        overridePatches={makePatches()}
        overrideEquipped={new Map()}
        overridePatchSlotsLv={2}
      />
    );
    expect(screen.getByLabelText('Slot 1 (empty)')).toBeDefined();
    expect(screen.getByLabelText('Slot 2 (empty)')).toBeDefined();
    expect(screen.getByLabelText('Slot 3 (empty)')).toBeDefined();
    expect(screen.getByLabelText('Slot 4 (locked)')).toBeDefined();
  });

  it('装着数カウントが正しく表示される', () => {
    const equipped = new Map<number, { name: string; tier: number }>([
      [0, { name: 'damageImmune', tier: 1 }],
      [1, { name: 'freezeHit', tier: 2 }],
    ]);
    render(
      <PatchEquipTab
        overridePatches={makePatches()}
        overrideEquipped={equipped}
        overridePatchSlotsLv={5}
      />
    );
    // "2 / 6 装着中" が表示される
    expect(screen.getByText(/2 \/ 6 装着中/)).toBeDefined();
  });
});
