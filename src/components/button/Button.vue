<script setup lang="ts">
import type { ButtonProps } from './useButton';
import { useButton } from './useButton';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  round: false,
  block: false,
  loading: false,
  disabled: false,
  htmlType: 'button',
});

const emit = defineEmits<{
  /** 使用者點擊；loading / disabled 時不會發出 */
  click: [event: MouseEvent];
}>();

const { rootClass, ariaBusy, ariaDisabled, handleClick } = useButton({
  get variant() {
    return props.variant;
  },
  get size() {
    return props.size;
  },
  get round() {
    return props.round;
  },
  get block() {
    return props.block;
  },
  get loading() {
    return props.loading;
  },
  get disabled() {
    return props.disabled;
  },
  onClick: (event) => emit('click', event),
});
</script>

<template>
  <!--
    只在真的 disabled 時設 disabled attribute；loading 用 aria-disabled，
    這樣按鈕仍可被 Tab 聚焦，使用者才感知得到「正在處理」。
  -->
  <button
    :type="htmlType"
    :class="rootClass"
    :disabled="disabled"
    :aria-busy="ariaBusy"
    :aria-disabled="ariaDisabled"
    @click="handleClick"
  >
    <span v-if="loading" class="cl-button__spinner" aria-hidden="true" />
    <span class="cl-button__content"><slot /></span>
  </button>
</template>

<!-- 不用 scoped：class 命名走 BEM，與 React 版共用同一套 cl-* 選擇器 -->
<style>
.cl-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--cl-space-sm);
  border: 1px solid transparent;
  border-radius: 6px;
  font-family: var(--cl-font-family);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.cl-button:focus-visible {
  outline: 2px solid var(--cl-primary);
  outline-offset: 2px;
}

/* 尺寸 */
.cl-button--sm {
  height: 32px;
  padding: 0 var(--cl-space-md);
  font-size: var(--cl-font-size-caption);
}
.cl-button--md {
  height: 40px;
  padding: 0 var(--cl-space-lg);
  font-size: var(--cl-font-size-body);
}
.cl-button--lg {
  height: 48px;
  padding: 0 var(--cl-space-lg);
  font-size: var(--cl-font-size-subtitle);
}

/* 變體 */
.cl-button--primary {
  background: var(--cl-primary);
  color: #fff;
}
.cl-button--primary:hover:not(.is-disabled):not(.is-loading) {
  background: var(--cl-primary-dark);
}

.cl-button--secondary {
  background: var(--cl-primary-light);
  color: var(--cl-primary);
}
.cl-button--secondary:hover:not(.is-disabled):not(.is-loading) {
  background: #d7e3ff;
}

.cl-button--danger {
  background: var(--cl-danger);
  color: #fff;
}
.cl-button--danger:hover:not(.is-disabled):not(.is-loading) {
  background: #d9363e;
}

.cl-button--ghost {
  background: transparent;
  border-color: var(--cl-border);
  color: var(--cl-text);
}
.cl-button--ghost:hover:not(.is-disabled):not(.is-loading) {
  border-color: var(--cl-primary);
  color: var(--cl-primary);
}

/* 修飾 */
.cl-button--round {
  border-radius: var(--cl-radius-pill);
}
.cl-button--block {
  display: flex;
  width: 100%;
}

.cl-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.cl-button.is-loading {
  cursor: progress;
}

.cl-button__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: cl-button-spin 0.7s linear infinite;
}

@keyframes cl-button-spin {
  to {
    transform: rotate(360deg);
  }
}

/* 尊重使用者的減少動態偏好，否則前庭功能敏感的使用者會不適 */
@media (prefers-reduced-motion: reduce) {
  .cl-button__spinner {
    animation-duration: 2s;
  }
  .cl-button {
    transition: none;
  }
}
</style>
