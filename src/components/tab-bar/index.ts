import type { App } from 'vue';
import TabBar from './TabBar.vue';

export { TabBar };
export type { TabBarProps } from './TabBar.vue';
export { useTabBar, formatBadge } from './useTabBar';
export type { TabBarItem, UseTabBarOptions, UseTabBarReturn, TabBarItemBindings } from './useTabBar';

export default {
  install(app: App) {
    app.component('ClTabBar', TabBar);
  },
};
