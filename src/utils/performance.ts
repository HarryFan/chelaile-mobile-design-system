import { App } from 'vue';
import { useEventListener } from '@vueuse/core';

export function setupPerformance(app: App) {
  // 只在開發環境下啟用性能監控
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // 監聽頁面性能指標
  const observePerformance = () => {
    if (!window.performance) return;

    // 獲取頁面加載性能指標
    const timing = window.performance.timing;
    if (!timing) return;

    const metrics = {
      // DNS 查詢耗時
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      // TCP 連接耗時
      tcp: timing.connectEnd - timing.connectStart,
      // 首字節耗時
      ttfb: timing.responseStart - timing.navigationStart,
      // 頁面加載完成時間
      loadPage: timing.loadEventEnd - timing.navigationStart,
      // DOM 加載完成時間
      domReady: timing.domComplete - timing.domLoading,
      // 頁面解析 DOM 樹的時間
      parseDOM: timing.domInteractive - timing.domLoading,
    };

    console.group('頁面性能指標');
    console.table(metrics);
    console.groupEnd();
  };

  // 監聽頁面加載完成事件
  if (document.readyState === 'complete') {
    setTimeout(observePerformance, 0);
  } else {
    useEventListener(window, 'load', observePerformance, { once: true });
  }

  // 監聽路由變化
  app.config.globalProperties.$router.afterEach(() => {
    setTimeout(observePerformance, 100);
  });

  // 監聽頁面可見性變化
  useEventListener(document, 'visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      console.log('頁面可見性: 可見');
    }
  });

  // 監聽頁面錯誤
  useEventListener('error', (event) => {
    console.error('頁面錯誤:', event);
  }, true);

  // 監聽未捕獲的 Promise 錯誤
  useEventListener('unhandledrejection', (event) => {
    console.error('未處理的 Promise 錯誤:', event.reason);
  });

  // 監聽資源加載錯誤
  useEventListener(
    'error',
    (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
        console.error('資源加載失敗:', (target as HTMLImageElement).src || (target as HTMLLinkElement).href);
      }
    },
    true
  );
}

// 導出默認實例
export default {
  install: (app: App) => {
    setupPerformance(app);
  },
};
