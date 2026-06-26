import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { AutoToggle } from './index';

const meta: Meta<typeof AutoToggle> = {
  title: 'Atoms/AutoToggle',
  component: AutoToggle,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AutoToggle>;

export const Off: Story = {
  name: 'OFF (グレー)',
  args: {
    enabled: false,
    onToggle: () => undefined,
  },
};

export const On: Story = {
  name: 'ON (紫)',
  args: {
    enabled: true,
    onToggle: () => undefined,
  },
};

function InteractiveStory() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        background: 'var(--c-bg-deep)',
        padding: 24,
      }}
    >
      <AutoToggle
        enabled={enabled}
        onToggle={setEnabled}
      />
      <span style={{ color: 'var(--c-text)', fontFamily: 'var(--ff-display)' }}>
        現在: {enabled ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}

export const Interactive: Story = {
  name: 'インタラクティブ',
  render: () => <InteractiveStory />,
};
