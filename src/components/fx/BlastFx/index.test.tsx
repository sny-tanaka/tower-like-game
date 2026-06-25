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

  test('radius が CSS 変数 (--blast-size = radius*2 %) に反映される', () => {
    // v1.1.2: 単位を vmin → % に変更 (親 .field の % に対する直径)。
    // これでフィールド % 半径 (= 敵 position と同系) で動作し、 ダメージ判定と完全同期する。
    const { container } = render(
      <BlastFx
        x={50}
        y={50}
        radius={20}
      />
    );
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--blast-size')).toBe('40%');
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
