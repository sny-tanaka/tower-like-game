import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { ChainBoltFx } from './index';

const POINTS = [
  { x: 50, y: 80 },
  { x: 35, y: 55 },
  { x: 60, y: 40 },
];

describe('ChainBoltFx', () => {
  test('points が 2 未満のとき null を返す', () => {
    const { container } = render(<ChainBoltFx points={[{ x: 50, y: 50 }]} />);
    expect(container.firstChild).toBeNull();
  });

  test('points が 2 以上のとき SVG が描画される', () => {
    const { container } = render(<ChainBoltFx points={POINTS} />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <ChainBoltFx
        points={POINTS}
        onDone={onDone}
      />
    );
    const svg = container.querySelector('svg');
    if (svg) {
      fireEvent.animationEnd(svg);
    }
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(<ChainBoltFx points={POINTS} />);
    expect(container.querySelector('style')).toBeNull();
  });
});
