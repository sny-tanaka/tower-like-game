import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { PatchSlot } from './index';

describe('PatchSlot', () => {
  describe('空スロット', () => {
    test('空スロット時に "Slot 1" が描画される (slotIndex=1)', () => {
      render(<PatchSlot slotIndex={1} />);
      expect(screen.getByText('Slot 1')).toBeInTheDocument();
    });

    test('slotIndex=3 の時 "Slot 3" が描画される', () => {
      render(<PatchSlot slotIndex={3} />);
      expect(screen.getByText('Slot 3')).toBeInTheDocument();
    });

    test('空スロット時に empty クラスが付く', () => {
      const { container } = render(<PatchSlot slotIndex={1} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/empty/);
    });
  });

  describe('ロックスロット', () => {
    test('locked=true のとき locked クラスが付く', () => {
      const { container } = render(
        <PatchSlot
          slotIndex={8}
          locked
        />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/locked/);
    });

    test('locked=true のとき LOCKED テキストが描画される', () => {
      render(
        <PatchSlot
          slotIndex={8}
          locked
        />
      );
      expect(screen.getByText('LOCKED')).toBeInTheDocument();
    });
  });

  describe('装着中スロット', () => {
    const patch = {
      patchId: 'p1',
      name: 'Iron Skin',
      iconName: 'shield' as const,
      tier: 2,
      trigger: '常時',
      effect: '被ダメ -10%',
      count: 3,
    };

    test('パッチ名が描画される', () => {
      render(<PatchSlot patch={patch} />);
      expect(screen.getByText('Iron Skin')).toBeInTheDocument();
    });

    test('Tier バッジが描画される', () => {
      render(<PatchSlot patch={patch} />);
      expect(screen.getByText('T2')).toBeInTheDocument();
    });

    test('filled クラスが付く', () => {
      const { container } = render(<PatchSlot patch={patch} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/filled/);
    });

    test('md サイズで trigger と effect が描画される', () => {
      render(
        <PatchSlot
          patch={patch}
          size="md"
        />
      );
      expect(screen.getByText('常時')).toBeInTheDocument();
      expect(screen.getByText('被ダメ -10%')).toBeInTheDocument();
    });
  });

  describe('インタラクション', () => {
    const patch = {
      patchId: 'p2',
      name: 'Rapid Fire',
      iconName: 'lightning' as const,
      tier: 3,
      trigger: '常時',
      effect: '連射 +20%',
      count: 1,
    };

    test('onClick が渡された時に button role が付く', () => {
      const onClick = vi.fn();
      render(
        <PatchSlot
          slotIndex={1}
          patch={patch}
          onClick={onClick}
        />
      );
      expect(screen.getByRole('button', { name: /Slot 1/i })).toBeInTheDocument();
    });

    test('onClick が呼ばれる（空スロット）', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <PatchSlot
          slotIndex={1}
          onClick={onClick}
        />
      );
      await user.click(screen.getByRole('button', { name: /Slot 1/i }));
      expect(onClick).toHaveBeenCalledOnce();
    });

    test('locked=true のとき onClick が呼ばれない', async () => {
      const onClick = vi.fn();
      render(
        <PatchSlot
          slotIndex={1}
          locked
          onClick={onClick}
        />
      );
      // locked 時は role="button" が付かない
      expect(screen.queryByRole('button')).toBeNull();
    });
  });
});
