import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

import { BattleHudTop } from './index';

import { BattleEntityStore } from '@/game/store/BattleEntityStore';
import { BattleEntityStoreProvider } from '@/game/store/BattleEntityStoreContext';
import { WAVE_DURATION_SEC } from '@/game/wave';
import { BigNum } from '@/lib/bignum/BigNum';
import { resetBattleState, seedBattleState } from '@/test-utils/seedBattleState';

// ---------------------------------------------------------------------------
// Storybook helpers
// ---------------------------------------------------------------------------

/**
 * v1.3.7 Phase 4-A: BattleHudTop は HP / Tier / Wave / paused を内部 `useStore` selector
 * で直接購読するようになったため、 args を直接 props として渡せない。 Story 表示直前に
 * `seedBattleState` で store に値を書き込み、 BattleHudTop はそれを subscribe する形に変更。
 *
 * args は数値で受けて、 BigNum が必要なフィールドだけ wrapper 内で BigNum.fromNumber する。
 * (Storybook の UI で BigNum オブジェクトを編集するのは現実的でないため)
 */
interface StoryArgs {
  hp: number;
  hpMax: number;
  tier: number;
  wave: number;
  totalWaves: number;
  /**
   * v1.3.7 Phase 5: BattleHudTop は内部で entityStore.getWaveElapsedSec() を呼ぶようになったため、
   * secondsRemaining は entityStore.setWaveElapsedSec(WAVE_DURATION_SEC - secondsRemaining)
   * で初期化される。
   */
  secondsRemaining: number;
  isBossWave?: boolean;
  nextMilestoneKind?: 'elite' | 'boss' | 'tier-up';
  nextMilestoneWave?: number;
  isPaused?: boolean;
  isResultOpen?: boolean;
}

function StoryHarness(args: StoryArgs) {
  // 各 Story の初回マウントで store を seed。 ストーリー切替時にも前ストーリーの値が残らないよう
  // resetBattleState → seedBattleState の順で実行する。
  useEffect(() => {
    resetBattleState();
    seedBattleState({
      machineHp: BigNum.fromNumber(args.hp),
      machineMaxHp: BigNum.fromNumber(args.hpMax),
      currentTier: args.tier,
      currentWave: args.wave,
      isPaused: args.isPaused ?? false,
    });
  }, [args.hp, args.hpMax, args.tier, args.wave, args.isPaused]);

  // v1.3.7 Phase 5: BattleHudTop は内部で `useEntityStore()` を呼ぶため Provider が必須。
  // secondsRemaining args は entityStore.setWaveElapsedSec(WAVE_DURATION_SEC - secondsRemaining)
  // で再現する。
  const entityStoreRef = useRef<BattleEntityStore | null>(null);
  if (entityStoreRef.current === null) {
    entityStoreRef.current = new BattleEntityStore();
  }
  const entityStore = entityStoreRef.current;
  entityStore.setWaveElapsedSec(Math.max(0, WAVE_DURATION_SEC - args.secondsRemaining));

  const nextMilestone =
    args.nextMilestoneKind != null && args.nextMilestoneWave != null
      ? { wave: args.nextMilestoneWave, kind: args.nextMilestoneKind }
      : undefined;

  return (
    <BattleEntityStoreProvider store={entityStore}>
      <BattleHudTop
        totalWaves={args.totalWaves}
        isBossWave={args.isBossWave}
        nextMilestone={nextMilestone}
        isResultOpen={args.isResultOpen}
      />
    </BattleEntityStoreProvider>
  );
}

const meta: Meta<typeof StoryHarness> = {
  title: 'Organisms/BattleHudTop',
  component: StoryHarness,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 412, margin: '0 auto', background: 'var(--c-bg-deep)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StoryHarness>;

// ---------------------------------------------------------------------------
// 通常ウェーブ（HP 満タン）
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: '通常ウェーブ — HP 満タン',
  args: {
    hp: 1000,
    hpMax: 1000,
    tier: 3,
    wave: 5,
    totalWaves: 30,
    secondsRemaining: 18,
    isBossWave: false,
  },
};

// ---------------------------------------------------------------------------
// HP 低下（30% 未満）
// ---------------------------------------------------------------------------

export const LowHp: Story = {
  name: 'HP 低下 (20%)',
  args: {
    hp: 200,
    hpMax: 1000,
    tier: 5,
    wave: 12,
    totalWaves: 30,
    secondsRemaining: 8,
    isBossWave: false,
  },
};

// ---------------------------------------------------------------------------
// ボスウェーブ
// ---------------------------------------------------------------------------

export const BossWave: Story = {
  name: 'ボスウェーブ',
  args: {
    hp: 850,
    hpMax: 1000,
    tier: 7,
    wave: 30,
    totalWaves: 30,
    secondsRemaining: 3,
    isBossWave: true,
    nextMilestoneKind: 'boss',
    nextMilestoneWave: 30,
  },
};

// ---------------------------------------------------------------------------
// エリートウェーブ
// ---------------------------------------------------------------------------

export const EliteWave: Story = {
  name: 'エリートウェーブ近接',
  args: {
    hp: 650,
    hpMax: 1000,
    tier: 4,
    wave: 9,
    totalWaves: 30,
    secondsRemaining: 20,
    isBossWave: false,
    nextMilestoneKind: 'elite',
    nextMilestoneWave: 10,
  },
};

// ---------------------------------------------------------------------------
// 高 Tier（大きい数値）
// ---------------------------------------------------------------------------

export const HighTier: Story = {
  name: '高 Tier — 大きな数値',
  args: {
    hp: 123456789,
    hpMax: 200000000,
    tier: 10,
    wave: 22,
    totalWaves: 30,
    secondsRemaining: 14,
    isBossWave: false,
    nextMilestoneKind: 'tier-up',
    nextMilestoneWave: 30,
  },
};
