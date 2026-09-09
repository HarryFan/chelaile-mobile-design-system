import type { App } from 'vue';
import Loading from './Loading.vue';

export { Loading };
export type { LoadingProps, LoadingSize, UseLoadingOptions, UseLoadingReturn } from './useLoading';
export { useLoading } from './useLoading';

export default {
  install(app: App) {
    app.component('ClLoading', Loading);
  },
};
