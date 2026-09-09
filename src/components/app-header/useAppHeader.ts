import { computed, type ComputedRef } from 'vue';

export interface AppHeaderProps {
  /** 頁面標題；空字串或未給就不渲染 h1 */
  title?: string;
  /** 是否顯示返回鈕，預設 true */
  showBack?: boolean;
  /** 返回鈕的無障礙標籤 */
  backLabel?: string;
}

export interface UseAppHeaderOptions {
  title?: string;
  showBack?: boolean;
  /** `left` slot 是否有給；由元件端讀 slots 後傳入 */
  hasLeft?: boolean;
}

export interface UseAppHeaderReturn {
  rootClass: ComputedRef<string[]>;
  hasLeft: ComputedRef<boolean>;
  showBackButton: ComputedRef<boolean>;
  hasTitle: ComputedRef<boolean>;
}

/**
 * AppHeader 的顯示推導。
 *
 * 規則只有三條，但「left 覆蓋返回鈕」這條很容易被寫成「兩個都顯示」，
 * 抽出來讓判斷只有一份：
 *
 * - `left` 有給 → 渲染 left，不渲染返回鈕（即使 showBack 為 true）
 * - `left` 沒給且 `showBack` → 渲染返回鈕
 * - `title` 非空字串才渲染 h1，空值占位由父層決定
 *
 * options 傳 getter 進來即可，內部用 computed 讀取，會跟著更新。
 */
export function useAppHeader(options: UseAppHeaderOptions = {}): UseAppHeaderReturn {
  const hasLeft = computed(() => Boolean(options.hasLeft));
  const showBackButton = computed(() => (options.showBack ?? true) && !hasLeft.value);
  const hasTitle = computed(() => typeof options.title === 'string' && options.title.trim() !== '');
  const rootClass = computed(() => ['cl-app-header']);

  return { rootClass, hasLeft, showBackButton, hasTitle };
}
