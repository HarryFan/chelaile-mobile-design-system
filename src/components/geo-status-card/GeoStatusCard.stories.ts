import type { Meta, StoryObj } from '@storybook/vue3';
import GeoStatusCard from './GeoStatusCard.vue';

const meta: Meta<typeof GeoStatusCard> = {
  title: 'Components/GeoStatusCard',
  component: GeoStatusCard,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'warning', 'error', 'loading'],
      description: '卡片狀態',
    },
    title: {
      control: 'text',
      description: '卡片標題',
    },
    statusText: {
      control: 'text',
      description: '狀態文字',
    },
    showAction: {
      control: 'boolean',
      description: '是否顯示操作按鈕',
    },
    actionText: {
      control: 'text',
      description: '操作按鈕文字',
    },
  },
  args: {
    title: '當前位置',
    status: 'success',
    statusText: '已定位到您的位置',
    showAction: true,
    actionText: '查看',
  },
};

export default meta;

type Story = StoryObj<typeof GeoStatusCard>;

export const Success: Story = {
  args: {
    status: 'success',
    statusText: '已成功定位到您的位置',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    statusText: '正在獲取精確位置...',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    statusText: '無法獲取位置信息',
  },
};

export const Loading: Story = {
  args: {
    status: 'loading',
    statusText: '正在獲取位置...',
  },
};

export const WithLongText: Story = {
  args: {
    title: '非常長的位置名稱，這個位置名稱可能非常長，需要被截斷顯示',
    statusText: '這是一個非常長的狀態描述，用於測試文字截斷和佈局',
    showAction: true,
  },
};

export const WithoutAction: Story = {
  args: {
    showAction: false,
  },
};
