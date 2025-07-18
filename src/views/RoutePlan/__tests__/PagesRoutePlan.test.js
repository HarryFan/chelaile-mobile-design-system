import { mount } from '@vue/test-utils';
import PagesRoutePlan from '../PagesRoutePlan.vue';

describe('PagesRoutePlan', () => {
  it('renders correctly', () => {
    const wrapper = mount(PagesRoutePlan, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
