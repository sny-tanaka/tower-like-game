import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test } from 'vitest';

import { BigNum } from '@/lib/bignum';
import { Page } from '@/pages/preparation';
import { useStore } from '@/store';
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

  describe('出撃ボタン → startRun', () => {
    afterEach(() => {
      useStore.getState().endRun();
    });

    test('出撃ボタンを押すと isRunActive=true / machineMaxHp>0 になる', async () => {
      const user = userEvent.setup();
      renderPage();

      // 押す前: ラン外 / HP 0
      expect(useStore.getState().isRunActive).toBe(false);
      expect(useStore.getState().machineMaxHp.isZero()).toBe(true);

      await user.click(screen.getByRole('button', { name: '出撃' }));

      // 押した後: ラン中 / HP は base 値 (=100, machineLevels.maxHp=0 のとき)
      const s = useStore.getState();
      expect(s.isRunActive).toBe(true);
      expect(s.machineMaxHp.eq(BigNum.fromNumber(100))).toBe(true);
      expect(s.machineHp.eq(BigNum.fromNumber(100))).toBe(true);
      expect(s.currentWeapon).toBe(s.initialWeapon);
    });
  });
});
