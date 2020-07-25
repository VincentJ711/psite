import { hostname, } from 'os';
import * as path from 'path';
import * as config from '../../.app.config.json';

const deployed = hostname().startsWith(config.serverHostNamePrefix);

export const env = {
  deployed,
  port: config.port,
  staticCacheMillis: 3600000,
  staticClientBundleCacheSeconds: deployed ? 3600 : 0,
  dmhost: deployed ? config.dmhost : config.dmhostdev,
  wmshost: deployed ? config.wmshost : config.wmshostdev,
  dmanSubdomain: 'dman',
  wmscraperSubdomain: 'wmscraper',

  // generated via `certbot certonly --webroot` on the server
  sslCertFile: '/etc/letsencrypt/live/vincentjs.com/fullchain.pem',
  sslKeyFile: '/etc/letsencrypt/live/vincentjs.com/privkey.pem',
};
