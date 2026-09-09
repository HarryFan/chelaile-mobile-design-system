import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Loading from '../Loading.vue';

describe('Loading', () => {
  it('root 帶 role=status 與 aria-live=polite，載入結束時螢幕閱讀器才補播報', () => {
    const wrapper = mount(Loading);
    const root = wrapper.find('[role="status"]');
    expect(root.exists()).toBe(true);
    expect(root.attributes('aria-live')).toBe('polite');
    expect(root.classes()).toContain('cl-loading');
  });

  it('預設顯示「載入中…」', () => {
    const wrapper = mount(Loading);
    expect(wrapper.find('.cl-loading__text').text()).toBe('載入中…');
  });

  it('size 反映在 modifier class 上，預設 md', async () => {
    // 模板 root 前有註解節點，VTU 的 wrapper.classes() 會拿到空陣列，須先 find 到 root
    const wrapper = mount(Loading);
    const root = () => wrapper.find('[role="status"]');
    expect(root().classes()).toContain('cl-loading--md');

    await wrapper.setProps({ size: 'lg' });
    expect(root().classes()).toContain('cl-loading--lg');
    expect(root().classes()).not.toContain('cl-loading--md');
  });

  it('overlay 時 root 加上 is-overlay', async () => {
    const wrapper = mount(Loading);
    const root = () => wrapper.find('[role="status"]');
    expect(root().classes()).not.toContain('is-overlay');

    await wrapper.setProps({ overlay: true });
    expect(root().classes()).toContain('is-overlay');
  });

  it('text 給空字串就不渲染文字節點，spinner 仍在且對輔助科技隱藏', () => {
    const wrapper = mount(Loading, { props: { text: '' } });
    expect(wrapper.find('.cl-loading__text').exists()).toBe(false);
    expect(wrapper.find('.cl-loading__spinner').attributes('aria-hidden')).toBe('true');
  });
});
