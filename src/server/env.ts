const deployed = process.env.NODE_ENV === 'production';

export const env = {
  deployed,
  port: 5000,
  staticCacheMillis: 3600000,
  staticClientBundleCacheSeconds: deployed ? 3600 : 0,
  domain: deployed ? 'vincentjs.com' : 'localhost',
  dmanSubdomain: 'dman',
  wmscraperSubdomain: 'wmscraper',
};
