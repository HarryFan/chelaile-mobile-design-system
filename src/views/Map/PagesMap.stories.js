import type { Meta, StoryObj } from '@storybook/vue3';
import PagesMap from './PagesMap.vue';

const meta: Meta<typeof PagesMap> = {
  title: 'Components/PagesMap',
  component: PagesMap,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof PagesMap>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
