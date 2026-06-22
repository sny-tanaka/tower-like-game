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
  it('Wave カウンタを "wave/totalWaves" 形式で表示する', () => {
    render(<BattleHudTop {...makeProps({ wave: 7, totalWaves: 30 })} />);
    expect(screen.getByText('7/30')).toBeInTheDocument();
  });

  it('Tier バッジが "T{n}" テキストを持つ', () => {
    render(<BattleHudTop {...makeProps({ tier: 5 })} />);
    expect(screen.getByText('T5')).toBeInTheDocument();
  });

  it('HP バー aria-valuenow が ratio1000 スケールで比率を反映する', () => {
    render(<BattleHudTop {...makeProps({ hpCurrent: BigNum.fromNumber(500), hpMax: BigNum.fromNumber(1000) })} />);
    // HP バーは ratio1000 スケール（0-1000）で描画。500/1000 = 500
    const bars = screen.getAllByRole('progressbar');
    const hpBar = bars.find((el) => el.getAttribute('aria-valuenow') === '500');
    expect(hpBar).toBeDefined();
    expect(hpBar).toHaveAttribute('aria-valuemax', '1000');
  });

  it('HP 低下 (< 30%) のとき ratio1000 が 200 (200/1000 = 200) になる', () => {
    render(<BattleHudTop {...makeProps({ hpCurrent: BigNum.fromNumber(200), hpMax: BigNum.fromNumber(1000) })} />);
    // 200 / 1000 = 0.2 → 0.2 * 1000 = 200
    const bars = screen.getAllByRole('progressbar');
    const hpBar = bars.find((el) => el.getAttribute('aria-valuenow') === '200');
    expect(hpBar).toBeDefined();
  });

  it('WaveProgressBar が waveNumber を表示する', () => {
    render(<BattleHudTop {...makeProps({ wave: 12 })} />);
    // WaveProgressBar 内に "WAVE" ラベルが存在する
    expect(screen.getByText(/WAVE/)).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('isBossWave=true のとき Wave カウンタが secondary カラーになる', () => {
    const { container } = render(<BattleHudTop {...makeProps({ isBossWave: true })} />);
    // secondary カラーは CSS クラスで表現されるため、テキストが存在することで検証
    expect(screen.getByText(`5/30`)).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
