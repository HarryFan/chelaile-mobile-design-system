import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta = {
  title: 'Basic/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { variant: 'primary', size: 'md', round: false, block: false, loading: false, disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">確認搭乘</Button>',
  }),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 主要: Story = {};

export const 變體: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap">
        <Button v-bind="args" variant="primary">主要操作</Button>
        <Button v-bind="args" variant="secondary">次要操作</Button>
        <Button v-bind="args" variant="danger">刪除路線</Button>
        <Button v-bind="args" variant="ghost">取消</Button>
      </div>
    `,
  }),
};

export const 尺寸: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <div style="display: flex; gap: 12px; align-items: center">
        <Button v-bind="args" size="sm">小</Button>
        <Button v-bind="args" size="md">中</Button>
        <Button v-bind="args" size="lg">大</Button>
      </div>
    `,
  }),
};

/** loading 期間點擊會被擋掉，但按鈕仍可聚焦，讓螢幕閱讀器讀得到 aria-busy。 */
export const 載入中: Story = {
  args: { loading: true },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">查詢中</Button>',
  }),
};

export const 停用: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">無法搭乘</Button>',
  }),
};

export const 圓角撐滿: Story = {
  args: { round: true, block: true },
  parameters: { layout: 'padded' },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">立即規劃路線</Button>',
  }),
};
