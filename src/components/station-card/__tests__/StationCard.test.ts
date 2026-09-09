import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StationCard from '../StationCard.vue';
import type { BusInfo } from '../useStationCard';

const busList: BusInfo[] = [
  { routeId: '307', routeName: '307', arrivalTime: '2 分', isArriving: true },
  { routeId: '652', routeName: '652', arrivalTime: '8 分' },
];

describe('StationCard', () => {
  it('渲染站名與距離', () => {
    const wrapper = mount(StationCard, {
      props: { stationName: '市政府站', distance: '250 公尺', busList },
    });
    expect(wrapper.find('h3.cl-station-card__name').text()).toBe('市政府站');
    expect(wrapper.find('.cl-station-card__distance').text()).toBe('250 公尺');
  });

  it('沒給 distance 就不渲染距離區塊', () => {
    const wrapper = mount(StationCard, { props: { stationName: '市政府站', busList } });
    expect(wrapper.find('.cl-station-card__distance').exists()).toBe(false);
  });

  it('渲染班次列表，isArriving 的列帶 is-arriving class', () => {
    const wrapper = mount(StationCard, { props: { stationName: '市政府站', busList } });
    const items = wrapper.findAll('.cl-station-card__bus');
    expect(items).toHaveLength(2);
    expect(items[0].classes()).toContain('is-arriving');
    expect(items[1].classes()).not.toContain('is-arriving');
    expect(items[0].find('.cl-station-card__route').text()).toBe('307');
    expect(items[0].find('.cl-station-card__time').text()).toBe('2 分');
  });

  it('arrivalTime 缺值時顯示「更新中」', () => {
    const wrapper = mount(StationCard, {
      props: { stationName: '市政府站', busList: [{ routeId: '307', routeName: '307' }] },
    });
    expect(wrapper.find('.cl-station-card__time').text()).toBe('更新中');
  });

  it('busList 為空時顯示「目前沒有班次資訊」且不渲染列表', () => {
    const wrapper = mount(StationCard, { props: { stationName: '市政府站', busList: [] } });
    expect(wrapper.find('.cl-station-card__empty').text()).toBe('目前沒有班次資訊');
    expect(wrapper.find('.cl-station-card__list').exists()).toBe(false);
    expect(wrapper.classes()).toContain('is-empty');
  });

  it('有 actionText 才顯示按鈕，點擊會 emit action', async () => {
    const wrapper = mount(StationCard, { props: { stationName: '市政府站', busList } });
    expect(wrapper.find('button').exists()).toBe(false);

    await wrapper.setProps({ actionText: '查看站牌' });
    const btn = wrapper.find('button');
    expect(btn.text()).toBe('查看站牌');
    expect(btn.classes()).toContain('cl-button--secondary');
    expect(btn.classes()).toContain('cl-button--sm');
    expect(btn.classes()).toContain('cl-button--round');

    await btn.trigger('click');
    expect(wrapper.emitted('action')).toHaveLength(1);
  });
});
