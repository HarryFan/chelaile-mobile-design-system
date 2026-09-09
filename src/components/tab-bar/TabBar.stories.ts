import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import TabBar from './TabBar.vue';
import type { TabBarItem } from './useTabBar';

const items: TabBarItem[] = [
  { key: 'home', label: '首頁', icon: 'ri-home-5-line' },
  { key: 'nearby', label: '附近', icon: 'ri-map-pin-2-line' },
  { key: 'favorite', label: '收藏', icon: 'ri-star-line', badge: 3 },
  { key: 'news', label: '消息', icon: 'ri-notification-3-line', badge: 120 },
  { key: 'me', label: '我的', icon: 'ri-user-3-line' },
];

const meta = {
  title: 'Navigation/TabBar',
  component: TabBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { items, modelValue: 'home' },
  argTypes: { onChange: { action: 'change' } },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 預設: Story = {};

/** 受控用法：父層用 v-model 保存 active。點擊已選中的 tab 不會觸發 change。 */
export const 受控: Story = {
  render: (args) => ({
    components: { TabBar },
    setup() {
      const active = ref(args.modelValue);
      return { args, active };
    },
    template: '<TabBar v-bind="args" v-model="active" />',
  }),
};

/** badge 大於 99 顯示 `99+`；0 或未給不渲染徽章。 */
export const 徽章: Story = {
  args: {
    items: [
      { key: 'a', label: '無徽章', icon: 'ri-notification-3-line' },
      { key: 'b', label: '零', icon: 'ri-notification-3-line', badge: 0 },
      { key: 'c', label: '個位', icon: 'ri-notification-3-line', badge: 5 },
      { key: 'd', label: '破百', icon: 'ri-notification-3-line', badge: 120 },
    ],
    modelValue: 'a',
  },
};

/** 沒有 icon 也能用，純文字排版。 */
export const 純文字: Story = {
  args: {
    items: [
      { key: 'bus', label: '公車' },
      { key: 'metro', label: '捷運' },
      { key: 'bike', label: '單車' },
    ],
    modelValue: 'metro',
  },
};
