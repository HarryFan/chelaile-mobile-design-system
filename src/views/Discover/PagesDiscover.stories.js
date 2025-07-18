import type { Meta, StoryObj } from '@storybook/vue3';
import PagesDiscover from './PagesDiscover.vue';

const meta: Meta<typeof PagesDiscover> = {
  title: 'Components/PagesDiscover',
  component: PagesDiscover,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof PagesDiscover>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
