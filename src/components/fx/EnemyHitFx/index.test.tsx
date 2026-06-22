import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { EnemyHitFx } from './index';

describe('EnemyHitFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <EnemyHitFx
        x={50}
        y={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('left/top スタイルに x/y % が反映される', () => {
    const { container } = render(
      <EnemyHitFx
        x={30}
        y={70}
      />
    );
    const wrap = container.querySelector<HTMLElement>('div');
    expect(wrap?.style.left).toBe('30%');
    expect(wrap?.style.top).toBe('70%');
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <EnemyHitFx
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

  test('prefers-reduced-motion スタイルが style タグに含まれる', () => {
    const { container } = render(
      <EnemyHitFx
        x={50}
        y={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
