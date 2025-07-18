<template>
  <div class="geo-status-card">
    <div class="flex items-center p-4 bg-white rounded-card shadow-sm">
      <!-- Status Icon -->
      <div 
        class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        :class="statusClasses"
      >
        <van-icon :name="statusIcon" size="24" />
      </div>
      
      <!-- Content -->
      <div class="ml-3 flex-1 min-w-0">
        <h3 class="text-title font-medium text-text-primary truncate">
          {{ title }}
        </h3>
        <p class="text-body text-text-secondary mt-1">
          {{ statusText }}
        </p>
      </div>
      
      <!-- Action Button -->
      <van-button 
        v-if="showAction"
        size="small" 
        type="primary"
        plain
        round
        @click="$emit('action')"
      >
        {{ actionText }}
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon, Button } from 'vant';

export interface GeoStatusCardProps {
  /**
   * 卡片標題
   */
  title: string;
  /**
   * 狀態類型
   * @default 'success'
   */
  status?: 'success' | 'warning' | 'error' | 'loading';
  /**
   * 狀態文字
   */
  statusText?: string;
  /**
   * 是否顯示操作按鈕
   * @default false
   */
  showAction?: boolean;
  /**
   * 操作按鈕文字
   * @default '查看'
   */
  actionText?: string;
}

const props = withDefaults(defineProps<GeoStatusCardProps>(), {
  status: 'success',
  statusText: '',
  showAction: false,
  actionText: '查看'
});

const emit = defineEmits<{
  (e: 'action'): void;
}>();

// 狀態相關的類和圖標
const statusConfig = {
  success: {
    bg: 'bg-green-50',
    icon: 'success',
    text: '定位成功'
  },
  warning: {
    bg: 'bg-yellow-50',
    icon: 'warning',
    text: '定位中...'
  },
  error: {
    bg: 'bg-red-50',
    icon: 'cross',
    text: '定位失敗'
  },
  loading: {
    bg: 'bg-blue-50',
    icon: 'replay',
    text: '正在獲取位置...'
  }
} as const;

// 計算屬性
const statusClasses = computed(() => ({
  [statusConfig[props.status].bg]: true,
  'text-green-500': props.status === 'success',
  'text-yellow-500': props.status === 'warning',
  'text-red-500': props.status === 'error',
  'text-blue-500': props.status === 'loading',
  'animate-spin': props.status === 'loading'
}));

const statusIcon = computed(() => statusConfig[props.status].icon);
</script>

<style scoped>
/* 添加自定義動畫 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1.5s linear infinite;
}

/* 確保圓形圖標居中 */
.geo-status-card :deep(.van-icon) {
  display: block;
}
</style>
