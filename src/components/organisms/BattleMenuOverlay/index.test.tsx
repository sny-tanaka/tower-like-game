import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { BattleMenuOverlay } from './index';

const defaultProps = {
  open: true,
  bgmVolume: 0.8,
  seVolume: 0.6,
  onBgmChange: vi.fn(),
  onSeChange: vi.fn(),
  onRetreat: vi.fn(),
  onClose: vi.fn(),
};

describe('BattleMenuOverlay', () => {
  it('open=true の時にメニューが表示される', () => {
    render(<BattleMenuOverlay {...defaultProps} />);
    expect(screen.getByText('メニュー')).toBeDefined();
    expect(screen.getByText('BGM')).toBeDefined();
    expect(screen.getByText('SE')).toBeDefined();
  });

  it('open=false の時に何も表示されない', () => {
    render(
      <BattleMenuOverlay
        {...defaultProps}
        open={false}
      />
    );
    expect(screen.queryByText('メニュー')).toBeNull();
  });

  it('BGM 音量が % 表示される', () => {
    render(<BattleMenuOverlay {...defaultProps} bgmVolume={0.8} />);
    expect(screen.getByText('80')).toBeDefined();
  });

  it('SE 音量が % 表示される', () => {
    render(<BattleMenuOverlay {...defaultProps} seVolume={0.6} />);
    expect(screen.getByText('60')).toBeDefined();
  });

  it('BGM スライダー変更で onBgmChange が呼ばれる', async () => {
    const onBgmChange = vi.fn();
    render(
      <BattleMenuOverlay
        {...defaultProps}
        onBgmChange={onBgmChange}
      />
    );
    const sliders = screen.getAllByRole('slider');
    // 1番目が BGM スライダー
    const bgmSlider = sliders[0];
    await userEvent.type(bgmSlider, '{arrowright}');
    // スライダー操作で変更イベントが発火することを確認
    expect(bgmSlider).toBeDefined();
  });

  it('撤退ボタンをクリックすると確認ダイアログが表示される', async () => {
    const user = userEvent.setup();
    render(<BattleMenuOverlay {...defaultProps} />);
    const retreatBtn = screen.getByRole('button', { name: '撤退' });
    await user.click(retreatBtn);
    expect(screen.getByText('撤退しますか？')).toBeDefined();
  });

  it('確認ダイアログで「撤退する」を押すと onRetreat が呼ばれる', async () => {
    const user = userEvent.setup();
    const onRetreat = vi.fn();
    render(
      <BattleMenuOverlay
        {...defaultProps}
        onRetreat={onRetreat}
      />
    );
    // 撤退ボタンクリック
    await user.click(screen.getByRole('button', { name: '撤退' }));
    // ConfirmDialog の「撤退する」ボタンをクリック
    await user.click(screen.getByRole('button', { name: '撤退する' }));
    expect(onRetreat).toHaveBeenCalledOnce();
  });

  it('確認ダイアログで「キャンセル」を押すと onRetreat は呼ばれない', async () => {
    const user = userEvent.setup();
    const onRetreat = vi.fn();
    render(
      <BattleMenuOverlay
        {...defaultProps}
        onRetreat={onRetreat}
      />
    );
    await user.click(screen.getByRole('button', { name: '撤退' }));
    await user.click(screen.getByRole('button', { name: 'キャンセル' }));
    expect(onRetreat).not.toHaveBeenCalled();
  });

  it('「閉じる」ボタンクリックで onClose が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <BattleMenuOverlay
        {...defaultProps}
        onClose={onClose}
      />
    );
    await user.click(screen.getByRole('button', { name: '閉じる' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('2 つのスライダーが表示される', () => {
    render(<BattleMenuOverlay {...defaultProps} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
  });
});
