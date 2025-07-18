// Fix TypeScript errors by using any type for App
import type { App as VueApp } from 'vue';
import GeoStatusCard from './geo-status-card/GeoStatusCard.vue';
import StationCard from './station-card/StationCard.vue';

// 所有組件
const components = [
  GeoStatusCard,
  StationCard,
  // 其他組件將在這裡添加
];

// 全局註冊所有組件
const install = (app: VueApp) => {
  components.forEach(component => {
    if ('install' in component) {
      // @ts-ignore
      app.use(component);
    } else if ('name' in component) {
      // @ts-ignore
      app.component(component.name || '', component);
    }
  });
};

export {
  GeoStatusCard,
  StationCard,
  // 其他組件導出將在這裡添加
};

export default {
  install,
};
