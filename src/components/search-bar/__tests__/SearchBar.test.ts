import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SearchBar from '../SearchBar.vue';

afterEach(() => {
  vi.useRealTimers();
});

describe('SearchBar', () => {
  it('輸入時 emit change 與 update:modelValue', async () => {
    const wrapper = mount(SearchBar, { props: { debounceMs: 0 } });
    await wrapper.find('input').setValue('bus');
    expect(wrapper.emitted('change')?.at(-1)).toEqual(['bus']);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['bus']);
  });

  it('中文輸入法組字期間不 emit change / search，組字結束才送出', async () => {
    const wrapper = mount(SearchBar, { props: { debounceMs: 0 } });
    const input = wrapper.find('input');

    await input.trigger('compositionstart');
    await input.setValue('ㄋㄢ');
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(wrapper.emitted('search')).toBeUndefined();

    (input.element as HTMLInputElement).value = '南京';
    await input.trigger('compositionend');
    expect(wrapper.emitted('change')?.[0]).toEqual(['南京']);
    expect(wrapper.emitted('search')?.[0]).toEqual(['南京']);
  });

  it('組字中按 Enter 視為選字，不觸發 search', async () => {
    const wrapper = mount(SearchBar, { props: { defaultValue: '南', debounceMs: 0 } });
    const input = wrapper.find('input');
    await input.trigger('compositionstart');
    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('search')).toBeUndefined();
  });

  it('debounce：連續輸入只在停止後觸發一次 search', async () => {
    vi.useFakeTimers();
    const wrapper = mount(SearchBar, { props: { debounceMs: 300 } });
    const input = wrapper.find('input');

    await input.setValue('a');
    await input.setValue('ab');
    await input.setValue('abc');
    expect(wrapper.emitted('search')).toBeUndefined();

    vi.advanceTimersByTime(300);
    expect(wrapper.emitted('search')).toHaveLength(1);
    expect(wrapper.emitted('search')?.[0]).toEqual(['abc']);
  });

  it('Enter 會立即 search，不等 debounce', async () => {
    const wrapper = mount(SearchBar, { props: { defaultValue: '信義路', debounceMs: 5000 } });
    await wrapper.find('input').trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('search')?.[0]).toEqual(['信義路']);
  });

  it('有值才出現清除鈕，按下後清空並 emit clear 與空查詢', async () => {
    const wrapper = mount(SearchBar, { props: { defaultValue: '板橋', debounceMs: 0 } });
    const clearBtn = wrapper.find('button[aria-label="清除搜尋"]');
    expect(clearBtn.exists()).toBe(true);

    await clearBtn.trigger('click');
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('');
    expect(wrapper.emitted('search')?.at(-1)).toEqual(['']);
    expect(wrapper.emitted('clear')).toHaveLength(1);
    expect(wrapper.find('button[aria-label="清除搜尋"]').exists()).toBe(false);
  });

  it('卸載時清掉待觸發的 debounce，不會事後 emit search', async () => {
    vi.useFakeTimers();
    const wrapper = mount(SearchBar, { props: { debounceMs: 300 } });
    await wrapper.find('input').setValue('x');
    wrapper.unmount();
    vi.advanceTimersByTime(300);
    expect(wrapper.emitted('search')).toBeUndefined();
  });

  it('disabled 時 input 帶 disabled、root 帶 is-disabled、不顯示清除鈕', () => {
    const wrapper = mount(SearchBar, { props: { disabled: true, defaultValue: '有值' } });
    expect(wrapper.classes()).toContain('is-disabled');
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    expect(wrapper.find('.cl-search-bar__clear').exists()).toBe(false);
  });
});
