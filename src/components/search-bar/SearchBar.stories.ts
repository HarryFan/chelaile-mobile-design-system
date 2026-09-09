import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import SearchBar from './SearchBar.vue';

const meta = {
  title: 'Basic/SearchBar',
  component: SearchBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 預設: Story = {};

export const 帶預設值: Story = {
  args: { defaultValue: '南京三民站' },
};

export const 停用: Story = {
  args: { disabled: true, defaultValue: '定位中無法搜尋' },
};

/**
 * 受控用法：搜尋值由外部狀態持有（v-model）。
 * 下方會顯示 debounce 後才觸發的 search 值——用中文輸入法打字時，
 * 組字過程不會觸發，選字完成才算一次輸入。
 */
export const 受控: Story = {
  render: () => ({
    components: { SearchBar },
    setup() {
      const value = ref('');
      const searched = ref('');
      return { value, searched };
    },
    template: `
      <div style="display: grid; gap: 12px">
        <SearchBar v-model="value" :debounce-ms="400" @search="searched = $event" />
        <div style="font-size: 12px; color: #8A8F99">
          <div>目前輸入：{{ value || '（空）' }}</div>
          <div>debounce 後查詢：{{ searched || '（尚未觸發）' }}</div>
        </div>
      </div>
    `,
  }),
};
