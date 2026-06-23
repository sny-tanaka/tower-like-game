import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

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
  vi.restoreAllMocks();
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
    expect(screen.getByText(/^v\d+\.\d+\.\d+$/)).toBeDefined();
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

  describe('新規開始フロー', () => {
    it('1. セーブあり (createdAt > 0) の状態で「新規開始」→ ConfirmDialog が開く', async () => {
      renderPage(Date.now());
      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));
      // ConfirmDialog が表示されていること
      expect(screen.getByRole('heading', { name: '新規開始' })).toBeDefined();
      expect(
        screen.getByText('現在のセーブデータは消えます。本当に新規開始しますか?')
      ).toBeDefined();
    });

    it('2. ダイアログ → OK で全 reset action が dispatch される', async () => {
      const resetProfile = vi.fn();
      const resetCurrencies = vi.fn();
      const resetMachine = vi.fn();
      const resetWeapons = vi.fn();
      const resetPatches = vi.fn();
      const clearEquippedPatches = vi.fn();
      const endRun = vi.fn();

      useStore.setState({
        createdAt: Date.now(),
        resetProfile,
        resetCurrencies,
        resetMachine,
        resetWeapons,
        resetPatches,
        clearEquippedPatches,
        endRun,
      });

      render(
        <NavigationProvider initialScreen="title">
          <Page />
        </NavigationProvider>
      );

      // ダイアログを開く
      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));
      // 確認ダイアログの「新規開始」ボタン（confirmLabel）を押す
      const confirmButtons = screen.getAllByRole('button', { name: '新規開始' });
      // ダイアログ内の「新規開始」ボタン（最後のもの）を押す
      await userEvent.click(confirmButtons[confirmButtons.length - 1]);

      expect(resetProfile).toHaveBeenCalledTimes(1);
      expect(resetCurrencies).toHaveBeenCalledTimes(1);
      expect(resetMachine).toHaveBeenCalledTimes(1);
      expect(resetWeapons).toHaveBeenCalledTimes(1);
      expect(resetPatches).toHaveBeenCalledTimes(1);
      expect(clearEquippedPatches).toHaveBeenCalledTimes(1);
      expect(endRun).toHaveBeenCalledTimes(1);
    });

    it('3. 全 dispatch 後に navigate("preparation") が呼ばれる', async () => {
      const endRun = vi.fn();
      const resetProfile = vi.fn();

      useStore.setState({
        createdAt: Date.now(),
        resetProfile,
        endRun,
      });

      render(
        <NavigationProvider initialScreen="title">
          <Page />
        </NavigationProvider>
      );

      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));
      const confirmButtons = screen.getAllByRole('button', { name: '新規開始' });
      await userEvent.click(confirmButtons[confirmButtons.length - 1]);

      // 全 reset action が呼ばれ（= doNewGame が実行され）、
      // ConfirmDialog が閉じていること（navigate は NavigationProvider 内部で state 変化）
      expect(resetProfile).toHaveBeenCalledTimes(1);
      expect(endRun).toHaveBeenCalledTimes(1);
      expect(
        screen.queryByText('現在のセーブデータは消えます。本当に新規開始しますか?')
      ).toBeNull();
    });

    it('4. ダイアログ → キャンセルで dispatch・navigate は呼ばれない', async () => {
      const resetProfile = vi.fn();
      const resetCurrencies = vi.fn();
      const endRun = vi.fn();

      useStore.setState({
        createdAt: Date.now(),
        resetProfile,
        resetCurrencies,
        endRun,
      });

      render(
        <NavigationProvider initialScreen="title">
          <Page />
        </NavigationProvider>
      );

      // ダイアログを開く
      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));
      // 「キャンセル」を押す
      await userEvent.click(screen.getByRole('button', { name: 'キャンセル' }));

      expect(resetProfile).not.toHaveBeenCalled();
      expect(resetCurrencies).not.toHaveBeenCalled();
      expect(endRun).not.toHaveBeenCalled();
      // title ページは残っている
      expect(screen.getByText('TOWER DEFENSE × INFINITE TIER')).toBeDefined();
    });

    it('5. セーブなし (createdAt = 0) で「新規開始」→ ダイアログなしで直接 doNewGame() が走る', async () => {
      const resetProfile = vi.fn();
      const resetCurrencies = vi.fn();
      const resetMachine = vi.fn();
      const resetWeapons = vi.fn();
      const resetPatches = vi.fn();
      const clearEquippedPatches = vi.fn();
      const endRun = vi.fn();

      useStore.setState({
        createdAt: 0,
        resetProfile,
        resetCurrencies,
        resetMachine,
        resetWeapons,
        resetPatches,
        clearEquippedPatches,
        endRun,
      });

      render(
        <NavigationProvider initialScreen="title">
          <Page />
        </NavigationProvider>
      );

      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));

      // ConfirmDialog は開かない
      expect(
        screen.queryByText('現在のセーブデータは消えます。本当に新規開始しますか?')
      ).toBeNull();
      // 全 reset が呼ばれている
      expect(resetProfile).toHaveBeenCalledTimes(1);
      expect(resetCurrencies).toHaveBeenCalledTimes(1);
      expect(resetMachine).toHaveBeenCalledTimes(1);
      expect(resetWeapons).toHaveBeenCalledTimes(1);
      expect(resetPatches).toHaveBeenCalledTimes(1);
      expect(clearEquippedPatches).toHaveBeenCalledTimes(1);
      expect(endRun).toHaveBeenCalledTimes(1);
    });
  });
});
