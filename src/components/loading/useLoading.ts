import { computed, type ComputedRef } from 'vue';

export type LoadingSize = 'sm' | 'md' | 'lg';

export interface LoadingProps {
  /** 提示文字；給空字串就只顯示 spinner */
  text?: string;
  /** spinner 尺寸：sm 16px / md 24px / lg 32px */
  size?: LoadingSize;
  /** 全螢幕半透明遮罩，擋住底下內容的互動 */
  overlay?: boolean;
}

export interface UseLoadingOptions {
  size?: LoadingSize;
  overlay?: boolean;
  text?: string;
}

export interface UseLoadingReturn {
  rootClass: ComputedRef<string[]>;
  hasText: ComputedRef<boolean>;
}

/**
 * Loading 的樣式與顯示推導。
 *
 * size / overlay 對應的 class 只在這裡組一次；
 * `text` 給空字串時不渲染文字節點——只有轉圈的情境（例如按鈕旁的小 spinner）
 * 不該留一個空的 <span> 佔位。
 *
 * options 傳 getter 進來即可，內部用 computed 讀取，會跟著更新。
 */
export function useLoading(options: UseLoadingOptions = {}): UseLoadingReturn {
  const rootClass = computed(() => [
    'cl-loading',
    `cl-loading--${options.size ?? 'md'}`,
    ...(options.overlay ? ['is-overlay'] : []),
  ]);

  const hasText = computed(() => Boolean(options.text));

  return { rootClass, hasText };
}
