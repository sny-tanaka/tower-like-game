import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BattleHudBottom } from './index';

import { BigNum } from '@/lib/bignum/BigNum';
import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

// ---------------------------------------------------------------------------
// テストヘルパー
// ---------------------------------------------------------------------------

/**
 * v1.3.7 Phase 4-B: BattleHudBottom は screw / bolt / currentWeapon / weaponSwitchCdSec /
 * activeCdSec / isAutoActive / isPaused / machineLevels.activeCdReduction を内部 useStore
 * selector で直接購読するようになったため、 props から渡せない (= seed する必要がある)。
 * 親 props として残っているのは callback と overlay 開閉 (isWorkshopOpen / onToggleWorkshop)。
 */
type ParentProps = Parameters<typeof BattleHudBottom>[0];

function makeParentProps(overrides?: Partial<ParentProps>): ParentProps {
  return {
    onSwitchWeapon: vi.fn(),
    onActivate: vi.fn(),
    onToggleAuto: vi.fn(),
    onTogglePause: vi.fn(),
    onOpenScreenSaver: vi.fn(),
    ...overrides,
  };
}

// 各テスト後に store を defaultBattleState 相当に戻す (state リーク防止)
afterEach(() => {
  resetBattleState();
});

// ---------------------------------------------------------------------------
// テスト
// ---------------------------------------------------------------------------

describe('BattleHudBottom', () => {
  describe('ネジ残高', () => {
    it('ネジアイコン付きで残高が表示される', () => {
      seedBattleState({ screw: BigNum.fromNumber(12345) });
      render(<BattleHudBottom {...makeParentProps()} />);
      // CurrencyAmount の aria-label には "screw 12.3K" のような文字が入る
      expect(screen.getByRole('img', { name: /screw/i })).toBeInTheDocument();
    });
  });

  describe('武器スロット', () => {
    it('4 つの武器スロットボタンが表示される', () => {
      seedBattleState();
      render(<BattleHudBottom {...makeParentProps()} />);
      // WeaponSlotIcon は aria-label に weapon 名を含む
      expect(screen.getByRole('button', { name: /laser weapon slot/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cannon weapon slot/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /thunder weapon slot/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cutter weapon slot/i })).toBeInTheDocument();
    });

    it('装備中の武器スロットが aria-pressed=true', () => {
      seedBattleState({ currentWeapon: 'cannon' });
      render(<BattleHudBottom {...makeParentProps()} />);
      const cannonBtn = screen.getByRole('button', { name: /cannon weapon slot/i });
      expect(cannonBtn).toHaveAttribute('aria-pressed', 'true');
    });

    it('武器スロットをタップすると onSwitchWeapon が呼ばれる', async () => {
      const onSwitchWeapon = vi.fn();
      seedBattleState();
      render(<BattleHudBottom {...makeParentProps({ onSwitchWeapon })} />);
      await userEvent.click(screen.getByRole('button', { name: /cannon weapon slot/i }));
      expect(onSwitchWeapon).toHaveBeenCalledWith('cannon');
    });
  });

  describe('アクティブボタン', () => {
    it('アクティブ可能状態ではボタンが押せる', async () => {
      const onActivate = vi.fn();
      seedBattleState();
      render(<BattleHudBottom {...makeParentProps({ onActivate })} />);
      const btn = screen.getByRole('button', { name: /アクティブスキル発動$/i });
      await userEvent.click(btn);
      expect(onActivate).toHaveBeenCalled();
    });

    it('アクティブ CD 中はボタンが disabled になる', () => {
      seedBattleState({ activeCdSec: 30 });
      render(<BattleHudBottom {...makeParentProps()} />);
      const btn = screen.getByRole('button', { name: /アクティブスキル発動.*クールダウン/i });
      expect(btn).toBeDisabled();
    });

    it('自動モード中はボタンが disabled になる', () => {
      seedBattleState({ isAutoActive: true });
      render(<BattleHudBottom {...makeParentProps()} />);
      const btn = screen.getByRole('button', { name: /アクティブスキル発動.*自動モード/i });
      expect(btn).toBeDisabled();
    });
  });

  describe('手動/自動トグル', () => {
    it('isAutoActive=false のとき切替ボタンは未押下状態 (ラベルは常に AUTO)', () => {
      seedBattleState({ isAutoActive: false });
      render(<BattleHudBottom {...makeParentProps()} />);
      const toggle = screen.getByRole('button', { name: /自動モードに切り替え/ });
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
      expect(toggle).toHaveTextContent('AUTO');
      expect(toggle).not.toHaveTextContent('MANUAL');
    });

    it('isAutoActive=true のとき切替ボタンは押下状態 (ラベルは常に AUTO)', () => {
      seedBattleState({ isAutoActive: true });
      render(<BattleHudBottom {...makeParentProps()} />);
      const toggle = screen.getByRole('button', { name: /手動モードに切り替え/ });
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
      expect(toggle).toHaveTextContent('AUTO');
    });

    it('切替ボタンをクリックすると onToggleAuto(!isAutoActive) が呼ばれる', async () => {
      const onToggleAuto = vi.fn();
      seedBattleState({ isAutoActive: false });
      render(<BattleHudBottom {...makeParentProps({ onToggleAuto })} />);
      const toggle = screen.getByRole('button', { name: /自動モードに切り替え/ });
      await userEvent.click(toggle);
      expect(onToggleAuto).toHaveBeenCalledWith(true);
    });
  });

  describe('システムボタン', () => {
    it('一時停止ボタンとスクリーンセーバーボタンが表示される (メニューは pause と統合)', () => {
      seedBattleState();
      render(<BattleHudBottom {...makeParentProps()} />);
      expect(screen.getByRole('button', { name: /一時停止/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'スクリーンセーバーを起動' })).toBeInTheDocument();
    });

    it('一時停止中は「再開」ラベルになる', () => {
      seedBattleState({ isPaused: true });
      render(<BattleHudBottom {...makeParentProps()} />);
      expect(screen.getByRole('button', { name: /再開/ })).toBeInTheDocument();
    });

    it('一時停止ボタンをクリックすると onTogglePause が呼ばれる', async () => {
      const onTogglePause = vi.fn();
      seedBattleState();
      render(<BattleHudBottom {...makeParentProps({ onTogglePause })} />);
      await userEvent.click(screen.getByRole('button', { name: /一時停止/ }));
      expect(onTogglePause).toHaveBeenCalled();
    });

    it('メニュー専用ボタンは廃止 (pause と統合)', () => {
      seedBattleState();
      render(<BattleHudBottom {...makeParentProps()} />);
      expect(screen.queryByRole('button', { name: 'メニューを開く' })).toBeNull();
    });

    it('スクリーンセーバーボタンをクリックすると onOpenScreenSaver が呼ばれる', async () => {
      const onOpenScreenSaver = vi.fn();
      seedBattleState();
      render(<BattleHudBottom {...makeParentProps({ onOpenScreenSaver })} />);
      await userEvent.click(screen.getByRole('button', { name: 'スクリーンセーバーを起動' }));
      expect(onOpenScreenSaver).toHaveBeenCalled();
    });
  });

  describe('WeaponSlotIcon ready 配線', () => {
    it('CD 完了かつ未装備の武器スロットに (ready) が aria-label に含まれる', () => {
      // weaponSwitchCdSec=0 → 全武器 CD 完了 (cdProgress=100)。 装備中以外は (ready) になる。
      seedBattleState({ currentWeapon: 'laser', weaponSwitchCdSec: 0 });
      render(<BattleHudBottom {...makeParentProps()} />);
      // 装備中以外の cannon / thunder / cutter は (ready)
      expect(screen.getByRole('button', { name: /cannon.*ready/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /thunder.*ready/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cutter.*ready/i })).toBeInTheDocument();
    });

    it('武器切替直後 (weaponSwitchCdSec=3) は CD% < 100 で (cooldown) 表示', () => {
      // WEAPON_SWITCH_CD_SEC = 3 なので weaponSwitchCdSec=3 → (3-3)/3 * 100 = 0% 経過
      seedBattleState({ currentWeapon: 'laser', weaponSwitchCdSec: 3 });
      render(<BattleHudBottom {...makeParentProps()} />);
      // 装備中以外は cdProgress = 0 → aria-label に "cooldown 0%" が入る
      expect(screen.getByRole('button', { name: /cannon.*cooldown 0%/i })).toBeInTheDocument();
    });

    it('装備中の武器は CD=100 でも (ready) ではなく (active) になる', () => {
      seedBattleState({ currentWeapon: 'laser', weaponSwitchCdSec: 0 });
      render(<BattleHudBottom {...makeParentProps()} />);
      const laserBtn = screen.getByRole('button', { name: /laser weapon slot/i });
      expect(laserBtn).toHaveAttribute('aria-label', expect.stringContaining('(active)'));
      expect(laserBtn).not.toHaveAttribute('aria-label', expect.stringContaining('(ready)'));
    });
  });

  // ---------------------------------------------------------------------------
  // Phase 4-B 追加: 派生計算 (earnedBolt / weaponCds / activeMaxSec) の検証
  // ---------------------------------------------------------------------------

  describe('内部派生計算', () => {
    it('earnedBolt = bolt - runStartBolt がボルト表示の aria-label に反映される', () => {
      // bolt=300, runStartBolt=100 → earnedBolt=200
      seedBattleState({
        bolt: BigNum.fromNumber(300),
        runStartBolt: BigNum.fromNumber(100),
      });
      render(<BattleHudBottom {...makeParentProps()} />);
      // CurrencyAmount のボルト要素 (aria-label="bolt 200" 形式)
      expect(screen.getByRole('img', { name: /bolt 200/i })).toBeInTheDocument();
    });

    it('bolt < runStartBolt のとき earnedBolt は 0 にクランプ', () => {
      seedBattleState({
        bolt: BigNum.fromNumber(50),
        runStartBolt: BigNum.fromNumber(100),
      });
      render(<BattleHudBottom {...makeParentProps()} />);
      // earnedBolt = 0
      expect(screen.getByRole('img', { name: /bolt 0/i })).toBeInTheDocument();
    });

    it('weaponSwitchCdSec の中間値で (cooldown 50%) などが反映される', () => {
      // WEAPON_SWITCH_CD_SEC=3 なので weaponSwitchCdSec=1.5 → 50% 経過
      seedBattleState({ currentWeapon: 'laser', weaponSwitchCdSec: 1.5 });
      render(<BattleHudBottom {...makeParentProps()} />);
      expect(screen.getByRole('button', { name: /cannon.*cooldown 50%/i })).toBeInTheDocument();
    });

    it('machineLevels.activeCdReduction=0 のとき activeMaxSec=60 (DEFAULT) で render が落ちない', () => {
      // 短縮 0 → CD 最大値 60s。 CircularProgress の max=60 で描画されることを smoke test
      seedBattleState({ machineLevels: { activeCdReduction: 0 }, activeCdSec: 0 });
      const { container } = render(<BattleHudBottom {...makeParentProps()} />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});
