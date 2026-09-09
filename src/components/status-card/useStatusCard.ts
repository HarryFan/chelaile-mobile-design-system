import { computed, type ComputedRef } from 'vue';

export type StatusTone = 'success' | 'warning' | 'danger' | 'info';

const TONE_ICON: Record<StatusTone, string> = {
  success: '✓',
  warning: '!',
  danger: '×',
  info: 'i',
};

export interface UseStatusCardOptions {
  tone?: StatusTone;
}

export interface UseStatusCardReturn {
  icon: ComputedRef<string>;
  role: ComputedRef<'alert' | 'status'>;
  ariaLive: ComputedRef<'assertive' | 'polite'>;
  toneClass: ComputedRef<string>;
}

/**
 * 狀態卡的語意推導。
 *
 * 重點在 role：danger 用 `alert`（螢幕閱讀器會立刻打斷並朗讀），
 * 其餘用 `status`（等使用者當前朗讀結束才補上）。
 * 全部都設成 alert 會讓使用者被不重要的訊息一直打斷。
 */
export function useStatusCard(options: UseStatusCardOptions = {}): UseStatusCardReturn {
  const tone = computed<StatusTone>(() => options.tone ?? 'info');
  return {
    icon: computed(() => TONE_ICON[tone.value]),
    role: computed(() => (tone.value === 'danger' ? 'alert' : 'status')),
    ariaLive: computed(() => (tone.value === 'danger' ? 'assertive' : 'polite')),
    toneClass: computed(() => `cl-status-card--${tone.value}`),
  };
}
