import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { WaveProgressBar } from './index';

const defaultProps = {
  waveNumber: 3,
  secondsLeft: 45,
  secondsMax: 60,
};

describe('WaveProgressBar', () => {
  test('Wave 番号が描画される', () => {
    render(<WaveProgressBar {...defaultProps} />);
    // "WAVE" ラベルと数値 "3" が表示される
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('残り秒数が描画される', () => {
    render(<WaveProgressBar {...defaultProps} />);
    expect(screen.getByText('45s')).toBeInTheDocument();
  });

  test('progressbar の aria-valuenow が secondsLeft', () => {
    render(<WaveProgressBar {...defaultProps} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '45');
  });

  test('progressbar の aria-valuemax が secondsMax', () => {
    render(<WaveProgressBar {...defaultProps} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuemax', '60');
  });

  test('nextMilestone なしのとき boss クラスが付かない', () => {
    const { container } = render(<WaveProgressBar {...defaultProps} />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toMatch(/\bboss\b/);
  });

  test('nextMilestone.kind="boss" のとき boss クラスが付く', () => {
    const { container } = render(
      <WaveProgressBar
        {...defaultProps}
        nextMilestone={{ wave: 10, kind: 'boss' }}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/boss/);
  });

  test('nextMilestone が表示される (elite)', () => {
    render(
      <WaveProgressBar
        {...defaultProps}
        nextMilestone={{ wave: 5, kind: 'elite' }}
      />
    );
    expect(screen.getByText(/ELITE/)).toBeInTheDocument();
  });

  test('nextMilestone が表示される (tier-up)', () => {
    render(
      <WaveProgressBar
        {...defaultProps}
        nextMilestone={{ wave: 15, kind: 'tier-up' }}
      />
    );
    expect(screen.getByText(/TIER UP/)).toBeInTheDocument();
  });

  test('showSeconds=false のとき秒数が描画されない', () => {
    render(
      <WaveProgressBar
        {...defaultProps}
        showSeconds={false}
      />
    );
    expect(screen.queryByText('45s')).toBeNull();
  });

  test('secondsMax=0 のときクラッシュしない（max=1 にクランプ）', () => {
    expect(() =>
      render(
        <WaveProgressBar
          waveNumber={1}
          secondsLeft={0}
          secondsMax={0}
        />
      )
    ).not.toThrow();
  });
});
