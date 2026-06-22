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
    const wrap = container.querySelector<HTMLElement>('div');
    if (wrap) {
      fireEvent.animationEnd(wrap);
    }
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('radius が style タグに反映される', () => {
    const { container } = render(
      <BlastFx
        x={50}
        y={50}
        radius={20}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('40vmin');
  });

  test('prefers-reduced-motion スタイルが含まれる', () => {
    const { container } = render(
      <BlastFx
        x={50}
        y={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
