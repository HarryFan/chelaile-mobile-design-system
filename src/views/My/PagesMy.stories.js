import type { Meta, StoryObj } from '@storybook/vue3';
import PagesMy from './PagesMy.vue';

const meta: Meta<typeof PagesMy> = {
  title: 'Components/PagesMy',
  component: PagesMy,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof PagesMy>;

export const Default: Story = {
  args: {
    // 默認參數
  },
};
