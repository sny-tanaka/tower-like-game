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

  test('CSS 変数 (--hit-x / --hit-y) に x/y % が反映される', () => {
    const { container } = render(
      <EnemyHitFx
        x={30}
        y={70}
      />
    );
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--hit-x')).toBe('30%');
    expect(wrap.style.getPropertyValue('--hit-y')).toBe('70%');
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
    const wrap = container.firstChild as HTMLElement;
    fireEvent.animationEnd(wrap);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(
      <EnemyHitFx
        x={50}
        y={50}
      />
    );
    expect(container.querySelector('style')).toBeNull();
  });
});
