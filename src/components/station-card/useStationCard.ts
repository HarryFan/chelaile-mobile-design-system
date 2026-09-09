import { computed, type ComputedRef } from 'vue';

export interface BusInfo {
  routeId: string;
  routeName: string;
  /** 預估到站時間文字，例如「3 分」；沒給就顯示「更新中」 */
  arrivalTime?: string;
  /** 即將進站，會在列上加 `is-arriving` */
  isArriving?: boolean;
}

export interface StationCardProps {
  /** 站牌名稱 */
  stationName: string;
  /** 距離文字，例如「250 公尺」；有值才渲染距離區塊 */
  distance?: string;
  /** 班次列表；空陣列會顯示「目前沒有班次資訊」 */
  busList?: BusInfo[];
  /** 有給 actionText 才會顯示按鈕 */
  actionText?: string;
}

export interface UseStationCardOptions {
  distance?: string;
  busList?: BusInfo[];
}

export interface StationCardBusView {
  key: string;
  routeName: string;
  className: string[];
  timeText: string;
  isArriving: boolean;
}

export interface UseStationCardReturn {
  hasDistance: ComputedRef<boolean>;
  isEmpty: ComputedRef<boolean>;
  rootClass: ComputedRef<string[]>;
  buses: ComputedRef<StationCardBusView[]>;
  emptyText: string;
}

/** arrivalTime 缺值時顯示的文字。刻意用文字而非 spinner，Vue / React 兩邊一致好測。 */
export const UPDATING_TEXT = '更新中';
/** busList 為空時顯示的文字 */
export const EMPTY_TEXT = '目前沒有班次資訊';

/**
 * 站牌卡的顯示推導。
 *
 * 「有距離才顯示距離區塊」「沒有班次要顯示空狀態」「到站時間缺值顯示更新中」
 * 這三條規則放在元件裡很容易在改版時漏掉其中一條，抽出來讓行為只有一份。
 *
 * options 傳 reactive 的 props 進來即可，內部用 computed 讀取，會跟著更新。
 */
export function useStationCard(options: UseStationCardOptions = {}): UseStationCardReturn {
  const hasDistance = computed(() => options.distance !== undefined && options.distance !== '');
  const isEmpty = computed(() => (options.busList ?? []).length === 0);

  const rootClass = computed(() => ['cl-station-card', ...(isEmpty.value ? ['is-empty'] : [])]);

  const buses = computed<StationCardBusView[]>(() =>
    (options.busList ?? []).map((bus) => ({
      key: bus.routeId,
      routeName: bus.routeName,
      className: ['cl-station-card__bus', ...(bus.isArriving ? ['is-arriving'] : [])],
      timeText: bus.arrivalTime ? bus.arrivalTime : UPDATING_TEXT,
      isArriving: Boolean(bus.isArriving),
    })),
  );

  return { hasDistance, isEmpty, rootClass, buses, emptyText: EMPTY_TEXT };
}
