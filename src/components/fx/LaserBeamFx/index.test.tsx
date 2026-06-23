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
    const beam = container.querySelector<HTMLElement>('div');
    if (beam) {
      fireEvent.animationEnd(beam);
    }
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('x1/y1 の left/top が style タグに反映される', () => {
    const { container } = render(
      <LaserBeamFx
        x1={20}
        y1={30}
        x2={80}
        y2={70}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('left: 20%');
    expect(style?.textContent).toContain('top: 30%');
  });

  test('prefers-reduced-motion スタイルが含まれる', () => {
    const { container } = render(
      <LaserBeamFx
        x1={10}
        y1={50}
        x2={90}
        y2={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
