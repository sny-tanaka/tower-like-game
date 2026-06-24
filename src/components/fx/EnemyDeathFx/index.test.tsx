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
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.children.length).toBe(9);
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
    const wrap = container.firstChild as HTMLElement;
    fireEvent.animationEnd(wrap);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(
      <EnemyDeathFx
        x={50}
        y={50}
      />
    );
    expect(container.querySelector('style')).toBeNull();
  });
});
