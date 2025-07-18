import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import GeoStatusCard from '../GeoStatusCard.vue';

describe('GeoStatusCard', () => {
  it('renders with default props', () => {
    const wrapper = mount(GeoStatusCard, {
      props: {
        title: 'Test Title',
      },
    });

    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.find('.van-icon-success').exists()).toBe(true);
    expect(wrapper.find('.van-button').exists()).toBe(false);
  });

  it('displays status text when provided', () => {
    const wrapper = mount(GeoStatusCard, {
      props: {
        title: 'Test',
        statusText: 'Custom status text',
      },
    });

    expect(wrapper.text()).toContain('Custom status text');
  });

  it('shows action button when showAction is true', () => {
    const wrapper = mount(GeoStatusCard, {
      props: {
        title: 'Test',
        showAction: true,
      },
    });

    const button = wrapper.find('.van-button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('查看');
  });

  it('emits action event when button is clicked', async () => {
    const wrapper = mount(GeoStatusCard, {
      props: {
        title: 'Test',
        showAction: true,
      },
    });

    await wrapper.find('.van-button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('action');
  });

  it('applies correct status classes', () => {
    const wrapper = mount(GeoStatusCard, {
      props: {
        title: 'Test',
        status: 'error',
      },
    });

    const statusIcon = wrapper.find('.w-12');
    expect(statusIcon.classes()).toContain('bg-red-50');
    expect(statusIcon.classes()).toContain('text-red-500');
  });

  it('displays custom action text', () => {
    const wrapper = mount(GeoStatusCard, {
      props: {
        title: 'Test',
        showAction: true,
        actionText: 'Custom Action',
      },
    });

    expect(wrapper.find('.van-button').text()).toBe('Custom Action');
  });
});
