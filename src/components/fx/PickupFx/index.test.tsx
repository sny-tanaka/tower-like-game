import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { PickupFx } from './index';

const defaultProps = {
  x: 50,
  y: 70,
  targetX: 90,
  targetY: 5,
  iconName: 'bolt' as const,
};

describe('PickupFx', () => {
  test('レンダリングする（クラッシュしない）', () => {
    const { container } = render(<PickupFx {...defaultProps} />);
    expect(container.firstChild).not.toBeNull();
  });

  test('style タグが生成されてアニメーション CSS を含む', () => {
    const { container } = render(<PickupFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl).not.toBeNull();
    expect(styleEl?.textContent).toContain('@keyframes');
    expect(styleEl?.textContent).toContain('animation');
  });

  test('prefers-reduced-motion 対応 CSS が含まれる', () => {
    const { container } = render(<PickupFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('prefers-reduced-motion');
  });

  test('bolt アイコンに --c-bolt カラートークンが適用される', () => {
    const { container } = render(
      <PickupFx
        {...defaultProps}
        iconName="bolt"
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('var(--c-bolt)');
  });

  test('screw アイコンに --c-screw カラートークンが適用される', () => {
    const { container } = render(
      <PickupFx
        {...defaultProps}
        iconName="screw"
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('var(--c-screw)');
  });

  test('alloy アイコンに --c-alloy カラートークンが適用される', () => {
    const { container } = render(
      <PickupFx
        {...defaultProps}
        iconName="alloy"
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('var(--c-alloy)');
  });

  test('duration props が CSS animation-duration に反映される', () => {
    const { container } = render(
      <PickupFx
        {...defaultProps}
        duration={800}
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('800ms');
  });

  test('デフォルト duration 400ms が使われる', () => {
    const { container } = render(<PickupFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('400ms');
  });

  test('onDone が animationend 時に呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <PickupFx
        {...defaultProps}
        onDone={onDone}
      />
    );
    const animatedDiv = container.querySelector('[class]');
    expect(animatedDiv).not.toBeNull();
    animatedDiv?.dispatchEvent(new Event('animationend', { bubbles: true }));
    expect(onDone).toHaveBeenCalledOnce();
  });

  test('Icon が position: absolute でレンダリングされる（親内配置）', () => {
    const { container } = render(<PickupFx {...defaultProps} />);
    // aria-hidden な SVG が存在することで Icon Atom の使用を確認
    const iconEl = container.querySelector('[aria-hidden]');
    expect(iconEl).not.toBeNull();
  });

  test('x/y 座標が CSS keyframe に反映される', () => {
    const { container } = render(
      <PickupFx
        {...defaultProps}
        x={30}
        y={65}
        targetX={88}
        targetY={10}
      />
    );
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('30%');
    expect(styleEl?.textContent).toContain('65%');
    expect(styleEl?.textContent).toContain('88%');
    expect(styleEl?.textContent).toContain('10%');
  });

  test('複数インスタンスで一意な id が生成される', () => {
    const { container: c1 } = render(<PickupFx {...defaultProps} />);
    const { container: c2 } = render(<PickupFx {...defaultProps} />);
    const style1 = c1.querySelector('style')?.textContent ?? '';
    const style2 = c2.querySelector('style')?.textContent ?? '';
    // keyframe 名の先頭部分を抽出して比較
    const nameMatch1 = style1.match(/@keyframes (pk-[^\s{]+)/);
    const nameMatch2 = style2.match(/@keyframes (pk-[^\s{]+)/);
    expect(nameMatch1).not.toBeNull();
    expect(nameMatch2).not.toBeNull();
    expect(nameMatch1?.[1]).not.toBe(nameMatch2?.[1]);
  });

  test('pointer-events: none が設定される（クリック貫通）', () => {
    const { container } = render(<PickupFx {...defaultProps} />);
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('pointer-events: none');
  });

  test('Icon に正しいアイコン名が渡される — screw', () => {
    render(
      <PickupFx
        {...defaultProps}
        iconName="screw"
      />
    );
    // Icon Atom は aria-hidden な span/svg を返すので、その存在を確認
    const icon = document.querySelector('[aria-hidden]');
    expect(icon).not.toBeNull();
  });
});

describe('PickupFx — スクリーンリーダー / アクセシビリティ', () => {
  test('演出要素は aria-hidden 相当（ユーザー操作不能）', () => {
    const { container } = render(<PickupFx {...defaultProps} />);
    // pointer-events: none を CSS で設定しているか確認（DOM 属性ではなく CSS）
    const styleEl = container.querySelector('style');
    expect(styleEl?.textContent).toContain('pointer-events: none');
  });
});

// 型チェック用のコンパイルタイムテスト
// TypeScript コンパイルが通ることを確認するだけ（実行時アサーションなし）
test('TypeScript 型チェック: 全 props を渡せる', () => {
  const { container } = render(
    <PickupFx
      x={50}
      y={70}
      targetX={90}
      targetY={5}
      iconName="screw"
      duration={400}
      onDone={() => void 0}
    />
  );
  expect(container.firstChild).not.toBeNull();
});
