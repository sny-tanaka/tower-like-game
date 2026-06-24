/**
 * Tier クリアフロー統合テスト (0.3.5)
 *
 * 仕様:
 *   - Tier ボス撃破 (= useBattleLoop が tierCleared=true を返す) → TierClearFx 表示
 *   - TierClearFx 演出終了 (onAnimationEnd) → onDone コールバック:
 *       1. setTierClearKey(0) で Fx を unmount
 *       2. state.unlockNextTier(currentTier) で次 Tier 解放
 *       3. onTierClearedAck() で useBattleLoop の tierCleared をリセット
 *       4. finalizeRun('clear') で endRun + updateHighest + incrementRuns 等
 *   - ResultDialog (status='clear') が表示される
 *   - 「出撃準備へ」 で navigate('preparation') + hasFinalizedRef リセット
 *
 * useBattleLoop は本ファイルでは vi.mock で差し替え、 tierCleared フラグを
 * テストから直接制御する (rAF tick のシミュレーションは別途 useBattleLoop の純粋関数
 * テストで担保)。
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { Page } from './index';

import type { UseBattleLoopResult } from '@/hooks/useBattleLoop';
import { useBattleLoop } from '@/hooks/useBattleLoop';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { NavigationProvider } from '@/store/navigation';

// flushAfterRun は IndexedDB を叩くのでモック
vi.mock('@/store/sync', () => ({
  flushAfterRun: vi.fn().mockResolvedValue(undefined),
}));

// soundEngine をモック
vi.mock('@/lib/audio', () => ({
  soundEngine: { play: vi.fn(), playBgm: vi.fn(), stopBgm: vi.fn(), init: vi.fn() },
}));

// useBattleLoop はモック化 (戻り値を個別テストで制御するため)
vi.mock('@/hooks/useBattleLoop', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/hooks/useBattleLoop')>();
  return {
    ...actual,
    useBattleLoop: vi.fn(),
  };
});

const mockedUseBattleLoop = vi.mocked(useBattleLoop);

/** useBattleLoop の戻り値のデフォルトファクトリ */
function makeUseBattleLoopReturn(
  overrides: Partial<UseBattleLoopResult> = {}
): UseBattleLoopResult {
  return {
    enemies: [],
    damageEvents: [],
    deathEvents: [],
    projectileEvents: [],
    appearanceEvents: [],
    waveElapsedSec: 0,
    onDamageDone: vi.fn(),
    onDeathDone: vi.fn(),
    onProjectileDone: vi.fn(),
    onAppearanceDone: vi.fn(),
    fireActive: vi.fn().mockReturnValue(true),
    isOverdriveActive: false,
    killCount: 42,
    runElapsedSec: 30,
    droppedPatches: [],
    tierCleared: false,
    onTierClearedAck: vi.fn(),
    ...overrides,
  };
}

function renderPage() {
  return render(
    <NavigationProvider initialScreen="battle">
      <Page />
    </NavigationProvider>
  );
}

/** TierClearFx の onAnimationEnd を発火させる (jsdom は実 animation を走らせないため手動) */
function fireTierClearFxDone(container: HTMLElement) {
  // TierClearFx の root は class*='wrap' を持つ
  const tierClearRoot = container.querySelector('[class*="wrap"]');
  expect(tierClearRoot).not.toBeNull();
  fireEvent.animationEnd(tierClearRoot!);
}

describe('Tier クリアフロー (BUG: Tier クリア後に勝手に次 Tier が始まる、 0.3.5 修正)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().endRun();
    // 前テストの highestTier 等が残らないように profile を明示リセット
    useStore.setState({ highestTier: 0, highestWave: 0 });
    // デフォルトは tierCleared=false
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('tierCleared=false の通常戦闘中は TierClearFx が描画されない', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    const { container } = renderPage();
    // TierClearFx の root クラスが居ないこと
    expect(container.querySelector('[class*="wrap"]')).toBeNull();
  });

  test('tierCleared=true → TierClearFx が描画される', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));
    const { container } = renderPage();
    expect(container.querySelector('[class*="wrap"]')).not.toBeNull();
  });

  test('TierClearFx onDone → unlockNextTier(currentTier) が呼ばれる (Tier 1 → highestTier=2)', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    const unlockSpy = vi.spyOn(useStore.getState(), 'unlockNextTier');
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));

    const { container } = renderPage();

    act(() => {
      fireTierClearFxDone(container);
    });

    expect(unlockSpy).toHaveBeenCalledWith(1);
    expect(useStore.getState().highestTier).toBe(2);
  });

  test('Tier 3 クリア → unlockNextTier(3) → highestTier=4', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 3,
    });
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));
    const { container } = renderPage();

    act(() => {
      fireTierClearFxDone(container);
    });

    expect(useStore.getState().highestTier).toBe(4);
  });

  test('TierClearFx onDone → onTierClearedAck() が呼ばれて useBattleLoop の tierCleared をリセット', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    const onAck = vi.fn();
    mockedUseBattleLoop.mockReturnValue(
      makeUseBattleLoopReturn({ tierCleared: true, onTierClearedAck: onAck })
    );
    const { container } = renderPage();

    act(() => {
      fireTierClearFxDone(container);
    });

    expect(onAck).toHaveBeenCalledTimes(1);
  });

  test('TierClearFx onDone → state.endRun() が呼ばれて isRunActive=false に', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    expect(useStore.getState().isRunActive).toBe(true);
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));
    const { container } = renderPage();

    act(() => {
      fireTierClearFxDone(container);
    });

    expect(useStore.getState().isRunActive).toBe(false);
  });

  test('TierClearFx onDone → ResultDialog "出撃準備へ" ボタンが表示される (clear status)', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));
    const { container } = renderPage();

    expect(screen.queryByRole('button', { name: '出撃準備へ' })).not.toBeInTheDocument();

    act(() => {
      fireTierClearFxDone(container);
    });

    // ResultDialog の「出撃準備へ」 ボタンが表示される
    expect(screen.getByRole('button', { name: '出撃準備へ' })).toBeInTheDocument();
  });

  test('TierClearFx onDone → state.advanceTier() は呼ばれない (currentTier が勝手に進まない、 BUG 回帰)', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 2,
    });
    const advanceTierSpy = vi.spyOn(useStore.getState(), 'advanceTier');
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));
    const { container } = renderPage();

    act(() => {
      fireTierClearFxDone(container);
    });

    // advanceTier は呼ばれない (endRun で currentTier=1 にリセットされるが、 +1 ではない)
    expect(advanceTierSpy).not.toHaveBeenCalled();
  });

  test('TierClearFx onDone → updateHighest が呼ばれて到達 Tier/Wave がスナップショット', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 2,
    });
    // W30 でクリア (currentWave=30 をシミュレート)
    useStore.setState({ currentWave: 30 });
    const updateHighestSpy = vi.spyOn(useStore.getState(), 'updateHighest');
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));
    const { container } = renderPage();

    act(() => {
      fireTierClearFxDone(container);
    });

    // updateHighest は (clearedTier, clearedWave) で呼ばれる。 Tier 2 W30 が引数
    expect(updateHighestSpy).toHaveBeenCalledWith(2, 30);
  });

  test('TierClearFx onDone → unlockNextTier は updateHighest より「後」 に呼ばれて到達情報を上書きしない', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    useStore.setState({ currentWave: 30 });
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));
    const { container } = renderPage();

    act(() => {
      fireTierClearFxDone(container);
    });

    // Tier 1 を W30 まで進めた + Tier 2 解放 → highestTier=2, highestWave=30
    const s = useStore.getState();
    expect(s.highestTier).toBe(2);
    expect(s.highestWave).toBe(30);
  });

  test('TierClearFx onDone → incrementRuns / addEnemiesKilled / addPlayTimeSec も呼ばれる (finalize 通常処理)', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    const incrementRunsSpy = vi.spyOn(useStore.getState(), 'incrementRuns');
    const addKilledSpy = vi.spyOn(useStore.getState(), 'addEnemiesKilled');
    const addPlayTimeSpy = vi.spyOn(useStore.getState(), 'addPlayTimeSec');

    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));
    const { container } = renderPage();

    act(() => {
      fireTierClearFxDone(container);
    });

    // 値ではなく call 1 回ずつであることのみ確認 (重複防止の主目的)
    expect(incrementRunsSpy).toHaveBeenCalledTimes(1);
    expect(addKilledSpy).toHaveBeenCalledTimes(1);
    expect(addPlayTimeSpy).toHaveBeenCalledTimes(1);
  });

  test('TierClearFx onDone は重複呼び防止 — finalize は 1 ラン内で 1 回のみ実行される', () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    const incrementRunsSpy = vi.spyOn(useStore.getState(), 'incrementRuns');
    mockedUseBattleLoop.mockReturnValue(makeUseBattleLoopReturn({ tierCleared: true }));
    const { container } = renderPage();

    act(() => {
      fireTierClearFxDone(container);
    });
    // handleTierClearFxDone 経由で finalize が走ったあと、 setResultStatus('clear') で
    // effectiveResultStatus が変化 → useEffect L313 が finalize を再呼びしようとするが
    // hasFinalizedRef ガードで no-op になる。
    expect(incrementRunsSpy).toHaveBeenCalledTimes(1);
  });
});
