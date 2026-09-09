import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StatusCard from '../StatusCard.vue';

describe('StatusCard', () => {
  it('渲染標題與說明', () => {
    const wrapper = mount(StatusCard, { props: { title: '定位成功', description: '台北市信義區' } });
    expect(wrapper.find('h3.cl-status-card__title').text()).toBe('定位成功');
    expect(wrapper.find('.cl-status-card__desc').text()).toBe('台北市信義區');
  });

  it('danger 用 role=alert + assertive，其餘用 role=status + polite', () => {
    const danger = mount(StatusCard, { props: { tone: 'danger', title: '定位失敗' } });
    expect(danger.attributes('role')).toBe('alert');
    expect(danger.attributes('aria-live')).toBe('assertive');

    const success = mount(StatusCard, { props: { tone: 'success', title: '定位成功' } });
    expect(success.attributes('role')).toBe('status');
    expect(success.attributes('aria-live')).toBe('polite');
  });

  it('沒給 description 就不渲染那個節點', () => {
    const wrapper = mount(StatusCard, { props: { title: '已在最近站牌' } });
    expect(wrapper.find('.cl-status-card__desc').exists()).toBe(false);
    const empty = mount(StatusCard, { props: { title: '已在最近站牌', description: '' } });
    expect(empty.find('.cl-status-card__desc').exists()).toBe(false);
  });

  it('有 actionText 才顯示按鈕，點擊會 emit action', async () => {
    const wrapper = mount(StatusCard, { props: { title: '無法定位' } });
    expect(wrapper.find('button').exists()).toBe(false);

    await wrapper.setProps({ actionText: '重新定位' });
    const btn = wrapper.find('button');
    expect(btn.text()).toBe('重新定位');
    expect(btn.classes()).toContain('cl-button--secondary');
    await btn.trigger('click');
    expect(wrapper.emitted('action')).toHaveLength(1);
  });

  it('tone 反映在 class 上，預設 info', () => {
    const warning = mount(StatusCard, { props: { tone: 'warning', title: '精度較低' } });
    expect(warning.classes()).toContain('cl-status-card--warning');
    const fallback = mount(StatusCard, { props: { title: '預設' } });
    expect(fallback.classes()).toContain('cl-status-card--info');
  });

  it('icon 對輔助技術隱藏', () => {
    const wrapper = mount(StatusCard, { props: { title: '定位成功' } });
    expect(wrapper.find('.cl-status-card__icon').attributes('aria-hidden')).toBe('true');
  });
});
