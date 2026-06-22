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
    equippedWeapon: 'laser',
    weaponCds: { laser: 100, cannon: 100, thunder: 100, cutter: 100 },
    activeCd: 0,
    activeMax: 300,
    isAutoActive: false,
    onSwitchWeapon: vi.fn(),
    onActivate: vi.fn(),
    onToggleAuto: vi.fn(),
    gameSpeed: 1,
    onSpeedChange: vi.fn(),
    isPaused: false,
    onTogglePause: vi.fn(),
    onOpenMenu: vi.fn(),
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
    it('isAutoActive=false のとき Toggle は未チェック状態', () => {
      render(<BattleHudBottom {...makeProps({ isAutoActive: false })} />);
      const toggle = screen.getByRole('switch', { name: /自動/i });
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('isAutoActive=true のとき Toggle はチェック状態', () => {
      render(<BattleHudBottom {...makeProps({ isAutoActive: true })} />);
      const toggle = screen.getByRole('switch', { name: /自動/i });
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('Toggle をクリックすると onToggleAuto が呼ばれる', async () => {
      const onToggleAuto = vi.fn();
      render(<BattleHudBottom {...makeProps({ onToggleAuto })} />);
      const toggle = screen.getByRole('switch', { name: /自動/i });
      await userEvent.click(toggle);
      expect(onToggleAuto).toHaveBeenCalledWith(true);
    });
  });

  describe('速度切替', () => {
    it('1x / 2x / 3x のセグメントが表示される', () => {
      render(<BattleHudBottom {...makeProps()} />);
      expect(screen.getByRole('radio', { name: '1x' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: '2x' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: '3x' })).toBeInTheDocument();
    });

    it('現在の gameSpeed のセグメントが aria-checked=true', () => {
      render(<BattleHudBottom {...makeProps({ gameSpeed: 2 })} />);
      expect(screen.getByRole('radio', { name: '2x' })).toHaveAttribute('aria-checked', 'true');
    });

    it('2x をタップすると onSpeedChange(2) が呼ばれる', async () => {
      const onSpeedChange = vi.fn();
      render(<BattleHudBottom {...makeProps({ onSpeedChange })} />);
      await userEvent.click(screen.getByRole('radio', { name: '2x' }));
      expect(onSpeedChange).toHaveBeenCalledWith(2);
    });
  });

  describe('システムボタン', () => {
    it('一時停止ボタン、メニューボタン、スクリーンセーバーボタンが表示される', () => {
      render(<BattleHudBottom {...makeProps()} />);
      expect(screen.getByRole('button', { name: '一時停止' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'メニューを開く' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'スクリーンセーバーを起動' })).toBeInTheDocument();
    });

    it('一時停止中は「再開」ラベルになる', () => {
      render(<BattleHudBottom {...makeProps({ isPaused: true })} />);
      expect(screen.getByRole('button', { name: '再開' })).toBeInTheDocument();
    });

    it('一時停止ボタンをクリックすると onTogglePause が呼ばれる', async () => {
      const onTogglePause = vi.fn();
      render(<BattleHudBottom {...makeProps({ onTogglePause })} />);
      await userEvent.click(screen.getByRole('button', { name: '一時停止' }));
      expect(onTogglePause).toHaveBeenCalled();
    });

    it('メニューボタンをクリックすると onOpenMenu が呼ばれる', async () => {
      const onOpenMenu = vi.fn();
      render(<BattleHudBottom {...makeProps({ onOpenMenu })} />);
      await userEvent.click(screen.getByRole('button', { name: 'メニューを開く' }));
      expect(onOpenMenu).toHaveBeenCalled();
    });

    it('スクリーンセーバーボタンをクリックすると onOpenScreenSaver が呼ばれる', async () => {
      const onOpenScreenSaver = vi.fn();
      render(<BattleHudBottom {...makeProps({ onOpenScreenSaver })} />);
      await userEvent.click(screen.getByRole('button', { name: 'スクリーンセーバーを起動' }));
      expect(onOpenScreenSaver).toHaveBeenCalled();
    });
  });
});
