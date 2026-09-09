<script setup lang="ts">
import { Button } from '../button';
import { useStatusCard, type StatusTone } from './useStatusCard';

export interface StatusCardProps {
  /** 語意色調，同時決定螢幕閱讀器的播報優先度 */
  tone?: StatusTone;
  title: string;
  /** 狀態說明。父層若可能拿到空值，請自行擋掉再傳入 */
  description?: string;
  /** 有給 actionText 才會顯示按鈕 */
  actionText?: string;
}

const props = withDefaults(defineProps<StatusCardProps>(), {
  tone: 'info',
  description: undefined,
  actionText: undefined,
});

const emit = defineEmits<{
  action: [];
}>();

const { icon, role, ariaLive, toneClass } = useStatusCard({
  get tone() {
    return props.tone;
  },
});
</script>

<template>
  <div :class="['cl-status-card', toneClass]" :role="role" :aria-live="ariaLive">
    <span class="cl-status-card__icon" aria-hidden="true">{{ icon }}</span>

    <div class="cl-status-card__body">
      <h3 class="cl-status-card__title">{{ title }}</h3>
      <!-- description 沒給就不渲染節點；空值占位由父層決定，元件不自己補 -- -->
      <p v-if="description !== undefined && description !== null && description !== ''" class="cl-status-card__desc">
        {{ description }}
      </p>
    </div>

    <Button v-if="actionText" variant="secondary" size="sm" round @click="emit('action')">
      {{ actionText }}
    </Button>
  </div>
</template>

<!-- 不用 scoped：class 命名走 BEM，與 React 版共用同一套 cl-* 選擇器 -->
<style>
.cl-status-card {
  display: flex;
  align-items: center;
  gap: var(--cl-space-md);
  padding: var(--cl-space-md);
  background: var(--cl-card-background);
  border-radius: var(--cl-radius-card);
  box-shadow: var(--cl-shadow-card);
  font-family: var(--cl-font-family);
}

.cl-status-card__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.cl-status-card--success .cl-status-card__icon { background: var(--cl-success); }
.cl-status-card--warning .cl-status-card__icon { background: var(--cl-warning); }
.cl-status-card--danger  .cl-status-card__icon { background: var(--cl-danger); }
.cl-status-card--info    .cl-status-card__icon { background: var(--cl-info); }

.cl-status-card__body {
  flex: 1;
  min-width: 0;
}

.cl-status-card__title {
  margin: 0;
  font-size: var(--cl-font-size-subtitle);
  line-height: var(--cl-line-height-subtitle);
  font-weight: 500;
  color: var(--cl-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cl-status-card__desc {
  margin: var(--cl-space-xs) 0 0;
  font-size: var(--cl-font-size-body);
  line-height: var(--cl-line-height-body);
  color: var(--cl-text-secondary);
}
</style>
