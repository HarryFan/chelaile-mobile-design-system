import type { App } from 'vue';
import AppHeader from './AppHeader.vue';

export { AppHeader };
export type { AppHeaderProps, UseAppHeaderOptions, UseAppHeaderReturn } from './useAppHeader';
export { useAppHeader } from './useAppHeader';

export default {
  install(app: App) {
    app.component('ClAppHeader', AppHeader);
  },
};
