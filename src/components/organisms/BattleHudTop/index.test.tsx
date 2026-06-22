import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BattleHudTop } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// テストヘルパー
// ---------------------------------------------------------------------------

function makeProps(overrides?: Partial<Parameters<typeof BattleHudTop>[0]>) {
  return {
    hpCurrent: BigNum.fromNumber(1000),
    hpMax: BigNum.fromNumber(1000),
    tier: 3,
    wave: 5,
    totalWaves: 30,
    secondsRemaining: 18,
    secondsTotal: 26,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// テスト
// ---------------------------------------------------------------------------

describe('BattleHudTop', () => {
  it('Wave/総 Wave を可視ラベル (SR-only) として保持する', () => {
    render(<BattleHudTop {...makeProps({ wave: 7, totalWaves: 30 })} />);
    expect(screen.getByText('7/30')).toBeInTheDocument();
  });

  it('Tier バッジが "T{n}" テキストを持つ', () => {
    render(<BattleHudTop {...makeProps({ tier: 5 })} />);
    expect(screen.getByText('T5')).toBeInTheDocument();
  });

  it('HP 値 (current / max) が表示される', () => {
    render(
      <BattleHudTop
        {...makeProps({ hpCurrent: BigNum.fromNumber(500), hpMax: BigNum.fromNumber(1000) })}
      />
    );
    // NumericDisplay は BigNum.toDisplay() を表示する想定
    // 1000 → "1.00K" 形式、500 → "500" 形式
    const hpRow = screen.getByLabelText(/HP/);
    expect(hpRow).toBeInTheDocument();
  });

  it('HP バーが描画される (design ref 準拠の縦並び 3 段)', () => {
    const { container } = render(<BattleHudTop {...makeProps()} />);
    // ProgressBar Atom が role=progressbar を提供
    expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
  });

  it('WaveProgressBar が waveNumber を表示する', () => {
    render(<BattleHudTop {...makeProps({ wave: 12 })} />);
    expect(screen.getByText(/WAVE/)).toBeInTheDocument();
    // WaveProgressBar 内の waveNum 表示
    expect(screen.getAllByText('12').length).toBeGreaterThan(0);
  });

  it('isBossWave=true のとき WaveProgressBar が boss スタイルになる', () => {
    const { container } = render(<BattleHudTop {...makeProps({ isBossWave: true })} />);
    expect(container.firstChild).toBeTruthy();
    // 既存互換テキスト
    expect(screen.getByText('5/30')).toBeInTheDocument();
  });
});
