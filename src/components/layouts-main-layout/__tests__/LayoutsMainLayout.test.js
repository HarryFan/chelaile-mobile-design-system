import { mount } from '@vue/test-utils';
import LayoutsMainLayout from '../LayoutsMainLayout.vue';

describe('LayoutsMainLayout', () => {
  it('renders correctly', () => {
    const wrapper = mount(LayoutsMainLayout, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
