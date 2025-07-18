import type { Meta, StoryObj } from '@storybook/vue3';
import { StationCard } from './';
import { ref } from 'vue';

const meta: Meta<typeof StationCard> = {
  title: 'Components/StationCard',
  component: StationCard,
  tags: ['autodocs'],
  argTypes: {
    onAction: { action: 'action' },
  },
  args: {
    stationName: '市政府站',
    distance: '320m',
    showAction: true,
    actionText: '查看詳情',
  },
};

export default meta;

type Story = StoryObj<typeof StationCard>;

export const Default: Story = {
  args: {
    busList: [
      { routeId: '1', routeName: '32', arrivalTime: '2分鐘', isArriving: true },
      { routeId: '2', routeName: '262', arrivalTime: '5分鐘' },
      { routeId: '3', routeName: '藍26', arrivalTime: '8分鐘' },
    ],
  },
};

export const Loading: Story = {
  args: {
    busList: [
      { routeId: '1', routeName: '32', arrivalTime: undefined },
      { routeId: '2', routeName: '262', arrivalTime: undefined },
    ],
  },
};

export const SingleBus: Story = {
  args: {
    stationName: '松山車站',
    distance: '150m',
    busList: [
      { routeId: '1', routeName: '306', arrivalTime: '即將到站', isArriving: true },
    ],
  },
};

export const WithoutAction: Story = {
  args: {
    ...Default.args,
    showAction: false,
  },
};
