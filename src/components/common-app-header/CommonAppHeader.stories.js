import type { Meta, StoryObj } from '@storybook/vue3';
import CommonAppHeader from './CommonAppHeader.vue';

const meta: Meta<typeof CommonAppHeader> = {
  title: 'Components/CommonAppHeader',
  component: CommonAppHeader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CommonAppHeader>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
