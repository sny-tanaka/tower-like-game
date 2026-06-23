import { render, screen, act } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';

import { Page } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { NavigationProvider } from '@/store/navigation';
import { flushAfterRun } from '@/store/sync';

// flushAfterRun は IndexedDB を叩くのでモック
vi.mock('@/store/sync', () => ({
  flushAfterRun: vi.fn().mockResolvedValue(undefined),
}));

/** NavigationProvider でラップするヘルパー */
function renderPage() {
  return render(
    <NavigationProvider initialScreen="battle">
      <Page />
    </NavigationProvider>
  );
}

describe('BattleScreen Page', () => {
  test('BattleField が描画される', () => {
    renderPage();
    expect(screen.getByRole('img', { name: 'バトルフィールド' })).toBeInTheDocument();
  });

  test('メニューオーバーレイは初期状態では非表示', () => {
    renderPage();
    expect(screen.queryByRole('heading', { name: 'メニュー' })).not.toBeInTheDocument();
  });

  test('リザルトダイアログは初期状態では非表示', () => {
    renderPage();
    // ResultDialog の「出撃準備へ」ボタンが非表示
    expect(screen.queryByRole('button', { name: '出撃準備へ' })).not.toBeInTheDocument();
  });

  test('スクリーンセーバーは初期状態では非表示', () => {
    renderPage();
    expect(
      screen.queryByRole('button', { name: 'スクリーンセーバーを終了' })
    ).not.toBeInTheDocument();
  });
});

describe('finalizeRun — gameover 時のラン終了処理', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // store を初期状態に近い形に戻す（isRunActive=false, machineHp=0）
    // startRun を呼ぶことで isRunActive=true, machineHp>0 になる
    useStore.getState().endRun();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('gameover 時に endRun が呼ばれる', async () => {
    // store を startRun 状態にしてからテスト
    const state = useStore.getState();
    // HP を 1 にして startRun
    state.startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const endRunSpy = vi.spyOn(useStore.getState(), 'endRun');

    renderPage();

    // machineHp=0 にして gameover を発生させる
    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    expect(endRunSpy).toHaveBeenCalledTimes(1);
  });

  test('gameover 時に incrementRuns が呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const incrementRunsSpy = vi.spyOn(useStore.getState(), 'incrementRuns');

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    expect(incrementRunsSpy).toHaveBeenCalledTimes(1);
  });

  test('gameover 時に setLastPlayedAt が呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const setLastPlayedAtSpy = vi.spyOn(useStore.getState(), 'setLastPlayedAt');

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    expect(setLastPlayedAtSpy).toHaveBeenCalledTimes(1);
  });

  test('gameover 時に flushAfterRun が呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    expect(flushAfterRun).toHaveBeenCalledTimes(1);
  });

  test('gameover 後に ResultDialog が表示される', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    expect(screen.getByRole('button', { name: '出撃準備へ' })).toBeInTheDocument();
  });

  test('重複呼び出しなし — gameover 後に effectiveResultStatus が非 null のまま再レンダーしても endRun は 1 度だけ', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const endRunSpy = vi.spyOn(useStore.getState(), 'endRun');

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    // machineHp=0 のまま 2 回目の再レンダーを強制的に起こす（screw を更新）
    await act(async () => {
      useStore.setState({ screw: BigNum.fromNumber(999) });
    });

    // endRun は 1 度だけ呼ばれるはず
    expect(endRunSpy).toHaveBeenCalledTimes(1);
  });
});
