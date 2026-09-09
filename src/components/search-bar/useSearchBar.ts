import { computed, onUnmounted, ref, type ComputedRef } from 'vue';

export interface UseSearchBarOptions {
  /** 受控值（v-model）；不給就是非受控，由 composable 自己保存 */
  modelValue?: string;
  defaultValue?: string;
  /** 每次值變動都會呼叫（含輸入法組字結束後） */
  onChange?: (value: string) => void;
  /** debounce 後才觸發，用於打 API */
  onSearch?: (value: string) => void;
  /** 按下清除鈕後呼叫 */
  onClear?: () => void;
  /** debounce 毫秒數，0 表示不 debounce */
  debounceMs?: number;
}

export interface UseSearchBarReturn {
  value: ComputedRef<string>;
  hasValue: ComputedRef<boolean>;
  handleInput: (event: Event) => void;
  handleCompositionStart: () => void;
  handleCompositionEnd: (event: Event) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
  clear: () => void;
}

/**
 * 搜尋列的輸入行為。
 *
 * 兩個容易踩的坑，所以抽成 composable 讓所有搜尋列共用同一份實作：
 *
 * 1. **中文輸入法組字**：注音/拼音在組字過程中會不斷觸發 input，
 *    此時送出查詢會打到一堆沒有意義的半成品字串。用 composition 事件擋掉，
 *    組字結束（compositionend）才視為一次真正的輸入。
 * 2. **debounce 的清理**：元件卸載時若沒清掉 timer，會在已卸載的元件上發出請求。
 *
 * options 傳帶 getter 的物件進來（讀 props），內部用 computed 讀取，會跟著更新。
 */
export function useSearchBar(options: UseSearchBarOptions = {}): UseSearchBarReturn {
  const innerValue = ref(options.defaultValue ?? '');
  const isControlled = computed(() => options.modelValue !== undefined);
  const value = computed(() => (isControlled.value ? (options.modelValue as string) : innerValue.value));

  let isComposing = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const clearTimer = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  // 卸載時清掉待觸發的 debounce，避免對已卸載元件送出查詢
  onUnmounted(clearTimer);

  const emitSearch = (next: string) => {
    if (!options.onSearch) return;
    clearTimer();
    const ms = options.debounceMs ?? 300;
    if (ms <= 0) {
      options.onSearch(next);
      return;
    }
    timer = setTimeout(() => options.onSearch?.(next), ms);
  };

  const commit = (next: string) => {
    if (!isControlled.value) innerValue.value = next;
    options.onChange?.(next);
    emitSearch(next);
  };

  const handleInput = (event: Event) => {
    const next = (event.target as HTMLInputElement).value;
    // 組字中：畫面要跟著更新，但不對外送出查詢
    if (isComposing) {
      if (!isControlled.value) innerValue.value = next;
      return;
    }
    commit(next);
  };

  const handleCompositionStart = () => {
    isComposing = true;
  };

  const handleCompositionEnd = (event: Event) => {
    isComposing = false;
    commit((event.target as HTMLInputElement).value);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // 組字中的 Enter 是在選字，不是送出
    if (event.key === 'Enter' && !isComposing) {
      clearTimer();
      options.onSearch?.(value.value);
    }
  };

  const clear = () => {
    clearTimer();
    if (!isControlled.value) innerValue.value = '';
    options.onChange?.('');
    options.onSearch?.('');
    options.onClear?.();
  };

  return {
    value,
    hasValue: computed(() => value.value.length > 0),
    handleInput,
    handleCompositionStart,
    handleCompositionEnd,
    handleKeyDown,
    clear,
  };
}
