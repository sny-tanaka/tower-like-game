import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { PatchScreen } from './index';

import { withAppContext } from '@/__stories__/decorators';
import { useStore } from '@/store/index';

/**
 * パッチ庫の典型的な装着状態 (3/8) を design ref に合わせて再現する。
 * T1/T2/T3 のパッチを在庫に追加 → 装着スロット 0/1/2 に配置。
 */
function WithPatchesSeed({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const state = useStore.getState();
    state.resetPatches();
    state.clearEquippedPatches();

    // パッチスロット数: 4 (= 1 + Lv 3) → 4 解放 + 残り 2 ロック (design ref と同じ「3/4 装着」状態)
    state.setMachineLv('patchSlots', 3);

    // 在庫にパッチを追加
    state.addPatch('damageImmune', 1, 4);
    state.addPatch('freezeHit', 2, 2);
    state.addPatch('instantKill', 3, 1);
    state.addPatch('killHeal', 1, 3);
    state.addPatch('bonusDrop', 1, 2);

    // 装着スロット 0,1,2 に配置 (design ref と同じ「3 装着」状態)
    state.equipPatch(0, 'damageImmune', 1);
    state.equipPatch(1, 'freezeHit', 2);
    state.equipPatch(2, 'instantKill', 3);
  }, []);
  return <>{children}</>;
}

const meta: Meta<typeof PatchScreen> = {
  title: 'Pages/PatchScreen',
  component: PatchScreen,
  decorators: [withAppContext('patches')],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'deep' },
    viewport: { defaultViewport: 'iphone12' },
  },
};

export default meta;
type Story = StoryObj<typeof PatchScreen>;

/** デフォルト (装着タブ) — design ref と同じ「3 装着 / スロット解放」状態 */
export const Default: Story = {
  render: () => (
    <WithPatchesSeed>
      <PatchScreen />
    </WithPatchesSeed>
  ),
};
