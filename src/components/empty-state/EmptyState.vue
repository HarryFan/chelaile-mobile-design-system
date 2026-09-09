<script setup lang="ts">
import Button from '../button/Button.vue';
import type { EmptyStateProps } from './useEmptyState';
import { useEmptyState } from './useEmptyState';

const props = withDefaults(defineProps<EmptyStateProps>(), {
  title: '暫無資料',
  description: undefined,
  icon: '📭',
  actionText: undefined,
});

const emit = defineEmits<{
  /** 使用者按下操作按鈕 */
  action: [];
}>();

const { rootClass, hasDescription, hasAction } = useEmptyState({
  get description() {
    return props.description;
  },
  get actionText() {
    return props.actionText;
  },
});
</script>

<template>
  <!-- role="status"：列表從「有資料」變成「沒資料」時，螢幕閱讀器會在當前朗讀結束後補上 -->
  <div :class="rootClass" role="status">
    <span class="cl-empty-state__icon" aria-hidden="true">{{ icon }}</span>

    <p class="cl-empty-state__title">{{ title }}</p>

    <p v-if="hasDescription" class="cl-empty-state__desc">{{ description }}</p>

    <Button v-if="hasAction" variant="primary" size="sm" round @click="emit('action')">
      {{ actionText }}
    </Button>
  </div>
</template>

<!-- 不用 scoped：class 命名走 BEM，與 React 版共用同一套 cl-* 選擇器 -->
<style>
.cl-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--cl-space-sm);
  padding: var(--cl-space-lg) var(--cl-space-md);
  text-align: center;
  font-family: var(--cl-font-family);
}

.cl-empty-state__icon {
  display: block;
  font-size: 48px;
  line-height: 1;
  margin-bottom: var(--cl-space-xs);
}

.cl-empty-state__title {
  margin: 0;
  font-size: var(--cl-font-size-subtitle);
  line-height: var(--cl-line-height-subtitle);
  font-weight: 500;
  color: var(--cl-text);
}

.cl-empty-state__desc {
  margin: 0;
  max-width: 280px;
  font-size: var(--cl-font-size-body);
  line-height: var(--cl-line-height-body);
  color: var(--cl-text-secondary);
}

/* 按鈕和文字之間留多一點呼吸，避免看起來像說明的一部分 */
.cl-empty-state > .cl-button {
  margin-top: var(--cl-space-sm);
}
</style>
