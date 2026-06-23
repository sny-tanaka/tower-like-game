import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { Page } from '@/pages/title';
import { useStore } from '@/store/index';
import { NavigationProvider } from '@/store/navigation';

function renderPage(initialCreatedAt = 0) {
  useStore.setState({ createdAt: initialCreatedAt });
  return render(
    <NavigationProvider initialScreen="title">
      <Page />
    </NavigationProvider>
  );
}

afterEach(() => {
  useStore.setState({ createdAt: 0 });
});

describe('TitleScreen', () => {
  it('タイトル "NEON SPIRE" が表示される', () => {
    renderPage();
    expect(screen.getByRole('banner')).toBeDefined();
    expect(screen.getByText('NEON SPIRE')).toBeDefined();
  });

  it('サブタイトルが表示される', () => {
    renderPage();
    expect(screen.getByText('TOWER DEFENSE × INFINITE TIER')).toBeDefined();
  });

  it('バージョンが表示される', () => {
    renderPage();
    expect(screen.getByText('v0.2.0')).toBeDefined();
  });

  describe('セーブなし (createdAt === 0)', () => {
    it('「続きから」ボタンが disabled', () => {
      renderPage(0);
      const btn = screen.getByRole('button', { name: /続きから/ });
      expect((btn as HTMLButtonElement).disabled).toBe(true);
    });

    it('「新規開始」ボタンが有効', () => {
      renderPage(0);
      const btn = screen.getByRole('button', { name: '新規開始' });
      expect((btn as HTMLButtonElement).disabled).toBe(false);
    });
  });

  describe('セーブあり (createdAt > 0)', () => {
    it('「続きから」ボタンが有効', () => {
      renderPage(Date.now());
      const btn = screen.getByRole('button', { name: '続きから' });
      expect((btn as HTMLButtonElement).disabled).toBe(false);
    });
  });

  describe('ナビゲーション', () => {
    it('「新規開始」をクリックすると preparation へ遷移するコールバックが呼べる', async () => {
      renderPage(0);
      // クリック後エラーが起きないことを確認（NavigationProvider が遷移を処理）
      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));
    });

    it('「設定」ボタンは表示しない (BottomNav 経由のみ)', () => {
      renderPage(0);
      expect(screen.queryByRole('button', { name: '設定' })).toBeNull();
    });
  });
});
