import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { MegaBeamFx } from './index';

describe('MegaBeamFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <MegaBeamFx
        x={50}
        y={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <MegaBeamFx
        x={50}
        y={50}
        onDone={onDone}
      />
    );
    const beam = container.querySelector<HTMLElement>('div');
    if (beam) {
      fireEvent.animationEnd(beam);
    }
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('angle が style タグの keyframes に反映される', () => {
    const { container } = render(
      <MegaBeamFx
        x={50}
        y={50}
        angle={45}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('rotate(45deg)');
  });

  test('prefers-reduced-motion スタイルが含まれる', () => {
    const { container } = render(
      <MegaBeamFx
        x={50}
        y={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
