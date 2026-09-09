import type { App } from 'vue';
import Button from './Button.vue';

export { Button };
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonHtmlType,
  UseButtonOptions,
  UseButtonReturn,
} from './useButton';
export { useButton } from './useButton';

export default {
  install(app: App) {
    app.component('ClButton', Button);
  },
};
