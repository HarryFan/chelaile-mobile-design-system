import { App } from 'vue';
import StationCard from './StationCard.vue';

export { StationCard };
export * from './types';

export default {
  install(app: App) {
    app.component('StationCard', StationCard);
  },
};
