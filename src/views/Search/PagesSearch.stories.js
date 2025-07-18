import type { Meta, StoryObj } from '@storybook/vue3';
import PagesSearch from './PagesSearch.vue';

const meta: Meta<typeof PagesSearch> = {
  title: 'Components/PagesSearch',
  component: PagesSearch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof PagesSearch>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
