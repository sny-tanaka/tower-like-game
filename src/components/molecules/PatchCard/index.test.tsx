import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { PatchCard } from './index';

const defaultProps = {
  name: 'HP ブースト',
  iconName: 'heart' as const,
  tier: 2,
  count: 3,
};

describe('PatchCard', () => {
  test('name が描画される', () => {
    render(<PatchCard {...defaultProps} />);
    expect(screen.getByText('HP ブースト')).toBeInTheDocument();
  });

  test('tier バッジが描画される', () => {
    render(<PatchCard {...defaultProps} />);
    expect(screen.getByText('T2')).toBeInTheDocument();
  });

  test('count が描画される', () => {
    render(<PatchCard {...defaultProps} />);
    expect(screen.getByText('×3')).toBeInTheDocument();
  });

  test('selected=false のとき selected クラスが付かない', () => {
    const { container } = render(
      <PatchCard
        {...defaultProps}
        selected={false}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toMatch(/selected/);
  });

  test('selected=true のとき selected クラスが付く', () => {
    const { container } = render(
      <PatchCard
        {...defaultProps}
        selected={true}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/selected/);
  });

  test('onClick が渡されたとき button role が付く', () => {
    const onClick = vi.fn();
    render(
      <PatchCard
        {...defaultProps}
        onClick={onClick}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('onClick クリックで呼ばれる', async () => {
    const onClick = vi.fn();
    render(
      <PatchCard
        {...defaultProps}
        onClick={onClick}
      />
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('tier が 5 を超えると "T5" バッジ表示（クランプ）', () => {
    render(
      <PatchCard
        {...defaultProps}
        tier={10}
      />
    );
    expect(screen.getByText('T5')).toBeInTheDocument();
  });

  test('tier が 1 未満は "T1" 表示（クランプ）', () => {
    render(
      <PatchCard
        {...defaultProps}
        tier={0}
      />
    );
    expect(screen.getByText('T1')).toBeInTheDocument();
  });

  test('onClick なしのとき role="button" が付かない', () => {
    render(<PatchCard {...defaultProps} />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
