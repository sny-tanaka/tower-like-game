import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { PatchSlot } from './index';

describe('PatchSlot', () => {
  describe('空スロット', () => {
    test('空スロット時に "Slot 1" が描画される (slotIndex=0)', () => {
      render(
        <PatchSlot
          slotIndex={0}
          patch={null}
        />
      );
      expect(screen.getByText('Slot 1')).toBeInTheDocument();
    });

    test('slotIndex=3 の時 "Slot 4" が描画される', () => {
      render(
        <PatchSlot
          slotIndex={3}
          patch={null}
        />
      );
      expect(screen.getByText('Slot 4')).toBeInTheDocument();
    });

    test('空スロット時に empty クラスが付く', () => {
      const { container } = render(
        <PatchSlot
          slotIndex={0}
          patch={null}
        />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/empty/);
    });

    test('空スロット時に onRemove ボタンが表示されない', () => {
      render(
        <PatchSlot
          slotIndex={0}
          patch={null}
          onRemove={() => {}}
        />
      );
      // onRemove は patch=null の時は意味をなさず表示されない
      expect(screen.queryByRole('button', { name: /Remove/i })).toBeNull();
    });
  });

  describe('装着中スロット', () => {
    const patch = {
      name: 'Iron Skin',
      iconName: 'shield',
      tier: 2,
    };

    test('パッチ名が描画される', () => {
      render(
        <PatchSlot
          slotIndex={0}
          patch={patch}
        />
      );
      expect(screen.getByText('Iron Skin')).toBeInTheDocument();
    });

    test('Tier バッジが描画される', () => {
      render(
        <PatchSlot
          slotIndex={0}
          patch={patch}
        />
      );
      expect(screen.getByText('T2')).toBeInTheDocument();
    });

    test('filled クラスが付く', () => {
      const { container } = render(
        <PatchSlot
          slotIndex={0}
          patch={patch}
        />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/filled/);
    });

    test('onRemove が渡された時に × ボタンが表示される', () => {
      const onRemove = vi.fn();
      render(
        <PatchSlot
          slotIndex={0}
          patch={patch}
          onRemove={onRemove}
        />
      );
      expect(screen.getByRole('button', { name: /Remove/i })).toBeInTheDocument();
    });

    test('onRemove が渡されない時に × ボタンが表示されない', () => {
      render(
        <PatchSlot
          slotIndex={0}
          patch={patch}
        />
      );
      expect(screen.queryByRole('button', { name: /Remove/i })).toBeNull();
    });

    test('× ボタンをクリックすると onRemove が呼ばれる', async () => {
      const user = userEvent.setup();
      const onRemove = vi.fn();
      render(
        <PatchSlot
          slotIndex={0}
          patch={patch}
          onRemove={onRemove}
        />
      );
      await user.click(screen.getByRole('button', { name: /Remove/i }));
      expect(onRemove).toHaveBeenCalledOnce();
    });
  });

  describe('インタラクション', () => {
    const patch = {
      name: 'Rapid Fire',
      iconName: 'lightning',
      tier: 3,
    };

    test('onClick が渡された時に button role が付く', () => {
      const onClick = vi.fn();
      render(
        <PatchSlot
          slotIndex={0}
          patch={patch}
          onClick={onClick}
        />
      );
      // aria-label を持つ最上位ラッパーが button role になる
      expect(screen.getByRole('button', { name: /Slot 1/i })).toBeInTheDocument();
    });

    test('onClick が呼ばれる', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <PatchSlot
          slotIndex={0}
          patch={null}
          onClick={onClick}
        />
      );
      await user.click(screen.getByRole('button', { name: /Slot 1/i }));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
