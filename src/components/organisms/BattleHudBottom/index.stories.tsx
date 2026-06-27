import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { BattleHudBottom } from './index';

import type { WeaponType } from '@/components/molecules/WeaponSlotIcon';
import { BigNum } from '@/lib/bignum/BigNum';
import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

// ---------------------------------------------------------------------------
// Storybook helpers
// ---------------------------------------------------------------------------

/**
 * v1.3.7 Phase 4-B: BattleHudBottom は screw / bolt / currentWeapon / weaponSwitchCdSec /
 * activeCdSec / isAutoActive / isPaused / machineLevels.activeCdReduction を内部
 * `useStore` selector で直接購読するようになったため、 args を直接 props として渡せない。
 * Story 表示直前に `seedBattleState` で store に値を書き込み、 BattleHudBottom はそれを subscribe する形に変更。
 *
 * args は数値で受けて、 BigNum が必要なフィールドだけ wrapper 内で BigNum.fromNumber する。
 * (Storybook の UI で BigNum オブジェクトを編集するのは現実的でないため)
 */
interface StoryArgs {
  /** ネジ残高 (整数で指定) */
  screw: number;
  /** ラン中の獲得ボルト累計 (= bolt - runStartBolt の差分結果として表示される値) */
  earnedBolt: number;
  /** 現在装備中の武器 */
  equippedWeapon: WeaponType;
  /** 武器切替 CD 残秒数 (0=完了、 3=切替直後) */
  weaponSwitchCdSec: number;
  /** アクティブ CD 残秒数 (0=発動可能、 60=直後) */
  activeCdSec: number;
  /** アクティブ自動モード */
  isAutoActive: boolean;
  /** 一時停止中 */
  isPaused: boolean;
  /** マシン強化 activeCdReduction Lv (0 のとき activeMaxSec=60、 Lv 上昇で短縮) */
  activeCdReductionLv: number;
  /** ラン内ワークショップ Sheet の開閉 */
  isWorkshopOpen?: boolean;
}

function StoryHarness(args: StoryArgs) {
  useEffect(() => {
    // 各 Story の初回マウントで store を seed。 ストーリー切替時にも前ストーリーの値が残らないよう
    // resetBattleState → seedBattleState の順で実行する。
    resetBattleState();
    seedBattleState({
      // earnedBolt = bolt - runStartBolt なので、 bolt=earnedBolt, runStartBolt=0 で表示値を制御
      screw: BigNum.fromNumber(args.screw),
      bolt: BigNum.fromNumber(args.earnedBolt),
      runStartBolt: BigNum.ZERO,
      currentWeapon: args.equippedWeapon,
      weaponSwitchCdSec: args.weaponSwitchCdSec,
      activeCdSec: args.activeCdSec,
      isAutoActive: args.isAutoActive,
      isPaused: args.isPaused,
      machineLevels: { activeCdReduction: args.activeCdReductionLv },
    });
  }, [
    args.screw,
    args.earnedBolt,
    args.equippedWeapon,
    args.weaponSwitchCdSec,
    args.activeCdSec,
    args.isAutoActive,
    args.isPaused,
    args.activeCdReductionLv,
  ]);

  return (
    <BattleHudBottom
      onSwitchWeapon={() => {}}
      onActivate={() => {}}
      onToggleAuto={() => {}}
      onTogglePause={() => {}}
      onOpenScreenSaver={() => {}}
      isWorkshopOpen={args.isWorkshopOpen}
      onToggleWorkshop={() => {}}
    />
  );
}

const meta: Meta<typeof StoryHarness> = {
  title: 'Organisms/BattleHudBottom',
  component: StoryHarness,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: 412,
          margin: '0 auto',
          background: 'var(--c-bg-deep)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: 200,
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    screw: 12345,
    earnedBolt: 0,
    equippedWeapon: 'laser',
    weaponSwitchCdSec: 0,
    activeCdSec: 0,
    isAutoActive: false,
    isPaused: false,
    activeCdReductionLv: 0,
  },
};

export default meta;
type Story = StoryObj<typeof StoryHarness>;

// ---------------------------------------------------------------------------
// デフォルト（通常状態）
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: '通常状態 — アクティブ可能',
};

// ---------------------------------------------------------------------------
// アクティブ CD 中
// ---------------------------------------------------------------------------

export const ActiveOnCd: Story = {
  name: 'アクティブ CD 中',
  args: {
    activeCdSec: 36,
  },
};

// ---------------------------------------------------------------------------
// 自動モード
// ---------------------------------------------------------------------------

export const AutoMode: Story = {
  name: '自動モード ON',
  args: {
    isAutoActive: true,
  },
};

// ---------------------------------------------------------------------------
// 武器切替 CD 中
// ---------------------------------------------------------------------------

export const WeaponSwapCd: Story = {
  name: '武器切替 CD 中',
  args: {
    equippedWeapon: 'cannon',
    weaponSwitchCdSec: 1.5,
  },
};

// ---------------------------------------------------------------------------
// 一時停止中
// ---------------------------------------------------------------------------

export const Paused: Story = {
  name: '一時停止中',
  args: {
    isPaused: true,
  },
};

// ---------------------------------------------------------------------------
// ネジ大量
// ---------------------------------------------------------------------------

export const RichScrew: Story = {
  name: 'ネジ大量',
  args: {
    screw: 9999999,
  },
};

// ---------------------------------------------------------------------------
// Cutter 装備
// ---------------------------------------------------------------------------

export const CutterEquipped: Story = {
  name: 'Cutter 装備',
  args: {
    equippedWeapon: 'cutter',
  },
};

// ---------------------------------------------------------------------------
// ボトムシート展開 (workshop open)
// ---------------------------------------------------------------------------

export const WorkshopOpen: Story = {
  name: 'ボトムシート展開 (ワークショップ表示)',
  args: {
    isWorkshopOpen: true,
  },
};

// ---------------------------------------------------------------------------
// アクティブ CD 短縮 (Lv 高) - activeMaxSec が小さくなる
// ---------------------------------------------------------------------------

export const HighActiveCdReductionLv: Story = {
  name: 'アクティブ CD 短縮 Lv 高 (短縮率反映)',
  args: {
    activeCdReductionLv: 50,
  },
};
