import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppHeader from '../AppHeader.vue';

describe('AppHeader', () => {
  it('渲染 banner 與 h1 標題', () => {
    const wrapper = mount(AppHeader, { props: { title: '附近站牌' } });
    expect(wrapper.find('header').attributes('role')).toBe('banner');
    const h1 = wrapper.find('h1');
    expect(h1.exists()).toBe(true);
    expect(h1.text()).toBe('附近站牌');
    expect(h1.classes()).toContain('cl-app-header__title');
  });

  it('返回鈕帶 aria-label，點擊會 emit back', async () => {
    const wrapper = mount(AppHeader, { props: { title: '附近站牌', backLabel: '回上一頁' } });
    const back = wrapper.find('.cl-app-header__back');
    expect(back.attributes('type')).toBe('button');
    expect(back.attributes('aria-label')).toBe('回上一頁');
    await back.trigger('click');
    expect(wrapper.emitted('back')).toHaveLength(1);
  });

  it('預設 backLabel 為「返回」', () => {
    const wrapper = mount(AppHeader, { props: { title: '附近站牌' } });
    expect(wrapper.find('.cl-app-header__back').attributes('aria-label')).toBe('返回');
  });

  it('showBack=false 時不渲染返回鈕', () => {
    const wrapper = mount(AppHeader, { props: { title: '首頁', showBack: false } });
    expect(wrapper.find('.cl-app-header__back').exists()).toBe(false);
  });

  it('left slot 有給就覆蓋返回鈕', () => {
    const wrapper = mount(AppHeader, {
      props: { title: '附近站牌' },
      slots: { left: '<button type="button">關閉</button>' },
    });
    expect(wrapper.find('.cl-app-header__left').text()).toBe('關閉');
    expect(wrapper.find('.cl-app-header__back').exists()).toBe(false);
  });

  it('沒 title 或空字串時不渲染 h1', async () => {
    const wrapper = mount(AppHeader);
    expect(wrapper.find('h1').exists()).toBe(false);

    await wrapper.setProps({ title: '' });
    expect(wrapper.find('h1').exists()).toBe(false);
  });

  it('right slot 會渲染在動作區', () => {
    const wrapper = mount(AppHeader, {
      props: { title: '附近站牌' },
      slots: { right: '<span>編輯</span>' },
    });
    expect(wrapper.find('.cl-app-header__right').text()).toBe('編輯');
  });
});
