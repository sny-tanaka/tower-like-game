import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi, beforeEach } from 'vitest';

import { soundEngine } from '@/lib/audio';
import { ArmoryScreen } from '@/pages/armory';
import { NavigationProvider } from '@/store/navigation';

vi.mock('@/lib/audio', () => ({
  soundEngine: { play: vi.fn(), playBgm: vi.fn(), stopBgm: vi.fn(), init: vi.fn() },
}));

function renderWithNav() {
  return render(
    <NavigationProvider initialScreen="armory">
      <ArmoryScreen />
    </NavigationProvider>
  );
}

describe('ArmoryScreen', () => {
  test('初期表示で「武器詳細」タブパネルが表示される', () => {
    renderWithNav();
    expect(screen.getByRole('tabpanel', { name: '武器詳細' })).toBeInTheDocument();
  });

  test('「強化」タブをクリックすると武器強化タブパネルが表示される', async () => {
    renderWithNav();
    const upgradeTab = screen.getByRole('tab', { name: '強化' });
    await userEvent.click(upgradeTab);
    expect(screen.getByRole('tabpanel', { name: '武器強化' })).toBeInTheDocument();
  });

  test('タブ切り替え後に「詳細」タブをクリックすると詳細タブパネルに戻る', async () => {
    renderWithNav();
    const upgradeTab = screen.getByRole('tab', { name: '強化' });
    await userEvent.click(upgradeTab);
    const detailsTab = screen.getByRole('tab', { name: '詳細' });
    await userEvent.click(detailsTab);
    expect(screen.getByRole('tabpanel', { name: '武器詳細' })).toBeInTheDocument();
  });

  test('PageHeader にタイトル「武器庫」が heading として表示される', () => {
    renderWithNav();
    expect(screen.getByRole('heading', { name: '武器庫' })).toBeInTheDocument();
  });

  test('戻るボタンが表示される（onBack 提供）', () => {
    renderWithNav();
    expect(screen.getByRole('button', { name: '戻る' })).toBeInTheDocument();
  });

  test('BottomNav が表示される', () => {
    renderWithNav();
    expect(screen.getByRole('navigation', { name: 'メインナビゲーション' })).toBeInTheDocument();
  });

  describe('SE 配線', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    test('タブ切替時に tabSwitch SE が再生される', async () => {
      renderWithNav();
      await userEvent.click(screen.getByRole('tab', { name: '強化' }));
      expect(soundEngine.play).toHaveBeenCalledWith('tabSwitch');
    });
  });
});
