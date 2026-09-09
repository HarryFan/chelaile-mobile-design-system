<script setup lang="ts">
/**
 * GeoStatusCard：StatusCard 的薄包裝，保留舊版 API 給既有頁面用。
 * 新頁面請直接用 StatusCard；這裡只做 prop 名稱與狀態值的映射，不含樣式。
 */
import { computed } from 'vue';
import { StatusCard } from '../status-card';
import type { StatusTone } from '../status-card';

export type GeoStatus = 'success' | 'warning' | 'error' | 'loading';

export interface GeoStatusCardProps {
  /** 卡片標題 */
  title: string;
  /** 狀態類型 */
  status?: GeoStatus;
  /** 狀態文字 → StatusCard.description */
  statusText?: string;
  /** 是否顯示操作按鈕 */
  showAction?: boolean;
  /** 操作按鈕文字 */
  actionText?: string;
}

const props = withDefaults(defineProps<GeoStatusCardProps>(), {
  status: 'success',
  statusText: '',
  showAction: false,
  actionText: '查看',
});

const emit = defineEmits<{
  action: [];
}>();

// 舊狀態值 → StatusCard tone；loading 沒有對應語意，視為 info
const TONE_MAP: Record<GeoStatus, StatusTone> = {
  success: 'success',
  warning: 'warning',
  error: 'danger',
  loading: 'info',
};

const tone = computed(() => TONE_MAP[props.status]);
const resolvedActionText = computed(() => (props.showAction && props.actionText ? props.actionText : undefined));
</script>

<template>
  <StatusCard
    class="geo-status-card"
    :tone="tone"
    :title="title"
    :description="statusText"
    :action-text="resolvedActionText"
    @action="emit('action')"
  />
</template>
