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
  // 基礎組件
  Button,
  Cell,
  CellGroup,
  Icon,
  Image as VanImage,
  Loading,
  Overlay,
  Popup,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Tabs,
  Tab,
  // 表單組件
  Field,
  Form,
  // 反饋組件
  Toast,
  Dialog,
  Notify,
  // 展示組件
  Tag,
  Divider,
  Empty,
  List,
  // 導航組件
  NavBar,
  Tabbar as VanTabbar,
  TabbarItem as VanTabbarItem,
  // 業務組件
  SwipeCell,
  PullRefresh,
  Sticky,
} from 'vant';

// 引入 Vant 樣式
import 'vant/lib/index.css';

// 創建 Vue 實例
const app = createApp(App);

// 註冊自定義組件
app.use(components);

// 全局註冊 Vant 組件
const components = [
  // 基礎組件
  Button,
  Cell,
  CellGroup,
  Icon,
  VanImage,
  Loading,
  Overlay,
  Popup,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Tabs,
  Tab,
  // 表單組件
  Field,
  Form,
  // 反饋組件
  Toast,
  Dialog,
  Notify,
  // 展示組件
  Tag,
  Divider,
  Empty,
  List,
  // 導航組件
  NavBar,
  VanTabbar,
  VanTabbarItem,
  // 業務組件
  SwipeCell,
  PullRefresh,
  Sticky,
];

components.forEach(component => {
  app.use(component);
});

// 使用 Pinia 狀態管理
const pinia = createPinia();
app.use(pinia);

// 使用路由
app.use(router);

// 全局錯誤處理
app.config.errorHandler = (err: unknown, vm, info) => {
  console.error('Global Error:', err);
  Toast.fail({
    message: '發生錯誤，請稍後再試',
    position: 'bottom',
  });
};

// 全局屬性
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: typeof Toast;
    $dialog: typeof Dialog;
    $notify: typeof Notify;
  }
}

app.config.globalProperties.$toast = Toast;
app.config.globalProperties.$dialog = Dialog;
app.config.globalProperties.$notify = Notify;

// 掛載應用
app.mount('#app');

// 開發環境下啟用性能追蹤
if (process.env.NODE_ENV === 'development') {
  // 延遲加載性能監控
  setTimeout(() => {
    import('./utils/performance').then(({ setupPerformance }) => {
      setupPerformance(app);
    }).catch(() => {
      // 忽略加載錯誤
    });
  }, 1000);
}
