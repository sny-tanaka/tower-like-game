import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { PageHeader } from './index';

import { IconButton } from '@/components/atoms/IconButton';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';

const meta: Meta<typeof PageHeader> = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'deep' },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

/** store に初期値を注入するデコレーター */
function WithStoreState({
  bolt = 1_234_567,
  alloy = 845,
  screw = 0,
  isRunActive = false,
  children,
}: {
  bolt?: number;
  alloy?: number;
  screw?: number;
  isRunActive?: boolean;
  children: React.ReactNode;
}) {
  useEffect(() => {
    useStore.setState({
      bolt: BigNum.fromNumber(bolt),
      alloy: BigNum.fromNumber(alloy),
      screw: BigNum.fromNumber(screw),
      isRunActive,
    });
  }, [bolt, alloy, screw, isRunActive]);
  return <>{children}</>;
}

/** マシン強化 (bolt のみ) */
export const MachinePage: Story = {
  render: () => (
    <WithStoreState bolt={1_234_567}>
      <PageHeader
        title="マシン強化"
        onBack={() => {}}
        currencies={['bolt']}
      />
    </WithStoreState>
  ),
};

/** 武器庫 (bolt + alloy) */
export const ArmoryPage: Story = {
  render: () => (
    <WithStoreState
      bolt={1_234_567}
      alloy={845}
    >
      <PageHeader
        title="武器庫"
        onBack={() => {}}
        currencies={['bolt', 'alloy']}
      />
    </WithStoreState>
  ),
};

/** パッチ庫 (通貨なし) */
export const PatchesPage: Story = {
  render: () => (
    <WithStoreState>
      <PageHeader
        title="パッチ庫"
        subtitle="装着 6 / 8 · 在庫 42 種"
        onBack={() => {}}
      />
    </WithStoreState>
  ),
};

/** タイトル画面 (戻るなし) */
export const TitlePage: Story = {
  render: () => (
    <WithStoreState>
      <PageHeader
        title="NEON SPIRE"
        subtitle="v0.1.0"
      />
    </WithStoreState>
  ),
};

/** 出撃準備 (3 通貨 + 設定ボタン、ラン中なので screw 表示) */
export const PreparationPageRunActive: Story = {
  render: () => (
    <WithStoreState
      bolt={1_234_567}
      alloy={845}
      screw={320}
      isRunActive
    >
      <PageHeader
        title="出撃準備"
        onBack={() => {}}
        currencies={['screw', 'bolt', 'alloy']}
        actions={
          <IconButton
            icon="settings"
            label="設定"
            variant="ghost"
            size="sm"
          />
        }
      />
    </WithStoreState>
  ),
};

/** screw は非ランアクティブ時に非表示 */
export const ScrewHiddenOutsideRun: Story = {
  render: () => (
    <WithStoreState
      bolt={1_234_567}
      alloy={845}
      screw={320}
      isRunActive={false}
    >
      <PageHeader
        title="出撃準備"
        currencies={['screw', 'bolt', 'alloy']}
      />
    </WithStoreState>
  ),
};

/** 長いタイトル (truncate) */
export const LongTitle: Story = {
  render: () => (
    <WithStoreState bolt={999}>
      <PageHeader
        title="非常に長い画面タイトル名のテスト表示"
        subtitle="サブタイトルも省略表示の対象"
        onBack={() => {}}
        currencies={['bolt']}
      />
    </WithStoreState>
  ),
};
