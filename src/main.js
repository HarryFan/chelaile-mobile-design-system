import { createApp } from 'vue';
import App from './App.vue';

// 設計 token + Tailwind 基礎樣式
import './style.css';
// Demo 頁版面樣式（與 React 版 demo/demo.css 逐字相同）
import './demo/demo.css';
// Remix Icon 字型（元件庫入口若也載入，重複 import 無害）
import 'remixicon/fonts/remixicon.css';

// 設計系統元件（全域註冊 ClButton / ClSearchBar / …）
import components from '@/components';

const app = createApp(App);
app.use(components);
app.mount('#app');
