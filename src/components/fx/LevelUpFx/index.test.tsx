import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { LevelUpFx } from './index';

const defaultProps = {
  x: 50,
  y: 50,
};

describe('LevelUpFx', () => {
  test('レンダリングする（クラッシュしない）', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    expect(container.firstChild).not.toBeNull();
  });

  test('style タグが生成されてアニメーション CSS を含む', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl).not.toBeNull();
    expect(styleEl?.textContent).toContain('@keyframes');
    expect(styleEl?.textContent).toContain('animation');
  });

  test('burst と spark の keyframe が生成される', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('burst');
    expect(styleEl?.textContent).toContain('spark');
  });

  test('prefers-reduced-motion 対応 CSS が含まれる', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('prefers-reduced-motion');
  });

  test('--c-primary-hi カラートークンが使われる', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('var(--c-primary-hi)');
  });

  test('グロートークン (--glow-cyan-md) が使われる', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('var(--glow-cyan-md)');
  });

  test('duration props が CSS animation-duration に反映される', () => {
    const { container } = render(
      <LevelUpFx
        {...defaultProps}
        duration={900}
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('900ms');
  });

  test('デフォルト duration 600ms が使われる', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('600ms');
  });

  test('x/y 座標がラッパーの left/top に反映される', () => {
    const { container } = render(
      <LevelUpFx
        x={30}
        y={70}
      />
    );
    const wrapper = container.querySelector('[style]');
    expect(wrapper).not.toBeNull();
    const style = (wrapper as HTMLElement).style;
    expect(style.left).toBe('30%');
    expect(style.top).toBe('70%');
  });

  test('8 方向のスパーク要素が生成される', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const sparks = container.querySelectorAll('[class*="-s"]');
    // 8 方向 (0, 45, 90, 135, 180, 225, 270, 315)
    expect(sparks.length).toBeGreaterThanOrEqual(8);
  });

  test('バーストとスパーク両方の要素が存在する', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const burst = container.querySelector('[class*="-b"]');
    expect(burst).not.toBeNull();
  });

  test('onDone が animationend 時に呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <LevelUpFx
        {...defaultProps}
        onDone={onDone}
      />
    );
    const wrapper = container.querySelector('[style]');
    expect(wrapper).not.toBeNull();
    wrapper?.dispatchEvent(new Event('animationend', { bubbles: true }));
    expect(onDone).toHaveBeenCalledOnce();
  });

  test('pointer-events: none が設定される（クリック貫通）', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('pointer-events: none');
  });

  test('複数インスタンスで一意な id が生成される', () => {
    const { container: c1 } = render(<LevelUpFx {...defaultProps} />);
    const { container: c2 } = render(<LevelUpFx {...defaultProps} />);
    const style1 = c1.querySelector('style')?.textContent ?? '';
    const style2 = c2.querySelector('style')?.textContent ?? '';
    const nameMatch1 = style1.match(/@keyframes (lvl-[^\s-]+)-burst/);
    const nameMatch2 = style2.match(/@keyframes (lvl-[^\s-]+)-burst/);
    expect(nameMatch1).not.toBeNull();
    expect(nameMatch2).not.toBeNull();
    expect(nameMatch1?.[1]).not.toBe(nameMatch2?.[1]);
  });

  test('position: absolute が設定される', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('position: absolute');
  });
});

describe('LevelUpFx — アクセシビリティ', () => {
  test('演出要素は pointer-events: none で操作不能', () => {
    const { container } = render(<LevelUpFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('pointer-events: none');
  });
});

// 型チェック用のコンパイルタイムテスト
test('TypeScript 型チェック: 全 props を渡せる', () => {
  const { container } = render(
    <LevelUpFx
      x={50}
      y={50}
      duration={600}
      onDone={() => void 0}
    />
  );
  expect(container.firstChild).not.toBeNull();
});
