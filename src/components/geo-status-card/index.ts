import { App } from 'vue';
import GeoStatusCard from './GeoStatusCard.vue';

// 為組件添加 install 方法，用於 app.use() 全局註冊
GeoStatusCard.install = (app: App) => {
  app.component('GeoStatusCard', GeoStatusCard);
};

export default GeoStatusCard;

// 導出組件類型
export * from './GeoStatusCard.vue';
