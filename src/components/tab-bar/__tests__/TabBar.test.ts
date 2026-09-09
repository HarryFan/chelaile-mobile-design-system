import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TabBar from '../TabBar.vue';
import { formatBadge, type TabBarItem } from '../useTabBar';

const items: TabBarItem[] = [
  { key: 'home', label: '首頁', icon: '🏠' },
  { key: 'nearby', label: '附近', icon: '📍' },
  { key: 'me', label: '我的', icon: '👤' },
];

const tabByKey = (wrapper: ReturnType<typeof mount>, key: string) =>
  wrapper.find(`[role="tab"][data-key="${key}"]`);

describe('TabBar', () => {
  it('渲染 tablist 與每個 tab，選中的帶 aria-selected 與 tabindex=0', () => {
    const wrapper = mount(TabBar, { props: { items, modelValue: 'nearby' } });
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="tab"]')).toHaveLength(3);

    const active = tabByKey(wrapper, 'nearby');
    expect(active.attributes('aria-selected')).toBe('true');
    expect(active.attributes('tabindex')).toBe('0');
    expect(active.classes()).toContain('is-active');
    expect(active.find('.cl-tab-bar__indicator').exists()).toBe(true);

    const inactive = tabByKey(wrapper, 'home');
    expect(inactive.attributes('aria-selected')).toBe('false');
    expect(inactive.attributes('tabindex')).toBe('-1');
  });

  it('點擊其他 tab 會 emit change 與 update:modelValue', async () => {
    const wrapper = mount(TabBar, { props: { items, modelValue: 'home' } });
    await tabByKey(wrapper, 'me').trigger('click');
    expect(wrapper.emitted('change')).toEqual([['me']]);
    expect(wrapper.emitted('update:modelValue')).toEqual([['me']]);
  });

  it('點擊已選中的 tab 不 emit change', async () => {
    const wrapper = mount(TabBar, { props: { items, modelValue: 'home' } });
    await tabByKey(wrapper, 'home').trigger('click');
    expect(wrapper.emitted('change')).toBeUndefined();
  });

  it('在最後一個 tab 按 ArrowRight 會循環回第一個', async () => {
    const wrapper = mount(TabBar, { props: { items, modelValue: 'me' }, attachTo: document.body });
    await tabByKey(wrapper, 'me').trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('change')).toEqual([['home']]);
    wrapper.unmount();
  });

  it('在第一個 tab 按 ArrowLeft 會循環到最後一個', async () => {
    const wrapper = mount(TabBar, { props: { items, modelValue: 'home' }, attachTo: document.body });
    await tabByKey(wrapper, 'home').trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.emitted('change')).toEqual([['me']]);
    wrapper.unmount();
  });

  it('badge 120 顯示 99+', () => {
    const wrapper = mount(TabBar, { props: { items: [{ key: 'news', label: '消息', badge: 120 }], modelValue: 'news' } });
    expect(wrapper.find('.cl-tab-bar__badge').text()).toBe('99+');
  });

  it('badge 為 0 或未給時不渲染徽章', () => {
    const wrapper = mount(TabBar, {
      props: {
        items: [
          { key: 'a', label: '零', badge: 0 },
          { key: 'b', label: '未給' },
        ],
        modelValue: 'a',
      },
    });
    expect(wrapper.find('.cl-tab-bar__badge').exists()).toBe(false);
  });

  it('formatBadge 的邊界值', () => {
    expect(formatBadge(undefined)).toBeUndefined();
    expect(formatBadge(0)).toBeUndefined();
    expect(formatBadge(99)).toBe('99');
    expect(formatBadge(100)).toBe('99+');
  });
});
