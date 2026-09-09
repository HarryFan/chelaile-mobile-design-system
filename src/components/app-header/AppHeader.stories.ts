import type { Meta, StoryObj } from '@storybook/vue3';
import AppHeader from './AppHeader.vue';
import Button from '../button/Button.vue';

const meta = {
  title: 'Navigation/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { title: '附近站牌', showBack: true, backLabel: '返回' },
  render: (args) => ({
    components: { AppHeader },
    setup: () => ({ args }),
    template: '<AppHeader v-bind="args" />',
  }),
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 預設: Story = {};

/** 首頁這類不能返回的頁面，把 showBack 關掉。 */
export const 無返回鈕: Story = {
  args: { showBack: false, title: '首頁' },
};

/** right slot 放動作區，例如搜尋或設定。 */
export const 右側動作: Story = {
  render: (args) => ({
    components: { AppHeader, Button },
    setup: () => ({ args }),
    template: `
      <AppHeader v-bind="args">
        <template #right><Button variant="ghost" size="sm">編輯</Button></template>
      </AppHeader>
    `,
  }),
};

/** left slot 有給就覆蓋返回鈕，即使 showBack 為 true。 */
export const 自訂左側: Story = {
  render: (args) => ({
    components: { AppHeader, Button },
    setup: () => ({ args }),
    template: `
      <AppHeader v-bind="args">
        <template #left><Button variant="ghost" size="sm">關閉</Button></template>
      </AppHeader>
    `,
  }),
};

/** 沒 title 不渲染 h1，空值占位由父層決定。 */
export const 無標題: Story = {
  args: { title: undefined },
};
