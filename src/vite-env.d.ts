/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

// Vue 3 類型聲明
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 環境變量類型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  // 添加其他環境變量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
