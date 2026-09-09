import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自動導入 Vue 相關函數
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      eslintrc: {
        enabled: true,
      },
    }),
    // 自動導入 Vant 組件
    Components({
      resolvers: [VantResolver()],
    }),
    // 產出 dist/index.d.ts，對應 package.json 的 types / exports.types
    dts({
      entryRoot: 'src',
      include: ['src/index.ts', 'src/components/**/*.ts', 'src/components/**/*.vue'],
      exclude: ['src/**/*.test.ts', 'src/**/*.stories.ts'],
      rollupTypes: true,
      copyDtsFiles: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      // 開發環境 API 代理
      '/api': {
        target: 'https://api.chelaile.com.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // 元件庫打包：輸出 es + cjs，vue / vant 由使用端提供
  build: {
    target: 'es2015',
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'ChelaileDesignSystem',
      formats: ['es', 'cjs'],
      fileName: 'chelaile-design-system',
    },
    rollupOptions: {
      // VantResolver 會注入 vant/es/<comp> 與 vant/es/<comp>/style 子路徑，一併排除
      external: ['vue', /^vant(\/.*)?$/],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          vant: 'vant',
        },
      },
    },
  },
  // Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    include: ['src/**/*.test.{ts,js}'],
    // vant 的按需 style 會 import .css；讓 vite 處理而不是交給 Node 直接載入
    server: {
      deps: {
        inline: ['vant'],
      },
    },
  },
});
