import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { BlastFx } from './index';

describe('BlastFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <BlastFx
        x={50}
        y={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <BlastFx
        x={50}
        y={50}
        onDone={onDone}
      />
    );
    const wrap = container.firstChild as HTMLElement;
    fireEvent.animationEnd(wrap);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('radius が CSS 変数 (--blast-size = radius*2 vmin) に反映される', () => {
    const { container } = render(
      <BlastFx
        x={50}
        y={50}
        radius={20}
      />
    );
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--blast-size')).toBe('40vmin');
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(
      <BlastFx
        x={50}
        y={50}
      />
    );
    expect(container.querySelector('style')).toBeNull();
  });
});
