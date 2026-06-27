import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, expect, vi } from 'vitest';

import { BattleMenuOverlay } from './index';

import { useStore } from '@/store/index';
import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

// ---------------------------------------------------------------------------
// テストヘルパー
// ---------------------------------------------------------------------------
//
// v1.3.7 Phase 4-C: BattleMenuOverlay は bgmVolume / seVolume を内部 useStore selector で直接
// 購読するようになったため、 props から渡せない (= seed する必要がある)。 また音量 setter
// (setBgmVolume / setSeVolume) も store action を直接呼ぶようになったため、 onBgmChange /
// onSeChange の callback prop も削除された。 残っている props は open / onRetreat / onClose。

type ParentProps = Parameters<typeof BattleMenuOverlay>[0];

function makeParentProps(overrides?: Partial<ParentProps>): ParentProps {
  return {
    open: true,
    onRetreat: vi.fn(),
    onClose: vi.fn(),
    ...overrides,
  };
}

afterEach(() => {
  resetBattleState();
});

describe('BattleMenuOverlay', () => {
  it('open=true の時にメニューが表示される', () => {
    seedBattleState({ bgmVolume: 0.8, seVolume: 0.6 });
    render(<BattleMenuOverlay {...makeParentProps()} />);
    expect(screen.getByText('メニュー')).toBeDefined();
    expect(screen.getByText('BGM')).toBeDefined();
    expect(screen.getByText('SE')).toBeDefined();
  });

  it('open=false の時に何も表示されない', () => {
    seedBattleState({ bgmVolume: 0.8, seVolume: 0.6 });
    render(<BattleMenuOverlay {...makeParentProps({ open: false })} />);
    expect(screen.queryByText('メニュー')).toBeNull();
  });

  it('BGM 音量が % 表示される', () => {
    // bgmVolume=0.8 / seVolume=0.6 → 表示は "80" と "60" (それぞれ 1 つずつ)
    seedBattleState({ bgmVolume: 0.8, seVolume: 0.6 });
    render(<BattleMenuOverlay {...makeParentProps()} />);
    expect(screen.getByText('80')).toBeDefined();
  });

  it('SE 音量が % 表示される', () => {
    seedBattleState({ bgmVolume: 1.0, seVolume: 0.6 });
    render(<BattleMenuOverlay {...makeParentProps()} />);
    expect(screen.getByText('60')).toBeDefined();
  });

  it('BGM スライダー操作で store の setBgmVolume が呼ばれて bgmVolume が更新される', () => {
    seedBattleState({ bgmVolume: 0.5, seVolume: 0.5 });
    render(<BattleMenuOverlay {...makeParentProps()} />);
    const sliders = screen.getAllByRole('slider');
    // 1番目が BGM スライダー (range input)
    // jsdom の range input は arrowright を解釈しないので fireEvent.change で値を直接渡す。
    // 内部で setBgmVolume が呼ばれ store の bgmVolume が更新される (= BattleMenuOverlay が
    // store を直接 setter 経由で更新していることの単体テスト)。
    act(() => {
      fireEvent.change(sliders[0], { target: { value: '0.9' } });
    });
    expect(useStore.getState().bgmVolume).toBeCloseTo(0.9);
  });

  it('SE スライダー操作で store の setSeVolume が呼ばれて seVolume が更新される', () => {
    seedBattleState({ bgmVolume: 0.5, seVolume: 0.5 });
    render(<BattleMenuOverlay {...makeParentProps()} />);
    const sliders = screen.getAllByRole('slider');
    // 2番目が SE スライダー
    act(() => {
      fireEvent.change(sliders[1], { target: { value: '0.3' } });
    });
    expect(useStore.getState().seVolume).toBeCloseTo(0.3);
  });

  it('撤退ボタンをクリックすると確認ダイアログが表示される', async () => {
    const user = userEvent.setup();
    seedBattleState();
    render(<BattleMenuOverlay {...makeParentProps()} />);
    const retreatBtn = screen.getByRole('button', { name: '撤退' });
    await user.click(retreatBtn);
    expect(screen.getByText('撤退しますか？')).toBeDefined();
  });

  it('確認ダイアログで「撤退する」を押すと onRetreat が呼ばれる', async () => {
    const user = userEvent.setup();
    const onRetreat = vi.fn();
    seedBattleState();
    render(<BattleMenuOverlay {...makeParentProps({ onRetreat })} />);
    await user.click(screen.getByRole('button', { name: '撤退' }));
    await user.click(screen.getByRole('button', { name: '撤退する' }));
    expect(onRetreat).toHaveBeenCalledOnce();
  });

  it('確認ダイアログで「キャンセル」を押すと onRetreat は呼ばれない', async () => {
    const user = userEvent.setup();
    const onRetreat = vi.fn();
    seedBattleState();
    render(<BattleMenuOverlay {...makeParentProps({ onRetreat })} />);
    await user.click(screen.getByRole('button', { name: '撤退' }));
    await user.click(screen.getByRole('button', { name: 'キャンセル' }));
    expect(onRetreat).not.toHaveBeenCalled();
  });

  it('「閉じる」ボタンクリックで onClose が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    seedBattleState();
    render(<BattleMenuOverlay {...makeParentProps({ onClose })} />);
    await user.click(screen.getByRole('button', { name: '閉じる' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('2 つのスライダーが表示される', () => {
    seedBattleState();
    render(<BattleMenuOverlay {...makeParentProps()} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
  });
});
