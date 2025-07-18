import type { App, Plugin } from 'vue';
import type { SFCWithInstall } from './types';

export const withInstall = <T>(comp: T) => {
  const c = comp as any;
  c.install = function (app: App) {
    app.component(c.name || c.displayName, comp);
  };

  return c as SFCWithInstall<T>;
};

export const withNoopInstall = <T>(component: T) => {
  const c = component as any;
  c.install = () => {};
  return c as SFCWithInstall<T>;
};
