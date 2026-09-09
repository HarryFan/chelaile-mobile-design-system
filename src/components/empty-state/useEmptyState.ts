import { computed, type ComputedRef } from 'vue';

export interface EmptyStateProps {
  /** 主標題 */
  title?: string;
  /** 補充說明。父層若可能拿到空值，請自行擋掉再傳入 */
  description?: string;
  /** 裝飾用圖示：Remix Icon class 字串（如 `ri-bus-line`），預設 `ri-inbox-line`，對輔助科技隱藏 */
  icon?: string;
  /** 有給 actionText 才會顯示按鈕 */
  actionText?: string;
}

export interface UseEmptyStateOptions {
  description?: string;
  actionText?: string;
}

export interface UseEmptyStateReturn {
  rootClass: ComputedRef<string[]>;
  hasDescription: ComputedRef<boolean>;
  hasAction: ComputedRef<boolean>;
}

/**
 * EmptyState 的推導邏輯。
 *
 * 「有沒有說明」「有沒有按鈕」這兩條判斷只在這裡寫一次；
 * 元件本身只負責照著 hasDescription / hasAction 渲染，
 * 之後若要改成「空字串也算沒有」之類的規則，不用碰 template。
 *
 * options 傳 getter 進來即可，內部用 computed 讀取，會跟著更新。
 */
export function useEmptyState(options: UseEmptyStateOptions = {}): UseEmptyStateReturn {
  const rootClass = computed(() => ['cl-empty-state']);

  // 空字串視為沒給，父層擋不到的空值在這裡收掉，不渲染空的 <p>
  const hasDescription = computed(() => Boolean(options.description));
  const hasAction = computed(() => Boolean(options.actionText));

  return { rootClass, hasDescription, hasAction };
}
