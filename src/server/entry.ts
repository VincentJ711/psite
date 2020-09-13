import * as compression from 'compression';
import * as express from 'express';
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
    
    app.route('/status').get((_req, res) => res.sendStatus(200));
    app.route('/').get(RootGet.handler);
    app.route('/bundles/client.js').get(this.clientBundleHandler.bind(this));

    app.use(express.static(pubDir, { 
      maxAge: env.staticCacheMillis, 
      dotfiles: 'allow', 
    }));

    app.listen(env.port);
  }

  private clientBundleHandler(_req: any, res: express.Response, _next: any) {
    const cache = `public, max-age=${env.staticClientBundleCacheSeconds}`;
    res.setHeader('Cache-Control', cache);
    res.sendFile(pubClientBundleFile);
  }
})();
