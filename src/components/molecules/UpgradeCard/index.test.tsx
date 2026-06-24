import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { UpgradeCard } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

const defaultProps = {
  title: '最大 HP',
  iconName: 'heart' as const,
  currentLabel: 'Lv 4',
  before: 1200,
  after: 1320,
  currency: 'bolt' as const,
  accent: 'primary' as const,
  options: [
    { amount: '+1', cost: 80 },
    { amount: '+5', cost: 380 },
    { amount: 'MAX', cost: 720 },
  ],
};

describe('UpgradeCard', () => {
  test('title が描画される', () => {
    render(<UpgradeCard {...defaultProps} />);
    expect(screen.getByText('最大 HP')).toBeInTheDocument();
  });

  test('currentLabel が描画される', () => {
    render(<UpgradeCard {...defaultProps} />);
    expect(screen.getByText('Lv 4')).toBeInTheDocument();
  });

  test('options のボタンが描画される', () => {
    render(<UpgradeCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: '+1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+5' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'MAX' })).toBeInTheDocument();
  });

  test('+1 ボタンクリックで onUpgrade("+1") が呼ばれる', async () => {
    const onUpgrade = vi.fn();
    render(
      <UpgradeCard
        {...defaultProps}
        onUpgrade={onUpgrade}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    expect(onUpgrade).toHaveBeenCalledWith('+1');
  });

  test('+5 ボタンクリックで onUpgrade("+5") が呼ばれる', async () => {
    const onUpgrade = vi.fn();
    render(
      <UpgradeCard
        {...defaultProps}
        onUpgrade={onUpgrade}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: '+5' }));
    expect(onUpgrade).toHaveBeenCalledWith('+5');
  });

  test('MAX ボタンクリックで onUpgrade("MAX") が呼ばれる', async () => {
    const onUpgrade = vi.fn();
    render(
      <UpgradeCard
        {...defaultProps}
        onUpgrade={onUpgrade}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'MAX' }));
    expect(onUpgrade).toHaveBeenCalledWith('MAX');
  });

  test('option.disabled=true のとき該当ボタンが disabled', () => {
    render(
      <UpgradeCard
        {...defaultProps}
        options={[
          { amount: '+1', cost: 80, disabled: true },
          { amount: '+5', cost: 380 },
          { amount: 'MAX', cost: 720 },
        ]}
      />
    );
    expect(screen.getByRole('button', { name: '+1' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '+5' })).not.toBeDisabled();
  });

  test('maxed=true のとき MAX バッジが描画され、ボタンは出ない', () => {
    render(
      <UpgradeCard
        {...defaultProps}
        maxed={true}
        options={[]}
      />
    );
    expect(screen.getByText('MAX')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });

  test('description が描画される', () => {
    render(
      <UpgradeCard
        {...defaultProps}
        description="敵シールドを無効化する"
      />
    );
    expect(screen.getByText('敵シールドを無効化する')).toBeInTheDocument();
  });

  test('before / after の値が描画される', () => {
    render(<UpgradeCard {...defaultProps} />);
    expect(screen.getByText(/1,200/)).toBeInTheDocument();
    expect(screen.getByText(/1,320/)).toBeInTheDocument();
  });

  test('before/after に BigNum を渡すと toDisplay 表記 ("10.00A" 等) になる (v1.0.1 regression)', () => {
    // v1.0.0 リバランス後の maxHp Lv 0 = 10000 を渡すケースを再現。
    // number で渡すと "10,000" になってしまうバグ。 BigNum なら "10.00A"。
    render(
      <UpgradeCard
        {...defaultProps}
        before={BigNum.fromNumber(10000)}
        after={BigNum.fromNumber(10200)}
      />
    );
    expect(screen.getByText(/10\.00A/)).toBeInTheDocument();
    expect(screen.getByText(/10\.20A/)).toBeInTheDocument();
    // number 表記の桁区切りカンマが出ていないことを確認
    expect(screen.queryByText(/10,000/)).toBeNull();
  });

  test('options が空の時はボタンが描画されない', () => {
    render(
      <UpgradeCard
        {...defaultProps}
        options={[]}
      />
    );
    expect(screen.queryByRole('button')).toBeNull();
  });
});
