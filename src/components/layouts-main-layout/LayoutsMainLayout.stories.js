import type { Meta, StoryObj } from '@storybook/vue3';
import LayoutsMainLayout from './LayoutsMainLayout.vue';

const meta: Meta<typeof LayoutsMainLayout> = {
  title: 'Components/LayoutsMainLayout',
  component: LayoutsMainLayout,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof LayoutsMainLayout>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
