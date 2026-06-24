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
    const beam = container.firstChild as HTMLElement;
    fireEvent.animationEnd(beam);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('angle が CSS 変数 (--mb-angle) に反映される', () => {
    const { container } = render(
      <MegaBeamFx
        x={50}
        y={50}
        angle={45}
      />
    );
    const beam = container.firstChild as HTMLElement;
    expect(beam.style.getPropertyValue('--mb-angle')).toBe('45deg');
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(
      <MegaBeamFx
        x={50}
        y={50}
      />
    );
    expect(container.querySelector('style')).toBeNull();
  });
});
