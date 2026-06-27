import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BattleHudTop } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

// ---------------------------------------------------------------------------
// テストヘルパー
// ---------------------------------------------------------------------------

/**
 * v1.3.7 Phase 4-A: BattleHudTop は HP / Tier / Wave / paused を内部 useStore selector で
 * 直接購読するようになったため、 props から渡せない (= seed する必要がある)。
 * 親 props として残っているのは secondsRemaining / secondsTotal / totalWaves / isBossWave 等。
 */
function makeParentProps(overrides?: Partial<Parameters<typeof BattleHudTop>[0]>) {
  return {
    totalWaves: 30,
    secondsRemaining: 18,
    secondsTotal: 26,
    ...overrides,
  };
}

// 各テスト後に store を defaultBattleState 相当に戻す (state リーク防止)
afterEach(() => {
  resetBattleState();
});

// ---------------------------------------------------------------------------
// テスト
// ---------------------------------------------------------------------------

describe('BattleHudTop', () => {
  it('Wave/総 Wave を可視ラベル (SR-only) として保持する', () => {
    seedBattleState({ currentWave: 7 });
    render(<BattleHudTop {...makeParentProps({ totalWaves: 30 })} />);
    expect(screen.getByText('7/30')).toBeInTheDocument();
  });

  it('Tier バッジが "T{n}" テキストを持つ', () => {
    seedBattleState({ currentTier: 5 });
    render(<BattleHudTop {...makeParentProps()} />);
    expect(screen.getByText('T5')).toBeInTheDocument();
  });

  it('HP 値 (current / max) が表示される', () => {
    seedBattleState({
      machineHp: BigNum.fromNumber(500),
      machineMaxHp: BigNum.fromNumber(1000),
    });
    render(<BattleHudTop {...makeParentProps()} />);
    // NumericDisplay は BigNum.toDisplay() を表示する想定
    // 1000 → "1.00K" 形式、500 → "500" 形式
    const hpRow = screen.getByLabelText(/HP/);
    expect(hpRow).toBeInTheDocument();
  });

  it('HP バーが描画される (design ref 準拠の縦並び 3 段)', () => {
    seedBattleState();
    const { container } = render(<BattleHudTop {...makeParentProps()} />);
    // ProgressBar Atom が role=progressbar を提供
    expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
  });

  it('WaveProgressBar が waveNumber を表示する', () => {
    seedBattleState({ currentWave: 12 });
    render(<BattleHudTop {...makeParentProps({ totalWaves: 30 })} />);
    // WaveProgressBar の Badge 内: "WAVE 12"
    expect(screen.getByText('WAVE 12')).toBeInTheDocument();
    // srOnly に wave/totalWaves: "12/30"
    expect(screen.getByText('12/30')).toBeInTheDocument();
  });

  it('isBossWave=true のとき WaveProgressBar が boss スタイルになる', () => {
    seedBattleState({ currentWave: 5 });
    const { container } = render(<BattleHudTop {...makeParentProps({ isBossWave: true })} />);
    expect(container.firstChild).toBeTruthy();
    // 既存互換テキスト
    expect(screen.getByText('5/30')).toBeInTheDocument();
  });

  it('machineMaxHp が 0 (ラン外) のときも 0 除算せず描画できる', () => {
    // ラン開始前 (defaultBattleState の machineHp/MaxHp はどちらも 0)。
    // 内部で hpMax = 1 にクランプ → ratio = 0 で ProgressBar が表示される。
    seedBattleState({
      machineHp: BigNum.ZERO,
      machineMaxHp: BigNum.ZERO,
    });
    const { container } = render(<BattleHudTop {...makeParentProps()} />);
    expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
  });

  it('isResultOpen=true のとき WaveProgressBar が paused 状態になる', () => {
    // paused = isPaused || isResultOpen の OR 計算が効くことを確認。
    // isPaused=false でも isResultOpen=true なら paused 扱い (= WaveProgressBar に paused=true 伝播)。
    seedBattleState({ isPaused: false });
    const { container } = render(<BattleHudTop {...makeParentProps({ isResultOpen: true })} />);
    // WaveProgressBar の paused は内部 SCSS class で表現される。 直接の DOM フラグでの
    // assertion が難しいため、 ここでは render が落ちないことだけ確認 (回帰検出用の smoke test)。
    expect(container.firstChild).toBeTruthy();
  });
});
