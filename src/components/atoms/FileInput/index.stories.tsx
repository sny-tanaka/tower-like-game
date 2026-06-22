import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { FileInput } from './index';

const meta: Meta<typeof FileInput> = {
  title: 'Atoms/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    accept: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

function ControlledFileInput(props: Omit<React.ComponentProps<typeof FileInput>, 'onChange'>) {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div>
      <FileInput
        {...props}
        onChange={setFile}
      />
      <div style={{ marginTop: 8, fontSize: 12, color: 'var(--c-text-dim)' }}>
        {file ? `選択: ${file.name} (${file.size} bytes)` : '未選択'}
      </div>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <ControlledFileInput {...args} />,
  args: {
    label: 'ファイルを選択',
    accept: 'application/json',
  },
};

export const CustomLabel: Story = {
  render: (args) => <ControlledFileInput {...args} />,
  args: {
    label: 'セーブデータをインポート',
    accept: 'application/json',
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledFileInput {...args} />,
  args: {
    label: 'ファイルを選択',
    disabled: true,
  },
};
