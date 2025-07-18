import type { Meta, StoryObj } from '@storybook/vue3';
import PagesRoutePlan from './PagesRoutePlan.vue';

const meta: Meta<typeof PagesRoutePlan> = {
  title: 'Components/PagesRoutePlan',
  component: PagesRoutePlan,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof PagesRoutePlan>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
