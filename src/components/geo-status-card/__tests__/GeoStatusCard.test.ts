import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import GeoStatusCard from '../GeoStatusCard.vue';

describe('GeoStatusCard（StatusCard 薄包裝）', () => {
  it('預設 props：顯示標題、success tone、不顯示按鈕', () => {
    const wrapper = mount(GeoStatusCard, { props: { title: 'Test Title' } });
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.classes()).toContain('cl-status-card--success');
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('statusText 映射到 description', () => {
    const wrapper = mount(GeoStatusCard, { props: { title: 'Test', statusText: 'Custom status text' } });
    expect(wrapper.find('.cl-status-card__desc').text()).toBe('Custom status text');
  });

  it('showAction 為 true 才顯示按鈕，預設文字「查看」', () => {
    const wrapper = mount(GeoStatusCard, { props: { title: 'Test', showAction: true } });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('查看');
  });

  it('點擊按鈕 emit action', async () => {
    const wrapper = mount(GeoStatusCard, { props: { title: 'Test', showAction: true } });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('action');
  });

  it('status=error 映射為 danger tone 與 role=alert', () => {
    const wrapper = mount(GeoStatusCard, { props: { title: 'Test', status: 'error' } });
    expect(wrapper.classes()).toContain('cl-status-card--danger');
    expect(wrapper.attributes('role')).toBe('alert');
  });

  it('status=loading 映射為 info tone', () => {
    const wrapper = mount(GeoStatusCard, { props: { title: 'Test', status: 'loading' } });
    expect(wrapper.classes()).toContain('cl-status-card--info');
  });

  it('自訂 actionText', () => {
    const wrapper = mount(GeoStatusCard, {
      props: { title: 'Test', showAction: true, actionText: 'Custom Action' },
    });
    expect(wrapper.find('button').text()).toBe('Custom Action');
  });
});
