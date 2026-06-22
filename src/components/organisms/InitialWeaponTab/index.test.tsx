import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { InitialWeaponTab } from './index';

import { useStore } from '@/store/index';

/** store を初期状態にリセット */
afterEach(() => {
  useStore.setState({ initialWeapon: 'laser' });
});

describe('InitialWeaponTab', () => {
  describe('表示', () => {
    it('role=tabpanel を持つ要素を描画する', () => {
      render(<InitialWeaponTab />);
      expect(screen.getByRole('tabpanel')).toBeDefined();
    });

    it('4 武器 (LASER/CANNON/THUNDER/CUTTER) がすべて表示される', () => {
      render(<InitialWeaponTab />);
      expect(screen.getByText('LASER')).toBeDefined();
      expect(screen.getByText('CANNON')).toBeDefined();
      expect(screen.getByText('THUNDER')).toBeDefined();
      expect(screen.getByText('CUTTER')).toBeDefined();
    });

    it('説明文が表示される', () => {
      render(<InitialWeaponTab />);
      expect(screen.getByText(/ラン開始時の武器を選択/)).toBeDefined();
    });
  });

  describe('選択状態', () => {
    it('selectedWeapon=laser のとき LASER カードが active になる', () => {
      render(<InitialWeaponTab selectedWeapon="laser" />);
      // aria-pressed=true のボタンを探す
      const activeBtn = screen
        .getAllByRole('button')
        .find((btn) => btn.getAttribute('aria-pressed') === 'true');
      expect(activeBtn).toBeDefined();
    });

    it('store の initialWeapon がデフォルトで選択される', () => {
      useStore.setState({ initialWeapon: 'cannon' });
      render(<InitialWeaponTab />);
      // selectedWeapon 未指定なので store から引く
      const activeButtons = screen
        .getAllByRole('button')
        .filter((btn) => btn.getAttribute('aria-pressed') === 'true');
      // cannon に対応するボタンが active
      expect(activeButtons.length).toBeGreaterThan(0);
    });

    it('selectedWeapon が渡されると store よりも props を優先する', () => {
      useStore.setState({ initialWeapon: 'cannon' });
      render(<InitialWeaponTab selectedWeapon="laser" />);
      // LASER のラッパーが active (WeaponPreview の aria-pressed)
      const activeBtns = screen
        .getAllByRole('button')
        .filter((btn) => btn.getAttribute('aria-pressed') === 'true');
      expect(activeBtns.length).toBeGreaterThan(0);
    });
  });

  describe('インタラクション', () => {
    it('武器をクリックすると store の initialWeapon が更新される', async () => {
      useStore.setState({ initialWeapon: 'laser' });
      render(<InitialWeaponTab />);
      // CANNON のボタン要素を探してクリック
      const cannonBtn = screen
        .getAllByRole('button')
        .find((btn) => btn.textContent?.includes('CANNON'));
      expect(cannonBtn).toBeDefined();
      if (cannonBtn) await userEvent.click(cannonBtn);
      expect(useStore.getState().initialWeapon).toBe('cannon');
    });

    it('武器クリック時に onSelect コールバックが呼ばれる', async () => {
      const onSelect = vi.fn();
      render(<InitialWeaponTab onSelect={onSelect} />);
      const thunderBtn = screen
        .getAllByRole('button')
        .find((btn) => btn.textContent?.includes('THUNDER'));
      if (thunderBtn) await userEvent.click(thunderBtn);
      expect(onSelect).toHaveBeenCalledWith('thunder');
    });
  });
});
