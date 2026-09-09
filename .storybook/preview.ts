import type { Preview } from '@storybook/vue3';
import 'vant/lib/index.css';
import '../src/style.css';
import 'remixicon/fonts/remixicon.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#F7F8FA' },
        { name: 'card', value: '#FFFFFF' },
      ],
    },
  },
};

export default preview;
