import type { App, Component } from 'vue';

export type SFCWithInstall<T> = T & Plugin & {
  displayName?: string;
};

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: App | null;
};

export type ComponentSize = 'large' | 'default' | 'small';

export type ComponentType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface ComponentProps {
  /** 組件大小 */
  size?: ComponentSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定義類名 */
  className?: string | string[];
  /** 自定義樣式 */
  style?: Record<string, any>;
}
