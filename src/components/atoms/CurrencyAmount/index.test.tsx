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
    // 1234 は toDisplay() で "1.23A" に変換される (小数 2 桁固定)
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

  it('ranked="S" のときスタンプ "S" がレンダリングされる', () => {
    const { container } = render(
      <CurrencyAmount
        currency="bolt"
        value={1000}
        ranked="S"
      />
    );
    const stamp = container.querySelector('[data-rank]');
    expect(stamp).toBeTruthy();
    expect(stamp?.getAttribute('data-rank')).toBe('S');
    expect(stamp?.textContent).toBe('S');
  });

  it('ranked が未指定のときスタンプは描画されない', () => {
    const { container } = render(
      <CurrencyAmount
        currency="bolt"
        value={1000}
      />
    );
    expect(container.querySelector('[data-rank]')).toBeNull();
  });

  it('ranked="" 空文字のときスタンプは描画されない', () => {
    const { container } = render(
      <CurrencyAmount
        currency="bolt"
        value={1000}
        ranked=""
      />
    );
    expect(container.querySelector('[data-rank]')).toBeNull();
  });

  it('showLabel=true のとき通貨ラベルが描画される', () => {
    const { container } = render(
      <CurrencyAmount
        currency="alloy"
        value={1}
        showLabel
      />
    );
    expect(container.textContent).toContain('alloy');
  });

  it('subtle=true のとき root に subtle クラスが付く', () => {
    const { container } = render(
      <CurrencyAmount
        currency="screw"
        value={1}
        subtle
      />
    );
    const root = container.querySelector('[role="img"]');
    expect(root?.className).toMatch(/subtle/);
  });

  it('align="end" でも role="img" が描画される', () => {
    const { container } = render(
      <CurrencyAmount
        currency="bolt"
        value={1}
        align="end"
      />
    );
    expect(container.querySelector('[role="img"]')).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // v1.3.7 Phase 5: memo + 数値同値スキップ (BigNum 表示量子化)
  // -------------------------------------------------------------------------
  describe('memo + BigNum.eq による re-render スキップ', () => {
    it('value が同一参照 BigNum なら同じ DOM を保持する', () => {
      const value = BigNum.fromNumber(1234);
      const { container, rerender } = render(
        <CurrencyAmount
          currency="screw"
          value={value}
        />
      );
      const firstHtml = container.innerHTML;
      // 同じ value を再渡し
      rerender(
        <CurrencyAmount
          currency="screw"
          value={value}
        />
      );
      expect(container.innerHTML).toBe(firstHtml);
    });

    it('別インスタンスでも数値が同値なら DOM が変わらない (= memo がスキップ)', () => {
      const v1 = BigNum.fromNumber(1234);
      const v2 = BigNum.fromNumber(1234);
      const { container, rerender } = render(
        <CurrencyAmount
          currency="screw"
          value={v1}
        />
      );
      const firstHtml = container.innerHTML;
      rerender(
        <CurrencyAmount
          currency="screw"
          value={v2}
        />
      );
      // 表示は同じ (1.23A) で DOM 構造は変わらない
      expect(container.innerHTML).toBe(firstHtml);
    });

    it('数値が変わるとき DOM (aria-label) が更新される', () => {
      const { container, rerender } = render(
        <CurrencyAmount
          currency="screw"
          value={BigNum.fromNumber(1234)}
        />
      );
      const first = container.querySelector('[role="img"]')?.getAttribute('aria-label') ?? '';
      rerender(
        <CurrencyAmount
          currency="screw"
          value={BigNum.fromNumber(2345)}
        />
      );
      const second = container.querySelector('[role="img"]')?.getAttribute('aria-label') ?? '';
      expect(first).not.toBe(second);
      expect(second).toContain('2.34A');
    });
  });
});
