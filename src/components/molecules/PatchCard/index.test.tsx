import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { PatchCard } from './index';

const defaultProps = {
  patchId: 'test-p1',
  name: 'HP ブースト',
  iconName: 'heart' as const,
  tier: 2,
  count: 3,
  trigger: '常時',
  effect: '被ダメ -5%',
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

  test('locked=true のとき locked クラスが付く', () => {
    const { container } = render(
      <PatchCard
        {...defaultProps}
        locked={true}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/locked/);
  });

  test('disabled=true のとき disabled クラスが付く', () => {
    const { container } = render(
      <PatchCard
        {...defaultProps}
        disabled={true}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/disabled/);
  });

  test('data-patch-id 属性が付与される', () => {
    const { container } = render(
      <PatchCard
        {...defaultProps}
        patchId="freeze#2"
      />
    );
    expect(container.firstChild).toHaveAttribute('data-patch-id', 'freeze#2');
  });

  test('data-patch-id: PatchName#tier 形式が正しく反映される', () => {
    const { container } = render(
      <PatchCard
        {...defaultProps}
        patchId="damageImmune#1"
      />
    );
    expect(container.firstChild).toHaveAttribute('data-patch-id', 'damageImmune#1');
  });

  test('data-patch-id: tier 5 (高 Tier) でも正しく反映される', () => {
    const { container } = render(
      <PatchCard
        {...defaultProps}
        patchId="instantKill#5"
      />
    );
    expect(container.firstChild).toHaveAttribute('data-patch-id', 'instantKill#5');
  });

  test('data-patch-id: defaultProps の patchId がルート div に付与される', () => {
    const { container } = render(<PatchCard {...defaultProps} />);
    expect(container.firstChild).toHaveAttribute('data-patch-id', defaultProps.patchId);
  });

  test('data-patch-id: locked=true でも属性が付与される', () => {
    const { container } = render(
      <PatchCard
        {...defaultProps}
        patchId="burnHit#3"
        locked={true}
      />
    );
    expect(container.firstChild).toHaveAttribute('data-patch-id', 'burnHit#3');
  });

  test('trigger と effect が md サイズで描画される', () => {
    render(
      <PatchCard
        {...defaultProps}
        size="md"
      />
    );
    expect(screen.getByText('常時')).toBeInTheDocument();
    expect(screen.getByText('被ダメ -5%')).toBeInTheDocument();
  });
});
