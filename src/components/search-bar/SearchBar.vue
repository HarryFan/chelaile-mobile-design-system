<script setup lang="ts">
import { useId } from 'vue';
import { useSearchBar } from './useSearchBar';

export interface SearchBarProps {
  /** 受控值（v-model）；不給就是非受控 */
  modelValue?: string;
  defaultValue?: string;
  /** 無障礙標籤，視覺上隱藏 */
  label?: string;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  /** debounce 毫秒數，0 表示不 debounce */
  debounceMs?: number;
}

const props = withDefaults(defineProps<SearchBarProps>(), {
  modelValue: undefined,
  defaultValue: '',
  label: '搜尋',
  placeholder: '搜尋站牌或路線',
  autoFocus: false,
  disabled: false,
  debounceMs: 300,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  /** 每次真實值變動（組字中不會發） */
  change: [value: string];
  /** debounce 後或按 Enter 時發出 */
  search: [value: string];
  /** 按下清除鈕 */
  clear: [];
}>();

const inputId = useId();

const { value, hasValue, handleInput, handleCompositionStart, handleCompositionEnd, handleKeyDown, clear } =
  useSearchBar({
    get modelValue() {
      return props.modelValue;
    },
    get defaultValue() {
      return props.defaultValue;
    },
    get debounceMs() {
      return props.debounceMs;
    },
    onChange: (next) => {
      emit('update:modelValue', next);
      emit('change', next);
    },
    onSearch: (next) => emit('search', next),
    onClear: () => emit('clear'),
  });
</script>

<template>
  <div :class="['cl-search-bar', { 'is-disabled': disabled }]">
    <label class="cl-search-bar__label" :for="inputId">{{ label }}</label>
    <i class="cl-icon cl-search-bar__icon ri-search-line" aria-hidden="true" />
    <input
      :id="inputId"
      class="cl-search-bar__input"
      type="search"
      role="searchbox"
      :value="value"
      :placeholder="placeholder"
      :autofocus="autoFocus"
      :disabled="disabled"
      @input="handleInput"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @keydown="handleKeyDown"
    />
    <button
      v-if="hasValue && !disabled"
      type="button"
      class="cl-search-bar__clear"
      aria-label="清除搜尋"
      @click="clear"
    >
      <i class="cl-icon ri-close-circle-fill" aria-hidden="true" />
    </button>
  </div>
</template>

<!-- 不用 scoped：class 命名走 BEM，與 React 版共用同一套 cl-* 選擇器 -->
<style>
.cl-search-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--cl-space-sm);
  height: 40px;
  padding: 0 var(--cl-space-md);
  background: var(--cl-card-background);
  border: 1px solid var(--cl-border);
  border-radius: var(--cl-radius-pill);
  font-family: var(--cl-font-family);
}

.cl-search-bar:focus-within {
  border-color: var(--cl-primary);
}

.cl-search-bar.is-disabled {
  background: var(--cl-background);
  opacity: 0.6;
}

/* 視覺隱藏但保留給輔助技術 */
.cl-search-bar__label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* 圖示絕對定位在欄位內左側，input 留出 padding-left 讓文字不壓到圖示 */
.cl-search-bar__icon {
  position: absolute;
  left: var(--cl-space-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--cl-text-secondary);
  font-size: 18px;
  pointer-events: none;
}

.cl-search-bar__input {
  flex: 1;
  min-width: 0;
  padding-left: calc(18px + var(--cl-space-sm));
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--cl-font-size-body);
  line-height: var(--cl-line-height-body);
  color: var(--cl-text);
}

.cl-search-bar__input::placeholder {
  color: var(--cl-text-placeholder);
}

/* 關掉 Safari/Chrome 內建的清除鈕，統一用自己的 */
.cl-search-bar__input::-webkit-search-cancel-button {
  appearance: none;
}

.cl-search-bar__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--cl-text-secondary);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.cl-search-bar__clear:focus-visible {
  outline: 2px solid var(--cl-primary);
  outline-offset: 2px;
}
</style>
