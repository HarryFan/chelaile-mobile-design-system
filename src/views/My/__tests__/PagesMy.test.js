import { mount } from '@vue/test-utils';
import PagesMy from '../PagesMy.vue';

describe('PagesMy', () => {
  it('renders correctly', () => {
    const wrapper = mount(PagesMy, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
