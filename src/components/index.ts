import type { App } from 'vue';

// 元件清單與 ../../COMPONENT-SPEC.md 第 2 節一致，React 版同步維護
import ButtonPlugin, { Button, useButton } from './button';
import SearchBarPlugin, { SearchBar, useSearchBar } from './search-bar';
import StatusCardPlugin, { StatusCard, useStatusCard } from './status-card';
import GeoStatusCardPlugin, { GeoStatusCard } from './geo-status-card';
import StationCardPlugin, { StationCard, useStationCard, UPDATING_TEXT, EMPTY_TEXT } from './station-card';
import TabBarPlugin, { TabBar, useTabBar, formatBadge } from './tab-bar';
import AppHeaderPlugin, { AppHeader, useAppHeader } from './app-header';
import EmptyStatePlugin, { EmptyState, useEmptyState } from './empty-state';
import LoadingPlugin, { Loading, useLoading } from './loading';

export {
  Button,
  useButton,
  SearchBar,
  useSearchBar,
  StatusCard,
  useStatusCard,
  GeoStatusCard,
  StationCard,
  useStationCard,
  UPDATING_TEXT,
  EMPTY_TEXT,
  TabBar,
  useTabBar,
  formatBadge,
  AppHeader,
  useAppHeader,
  EmptyState,
  useEmptyState,
  Loading,
  useLoading,
};

export type { ButtonProps, ButtonVariant, ButtonSize, ButtonHtmlType, UseButtonOptions, UseButtonReturn } from './button';
export type { SearchBarProps, UseSearchBarOptions, UseSearchBarReturn } from './search-bar';
export type { StatusCardProps, StatusTone, UseStatusCardOptions, UseStatusCardReturn } from './status-card';
export type { GeoStatusCardProps, GeoStatus } from './geo-status-card';
export type {
  StationCardProps,
  BusInfo,
  UseStationCardOptions,
  UseStationCardReturn,
  StationCardBusView,
} from './station-card';
export type { TabBarProps, TabBarItem, UseTabBarOptions, UseTabBarReturn, TabBarItemBindings } from './tab-bar';
export type { AppHeaderProps, UseAppHeaderOptions, UseAppHeaderReturn } from './app-header';
export type { EmptyStateProps, UseEmptyStateOptions, UseEmptyStateReturn } from './empty-state';
export type { LoadingProps, LoadingSize, UseLoadingOptions, UseLoadingReturn } from './loading';

const plugins = [
  ButtonPlugin,
  SearchBarPlugin,
  StatusCardPlugin,
  GeoStatusCardPlugin,
  StationCardPlugin,
  TabBarPlugin,
  AppHeaderPlugin,
  EmptyStatePlugin,
  LoadingPlugin,
];

/** 全域註冊全部元件（ClButton / ClSearchBar / … / GeoStatusCard） */
const install = (app: App) => {
  plugins.forEach((plugin) => app.use(plugin));
};

export default { install };
