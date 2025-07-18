import type { App } from 'vue';
import GeoStatusCard from './geo-status-card';

// 所有組件
const components = [
  GeoStatusCard,
  // 其他組件將在這裡添加
];

// 全局註冊所有組件
const install = (app: App) => {
  components.forEach(component => {
    if ('install' in component) {
      app.use(component);
    } else if ('name' in component) {
      app.component(component.name || '', component);
    }
  });
};

export {
  GeoStatusCard,
  // 其他組件導出將在這裡添加
};

export default {
  install,
};
