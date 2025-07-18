import type { Meta, StoryObj } from '@storybook/vue3';
import PagesHome from './PagesHome.vue';

const meta: Meta<typeof PagesHome> = {
  title: 'Components/PagesHome',
  component: PagesHome,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof PagesHome>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
