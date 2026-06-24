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

  test('duration が CSS 変数 (--wv-duration) に反映される', () => {
    const { container } = render(
      <WaveStartFx
        waveNumber={1}
        duration={800}
      />
    );
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--wv-duration')).toBe('800ms');
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

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(<WaveStartFx waveNumber={1} />);
    expect(container.querySelector('style')).toBeNull();
  });
});
