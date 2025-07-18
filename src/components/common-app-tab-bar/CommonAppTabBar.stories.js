import type { Meta, StoryObj } from '@storybook/vue3';
import CommonAppTabBar from './CommonAppTabBar.vue';

const meta: Meta<typeof CommonAppTabBar> = {
  title: 'Components/CommonAppTabBar',
  component: CommonAppTabBar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CommonAppTabBar>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
