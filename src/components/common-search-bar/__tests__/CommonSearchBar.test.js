import { mount } from '@vue/test-utils';
import CommonSearchBar from '../CommonSearchBar.vue';

describe('CommonSearchBar', () => {
  it('renders correctly', () => {
    const wrapper = mount(CommonSearchBar, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
