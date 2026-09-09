import type { Meta, StoryObj } from '@storybook/vue3';
import StationCard from './StationCard.vue';
import type { BusInfo } from './useStationCard';

const busList: BusInfo[] = [
  { routeId: '307', routeName: '307', arrivalTime: '2 分', isArriving: true },
  { routeId: '藍7', routeName: '藍7', arrivalTime: '8 分' },
  { routeId: '652', routeName: '652' },
];

const meta = {
  title: 'Business/StationCard',
  component: StationCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { stationName: '市政府站', distance: '250 公尺', busList },
} satisfies Meta<typeof StationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 預設: Story = {};

/** distance 沒給就不渲染距離區塊——空值占位由父層決定，元件不自己補 `--`。 */
export const 無距離: Story = {
  args: { distance: undefined },
};

/** arrivalTime 缺值顯示「更新中」文字，不用 spinner，兩邊一致好測。 */
export const 更新中: Story = {
  args: {
    busList: [
      { routeId: '307', routeName: '307' },
      { routeId: '652', routeName: '652' },
    ],
  },
};

export const 無班次: Story = {
  args: { busList: [] },
};

/** actionText 有值才顯示 secondary / sm / round 按鈕。 */
export const 含操作按鈕: Story = {
  args: { actionText: '查看站牌' },
};
