import type { App } from 'vue';
import EmptyState from './EmptyState.vue';

export { EmptyState };
export type { EmptyStateProps, UseEmptyStateOptions, UseEmptyStateReturn } from './useEmptyState';
export { useEmptyState } from './useEmptyState';

export default {
  install(app: App) {
    app.component('ClEmptyState', EmptyState);
  },
};
