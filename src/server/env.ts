const deployed = process.env.NODE_ENV === 'production';

export const env = {
  deployed,
  port: 8080,
  staticCacheMillis: 3600000,
  staticClientBundleCacheSeconds: deployed ? 3600 : 0,
  dmanLink: 'https://dman.vincentjs.com',
  wmscraperLink: 'https://wmscraper.vincentjs.com',
};
