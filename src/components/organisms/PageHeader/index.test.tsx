import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PageHeader } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';

/** store を初期状態にリセット */
afterEach(() => {
  useStore.setState({
    bolt: BigNum.ZERO,
    alloy: BigNum.ZERO,
    screw: BigNum.ZERO,
    isRunActive: false,
  });
});

describe('PageHeader', () => {
  it('title を表示する', () => {
    render(<PageHeader title="マシン強化" />);
    expect(screen.getByText('マシン強化')).toBeDefined();
  });

  it('subtitle を表示する', () => {
    render(
      <PageHeader
        title="パッチ庫"
        subtitle="装着 6 / 8"
      />
    );
    expect(screen.getByText('装着 6 / 8')).toBeDefined();
  });

  it('subtitle が未指定のとき表示しない', () => {
    render(<PageHeader title="マシン強化" />);
    expect(screen.queryByText('装着 6 / 8')).toBeNull();
  });

  it('onBack が渡されたとき戻るボタンを表示する', () => {
    render(
      <PageHeader
        title="マシン強化"
        onBack={() => {}}
      />
    );
    expect(screen.getByLabelText('戻る')).toBeDefined();
  });

  it('onBack が未指定のとき戻るボタンを表示しない', () => {
    render(<PageHeader title="マシン強化" />);
    expect(screen.queryByLabelText('戻る')).toBeNull();
  });

  it('戻るボタンをクリックすると onBack が呼ばれる', async () => {
    const onBack = vi.fn();
    render(
      <PageHeader
        title="マシン強化"
        onBack={onBack}
      />
    );
    await userEvent.click(screen.getByLabelText('戻る'));
    expect(onBack).toHaveBeenCalledOnce();
  });

  it('bolt 通貨を store から引いて表示する', () => {
    useStore.setState({ bolt: BigNum.fromNumber(1_234) });
    render(
      <PageHeader
        title="マシン強化"
        currencies={['bolt']}
      />
    );
    // CurrencyAmount が aria-label に bolt と数値を含む
    expect(screen.getByRole('img', { name: /bolt/i })).toBeDefined();
  });

  it('screw はラン中以外で currencies に指定しても非表示', () => {
    useStore.setState({ screw: BigNum.fromNumber(100), isRunActive: false });
    render(
      <PageHeader
        title="出撃準備"
        currencies={['screw', 'bolt']}
      />
    );
    // screw の img は出ない
    const screwImgs = screen.queryAllByRole('img', { name: /screw/i });
    expect(screwImgs).toHaveLength(0);
  });

  it('screw はラン中であれば表示する', () => {
    useStore.setState({
      screw: BigNum.fromNumber(100),
      isRunActive: true,
    });
    render(
      <PageHeader
        title="出撃準備"
        currencies={['screw']}
      />
    );
    expect(screen.getByRole('img', { name: /screw/i })).toBeDefined();
  });

  it('tabBar スロットを描画する', () => {
    render(
      <PageHeader
        title="マシン強化"
        tabBar={<div>タブバー</div>}
      />
    );
    expect(screen.getByText('タブバー')).toBeDefined();
  });

  it('actions スロットを描画する', () => {
    render(
      <PageHeader
        title="テスト"
        actions={<button>設定</button>}
      />
    );
    expect(screen.getByText('設定')).toBeDefined();
  });
});
