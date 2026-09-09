import { computed, type ComputedRef } from 'vue';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonHtmlType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  /** 視覺樣式 */
  variant?: ButtonVariant;
  /** 尺寸 */
  size?: ButtonSize;
  /** 膠囊圓角 */
  round?: boolean;
  /** 撐滿容器寬度 */
  block?: boolean;
  /** 載入中：顯示 spinner 並擋掉點擊，但保留可聚焦 */
  loading?: boolean;
  /** 真的不可用：會設 disabled attribute */
  disabled?: boolean;
  /** 原生 button type，預設 button 而非 submit，避免在表單內誤送出 */
  htmlType?: ButtonHtmlType;
}

export interface UseButtonOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  round?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  /** 通過 loading / disabled 守門後才會被呼叫 */
  onClick?: (event: MouseEvent) => void;
}

export interface UseButtonReturn {
  rootClass: ComputedRef<string[]>;
  /** 既不 loading 也不 disabled 才可互動 */
  isInteractive: ComputedRef<boolean>;
  ariaBusy: ComputedRef<'true' | undefined>;
  ariaDisabled: ComputedRef<'true' | undefined>;
  handleClick: (event: MouseEvent) => void;
}

/**
 * Button 的行為與樣式推導。
 *
 * 抽成 composable 的理由：`loading` 期間要擋掉點擊，這條規則在多個地方會被忘記寫，
 * 放在元件裡就會被複製到下一個按鈕元件。抽出來之後，行為只有一份。
 *
 * options 傳 reactive 的 props 進來即可，內部用 computed 讀取，會跟著更新。
 */
export function useButton(options: UseButtonOptions = {}): UseButtonReturn {
  // loading 也視為不可互動，但語意上仍是 button 而非 disabled attribute，
  // 否則螢幕閱讀器會直接跳過，使用者不知道正在處理中。
  const isInteractive = computed(() => !options.disabled && !options.loading);

  const rootClass = computed(() => [
    'cl-button',
    `cl-button--${options.variant ?? 'primary'}`,
    `cl-button--${options.size ?? 'md'}`,
    ...(options.round ? ['cl-button--round'] : []),
    ...(options.block ? ['cl-button--block'] : []),
    ...(options.loading ? ['is-loading'] : []),
    ...(options.disabled ? ['is-disabled'] : []),
  ]);

  const ariaBusy = computed<'true' | undefined>(() => (options.loading ? 'true' : undefined));
  const ariaDisabled = computed<'true' | undefined>(() =>
    options.disabled || options.loading ? 'true' : undefined,
  );

  const handleClick = (event: MouseEvent) => {
    if (!isInteractive.value) {
      event.preventDefault();
      return;
    }
    options.onClick?.(event);
  };

  return { rootClass, isInteractive, ariaBusy, ariaDisabled, handleClick };
}
