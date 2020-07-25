import * as compression from 'compression';
import * as express from 'express';
import * as proxy from 'express-http-proxy';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as morgan from 'morgan';
import * as path from 'path';
import { env, } from './env';
import { RootGet, } from './routes/root-get';
const pubDir = path.join(__dirname, '../../public');
const pubClientBundleFile = path.join(__dirname, '../../public/bundles/client.js');

new (class {
  private app: express.Application;

  constructor() {
    const app = this.app = express();

    app.use(compression());
    app.use(morgan('tiny'));
    app.use(proxy(`http://${env.dmhost}`, {
      filter: req => {
        // the .well-known is where the ssl certbot places its challenge
        // files. since this server is a proxy to the the dm/wm hosts
        // lets just use the .well-known dir on this
        // server for both of them, so if the req is for .well-known
        // ignore it and let this server handle it
        return req.subdomains.includes(env.dmanSubdomain) &&
            !req.url.startsWith('/.well-known'); 
      },
    }));
    app.use(proxy(`http://${env.wmshost}`, {
      filter: req => {
        return req.subdomains.includes(env.wmscraperSubdomain) &&
            !req.url.startsWith('/.well-known'); 
      },
    }));

    this.setStandardHandlers();
    app.route('/bundles/client.js').get(this.clientBundleHandler.bind(this));
    app.use(express.static(pubDir, { maxAge: env.staticCacheMillis, dotfiles: 'allow', }));

    if (env.deployed) {
      // redirect http -> https
      http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
        res.writeHead(301, {
          Location: `https://${req.headers.host}${req.url}`,
        });
        res.end();
      }).listen(80);

      https.createServer({
        cert: fs.readFileSync(env.sslCertFile),
        key: fs.readFileSync(env.sslKeyFile),
      }, app).listen(443);
    } else {
      // make it so if .com is not present in request, subdomain can still be parsed
      // this is important for the proxy filters above
      app.set('subdomain offset', 1);
      app.listen(env.port, () => {});
    }
  }

  private clientBundleHandler(_req: any, res: express.Response, _next: any) {
    const cache = `public, max-age=${env.staticClientBundleCacheSeconds}`;
    res.setHeader('Cache-Control', cache);
    res.sendFile(pubClientBundleFile);
  }

  private setStandardHandlers() {
    const app = this.app;
    app.route('/status').get((_req, res) => {
      res.sendStatus(200);
    });
    app.route('/').get(RootGet.handler);
  }
})();
