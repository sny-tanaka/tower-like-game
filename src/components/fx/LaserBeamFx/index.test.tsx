import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { LaserBeamFx } from './index';

describe('LaserBeamFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <LaserBeamFx
        x1={10}
        y1={50}
        x2={90}
        y2={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <LaserBeamFx
        x1={10}
        y1={50}
        x2={90}
        y2={50}
        onDone={onDone}
      />
    );
    const beam = container.firstChild as HTMLElement;
    fireEvent.animationEnd(beam);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('x1/y1 が CSS 変数 (--beam-x / --beam-y) に反映される', () => {
    const { container } = render(
      <LaserBeamFx
        x1={20}
        y1={30}
        x2={80}
        y2={70}
      />
    );
    const beam = container.firstChild as HTMLElement;
    expect(beam.style.getPropertyValue('--beam-x')).toBe('20%');
    expect(beam.style.getPropertyValue('--beam-y')).toBe('30%');
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(
      <LaserBeamFx
        x1={10}
        y1={50}
        x2={90}
        y2={50}
      />
    );
    expect(container.querySelector('style')).toBeNull();
  });
});
