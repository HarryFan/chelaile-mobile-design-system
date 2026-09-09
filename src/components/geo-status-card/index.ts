import type { App } from 'vue';
import GeoStatusCard from './GeoStatusCard.vue';

export { GeoStatusCard };
export type { GeoStatusCardProps, GeoStatus } from './GeoStatusCard.vue';

export default {
  install(app: App) {
    app.component('GeoStatusCard', GeoStatusCard);
  },
};
