import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BattleHudBottom } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// テストヘルパー
// ---------------------------------------------------------------------------

type Props = Parameters<typeof BattleHudBottom>[0];

function makeProps(overrides?: Partial<Props>): Props {
  return {
    screw: BigNum.fromNumber(12345),
    earnedBolt: BigNum.fromNumber(0),
    equippedWeapon: 'laser',
    weaponCds: { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    activeCd: 0,
    activeMax: 300,
    isAutoActive: false,
    onSwitchWeapon: vi.fn(),
    onActivate: vi.fn(),
    onToggleAuto: vi.fn(),
    isPaused: false,
    onTogglePause: vi.fn(),
    onOpenScreenSaver: vi.fn(),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// テスト
// ---------------------------------------------------------------------------

describe('BattleHudBottom', () => {
  describe('ネジ残高', () => {
    it('ネジアイコン付きで残高が表示される', () => {
      render(<BattleHudBottom {...makeProps()} />);
      // CurrencyAmount の aria-label には "screw 12.3K" のような文字が入る
      expect(screen.getByRole('img', { name: /screw/i })).toBeInTheDocument();
    });
  });

  describe('武器スロット', () => {
    it('4 つの武器スロットボタンが表示される', () => {
      render(<BattleHudBottom {...makeProps()} />);
      // WeaponSlotIcon は aria-label に weapon 名を含む
      expect(screen.getByRole('button', { name: /laser weapon slot/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cannon weapon slot/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /thunder weapon slot/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cutter weapon slot/i })).toBeInTheDocument();
    });

    it('装備中の武器スロットが aria-pressed=true', () => {
      render(<BattleHudBottom {...makeProps({ equippedWeapon: 'cannon' })} />);
      const cannonBtn = screen.getByRole('button', { name: /cannon weapon slot/i });
      expect(cannonBtn).toHaveAttribute('aria-pressed', 'true');
    });

    it('武器スロットをタップすると onSwitchWeapon が呼ばれる', async () => {
      const onSwitchWeapon = vi.fn();
      render(<BattleHudBottom {...makeProps({ onSwitchWeapon })} />);
      await userEvent.click(screen.getByRole('button', { name: /cannon weapon slot/i }));
      expect(onSwitchWeapon).toHaveBeenCalledWith('cannon');
    });
  });

  describe('アクティブボタン', () => {
    it('アクティブ可能状態ではボタンが押せる', async () => {
      const onActivate = vi.fn();
      render(<BattleHudBottom {...makeProps({ onActivate })} />);
      const btn = screen.getByRole('button', { name: /アクティブスキル発動$/i });
      await userEvent.click(btn);
      expect(onActivate).toHaveBeenCalled();
    });

    it('アクティブ CD 中はボタンが disabled になる', () => {
      render(<BattleHudBottom {...makeProps({ activeCd: 150, activeMax: 300 })} />);
      const btn = screen.getByRole('button', { name: /アクティブスキル発動.*クールダウン/i });
      expect(btn).toBeDisabled();
    });

    it('自動モード中はボタンが disabled になる', () => {
      render(<BattleHudBottom {...makeProps({ isAutoActive: true })} />);
      const btn = screen.getByRole('button', { name: /アクティブスキル発動.*自動モード/i });
      expect(btn).toBeDisabled();
    });
  });

  describe('手動/自動トグル', () => {
    it('isAutoActive=false のとき切替ボタンは未押下状態 (ラベルは常に AUTO)', () => {
      render(<BattleHudBottom {...makeProps({ isAutoActive: false })} />);
      const toggle = screen.getByRole('button', { name: /自動モードに切り替え/ });
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
      expect(toggle).toHaveTextContent('AUTO');
      expect(toggle).not.toHaveTextContent('MANUAL');
    });

    it('isAutoActive=true のとき切替ボタンは押下状態 (ラベルは常に AUTO)', () => {
      render(<BattleHudBottom {...makeProps({ isAutoActive: true })} />);
      const toggle = screen.getByRole('button', { name: /手動モードに切り替え/ });
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
      expect(toggle).toHaveTextContent('AUTO');
    });

    it('切替ボタンをクリックすると onToggleAuto(!isAutoActive) が呼ばれる', async () => {
      const onToggleAuto = vi.fn();
      render(<BattleHudBottom {...makeProps({ onToggleAuto, isAutoActive: false })} />);
      const toggle = screen.getByRole('button', { name: /自動モードに切り替え/ });
      await userEvent.click(toggle);
      expect(onToggleAuto).toHaveBeenCalledWith(true);
    });
  });

  describe('システムボタン', () => {
    it('一時停止ボタンとスクリーンセーバーボタンが表示される (メニューは pause と統合)', () => {
      render(<BattleHudBottom {...makeProps()} />);
      expect(screen.getByRole('button', { name: /一時停止/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'スクリーンセーバーを起動' })).toBeInTheDocument();
    });

    it('一時停止中は「再開」ラベルになる', () => {
      render(<BattleHudBottom {...makeProps({ isPaused: true })} />);
      expect(screen.getByRole('button', { name: /再開/ })).toBeInTheDocument();
    });

    it('一時停止ボタンをクリックすると onTogglePause が呼ばれる', async () => {
      const onTogglePause = vi.fn();
      render(<BattleHudBottom {...makeProps({ onTogglePause })} />);
      await userEvent.click(screen.getByRole('button', { name: /一時停止/ }));
      expect(onTogglePause).toHaveBeenCalled();
    });

    it('メニュー専用ボタンは廃止 (pause と統合)', () => {
      render(<BattleHudBottom {...makeProps()} />);
      expect(screen.queryByRole('button', { name: 'メニューを開く' })).toBeNull();
    });

    it('スクリーンセーバーボタンをクリックすると onOpenScreenSaver が呼ばれる', async () => {
      const onOpenScreenSaver = vi.fn();
      render(<BattleHudBottom {...makeProps({ onOpenScreenSaver })} />);
      await userEvent.click(screen.getByRole('button', { name: 'スクリーンセーバーを起動' }));
      expect(onOpenScreenSaver).toHaveBeenCalled();
    });
  });

  describe('WeaponSlotIcon ready 配線', () => {
    it('CD 完了かつ未装備の武器スロットに (ready) が aria-label に含まれる', () => {
      render(
        <BattleHudBottom
          {...makeProps({
            equippedWeapon: 'laser',
            weaponCds: { laser: 100, cannon: 50, thunder: 100, cutter: 100 },
          })}
        />
      );
      // cannon は CD 中なので aria-label に (cooldown 50%) が含まれる
      expect(screen.getByRole('button', { name: /cannon.*cooldown 50%/i })).toBeInTheDocument();
      // thunder / cutter は CD 完了かつ未装備なので (ready) が含まれる
      expect(screen.getByRole('button', { name: /thunder.*ready/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cutter.*ready/i })).toBeInTheDocument();
    });

    it('装備中の武器は CD=100 でも (ready) ではなく (active) になる', () => {
      render(
        <BattleHudBottom
          {...makeProps({
            equippedWeapon: 'laser',
            weaponCds: { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
          })}
        />
      );
      // laser は active なので aria-label に (active) が含まれ (ready) は含まれない
      const laserBtn = screen.getByRole('button', { name: /laser weapon slot/i });
      expect(laserBtn).toHaveAttribute('aria-label', expect.stringContaining('(active)'));
      expect(laserBtn).not.toHaveAttribute('aria-label', expect.stringContaining('(ready)'));
    });
  });
});
