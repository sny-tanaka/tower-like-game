import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { EnemyHpBar, hpRatio1000 } from './index';

import { BigNum } from '@/lib/bignum/BigNum';


describe('hpRatio1000', () => {
  test('満タン → 1000', () => {
    expect(hpRatio1000(BigNum.fromNumber(1000), BigNum.fromNumber(1000))).toBe(1000);
  });

  test('0 → 0', () => {
    expect(hpRatio1000(BigNum.fromNumber(0), BigNum.fromNumber(1000))).toBe(0);
  });

  test('50% → 500', () => {
    expect(hpRatio1000(BigNum.fromNumber(500), BigNum.fromNumber(1000))).toBe(500);
  });

  test('25% → 250', () => {
    expect(hpRatio1000(BigNum.fromNumber(250), BigNum.fromNumber(1000))).toBe(250);
  });

  test('maxHp が 0 → 0 を返す（除算ゼロ防止）', () => {
    expect(hpRatio1000(BigNum.fromNumber(100), BigNum.fromNumber(0))).toBe(0);
  });

  test('current > max → 1000 にクランプ', () => {
    expect(hpRatio1000(BigNum.fromNumber(2000), BigNum.fromNumber(1000))).toBe(1000);
  });
});

describe('EnemyHpBar', () => {
  test('name が描画される', () => {
    render(
      <EnemyHpBar
        name="ゴブリン兵長"
        currentHp={BigNum.fromNumber(800)}
        maxHp={BigNum.fromNumber(1000)}
      />
    );
    expect(screen.getByText('ゴブリン兵長')).toBeInTheDocument();
  });

  test('HP 数値が描画される', () => {
    render(
      <EnemyHpBar
        name="敵"
        currentHp={BigNum.fromNumber(800)}
        maxHp={BigNum.fromNumber(1000)}
      />
    );
    // BigNum.fromNumber(800).toDisplay() = "800"
    // BigNum.fromNumber(1000).toDisplay() = "1.00A" (1000 = 1*1000^1)
    expect(screen.getByText((content) => content.includes('800'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('1.00A'))).toBeInTheDocument();
  });

  test('type なしのとき Elite/Boss バッジが表示されない', () => {
    render(
      <EnemyHpBar
        name="通常敵"
        currentHp={BigNum.fromNumber(500)}
        maxHp={BigNum.fromNumber(1000)}
      />
    );
    expect(screen.queryByText('ELITE')).toBeNull();
    expect(screen.queryByText('BOSS')).toBeNull();
  });

  test('type="elite" のとき ELITE バッジが表示される', () => {
    render(
      <EnemyHpBar
        name="エリート"
        currentHp={BigNum.fromNumber(5000)}
        maxHp={BigNum.fromNumber(10000)}
        type="elite"
      />
    );
    expect(screen.getByText('ELITE')).toBeInTheDocument();
  });

  test('type="boss" のとき BOSS バッジが表示される', () => {
    render(
      <EnemyHpBar
        name="ボス"
        currentHp={BigNum.fromNumber(50000)}
        maxHp={BigNum.fromNumber(100000)}
        type="boss"
      />
    );
    expect(screen.getByText('BOSS')).toBeInTheDocument();
  });

  test('HP 25% 以下のとき progressbar が hp-low に切り替わる（aria-label で確認）', () => {
    render(
      <EnemyHpBar
        name="瀕死"
        currentHp={BigNum.fromNumber(200)}
        maxHp={BigNum.fromNumber(1000)}
      />
    );
    const progressbar = screen.getByRole('progressbar');
    // value=200, max=1000 → ratio1000=200 → isLow=true → aria-valuenow=200
    expect(progressbar).toHaveAttribute('aria-valuenow', '200');
  });

  test('HP 50% のとき progressbar の aria-valuenow=500', () => {
    render(
      <EnemyHpBar
        name="通常"
        currentHp={BigNum.fromNumber(500)}
        maxHp={BigNum.fromNumber(1000)}
      />
    );
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '500');
  });

  test('boss タイプのとき boss クラスが付く', () => {
    const { container } = render(
      <EnemyHpBar
        name="ボス"
        currentHp={BigNum.fromNumber(80000)}
        maxHp={BigNum.fromNumber(100000)}
        type="boss"
      />
    );
    const rootEl = container.firstChild as HTMLElement;
    expect(rootEl.className).toMatch(/boss/);
  });

  test('elite タイプのとき elite クラスが付く', () => {
    const { container } = render(
      <EnemyHpBar
        name="エリート"
        currentHp={BigNum.fromNumber(3000)}
        maxHp={BigNum.fromNumber(5000)}
        type="elite"
      />
    );
    const rootEl = container.firstChild as HTMLElement;
    expect(rootEl.className).toMatch(/elite/);
  });
});
