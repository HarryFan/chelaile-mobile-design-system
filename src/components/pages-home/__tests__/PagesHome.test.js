import { mount } from '@vue/test-utils';
import PagesHome from '../PagesHome.vue';

describe('PagesHome', () => {
  it('renders correctly', () => {
    const wrapper = mount(PagesHome, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
