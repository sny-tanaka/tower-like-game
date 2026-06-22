import { render } from '@testing-library/react';

import { CurrencyAmount } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

describe('CurrencyAmount', () => {
  it('screw 通貨でレンダリングされる', () => {
    const { container } = render(
      <CurrencyAmount
        currency="screw"
        value={1234}
      />
    );
    expect(container.querySelector('[role="img"]')).toBeTruthy();
  });

  it('bolt 通貨でレンダリングされる', () => {
    const { container } = render(
      <CurrencyAmount
        currency="bolt"
        value={1234}
      />
    );
    expect(container.querySelector('[role="img"]')).toBeTruthy();
  });

  it('alloy 通貨でレンダリングされる', () => {
    const { container } = render(
      <CurrencyAmount
        currency="alloy"
        value={1234}
      />
    );
    expect(container.querySelector('[role="img"]')).toBeTruthy();
  });

  it('aria-label に通貨名と値（toDisplay 形式）が含まれる', () => {
    const { container } = render(
      <CurrencyAmount
        currency="screw"
        value={1234}
      />
    );
    const el = container.querySelector('[role="img"]')!;
    const label = el.getAttribute('aria-label') ?? '';
    expect(label).toContain('screw');
    // 1234 は toDisplay() で "1.23A" に変換される
    expect(label).toContain('1.23A');
  });

  it('BigNum を渡してもレンダリングされる', () => {
    const { container } = render(
      <CurrencyAmount
        currency="bolt"
        value={BigNum.fromNumber(1_500_000)}
      />
    );
    expect(container.textContent).toContain('1.50B');
  });

  it('delta="+" のとき + プレフィックスが表示される', () => {
    const { container } = render(
      <CurrencyAmount
        currency="screw"
        value={100}
        delta="+"
      />
    );
    expect(container.textContent).toContain('+');
  });

  it('delta="-" のとき - プレフィックスが表示される', () => {
    const { container } = render(
      <CurrencyAmount
        currency="screw"
        value={100}
        delta="-"
      />
    );
    expect(container.textContent).toContain('-');
  });

  it('delta なし のとき +/- プレフィックスが表示されない', () => {
    const { container } = render(
      <CurrencyAmount
        currency="screw"
        value={100}
      />
    );
    // 数値部分に + や - が含まれていないこと（正の数なので）
    const spans = container.querySelectorAll('span');
    // delta span がないことを確認
    let hasDelta = false;
    spans.forEach((span) => {
      if (span.textContent === '+' || span.textContent === '-') {
        hasDelta = true;
      }
    });
    expect(hasDelta).toBe(false);
  });

  it('size prop が渡されてもレンダリングが崩れない', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { container } = render(
        <CurrencyAmount
          currency="bolt"
          value={999}
          size={size}
        />
      );
      expect(container.querySelector('[role="img"]')).toBeTruthy();
    });
  });
});
