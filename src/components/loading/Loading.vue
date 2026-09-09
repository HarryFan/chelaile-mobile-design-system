<script setup lang="ts">
import type { LoadingProps } from './useLoading';
import { useLoading } from './useLoading';

const props = withDefaults(defineProps<LoadingProps>(), {
  text: '載入中…',
  size: 'md',
  overlay: false,
});

const { rootClass, hasText } = useLoading({
  get size() {
    return props.size;
  },
  get overlay() {
    return props.overlay;
  },
  get text() {
    return props.text;
  },
});
</script>

<template>
  <!--
    aria-live="polite"：載入開始 / 結束時螢幕閱讀器會在當前朗讀結束後播報，
    不用 assertive，否則每次翻頁都會打斷使用者。
  -->
  <div :class="rootClass" role="status" aria-live="polite">
    <span class="cl-loading__spinner" aria-hidden="true" />
    <span v-if="hasText" class="cl-loading__text">{{ text }}</span>
  </div>
</template>

<!-- 不用 scoped：class 命名走 BEM，與 React 版共用同一套 cl-* 選擇器 -->
<style>
.cl-loading {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--cl-space-sm);
  padding: var(--cl-space-md);
  font-family: var(--cl-font-family);
}

.cl-loading__spinner {
  display: block;
  width: 24px;
  height: 24px;
  border: 3px solid var(--cl-border);
  border-top-color: var(--cl-primary);
  border-radius: 50%;
  animation: cl-loading-spin 0.8s linear infinite;
}

/* 尺寸：spinner 邊框粗細跟著縮放，16px 用 3px 邊框會糊成一團 */
.cl-loading--sm .cl-loading__spinner {
  width: 16px;
  height: 16px;
  border-width: 2px;
}
.cl-loading--md .cl-loading__spinner {
  width: 24px;
  height: 24px;
  border-width: 3px;
}
.cl-loading--lg .cl-loading__spinner {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

.cl-loading__text {
  font-size: var(--cl-font-size-body);
  line-height: var(--cl-line-height-body);
  color: var(--cl-text-secondary);
}

/* 全螢幕遮罩：半透明白底蓋住內容，阻擋底下的點擊 */
.cl-loading.is-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  background: rgba(255, 255, 255, 0.8);
}

@keyframes cl-loading-spin {
  to {
    transform: rotate(360deg);
  }
}

/* 尊重使用者的減少動態偏好：放慢而非停掉，停掉會讓人以為卡住了 */
@media (prefers-reduced-motion: reduce) {
  .cl-loading__spinner {
    animation-duration: 2s;
  }
}
</style>
