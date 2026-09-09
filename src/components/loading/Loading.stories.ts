import type { Meta, StoryObj } from '@storybook/vue3';
import Loading from './Loading.vue';

const meta = {
  title: 'Basic/Loading',
  component: Loading,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { text: '載入中…', size: 'md', overlay: false },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  render: (args) => ({
    components: { Loading },
    setup: () => ({ args }),
    template: '<Loading v-bind="args" />',
  }),
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 預設: Story = {};

export const 尺寸: Story = {
  render: (args) => ({
    components: { Loading },
    setup: () => ({ args }),
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-end">
        <Loading v-bind="args" size="sm" text="小" />
        <Loading v-bind="args" size="md" text="中" />
        <Loading v-bind="args" size="lg" text="大" />
      </div>
    `,
  }),
};

/** text 給空字串就只剩 spinner，不會留一個空的文字節點。 */
export const 只有轉圈: Story = {
  args: { text: '' },
};

/** overlay 會 fixed 蓋住整個畫面，擋掉底下內容的互動。 */
export const 全螢幕遮罩: Story = {
  args: { overlay: true, size: 'lg', text: '正在取得到站時間…' },
  parameters: { layout: 'fullscreen' },
  render: (args) => ({
    components: { Loading },
    setup: () => ({ args }),
    template: `
      <div style="height: 320px; padding: 16px">
        <p>底下的內容會被遮罩蓋住，無法點擊。</p>
        <Loading v-bind="args" />
      </div>
    `,
  }),
};
