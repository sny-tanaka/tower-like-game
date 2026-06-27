import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, expect, vi } from 'vitest';

import { ResultDialog } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { resetBattleState } from '@/test-utils/seedBattleState';

// v1.3.7 Phase 4-C: ResultDialog は React.memo で wrap されたが、 props 経路は変更していない
// (finalTier snapshot 等の整合性を保つため)。 store を触らないので必須ではないが、 他 organism
// テストとの一貫性のため afterEach で reset しておく (将来 ResultDialog が内部 selector 化された
// 際にここで先に reset していれば test 改修が要らない、 の予防的措置)。
afterEach(() => {
  resetBattleState();
});

const baseReward = {
  bolt: BigNum.fromNumber(12500),
  alloy: BigNum.fromNumber(3200),
  patches: [{ name: 'パワーチップ', tier: 3, count: 2 }],
};

const defaultProps = {
  open: true,
  status: 'clear' as const,
  reachedTier: 5,
  reachedWave: 30,
  killed: 248,
  elapsedSec: 312,
  reward: baseReward,
  onClose: vi.fn(),
};

describe('ResultDialog', () => {
  it('open=false の時に何も表示されない', () => {
    render(
      <ResultDialog
        {...defaultProps}
        open={false}
      />
    );
    expect(screen.queryByText('クリア')).toBeNull();
  });

  it('status=clear でクリアと表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        status="clear"
      />
    );
    expect(screen.getByText('クリア')).toBeDefined();
  });

  it('status=gameover で全滅と表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        status="gameover"
      />
    );
    expect(screen.getByText('全滅')).toBeDefined();
  });

  it('status=retreat で撤退と表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        status="retreat"
      />
    );
    expect(screen.getByText('撤退')).toBeDefined();
  });

  it('到達 Tier が表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        reachedTier={5}
      />
    );
    expect(screen.getByText('5')).toBeDefined();
  });

  it('到達 Wave が表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        reachedWave={30}
      />
    );
    expect(screen.getByText('30')).toBeDefined();
  });

  it('撃破数が表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        killed={248}
      />
    );
    expect(screen.getByText('248')).toBeDefined();
  });

  it('所要時間が MM:SS 形式で表示される', () => {
    // 312秒 = 05:12
    render(
      <ResultDialog
        {...defaultProps}
        elapsedSec={312}
      />
    );
    expect(screen.getByText('05:12')).toBeDefined();
  });

  it('パッチ一覧が表示される', () => {
    render(<ResultDialog {...defaultProps} />);
    expect(screen.getByText('パワーチップ')).toBeDefined();
  });

  it('パッチがない場合「パッチドロップなし」が表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        reward={{ ...baseReward, patches: [] }}
      />
    );
    expect(screen.getByText('パッチドロップなし')).toBeDefined();
  });

  it('「出撃準備へ」ボタンクリックで onClose が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <ResultDialog
        {...defaultProps}
        onClose={onClose}
      />
    );
    await user.click(screen.getByRole('button', { name: '出撃準備へ' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('「出撃準備へ」ボタンが 1 つだけ表示される', () => {
    render(<ResultDialog {...defaultProps} />);
    const buttons = screen.getAllByRole('button', { name: '出撃準備へ' });
    expect(buttons).toHaveLength(1);
  });
});

describe('ResultDialog 時間フォーマット', () => {
  it('60秒は 01:00 と表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        elapsedSec={60}
      />
    );
    expect(screen.getByText('01:00')).toBeDefined();
  });

  it('0秒は 00:00 と表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        elapsedSec={0}
      />
    );
    expect(screen.getByText('00:00')).toBeDefined();
  });

  it('3599秒は 59:59 と表示される', () => {
    render(
      <ResultDialog
        {...defaultProps}
        elapsedSec={3599}
      />
    );
    expect(screen.getByText('59:59')).toBeDefined();
  });
});
