import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import StationCard from '../StationCard.vue';
import { nextTick } from 'vue';

describe('StationCard', () => {
  it('renders station name and distance', () => {
    const wrapper = mount(StationCard, {
      props: {
        stationName: '測試站牌',
        distance: '500m',
        busList: [],
      },
    });

    expect(wrapper.text()).toContain('測試站牌');
    expect(wrapper.text()).toContain('500m');
  });

  it('displays bus routes with arrival times', async () => {
    const busList = [
      { routeId: '1', routeName: '32', arrivalTime: '2分鐘', isArriving: true },
      { routeId: '2', routeName: '262', arrivalTime: '5分鐘' },
    ];

    const wrapper = mount(StationCard, {
      props: {
        stationName: '測試站牌',
        busList,
      },
    });

    const busTags = wrapper.findAll('.bus-tag');
    expect(busTags.length).toBe(2);
    
    expect(busTags[0].text()).toContain('32');
    expect(busTags[0].text()).toContain('2分鐘');
    expect(busTags[1].text()).toContain('262');
    expect(busTags[1].text()).toContain('5分鐘');
  });

  it('applies highlighted style to arriving bus', () => {
    const busList = [
      { routeId: '1', routeName: '32', arrivalTime: '即將到站', isArriving: true },
    ];

    const wrapper = mount(StationCard, {
      props: {
        stationName: '測試站牌',
        busList,
      },
    });

    const busTag = wrapper.find('.bus-tag');
    expect(busTag.classes()).toContain('bus-tag--highlighted');
  });

  it('emits action event when action button is clicked', async () => {
    const wrapper = mount(StationCard, {
      props: {
        stationName: '測試站牌',
        busList: [],
        showAction: true,
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('action');
  });

  it('hides action button when showAction is false', () => {
    const wrapper = mount(StationCard, {
      props: {
        stationName: '測試站牌',
        busList: [],
        showAction: false,
      },
    });

    expect(wrapper.find('button').exists()).toBe(false);
  });
});
