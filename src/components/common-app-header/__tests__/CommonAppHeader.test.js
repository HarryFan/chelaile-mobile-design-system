import { mount } from '@vue/test-utils';
import CommonAppHeader from '../CommonAppHeader.vue';

describe('CommonAppHeader', () => {
  it('renders correctly', () => {
    const wrapper = mount(CommonAppHeader, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
