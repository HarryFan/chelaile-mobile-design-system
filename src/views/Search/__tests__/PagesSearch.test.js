import { mount } from '@vue/test-utils';
import PagesSearch from '../PagesSearch.vue';

describe('PagesSearch', () => {
  it('renders correctly', () => {
    const wrapper = mount(PagesSearch, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
