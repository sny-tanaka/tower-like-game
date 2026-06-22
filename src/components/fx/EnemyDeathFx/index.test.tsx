import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { EnemyDeathFx } from './index';

describe('EnemyDeathFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <EnemyDeathFx
        x={50}
        y={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('8 つのシャード要素が生成される', () => {
    const { container } = render(
      <EnemyDeathFx
        x={50}
        y={50}
      />
    );
    // wrap div の中に flash (1) + shards (8) = 9 children
    const wrap = container.querySelector<HTMLElement>('div');
    expect(wrap?.children.length).toBe(9);
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <EnemyDeathFx
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

  test('prefers-reduced-motion スタイルが含まれる', () => {
    const { container } = render(
      <EnemyDeathFx
        x={50}
        y={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
