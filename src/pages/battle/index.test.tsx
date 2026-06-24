import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';

import { Page } from './index';

import { soundEngine } from '@/lib/audio';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { NavigationProvider } from '@/store/navigation';
import { flushAfterRun } from '@/store/sync';

// flushAfterRun は IndexedDB を叩くのでモック
vi.mock('@/store/sync', () => ({
  flushAfterRun: vi.fn().mockResolvedValue(undefined),
}));

// soundEngine をモック
vi.mock('@/lib/audio', () => ({
  soundEngine: { play: vi.fn(), playBgm: vi.fn(), stopBgm: vi.fn(), init: vi.fn() },
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

// ---------------------------------------------------------------------------
// finalizeRun — 撤退フローのテスト
// ---------------------------------------------------------------------------

describe('finalizeRun — 撤退フロー', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().endRun();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /** 撤退操作ヘルパー: メニュー → 撤退 → 確認ダイアログで「撤退する」 */
  async function doRetreat() {
    const pauseBtn = screen.getByRole('button', { name: '一時停止 (メニューを開く)' });
    await act(async () => {
      fireEvent.click(pauseBtn);
    });
    const retreatBtn = screen.getByRole('button', { name: '撤退' });
    await act(async () => {
      fireEvent.click(retreatBtn);
    });
    // ConfirmDialog の確認ボタン
    const confirmBtn = screen.getByRole('button', { name: '撤退する' });
    await act(async () => {
      fireEvent.click(confirmBtn);
    });
  }

  test('撤退時に endRun が呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const endRunSpy = vi.spyOn(useStore.getState(), 'endRun');

    renderPage();
    await doRetreat();

    expect(endRunSpy).toHaveBeenCalledTimes(1);
  });

  test('撤退時に incrementRuns が呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const incrementRunsSpy = vi.spyOn(useStore.getState(), 'incrementRuns');

    renderPage();
    await doRetreat();

    expect(incrementRunsSpy).toHaveBeenCalledTimes(1);
  });

  test('撤退時に flushAfterRun が呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    renderPage();
    await doRetreat();

    expect(flushAfterRun).toHaveBeenCalledTimes(1);
  });

  test('撤退後に ResultDialog が表示される', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    renderPage();
    await doRetreat();

    expect(screen.getByRole('button', { name: '出撃準備へ' })).toBeInTheDocument();
  });

  test('撤退後に重複呼び出しなし — endRun は 1 度だけ', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const endRunSpy = vi.spyOn(useStore.getState(), 'endRun');

    renderPage();
    await doRetreat();

    // 追加の store 変更をしても endRun が再び呼ばれないことを確認
    await act(async () => {
      useStore.setState({ screw: BigNum.fromNumber(999) });
    });

    expect(endRunSpy).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// finalizeRun — profile 関数の引数テスト
// ---------------------------------------------------------------------------

describe('finalizeRun — profile 関数の引数', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().endRun();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('gameover 時に addEnemiesKilled が number 型引数で呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const addEnemiesKilledSpy = vi.spyOn(useStore.getState(), 'addEnemiesKilled');

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    expect(addEnemiesKilledSpy).toHaveBeenCalledTimes(1);
    // 引数が number 型であることを確認（killCount の初期値 0）
    const [arg] = addEnemiesKilledSpy.mock.calls[0];
    expect(typeof arg).toBe('number');
  });

  test('gameover 時に addPlayTimeSec が number 型引数で呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const addPlayTimeSecSpy = vi.spyOn(useStore.getState(), 'addPlayTimeSec');

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    expect(addPlayTimeSecSpy).toHaveBeenCalledTimes(1);
    // 引数が number 型であることを確認（runElapsedSec の初期値 0）
    const [arg] = addPlayTimeSecSpy.mock.calls[0];
    expect(typeof arg).toBe('number');
  });

  test('gameover 時に updateHighest が (tier: number, wave: number) で呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const updateHighestSpy = vi.spyOn(useStore.getState(), 'updateHighest');

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    expect(updateHighestSpy).toHaveBeenCalledTimes(1);
    const [tier, wave] = updateHighestSpy.mock.calls[0];
    expect(typeof tier).toBe('number');
    expect(typeof wave).toBe('number');
  });

  test('gameover 時に setLastPlayedAt が unix ms (number) で呼ばれる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const setLastPlayedAtSpy = vi.spyOn(useStore.getState(), 'setLastPlayedAt');
    const before = Date.now();

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    const after = Date.now();
    expect(setLastPlayedAtSpy).toHaveBeenCalledTimes(1);
    const [ts] = setLastPlayedAtSpy.mock.calls[0];
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(after + 100);
  });
});

// ---------------------------------------------------------------------------
// リザルト Wave / Tier スナップショット (endRun 後リセットされても表示維持)
// ---------------------------------------------------------------------------

describe('ResultDialog — reachedTier / reachedWave のスナップショット', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().endRun();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /** 「到達 Wave」 ラベル横の数値テキストを取得 */
  function getReachedWaveText() {
    const label = screen.getByText('到達 Wave');
    const stat = label.parentElement!;
    return stat.textContent?.replace('到達 Wave', '').trim();
  }

  /** 「到達 Tier」 ラベル横の数値テキストを取得 */
  function getReachedTierText() {
    const label = screen.getByText('到達 Tier');
    const stat = label.parentElement!;
    return stat.textContent?.replace('到達 Tier', '').trim();
  }

  test('gameover: endRun() で currentWave が 1 にリセットされても reachedWave は終了時点の値を表示', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 3,
    });
    // ラン中に Wave 20 まで進んだ状態を再現
    await act(async () => {
      useStore.setState({ currentTier: 3, currentWave: 20 });
    });

    renderPage();

    // gameover 発火
    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    // ダイアログの「到達 Wave」 が「20」 (endRun で 1 にリセットされても 20 のまま)
    expect(getReachedWaveText()).toBe('20');
    expect(getReachedTierText()).toBe('3');
    // 実際に store 側は 1 にリセットされていることも確認 (リグレッション防止)
    expect(useStore.getState().currentWave).toBe(1);
    expect(useStore.getState().currentTier).toBe(1);
  });

  test('撤退: endRun() で currentWave が 1 にリセットされても reachedWave は終了時点の値を表示', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 2,
    });
    await act(async () => {
      useStore.setState({ currentTier: 2, currentWave: 15 });
    });

    renderPage();

    // 撤退操作 (メニュー → 撤退 → 確認)
    const pauseBtn = screen.getByRole('button', { name: '一時停止 (メニューを開く)' });
    await act(async () => {
      fireEvent.click(pauseBtn);
    });
    const retreatBtn = screen.getByRole('button', { name: '撤退' });
    await act(async () => {
      fireEvent.click(retreatBtn);
    });
    const confirmBtn = screen.getByRole('button', { name: '撤退する' });
    await act(async () => {
      fireEvent.click(confirmBtn);
    });

    expect(getReachedWaveText()).toBe('15');
    expect(getReachedTierText()).toBe('2');
    expect(useStore.getState().currentWave).toBe(1);
    expect(useStore.getState().currentTier).toBe(1);
  });
});

describe('ResultDialog — 獲得 bolt / alloy のスナップショット', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().endRun();
    // 残高もクリア (前テストから持ち越さない)
    useStore.setState({ bolt: BigNum.ZERO, alloy: BigNum.ZERO });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('gameover: endRun() で runStartBolt が 0 にリセットされても 獲得 bolt は ラン中に得た差分を表示 (回帰: 既存残高を全部「獲得」 と誤表示するバグ)', async () => {
    // 既存所持: bolt 100, alloy 50
    useStore.setState({ bolt: BigNum.fromNumber(100), alloy: BigNum.fromNumber(50) });
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    // ラン中に bolt +30 / alloy +12 獲得
    await act(async () => {
      useStore.getState().addBolt(BigNum.fromNumber(30));
      useStore.getState().addAlloy(BigNum.fromNumber(12));
    });

    renderPage();

    // gameover 発火
    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    // ダイアログ「獲得」 セクションの bolt / alloy は **差分** が表示されるべき
    // (既存残高 100/50 ではなく、 獲得した 30/12)
    expect(screen.getByRole('img', { name: 'bolt 30' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'alloy 12' })).toBeInTheDocument();

    // store 側は endRun で runStartBolt / runStartAlloy が 0 にリセットされている
    // (= スナップショットしないと bolt=130 / alloy=62 が「獲得」 と誤表示される)
    expect(useStore.getState().runStartBolt.isZero()).toBe(true);
    expect(useStore.getState().runStartAlloy.isZero()).toBe(true);
  });

  test('撤退: runStartBolt リセット後も 獲得 bolt は差分を維持', async () => {
    useStore.setState({ bolt: BigNum.fromNumber(200), alloy: BigNum.fromNumber(80) });
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    await act(async () => {
      useStore.getState().addBolt(BigNum.fromNumber(7));
      useStore.getState().addAlloy(BigNum.fromNumber(3));
    });

    renderPage();

    const pauseBtn = screen.getByRole('button', { name: '一時停止 (メニューを開く)' });
    await act(async () => {
      fireEvent.click(pauseBtn);
    });
    const retreatBtn = screen.getByRole('button', { name: '撤退' });
    await act(async () => {
      fireEvent.click(retreatBtn);
    });
    const confirmBtn = screen.getByRole('button', { name: '撤退する' });
    await act(async () => {
      fireEvent.click(confirmBtn);
    });

    expect(screen.getByRole('img', { name: 'bolt 7' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'alloy 3' })).toBeInTheDocument();
    expect(useStore.getState().runStartBolt.isZero()).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// SE 配線テスト
// ---------------------------------------------------------------------------

describe('SE 配線', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    useStore.getState().endRun();
    vi.clearAllMocks();
  });

  test('gameover 時に resultGameOver SE が再生される', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    expect(soundEngine.play).toHaveBeenCalledWith('resultGameOver');
  });

  test('メニューを開くと dialogOpen SE が再生される', () => {
    renderPage();
    // aria-label は「一時停止 (メニューを開く)」
    const pauseBtn = screen.getByRole('button', { name: '一時停止 (メニューを開く)' });
    fireEvent.click(pauseBtn);
    expect(soundEngine.play).toHaveBeenCalledWith('dialogOpen');
  });

  test('メニューを閉じると dialogClose SE が再生される', () => {
    renderPage();
    // 開く
    const pauseBtn = screen.getByRole('button', { name: '一時停止 (メニューを開く)' });
    fireEvent.click(pauseBtn);
    vi.clearAllMocks();
    // 閉じる: aria-label は「再開 (メニューを閉じる)」
    const closeBtn = screen.getByRole('button', { name: '再開 (メニューを閉じる)' });
    fireEvent.click(closeBtn);
    expect(soundEngine.play).toHaveBeenCalledWith('dialogClose');
  });

  test('gameover 時に resultClear SE は再生されない', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    renderPage();

    await act(async () => {
      useStore.setState({ machineHp: BigNum.ZERO });
    });

    // gameover → resultGameOver が鳴り、resultClear は鳴らない
    expect(soundEngine.play).toHaveBeenCalledWith('resultGameOver');
    expect(soundEngine.play).not.toHaveBeenCalledWith('resultClear');
  });
});

// ---------------------------------------------------------------------------
// MachineHitFx 配線 (machineHp 減少フレームで machineHitKey が +1) — Refs #81
// ---------------------------------------------------------------------------

describe('MachineHitFx 配線 — machineHp 変化検知 (Refs #81)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().endRun();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * BattleField 内の MachineHitFx インスタンス数を返す。
   * Issue #87 で <style> 動的注入を廃止したため、 --mhf-x CSS 変数を持つ
   * aria-hidden な div の数で判定する。
   */
  function countMachineHitFxStyles(container: HTMLElement): number {
    return container.querySelectorAll('[aria-hidden="true"][style*="--mhf-x"]').length;
  }

  test('machineHp 減少 (100 → 90) で MachineHitFx がマウントされる', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });

    const { container } = renderPage();

    // 初期状態: MachineHitFx は未マウント (machineHitKey=0)
    expect(countMachineHitFxStyles(container)).toBe(0);

    // HP を 90 に減らす
    await act(async () => {
      useStore.setState({ machineHp: BigNum.fromNumber(90) });
    });

    // MachineHitFx が新たにマウントされる (machineHitKey=1 → BattleField が Fx をレンダリング)
    expect(countMachineHitFxStyles(container)).toBeGreaterThan(0);
  });

  test('machineHp 回復 (50 → 60) では MachineHitFx は新たにマウントされない', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    // HP を 50 に設定してから renderPage
    await act(async () => {
      useStore.setState({ machineHp: BigNum.fromNumber(50) });
    });

    const { container } = renderPage();

    // setMachineHp の初回 effect で 1 回マウントされる可能性 (initialHp=baseMaxHp → 50 で減少扱い)
    // のため、 初期マウント直後の Fx 数を baseline として記録
    const baselineCount = countMachineHitFxStyles(container);

    // HP を 60 に回復
    await act(async () => {
      useStore.setState({ machineHp: BigNum.fromNumber(60) });
    });

    // 回復では Fx は再マウントされない (machineHitKey は変化しない)
    expect(countMachineHitFxStyles(container)).toBe(baselineCount);
  });

  test('machineHp 同値 (50 → 50) では MachineHitFx は再マウントされない', async () => {
    useStore.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    await act(async () => {
      useStore.setState({ machineHp: BigNum.fromNumber(50) });
    });

    const { container } = renderPage();
    const baselineCount = countMachineHitFxStyles(container);

    // 同値で再 set (BigNum を新規生成して参照を変える)
    await act(async () => {
      useStore.setState({ machineHp: BigNum.fromNumber(50) });
    });

    expect(countMachineHitFxStyles(container)).toBe(baselineCount);
  });
});
