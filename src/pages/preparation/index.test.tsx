import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi, beforeEach } from 'vitest';

import { soundEngine } from '@/lib/audio';
import { BigNum } from '@/lib/bignum';
import { Page } from '@/pages/preparation';
import { useStore } from '@/store';
import { NavigationProvider } from '@/store/navigation';

vi.mock('@/lib/audio', () => ({
  soundEngine: { play: vi.fn(), playBgm: vi.fn(), stopBgm: vi.fn(), init: vi.fn() },
}));

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

  describe('SE 配線', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    afterEach(() => {
      useStore.getState().endRun();
      vi.clearAllMocks();
    });

    test('タブ切替時に tabSwitch SE が再生される', async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole('tab', { name: '武器' }));
      expect(soundEngine.play).toHaveBeenCalledWith('tabSwitch');
    });

    test('出撃ボタン押下時に launch SE が再生される', async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole('button', { name: '出撃' }));
      expect(soundEngine.play).toHaveBeenCalledWith('launch');
    });

    test('同一タブを連打しても tabSwitch SE は 1 回しか鳴らない', async () => {
      const user = userEvent.setup();
      renderPage();
      const weaponTab = screen.getByRole('tab', { name: '武器' });
      await user.click(weaponTab);
      vi.clearAllMocks();
      // 同じタブを再クリック → SE は鳴らない
      await user.click(weaponTab);
      expect(soundEngine.play).not.toHaveBeenCalledWith('tabSwitch');
    });
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

      // 押した後: ラン中 / HP は base 値 (=10000, v1.0.0 で 100→10000 リベース)
      const s = useStore.getState();
      expect(s.isRunActive).toBe(true);
      expect(s.machineMaxHp.eq(BigNum.fromNumber(10000))).toBe(true);
      expect(s.machineHp.eq(BigNum.fromNumber(10000))).toBe(true);
      expect(s.currentWeapon).toBe(s.initialWeapon);
    });

    test('initialSelectedTier 未指定のとき selectedTier のデフォルト (highestTier=1) で currentTier が 1 になる', async () => {
      // highestTier=1 (初期値) → selectedTier=1 → currentTier=1
      const user = userEvent.setup();
      renderPage();

      await user.click(screen.getByRole('button', { name: '出撃' }));

      expect(useStore.getState().currentTier).toBe(1);
    });

    test('initialSelectedTier=3 で出撃すると store の currentTier が 3 になる', async () => {
      const user = userEvent.setup();
      render(
        <NavigationProvider initialScreen="preparation">
          <Page initialSelectedTier={3} />
        </NavigationProvider>
      );

      await user.click(screen.getByRole('button', { name: '出撃' }));

      expect(useStore.getState().currentTier).toBe(3);
    });

    test('initialSelectedTier=5 で出撃すると store の currentTier が 5 になる', async () => {
      const user = userEvent.setup();
      render(
        <NavigationProvider initialScreen="preparation">
          <Page initialSelectedTier={5} />
        </NavigationProvider>
      );

      await user.click(screen.getByRole('button', { name: '出撃' }));

      expect(useStore.getState().currentTier).toBe(5);
    });
  });

  // ------------------------------------------------------------------------
  // DEBUG 出撃ボタン (DEV 限定、 v0.3.5)
  // ------------------------------------------------------------------------
  describe('DEBUG 出撃ボタン (DEV 限定)', () => {
    beforeEach(() => {
      useStore.getState().endRun();
      useStore.setState({ bolt: BigNum.ZERO, alloy: BigNum.ZERO });
    });
    afterEach(() => {
      useStore.getState().endRun();
    });

    test('DEV 環境では DEBUG 出撃ボタンが表示される (data-testid="debug-launch")', () => {
      renderPage();
      expect(screen.getByTestId('debug-launch')).toBeInTheDocument();
      // ボタン文言の確認 (DEV プレフィックス + 開始 wave + 所持量)
      expect(screen.getByTestId('debug-launch').textContent).toContain('W29');
    });

    test('DEBUG 出撃押下 → startRun + initialWave=29 で currentWave=29', async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByTestId('debug-launch'));
      const s = useStore.getState();
      expect(s.isRunActive).toBe(true);
      expect(s.currentWave).toBe(29);
    });

    test('DEBUG 出撃押下 → ネジ / ボルト / 超合金が 1A (1e9) 加算される', async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByTestId('debug-launch'));
      const s = useStore.getState();
      // 1A = 1e9
      expect(s.screw.eq(BigNum.fromNumber(1e9))).toBe(true);
      expect(s.bolt.eq(BigNum.fromNumber(1e9))).toBe(true);
      expect(s.alloy.eq(BigNum.fromNumber(1e9))).toBe(true);
    });

    test('DEBUG 出撃押下 → selectedTier を尊重 (initialTier も渡る)', async () => {
      const user = userEvent.setup();
      // highestTier=3 にして Tier 2 を選択
      useStore.setState({ highestTier: 3 });
      render(
        <NavigationProvider initialScreen="preparation">
          <Page initialSelectedTier={2} />
        </NavigationProvider>
      );
      await user.click(screen.getByTestId('debug-launch'));
      const s = useStore.getState();
      expect(s.currentTier).toBe(2);
      expect(s.currentWave).toBe(29);
    });

    test('DEBUG 出撃押下 → launch SE が再生される', async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByTestId('debug-launch'));
      expect(soundEngine.play).toHaveBeenCalledWith('launch');
    });
  });
});
