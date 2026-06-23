import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { PatchScreen } from './index';

import { soundEngine } from '@/lib/audio';
import { NavigationProvider } from '@/store/navigation';

vi.mock('@/lib/audio', () => ({
  soundEngine: { play: vi.fn(), playBgm: vi.fn(), stopBgm: vi.fn(), init: vi.fn() },
}));

/** NavigationProvider でラップするヘルパー */
function renderPatchScreen() {
  return render(
    <NavigationProvider initialScreen="patches">
      <PatchScreen />
    </NavigationProvider>
  );
}

describe('PatchScreen', () => {
  describe('初期表示', () => {
    it('タイトル「パッチ庫」を表示する', () => {
      renderPatchScreen();
      expect(screen.getByText('パッチ庫')).toBeDefined();
    });

    it('タブバーに「装着」「所持」「合成」を表示する', () => {
      renderPatchScreen();
      expect(screen.getByRole('tab', { name: /^装着/ })).toBeDefined();
      expect(screen.getByRole('tab', { name: /^所持/ })).toBeDefined();
      expect(screen.getByRole('tab', { name: /^合成/ })).toBeDefined();
    });

    it('初期タブは「装着」がアクティブ', () => {
      renderPatchScreen();
      const equipTab = screen.getByRole('tab', { name: /^装着/ });
      expect(equipTab.getAttribute('aria-selected')).toBe('true');
    });

    it('初期状態で「装着スロット」が表示される', () => {
      renderPatchScreen();
      expect(screen.getByText('装着スロット')).toBeDefined();
    });
  });

  describe('タブ切替', () => {
    it('「所持」タブをクリックすると「パッチ在庫」または空メッセージが表示される', async () => {
      renderPatchScreen();
      await userEvent.click(screen.getByRole('tab', { name: /^所持/ }));
      // 所持なし時のメッセージ or パッチ在庫見出しのどちらかが表示される
      const hasInventory = screen.queryByText('パッチ在庫') !== null;
      const hasEmpty = screen.queryByText('パッチを所持していません') !== null;
      expect(hasInventory || hasEmpty).toBe(true);
    });

    it('「合成」タブをクリックすると「パッチ合成」が表示される', async () => {
      renderPatchScreen();
      await userEvent.click(screen.getByRole('tab', { name: /^合成/ }));
      expect(screen.getByText('パッチ合成')).toBeDefined();
    });

    it('「装着」タブに戻すと「装着スロット」が再表示される', async () => {
      renderPatchScreen();
      // 所持タブに移動してから装着に戻る
      await userEvent.click(screen.getByRole('tab', { name: /^所持/ }));
      await userEvent.click(screen.getByRole('tab', { name: /^装着/ }));
      expect(screen.getByText('装着スロット')).toBeDefined();
    });

    it('「所持」タブ選択時は aria-selected が true になる', async () => {
      renderPatchScreen();
      await userEvent.click(screen.getByRole('tab', { name: /^所持/ }));
      const inventoryTab = screen.getByRole('tab', { name: /^所持/ });
      expect(inventoryTab.getAttribute('aria-selected')).toBe('true');
    });

    it('アクティブでないタブは aria-selected が false になる', async () => {
      renderPatchScreen();
      await userEvent.click(screen.getByRole('tab', { name: /^所持/ }));
      const equipTab = screen.getByRole('tab', { name: /^装着/ });
      expect(equipTab.getAttribute('aria-selected')).toBe('false');
    });
  });

  describe('BottomNav', () => {
    it('BottomNav の「パッチ」タブが active 状態で表示される', () => {
      renderPatchScreen();
      const patchNavBtn = screen.getByRole('button', { name: 'パッチ' });
      expect(patchNavBtn.getAttribute('aria-current')).toBe('page');
    });
  });

  describe('SE 配線', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('タブ切替時に tabSwitch SE が再生される', async () => {
      renderPatchScreen();
      await userEvent.click(screen.getByRole('tab', { name: /^所持/ }));
      expect(soundEngine.play).toHaveBeenCalledWith('tabSwitch');
    });
  });
});
