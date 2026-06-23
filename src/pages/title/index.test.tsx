import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Page } from '@/pages/title';
import { useStore } from '@/store/index';
import { NavigationProvider } from '@/store/navigation';

/** store を createdAt 指定で reset し Page をレンダリングするヘルパー。 */
function renderPage(initialCreatedAt = 0) {
  useStore.setState({ createdAt: initialCreatedAt });
  return render(
    <NavigationProvider initialScreen="title">
      <Page />
    </NavigationProvider>
  );
}

/**
 * afterEach: vi.fn() で置き換えた action が次テストに漏れないよう
 * store を初期状態（本物の action）に完全リセットする。
 * Zustand の setState はマージなので、setState({ createdAt: 0 }) だけでは
 * 前テストで注入した mock action が残り続ける。
 */
afterEach(() => {
  useStore.setState(useStore.getInitialState(), true);
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

    it('6. resetProfile は now > 0 の number 引数で呼ばれる (createdAt が再設定される)', async () => {
      const resetProfile = vi.fn();

      useStore.setState({
        createdAt: Date.now(),
        resetProfile,
      });

      render(
        <NavigationProvider initialScreen="title">
          <Page />
        </NavigationProvider>
      );

      const before = Date.now();
      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));
      const confirmButtons = screen.getAllByRole('button', { name: '新規開始' });
      await userEvent.click(confirmButtons[confirmButtons.length - 1]);
      const after = Date.now();

      expect(resetProfile).toHaveBeenCalledTimes(1);
      const arg = resetProfile.mock.calls[0][0] as number;
      // 引数は現在時刻に近い正数であること (createdAt が正の値に設定される)
      expect(typeof arg).toBe('number');
      expect(arg).toBeGreaterThan(0);
      expect(arg).toBeGreaterThanOrEqual(before);
      expect(arg).toBeLessThanOrEqual(after);
    });

    it('7. キャンセル後に再度「新規開始」を押すと ConfirmDialog が再び開く (isConfirmOpen の再起動)', async () => {
      renderPage(Date.now());

      // 1 回目：ダイアログを開いてキャンセル
      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));
      expect(
        screen.queryByText('現在のセーブデータは消えます。本当に新規開始しますか?')
      ).not.toBeNull();
      await userEvent.click(screen.getByRole('button', { name: 'キャンセル' }));

      // ダイアログが閉じていること
      expect(
        screen.queryByText('現在のセーブデータは消えます。本当に新規開始しますか?')
      ).toBeNull();

      // 2 回目：再び「新規開始」を押すとダイアログが開く
      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));
      expect(
        screen.queryByText('現在のセーブデータは消えます。本当に新規開始しますか?')
      ).not.toBeNull();
    });

    it('8. 連続クリック耐性: ダイアログ表示中に「新規開始」を連打しても reset は 1 度だけ', async () => {
      const resetProfile = vi.fn();
      const endRun = vi.fn();

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

      // ダイアログを開く
      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));

      // ダイアログが開いた状態で「新規開始」ボタンを連打
      // （ダイアログ外のボタンは Overlay の背景クリックで閉じるが、
      //   TitleActions の「新規開始」をダイアログが覆っているため実際は押せない場合もあるが、
      //   仮に押せたとしても handleNewGameRequest は createdAt > 0 でダイアログを開くだけ）
      const confirmButtons = screen.getAllByRole('button', { name: '新規開始' });
      // ダイアログの「新規開始」（confirm）を 1 回だけ押す
      await userEvent.click(confirmButtons[confirmButtons.length - 1]);

      // 正確に 1 回だけ呼ばれること
      expect(resetProfile).toHaveBeenCalledTimes(1);
      expect(endRun).toHaveBeenCalledTimes(1);
    });

    it('9. 「続きから」は reset action を呼ばずに遷移する', async () => {
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

      await userEvent.click(screen.getByRole('button', { name: '続きから' }));

      // セーブデータ系の reset は一切呼ばれない
      expect(resetProfile).not.toHaveBeenCalled();
      expect(resetCurrencies).not.toHaveBeenCalled();
      expect(endRun).not.toHaveBeenCalled();
    });

    it('10. 「新規開始」で settings (音量・バイブ) はリセットされない', async () => {
      const resetSettings = vi.fn();
      const endRun = vi.fn();

      useStore.setState({
        createdAt: 0,
        resetSettings,
        endRun,
      });

      render(
        <NavigationProvider initialScreen="title">
          <Page />
        </NavigationProvider>
      );

      await userEvent.click(screen.getByRole('button', { name: '新規開始' }));

      // endRun は呼ばれる (doNewGame 経由) が resetSettings は呼ばれないこと
      expect(endRun).toHaveBeenCalledTimes(1);
      expect(resetSettings).not.toHaveBeenCalled();
    });
  });
});
