import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Button from '../Button.vue';

describe('Button', () => {
  it('渲染 slot 文字並預設為 type=button，避免在表單內誤送出', () => {
    const wrapper = mount(Button, { slots: { default: '送出' } });
    const btn = wrapper.find('button');
    expect(btn.text()).toBe('送出');
    expect(btn.attributes('type')).toBe('button');
    expect(wrapper.find('.cl-button__content').exists()).toBe(true);
  });

  it('點擊會 emit click 並帶 MouseEvent', async () => {
    const wrapper = mount(Button, { slots: { default: '送出' } });
    await wrapper.find('button').trigger('click');
    const emitted = wrapper.emitted('click');
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0][0]).toBeInstanceOf(MouseEvent);
  });

  it('loading 時擋掉點擊，但保留可聚焦與 aria-busy', async () => {
    const wrapper = mount(Button, { props: { loading: true }, slots: { default: '查詢中' } });
    const btn = wrapper.find('button');

    await btn.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();

    expect(btn.attributes('aria-busy')).toBe('true');
    expect(btn.attributes('aria-disabled')).toBe('true');
    // 沒有 disabled attribute，否則使用者無法聚焦、也不知道正在處理
    expect(btn.attributes('disabled')).toBeUndefined();
    expect(btn.find('.cl-button__spinner').exists()).toBe(true);
    expect(btn.find('.cl-button__spinner').attributes('aria-hidden')).toBe('true');
    expect(btn.classes()).toContain('is-loading');
  });

  it('disabled 時擋掉點擊並帶上 disabled attribute', async () => {
    const wrapper = mount(Button, { props: { disabled: true }, slots: { default: '不可用' } });
    const btn = wrapper.find('button');
    await btn.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
    expect(btn.attributes('disabled')).toBeDefined();
    expect(btn.attributes('aria-disabled')).toBe('true');
    expect(btn.attributes('aria-busy')).toBeUndefined();
    expect(btn.classes()).toContain('is-disabled');
  });

  it('variant 與 size 反映在 class 上，讓使用端可覆寫樣式', () => {
    const wrapper = mount(Button, {
      props: { variant: 'danger', size: 'lg' },
      slots: { default: '刪除' },
    });
    const classes = wrapper.find('button').classes();
    expect(classes).toContain('cl-button');
    expect(classes).toContain('cl-button--danger');
    expect(classes).toContain('cl-button--lg');
    expect(classes).not.toContain('cl-button--round');
    expect(classes).not.toContain('cl-button--block');
  });

  it('round / block 修飾 class 與 htmlType 可自訂', () => {
    const wrapper = mount(Button, {
      props: { round: true, block: true, htmlType: 'submit' },
      slots: { default: '送出表單' },
    });
    const btn = wrapper.find('button');
    expect(btn.classes()).toContain('cl-button--round');
    expect(btn.classes()).toContain('cl-button--block');
    expect(btn.attributes('type')).toBe('submit');
  });

  it('預設 variant=primary、size=md', () => {
    const wrapper = mount(Button, { slots: { default: '預設' } });
    const classes = wrapper.find('button').classes();
    expect(classes).toContain('cl-button--primary');
    expect(classes).toContain('cl-button--md');
  });
});
