<script setup lang="ts">
import { useSlots } from 'vue';
import type { AppHeaderProps } from './useAppHeader';
import { useAppHeader } from './useAppHeader';

const props = withDefaults(defineProps<AppHeaderProps>(), {
  title: undefined,
  showBack: true,
  backLabel: '返回',
});

const emit = defineEmits<{
  /** 使用者按下返回鈕；路由跳轉是父層的事，元件只發事件 */
  back: [];
}>();

const slots = useSlots();

const { rootClass, hasLeft, showBackButton, hasTitle } = useAppHeader({
  get title() {
    return props.title;
  },
  get showBack() {
    return props.showBack;
  },
  get hasLeft() {
    return Boolean(slots.left);
  },
});
</script>

<template>
  <header :class="rootClass" role="banner">
    <div class="cl-app-header__left">
      <!-- left slot 有給就覆蓋返回鈕，即使 showBack 為 true -->
      <slot v-if="hasLeft" name="left" />
      <button
        v-if="showBackButton"
        type="button"
        class="cl-app-header__back"
        :aria-label="backLabel"
        @click="emit('back')"
      >
        <i class="cl-icon ri-arrow-left-s-line" aria-hidden="true" />
      </button>
    </div>

    <!-- 沒 title 不渲染 h1，空值占位由父層決定 -->
    <h1 v-if="hasTitle" class="cl-app-header__title">{{ title }}</h1>

    <div class="cl-app-header__right"><slot name="right" /></div>
  </header>
</template>

<!-- 不用 scoped：class 命名走 BEM，與 React 版共用同一套 cl-* 選擇器 -->
<style>
.cl-app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 var(--cl-space-sm);
  background: var(--cl-card-background);
  border-bottom: 1px solid var(--cl-border);
  font-family: var(--cl-font-family);
  color: var(--cl-text);
}

/* 左右兩側等寬，標題才會真正置中而不是被返回鈕擠偏 */
.cl-app-header__left,
.cl-app-header__right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  min-width: 44px;
  height: 100%;
}

.cl-app-header__right {
  justify-content: flex-end;
}

.cl-app-header__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--cl-text);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.cl-app-header__back:focus-visible {
  outline: 2px solid var(--cl-primary);
  outline-offset: -2px;
}

.cl-app-header__title {
  flex: 1 1 0;
  min-width: 0;
  margin: 0;
  text-align: center;
  font-size: var(--cl-font-size-subtitle);
  line-height: var(--cl-line-height-subtitle);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
