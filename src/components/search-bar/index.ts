import type { App } from 'vue';
import SearchBar from './SearchBar.vue';

export { SearchBar };
export type { SearchBarProps } from './SearchBar.vue';
export { useSearchBar } from './useSearchBar';
export type { UseSearchBarOptions, UseSearchBarReturn } from './useSearchBar';

export default {
  install(app: App) {
    app.component('ClSearchBar', SearchBar);
  },
};
