const urlCache = new Set();
export const downloadScript = (url: string) =>
  new Promise<void>((resolve, reject) => {
    if (urlCache.has(url)) {
      return resolve();
    }
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      urlCache.add(url);
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
