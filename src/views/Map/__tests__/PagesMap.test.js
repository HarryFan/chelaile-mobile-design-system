import { mount } from '@vue/test-utils';
import PagesMap from '../PagesMap.vue';

describe('PagesMap', () => {
  it('renders correctly', () => {
    const wrapper = mount(PagesMap, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
