import { mount } from '@vue/test-utils';
import CommonAppTabBar from '../CommonAppTabBar.vue';

describe('CommonAppTabBar', () => {
  it('renders correctly', () => {
    const wrapper = mount(CommonAppTabBar, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
