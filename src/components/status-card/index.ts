import type { App } from 'vue';
import StatusCard from './StatusCard.vue';

export { StatusCard };
export type { StatusCardProps } from './StatusCard.vue';
export { useStatusCard } from './useStatusCard';
export type { StatusTone, UseStatusCardOptions, UseStatusCardReturn } from './useStatusCard';

export default {
  install(app: App) {
    app.component('ClStatusCard', StatusCard);
  },
};
