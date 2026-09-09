import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EmptyState from '../EmptyState.vue';

describe('EmptyState', () => {
  it('預設渲染「暫無資料」並帶 role=status', () => {
    const wrapper = mount(EmptyState);
    const root = wrapper.find('[role="status"]');
    expect(root.exists()).toBe(true);
    expect(root.text()).toContain('暫無資料');
    expect(root.classes()).toContain('cl-empty-state');
  });

  it('沒給 description 就不渲染那個節點', async () => {
    const wrapper = mount(EmptyState, { props: { title: '附近沒有站牌' } });
    expect(wrapper.find('.cl-empty-state__desc').exists()).toBe(false);

    await wrapper.setProps({ description: '試著放大地圖範圍' });
    expect(wrapper.find('.cl-empty-state__desc').text()).toBe('試著放大地圖範圍');
  });

  it('有 actionText 才顯示按鈕，點擊會 emit action', async () => {
    const wrapper = mount(EmptyState);
    expect(wrapper.find('button').exists()).toBe(false);

    await wrapper.setProps({ actionText: '去搜尋路線' });
    const btn = wrapper.find('button');
    expect(btn.text()).toBe('去搜尋路線');
    expect(btn.classes()).toContain('cl-button--primary');
    expect(btn.classes()).toContain('cl-button--sm');
    expect(btn.classes()).toContain('cl-button--round');

    await btn.trigger('click');
    expect(wrapper.emitted('action')).toHaveLength(1);
  });

  it('icon 對輔助科技隱藏，並套用傳入的 Remix Icon class', () => {
    const wrapper = mount(EmptyState, { props: { icon: 'ri-bus-line' } });
    const icon = wrapper.find('i.cl-empty-state__icon');
    expect(icon.attributes('aria-hidden')).toBe('true');
    expect(icon.classes()).toContain('cl-icon');
    expect(icon.classes()).toContain('ri-bus-line');
    expect(icon.text()).toBe('');
  });

  it('沒給 icon 時預設用 ri-inbox-line', () => {
    const wrapper = mount(EmptyState);
    expect(wrapper.find('.cl-empty-state__icon').classes()).toContain('ri-inbox-line');
  });

  it('外部 class 會合併到 root 上，讓使用端可覆寫樣式', () => {
    const wrapper = mount(EmptyState, { attrs: { class: 'custom' } });
    expect(wrapper.find('[role="status"]').classes()).toContain('custom');
  });
});
