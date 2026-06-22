import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { WaveProgressBar } from './index';

const defaultProps = {
  currentWave: 3,
  totalWaves: 10,
  secondsRemaining: 45,
  secondsTotal: 60,
};

describe('WaveProgressBar', () => {
  test('Wave 番号が描画される', () => {
    render(<WaveProgressBar {...defaultProps} />);
    expect(screen.getByText('Wave 3')).toBeInTheDocument();
  });

  test('進行テキスト "3 / 10" が描画される', () => {
    render(<WaveProgressBar {...defaultProps} />);
    expect(screen.getByText('3 / 10')).toBeInTheDocument();
  });

  test('残り秒数が描画される', () => {
    render(<WaveProgressBar {...defaultProps} />);
    expect(screen.getByText('45s')).toBeInTheDocument();
  });

  test('progressbar の aria-valuenow が secondsRemaining', () => {
    render(<WaveProgressBar {...defaultProps} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '45');
  });

  test('progressbar の aria-valuemax が secondsTotal', () => {
    render(<WaveProgressBar {...defaultProps} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuemax', '60');
  });

  test('isBossWave=false のとき bossWave クラスが付かない', () => {
    const { container } = render(
      <WaveProgressBar
        {...defaultProps}
        isBossWave={false}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toMatch(/bossWave/);
  });

  test('isBossWave=true のとき bossWave クラスが付く', () => {
    const { container } = render(
      <WaveProgressBar
        {...defaultProps}
        isBossWave={true}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/bossWave/);
  });

  test('isBossWave=true のとき "Wave 5" が boss バッジとして表示される', () => {
    render(
      <WaveProgressBar
        currentWave={5}
        totalWaves={10}
        secondsRemaining={30}
        secondsTotal={90}
        isBossWave={true}
      />
    );
    expect(screen.getByText('Wave 5')).toBeInTheDocument();
  });

  test('secondsTotal=0 のときクラッシュしない（max=1 にクランプ）', () => {
    expect(() =>
      render(
        <WaveProgressBar
          currentWave={1}
          totalWaves={5}
          secondsRemaining={0}
          secondsTotal={0}
        />
      )
    ).not.toThrow();
  });
});
