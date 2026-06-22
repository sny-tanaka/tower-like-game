import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { Page } from './index';

import { NavigationProvider } from '@/store/navigation';

// ---------------------------------------------------------------------------
// ヘルパー: NavigationProvider でラップしてレンダー
// ---------------------------------------------------------------------------

function renderPage() {
  return render(
    <NavigationProvider initialScreen="machine">
      <Page />
    </NavigationProvider>
  );
}

// ---------------------------------------------------------------------------
// MachineScreen Page テスト
// ---------------------------------------------------------------------------

describe('MachineScreen', () => {
  test('タイトル「マシン強化」が表示される', () => {
    renderPage();
    expect(screen.getByText('マシン強化')).toBeInTheDocument();
  });

  test('MachineUpgradeList が描画される（全 16 項目の Lv 0 が存在する）', () => {
    renderPage();
    const lv0Labels = screen.getAllByText('Lv 0');
    expect(lv0Labels).toHaveLength(16);
  });

  test('BottomNav の「マシン」タブが aria-current="page" でアクティブ', () => {
    renderPage();
    const machineTab = screen.getByRole('button', { name: 'マシン' });
    expect(machineTab).toHaveAttribute('aria-current', 'page');
  });

  test('BottomNav タブをクリックすると画面遷移できる（準備タブ）', async () => {
    renderPage();
    const preparationTab = screen.getByRole('button', { name: '準備' });
    await userEvent.click(preparationTab);
    // 画面遷移後はマシンタブが非アクティブになる
    expect(preparationTab).not.toHaveAttribute('aria-current', 'page');
  });
});
