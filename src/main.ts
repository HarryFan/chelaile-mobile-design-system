import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// 全局樣式
import './style.css';

// 自定義組件
import components from '@/components';

// Vant 4 按需引入
import { Button, Icon } from 'vant';
import { showToast, showDialog, showNotify } from 'vant';

// 引入樣式
import 'vant/es/button/style';
import 'vant/es/icon/style';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';

// 創建 Vue 實例
const app = createApp(App);

// 註冊自定義組件
app.use(components);

// 全局註冊 Vant 組件
const vantComponents = [
  Button,
  Icon,
  // 添加其他需要的 Vant 組件
];

vantComponents.forEach(component => {
  app.use(component);
});

// 使用 Pinia 狀態管理
const pinia = createPinia();
app.use(pinia);

// 使用路由
app.use(router);

// 全局錯誤處理
app.config.errorHandler = (err: unknown, vm: any, info: string) => {
  console.error('Global Error:', err);
  showToast({
    message: '發生錯誤，請稍後再試',
    position: 'bottom',
  });
};

// 全局屬性
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: typeof showToast;
    $dialog: typeof showDialog;
    $notify: typeof showNotify;
  }
}

// 添加全局屬性
const globalProperties = app.config.globalProperties;
globalProperties.$toast = showToast;
globalProperties.$dialog = showDialog;
globalProperties.$notify = showNotify;

// 掛載應用
app.mount('#app');

// 開發環境下啟用性能追蹤
if (import.meta.env.DEV) {
  // 延遲加載性能監控
  setTimeout(() => {
    import('./utils/performance').then(({ setupPerformance }) => {
      setupPerformance(app);
    }).catch(() => {
      // 忽略加載錯誤
    });
  }, 1000);
}
