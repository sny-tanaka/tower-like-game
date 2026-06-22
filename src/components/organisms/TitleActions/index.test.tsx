import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TitleActions } from './index';

import { useStore } from '@/store/index';
import { NavigationProvider } from '@/store/navigation';

/** NavigationProvider でラップするヘルパー */
function renderWithNav(ui: React.ReactElement) {
  return render(<NavigationProvider initialScreen="title">{ui}</NavigationProvider>);
}

afterEach(() => {
  useStore.setState({ createdAt: 0 });
});

describe('TitleActions', () => {
  describe('セーブなし (createdAt === 0)', () => {
    it('「続きから」ボタンが disabled', () => {
      renderWithNav(<TitleActions />);
      const btn = screen.getByRole('button', { name: /続きから/ });
      expect(btn).toBeDefined();
      expect((btn as HTMLButtonElement).disabled).toBe(true);
    });

    it('「新規開始」ボタンが有効', () => {
      renderWithNav(<TitleActions />);
      const btn = screen.getByRole('button', { name: '新規開始' });
      expect((btn as HTMLButtonElement).disabled).toBe(false);
    });

    it('「設定」ボタンは表示しない (BottomNav 経由のみ)', () => {
      renderWithNav(<TitleActions />);
      expect(screen.queryByRole('button', { name: '設定' })).toBeNull();
    });

    it('lastSavedAt を表示しない', () => {
      renderWithNav(<TitleActions lastSavedAt="12 分前" />);
      expect(screen.queryByText(/最終セーブ/)).toBeNull();
    });
  });

  describe('セーブあり (createdAt > 0)', () => {
    beforeEach(() => {
      useStore.setState({ createdAt: Date.now() });
    });

    it('「続きから」ボタンが有効', () => {
      renderWithNav(<TitleActions />);
      const btn = screen.getByRole('button', { name: '続きから' });
      expect((btn as HTMLButtonElement).disabled).toBe(false);
    });

    it('「新規開始」ボタンも表示する', () => {
      renderWithNav(<TitleActions />);
      expect(screen.getByRole('button', { name: '新規開始' })).toBeDefined();
    });

    it('lastSavedAt が渡されたとき「最終セーブ: X」を表示する', () => {
      renderWithNav(<TitleActions lastSavedAt="12 分前" />);
      expect(screen.getByText('最終セーブ: 12 分前')).toBeDefined();
    });

    it('lastSavedAt が未指定なら最終セーブ表示しない', () => {
      renderWithNav(<TitleActions />);
      expect(screen.queryByText(/最終セーブ/)).toBeNull();
    });
  });

  describe('コールバック', () => {
    it('「続きから」をクリックすると onResume が呼ばれる', async () => {
      useStore.setState({ createdAt: Date.now() });
      const onResume = vi.fn();
      renderWithNav(<TitleActions onResume={onResume} />);
      await userEvent.click(screen.getByRole('button', { name: '続きから' }));
      expect(onResume).toHaveBeenCalledOnce();
    });

    it('「新規開始」をクリックすると onNewGame が呼ばれる', async () => {
      const onNewGame = vi.fn();
      renderWithNav(<TitleActions onNewGame={onNewGame} />);
      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));
      expect(onNewGame).toHaveBeenCalledOnce();
    });
  });
});
