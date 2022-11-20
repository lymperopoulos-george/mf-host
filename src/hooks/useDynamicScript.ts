import { useState, useEffect } from 'react';
import { downloadScript } from '../utils';

export const useDynamicScript = (url: string) => {
  const [ready, setReady] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    downloadScript(url).then(
      () => {
        setReady(true);
      },
      () => {
        setErrorLoading(true);
      }
    );
  }, [url]);

  return {
    errorLoading,
    ready,
  };
};

export default useDynamicScript;
