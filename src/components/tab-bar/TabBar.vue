<script setup lang="ts">
import { useTabBar, type TabBarItem } from './useTabBar';

export interface TabBarProps {
  items: TabBarItem[];
  /** 目前選中的 tab key（v-model） */
  modelValue: string;
  /** tablist 的無障礙名稱 */
  label?: string;
}

const props = withDefaults(defineProps<TabBarProps>(), {
  label: '主要導覽',
});

const emit = defineEmits<{
  'update:modelValue': [key: string];
  /** 切換到其他 tab 時發出；點擊已選中的 tab 不會觸發 */
  change: [key: string];
}>();

const { rootClass, getItemProps } = useTabBar({
  get items() {
    return props.items;
  },
  get active() {
    return props.modelValue;
  },
  onChange: (key) => {
    emit('update:modelValue', key);
    emit('change', key);
  },
});
</script>

<template>
  <nav :class="rootClass" :aria-label="label">
    <div class="cl-tab-bar__list" role="tablist">
      <template v-for="item in items" :key="item.key">
        <button
          v-bind="(({ badgeText, isActive, onClick, onKeydown, ...rest }) => rest)(getItemProps(item))"
          :data-key="item.key"
          @click="getItemProps(item).onClick()"
          @keydown="getItemProps(item).onKeydown($event)"
        >
          <i v-if="item.icon" :class="['cl-icon', 'cl-tab-bar__icon', item.icon]" aria-hidden="true" />
          <span class="cl-tab-bar__label">{{ item.label }}</span>
          <span
            v-if="getItemProps(item).badgeText"
            class="cl-tab-bar__badge"
            :aria-label="`${getItemProps(item).badgeText} 則未讀`"
          >
            {{ getItemProps(item).badgeText }}
          </span>
          <!-- 目前選中的 tab 用視覺以外的方式再提示一次；aria-selected 已足夠給輔助技術 -->
          <span v-if="getItemProps(item).isActive" class="cl-tab-bar__indicator" aria-hidden="true" />
        </button>
      </template>
    </div>
  </nav>
</template>

<!-- 不用 scoped：class 命名走 BEM，與 React 版共用同一套 cl-* 選擇器 -->
<style>
.cl-tab-bar {
  position: sticky;
  bottom: 0;
  z-index: 10;
  background: var(--cl-card-background);
  border-top: 1px solid var(--cl-border);
  font-family: var(--cl-font-family);
  /* iPhone 底部 home indicator 的安全區 */
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.cl-tab-bar__list {
  display: flex;
  align-items: stretch;
}

.cl-tab-bar__item {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 50px;
  padding: var(--cl-space-xs) var(--cl-space-xs) 0;
  border: 0;
  background: transparent;
  color: var(--cl-text-secondary);
  cursor: pointer;
  transition: color 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.cl-tab-bar__item:focus-visible {
  outline: 2px solid var(--cl-primary);
  outline-offset: -2px;
}

.cl-tab-bar__item.is-active {
  color: var(--cl-primary);
}

.cl-tab-bar__icon {
  font-size: 22px;
}

.cl-tab-bar__label {
  max-width: 100%;
  font-size: var(--cl-font-size-caption);
  line-height: var(--cl-line-height-caption);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cl-tab-bar__badge {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(6px);
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: var(--cl-radius-pill);
  background: var(--cl-danger);
  color: #fff;
  font-size: 10px;
  line-height: 16px;
  font-weight: 600;
  text-align: center;
  box-sizing: border-box;
}

.cl-tab-bar__indicator {
  position: absolute;
  top: 0;
  left: 50%;
  width: 24px;
  height: 2px;
  transform: translateX(-50%);
  border-radius: var(--cl-radius-pill);
  background: var(--cl-primary);
}

@media (prefers-reduced-motion: reduce) {
  .cl-tab-bar__item {
    transition: none;
  }
}
</style>
