import { mount } from '@vue/test-utils';
import PagesDiscover from '../PagesDiscover.vue';

describe('PagesDiscover', () => {
  it('renders correctly', () => {
    const wrapper = mount(PagesDiscover, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
