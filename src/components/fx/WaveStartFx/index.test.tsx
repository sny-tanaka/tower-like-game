import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { WaveStartFx } from './index';

describe('WaveStartFx', () => {
  test('ウェーブ番号が描画される', () => {
    render(<WaveStartFx waveNumber={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('"WAVE" ラベルが描画される', () => {
    render(<WaveStartFx waveNumber={1} />);
    expect(screen.getByText('WAVE')).toBeInTheDocument();
  });

  test('3 桁のウェーブ番号も描画される', () => {
    render(<WaveStartFx waveNumber={100} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('duration が CSS に反映される', () => {
    const { container } = render(
      <WaveStartFx
        waveNumber={1}
        duration={800}
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('800ms');
  });

  test('pointer-events: none を持つ', () => {
    const { container } = render(<WaveStartFx waveNumber={1} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('pointer-events: none');
  });

  test('prefers-reduced-motion: reduce 対応の media query が含まれる', () => {
    const { container } = render(<WaveStartFx waveNumber={1} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('prefers-reduced-motion');
  });

  test('z-index: var(--z-fx-field) が設定される', () => {
    const { container } = render(<WaveStartFx waveNumber={1} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.innerHTML).toContain('var(--z-fx-field)');
  });

  test('onDone は渡せる（クラッシュしない）', () => {
    const onDone = vi.fn();
    expect(() =>
      render(
        <WaveStartFx
          waveNumber={1}
          onDone={onDone}
        />
      )
    ).not.toThrow();
  });
});
