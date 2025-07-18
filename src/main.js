import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// 全局樣式
import './style.css';

// 自定義組件
import components from '@/components';

// Vant 4 按需引入
import { 
  Button, 
  Icon, 
  Tabbar, 
  TabbarItem, 
  showToast, 
  showDialog,
  showNotify
} from 'vant';

// 引入樣式
import 'vant/es/button/style';
import 'vant/es/icon/style';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/tabbar/style';
import 'vant/es/tabbar-item/style';

// 創建 Vue 實例
const app = createApp(App);

// 註冊自定義組件
app.use(components);

// 全局註冊 Vant 組件
const vantComponents = [
  Button,
  Icon,
  Tabbar,
  TabbarItem
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
app.config.errorHandler = (err, vm, info) => {
  console.error('Global Error:', err);
  showToast({
    message: '發生錯誤，請稍後再試',
    position: 'bottom',
  });  
};

// 添加全局屬性
app.config.globalProperties.$toast = showToast;
app.config.globalProperties.$dialog = showDialog;
app.config.globalProperties.$notify = showNotify;

// 全局指令示例
app.directive('focus', {
  mounted(el) {
    el.focus();
  },
});

// 全局混入示例
app.mixin({
  created() {
    // 可以在這裡添加全局混入的邏輯
  },
});

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
