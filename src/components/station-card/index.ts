import type { App } from 'vue';
import StationCard from './StationCard.vue';

export { StationCard };
export type {
  StationCardProps,
  BusInfo,
  UseStationCardOptions,
  UseStationCardReturn,
  StationCardBusView,
} from './useStationCard';
export { useStationCard, UPDATING_TEXT, EMPTY_TEXT } from './useStationCard';

export default {
  install(app: App) {
    app.component('ClStationCard', StationCard);
  },
};
