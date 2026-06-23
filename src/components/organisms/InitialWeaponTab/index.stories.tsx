import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { InitialWeaponTab } from './index';

import type { WeaponType } from '@/store/slices/weapons';

const meta: Meta<typeof InitialWeaponTab> = {
  title: 'Organisms/InitialWeaponTab',
  component: InitialWeaponTab,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 412, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InitialWeaponTab>;

/** Laser が初期選択状態 */
export const Default: Story = {
  args: {
    selectedWeapon: 'laser',
  },
};

/** Cannon 選択 */
export const CannonSelected: Story = {
  args: {
    selectedWeapon: 'cannon',
  },
};

/** Thunder 選択 */
export const ThunderSelected: Story = {
  args: {
    selectedWeapon: 'thunder',
  },
};

/** Cutter 選択 */
export const CutterSelected: Story = {
  args: {
    selectedWeapon: 'cutter',
  },
};

/** インタラクティブデモ */
export const Interactive: Story = {
  render: () => {
    function Demo() {
      const [selected, setSelected] = useState<WeaponType>('laser');
      return (
        <div>
          <InitialWeaponTab
            selectedWeapon={selected}
            onSelect={setSelected}
          />
          <p
            style={{
              marginTop: 12,
              fontSize: 12,
              color: 'var(--c-text-dim)',
              fontFamily: 'var(--ff-numeric)',
            }}
          >
            選択中: {selected.toUpperCase()}
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};
