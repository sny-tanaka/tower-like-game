import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { UpgradeCard } from './index';

import { BigNum } from '@/lib/bignum/BigNum';


const defaultProps = {
  title: '最大 HP',
  currentLv: 3,
  currentValue: '+450',
  nextLvCost: BigNum.fromNumber(1200),
  canAfford: true,
  currency: 'screw' as const,
  onUpgrade: vi.fn(),
};

describe('UpgradeCard', () => {
  test('title が描画される', () => {
    render(<UpgradeCard {...defaultProps} />);
    expect(screen.getByText('最大 HP')).toBeInTheDocument();
  });

  test('currentValue が描画される', () => {
    render(<UpgradeCard {...defaultProps} />);
    expect(screen.getByText('+450')).toBeInTheDocument();
  });

  test('maxLv なし → "Lv 3" 表示', () => {
    render(<UpgradeCard {...defaultProps} />);
    expect(screen.getByText('Lv 3')).toBeInTheDocument();
  });

  test('maxLv あり → "Lv 3 / 10" 表示', () => {
    render(
      <UpgradeCard
        {...defaultProps}
        maxLv={10}
      />
    );
    expect(screen.getByText('Lv 3 / 10')).toBeInTheDocument();
  });

  test('+1 ボタンクリックで onUpgrade(1) が呼ばれる', async () => {
    const onUpgrade = vi.fn();
    render(
      <UpgradeCard
        {...defaultProps}
        onUpgrade={onUpgrade}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    expect(onUpgrade).toHaveBeenCalledWith(1);
  });

  test('+5 ボタンクリックで onUpgrade(5) が呼ばれる', async () => {
    const onUpgrade = vi.fn();
    render(
      <UpgradeCard
        {...defaultProps}
        onUpgrade={onUpgrade}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: '+5' }));
    expect(onUpgrade).toHaveBeenCalledWith(5);
  });

  test('Max ボタンクリックで onUpgrade("max") が呼ばれる', async () => {
    const onUpgrade = vi.fn();
    render(
      <UpgradeCard
        {...defaultProps}
        onUpgrade={onUpgrade}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Max' }));
    expect(onUpgrade).toHaveBeenCalledWith('max');
  });

  test('canAfford=false のとき全ボタンが disabled', () => {
    render(
      <UpgradeCard
        {...defaultProps}
        canAfford={false}
      />
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  test('disabled=true のとき全ボタンが disabled', () => {
    render(
      <UpgradeCard
        {...defaultProps}
        disabled={true}
      />
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  test('コスト数値が描画される', () => {
    render(
      <UpgradeCard
        {...defaultProps}
        nextLvCost={BigNum.fromNumber(1200)}
      />
    );
    // BigNum の独自フォーマット: 1200 → "1.20A"（K ではなく A サフィックス）
    // 3つのボタン列に同じコスト値が表示される
    const costLabels = screen.getAllByText('1.20A');
    expect(costLabels.length).toBeGreaterThan(0);
  });
});
