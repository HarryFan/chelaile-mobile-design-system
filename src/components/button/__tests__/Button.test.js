import { mount } from '@vue/test-utils';
import Button from '../Button.vue';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      props: {
        // 測試 props
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
