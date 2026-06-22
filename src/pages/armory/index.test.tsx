import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { ArmoryScreen } from '@/pages/armory';
import { NavigationProvider } from '@/store/navigation';

function renderWithNav() {
  return render(
    <NavigationProvider initialScreen="armory">
      <ArmoryScreen />
    </NavigationProvider>,
  );
}

describe('ArmoryScreen', () => {
  test('初期表示で「武器詳細」タブパネルが表示される', () => {
    renderWithNav();
    expect(screen.getByRole('tabpanel', { name: '武器詳細' })).toBeInTheDocument();
  });

  test('「共通強化」タブをクリックすると武器強化タブパネルが表示される', async () => {
    renderWithNav();
    const upgradeTab = screen.getByRole('tab', { name: '共通強化' });
    await userEvent.click(upgradeTab);
    expect(screen.getByRole('tabpanel', { name: '武器強化' })).toBeInTheDocument();
  });

  test('タブ切り替え後に「武器詳細」タブをクリックすると詳細タブパネルに戻る', async () => {
    renderWithNav();
    const upgradeTab = screen.getByRole('tab', { name: '共通強化' });
    await userEvent.click(upgradeTab);
    const detailsTab = screen.getByRole('tab', { name: '武器詳細' });
    await userEvent.click(detailsTab);
    expect(screen.getByRole('tabpanel', { name: '武器詳細' })).toBeInTheDocument();
  });

  test('PageHeader にタイトル「武器庫」が heading として表示される', () => {
    renderWithNav();
    expect(screen.getByRole('heading', { name: '武器庫' })).toBeInTheDocument();
  });

  test('BottomNav が表示される', () => {
    renderWithNav();
    expect(screen.getByRole('navigation', { name: 'メインナビゲーション' })).toBeInTheDocument();
  });
});
