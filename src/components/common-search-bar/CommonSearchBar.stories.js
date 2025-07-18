import type { Meta, StoryObj } from '@storybook/vue3';
import CommonSearchBar from './CommonSearchBar.vue';

const meta: Meta<typeof CommonSearchBar> = {
  title: 'Components/CommonSearchBar',
  component: CommonSearchBar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CommonSearchBar>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
