import { computed, type ComputedRef } from 'vue';

export interface TabBarItem {
  key: string;
  label: string;
  /** emoji 或文字，先不綁 icon 庫 */
  icon?: string;
  /** 未讀數；0 或未給不顯示，大於 99 顯示 `99+` */
  badge?: number;
}

export interface UseTabBarOptions {
  items: TabBarItem[];
  /** 目前選中的 key */
  active: string;
  onChange?: (key: string) => void;
}

export interface TabBarItemBindings {
  role: 'tab';
  type: 'button';
  'aria-selected': boolean;
  tabindex: 0 | -1;
  class: string[];
  badgeText: string | undefined;
  isActive: boolean;
  onClick: () => void;
  onKeydown: (event: KeyboardEvent) => void;
}

export interface UseTabBarReturn {
  rootClass: ComputedRef<string[]>;
  getItemProps: (item: TabBarItem) => TabBarItemBindings;
}

/** 徽章文字：> 99 顯示 `99+`；0 / 未給回傳 undefined 表示不渲染 */
export function formatBadge(badge?: number): string | undefined {
  if (badge === undefined || badge <= 0) return undefined;
  return badge > 99 ? '99+' : String(badge);
}

/**
 * TabBar 的選取與鍵盤行為。
 *
 * 兩條容易被漏掉的規則集中在這裡：
 *
 * 1. **點擊已選中的 tab 不發 change**：否則父層會因為同值更新而多跑一次路由或請求。
 * 2. **roving tabindex**：只有選中的 tab 可被 Tab 鍵聚焦，←/→ 在 tab 之間循環切換。
 *    這是 WAI-ARIA tabs pattern 的要求，沒做的話鍵盤使用者要按很多次 Tab 才能離開列表。
 *
 * options 傳帶 getter 的物件進來（讀 props），每次呼叫 getItemProps 都會讀到最新值。
 */
export function useTabBar(options: UseTabBarOptions): UseTabBarReturn {
  const rootClass = computed(() => ['cl-tab-bar']);

  const select = (key: string) => {
    if (key === options.active) return;
    options.onChange?.(key);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const items = options.items;
    if (items.length === 0) return;
    event.preventDefault();

    const currentIndex = Math.max(
      0,
      items.findIndex((item) => item.key === options.active),
    );
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    // 循環：最後一個往右回到第一個，第一個往左跳到最後一個
    const nextIndex = (currentIndex + delta + items.length) % items.length;
    const next = items[nextIndex];

    select(next.key);

    // 焦點跟著移到新 tab，否則 tabindex 變成 -1 後焦點會卡在舊 tab 上
    const siblings = (event.currentTarget as HTMLElement | null)?.parentElement?.children;
    const target = siblings?.[nextIndex];
    if (target instanceof HTMLElement) target.focus();
  };

  const getItemProps = (item: TabBarItem): TabBarItemBindings => {
    const isActive = item.key === options.active;
    return {
      role: 'tab',
      type: 'button',
      'aria-selected': isActive,
      tabindex: isActive ? 0 : -1,
      class: ['cl-tab-bar__item', ...(isActive ? ['is-active'] : [])],
      badgeText: formatBadge(item.badge),
      isActive,
      onClick: () => select(item.key),
      onKeydown: handleKeyDown,
    };
  };

  return { rootClass, getItemProps };
}
