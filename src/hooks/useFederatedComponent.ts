import { useState, useEffect, lazy } from 'react';
import useDynamicScript from './useDynamicScript';

const loadComponent = (scope: string, module: string) => async () => {
  await __webpack_init_sharing__('default');
  const container = (window as any)[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await (window as any)[scope].get(module);
  const Module = factory();
  return Module;
};

const componentCache = new Map();
export const useFederatedComponent = <T = any,>(
  remoteUrl: string,
  scope: string,
  module: string
) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = useState<React.ComponentType<T>>();

  const { ready, errorLoading } = useDynamicScript(remoteUrl);
  useEffect(() => {
    if (Component) {
      setComponent(undefined);
    }
  }, [key]);

  useEffect(() => {
    if (ready && !Component) {
      const Comp = lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
  }, [Component, ready, key]);

  return { errorLoading, Component };
};

export default useFederatedComponent;
