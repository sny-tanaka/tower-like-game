import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { Page } from '@/pages/preparation';
import { NavigationProvider } from '@/store/navigation';

// ---------------------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------------------

function renderPage() {
  return render(
    <NavigationProvider initialScreen="preparation">
      <Page />
    </NavigationProvider>
  );
}

// ---------------------------------------------------------------------------
// テスト
// ---------------------------------------------------------------------------

describe('PreparationScreen Page', () => {
  test('初期表示: TierSelectTab が表示される', () => {
    renderPage();
    // TierSelectTab の role="tabpanel" aria-label="Tier 選択"
    expect(screen.getByRole('tabpanel', { name: 'Tier 選択' })).toBeInTheDocument();
  });

  test('タブ切替: 「武器」クリックで InitialWeaponTab が表示される', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('tab', { name: '武器' }));

    expect(screen.getByRole('tabpanel', { name: '初期武器選択' })).toBeInTheDocument();
    // TierSelectTab は非表示
    expect(screen.queryByRole('tabpanel', { name: 'Tier 選択' })).not.toBeInTheDocument();
  });

  test('タブ切替: 「パッチ」クリックで EquippedPatchesTab が表示される', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('tab', { name: 'パッチ' }));

    expect(screen.getByRole('tabpanel', { name: '装着パッチ' })).toBeInTheDocument();
  });

  test('LaunchButton（出撃ボタン）が表示される', () => {
    renderPage();
    expect(screen.getByRole('button', { name: '出撃' })).toBeInTheDocument();
  });

  test('BottomNav のメインナビゲーションが表示される', () => {
    renderPage();
    expect(screen.getByRole('navigation', { name: 'メインナビゲーション' })).toBeInTheDocument();
  });

  test('BottomNav で「準備」がアクティブになっている', () => {
    renderPage();
    // aria-current="page" が設定されている
    const prepBtn = screen.getByRole('button', { name: '準備' });
    expect(prepBtn).toHaveAttribute('aria-current', 'page');
  });

  test('タブ切替: 「TIER」→「武器」→「TIER」で元に戻る', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('tab', { name: '武器' }));
    await user.click(screen.getByRole('tab', { name: 'TIER' }));

    expect(screen.getByRole('tabpanel', { name: 'Tier 選択' })).toBeInTheDocument();
  });
});
