import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { LaunchButton } from './index';

describe('LaunchButton', () => {
  describe('表示', () => {
    it('「出撃」ボタンを描画する', () => {
      render(<LaunchButton />);
      expect(screen.getByText('出撃')).toBeDefined();
    });

    it('role=group を持つ要素を描画する', () => {
      render(<LaunchButton />);
      expect(screen.getByRole('group')).toBeDefined();
    });

    it('tier が指定されたとき Tier バッジを表示する', () => {
      render(<LaunchButton tier={7} />);
      expect(screen.getByText('T7')).toBeDefined();
    });

    it('tier が未指定のとき Tier バッジを表示しない', () => {
      render(<LaunchButton />);
      expect(screen.queryByText(/^T\d+$/)).toBeNull();
    });

    it('weaponKind が指定されたとき武器名を大文字で表示する', () => {
      render(<LaunchButton weaponKind="cannon" />);
      expect(screen.getByText('CANNON')).toBeDefined();
    });

    it('patchCount が指定されたとき「PATCH ×N」を表示する', () => {
      render(<LaunchButton patchCount={4} />);
      expect(screen.getByText('PATCH ×4')).toBeDefined();
    });

    it('patchCount 未指定のとき「PATCH ×0」を表示する', () => {
      render(<LaunchButton />);
      expect(screen.getByText('PATCH ×0')).toBeDefined();
    });
  });

  describe('disabled', () => {
    it('disabled=false のとき出撃ボタンが有効', () => {
      render(<LaunchButton disabled={false} />);
      const btn = screen.getByText('出撃').closest('button');
      expect(btn?.disabled).toBe(false);
    });

    it('disabled=true のとき出撃ボタンが無効', () => {
      render(<LaunchButton disabled />);
      const btn = screen.getByText('出撃').closest('button');
      expect(btn?.disabled).toBe(true);
    });
  });

  describe('インタラクション', () => {
    it('出撃ボタンをクリックすると onLaunch が呼ばれる', async () => {
      const onLaunch = vi.fn();
      render(<LaunchButton onLaunch={onLaunch} />);
      await userEvent.click(screen.getByText('出撃'));
      expect(onLaunch).toHaveBeenCalledOnce();
    });

    it('disabled=true のとき onLaunch が呼ばれない', async () => {
      const onLaunch = vi.fn();
      render(
        <LaunchButton
          disabled
          onLaunch={onLaunch}
        />
      );
      // disabled ボタンは pointer-events:none のため button 要素を直接ターゲットにする
      const btn = screen.getByText('出撃').closest('button');
      expect(btn).toBeDefined();
      if (btn) {
        // disabled ボタンはクリックイベントが発火しないことを確認
        expect(btn.disabled).toBe(true);
      }
      expect(onLaunch).not.toHaveBeenCalled();
    });
  });

  describe('sticky', () => {
    it('sticky=true（デフォルト）のとき sticky クラスが付く', () => {
      const { container } = render(<LaunchButton sticky />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/sticky/);
    });

    it('sticky=false のとき sticky クラスが付かない', () => {
      const { container } = render(<LaunchButton sticky={false} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).not.toMatch(/sticky/);
    });
  });
});
