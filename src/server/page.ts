import { ServerStyleSheets, } from '@material-ui/core/styles';
import * as dom from 'react-dom/server';
import * as serialize from 'serialize-javascript';
import { getStyles, } from 'typestyle';
import { env, } from '../client/env';

interface IPageParams {
  description?: string;
  ele: JSX.Element;
  initialState: any;
  title: string;
}

export class Page {
  static asString(pp: IPageParams) {
    const sheets = new ServerStyleSheets();
    const html = dom.renderToString(sheets.collect(pp.ele));
    const mcss = sheets.toString();
    const tcss = getStyles();
    const desc = pp.description ?
        `<meta name="description" content="${pp.description}">` : '';

    return `
      <!DOCTYPE html>
      <html style="height: 100%" lang='en'>
        <head>${desc}
          <title>${pp.title}</title>
          ${desc}
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="google" content="notranslate">
          <meta http-equiv="Content-Language" content="en">
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <style>* { font-family: Helvetica Neue, Helvetica, Aria, serif}</style>
          <style id="${env.muicssid}">${mcss}</style>
          <style id="${env.tscssid}">${tcss}</style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
          <script>window.__INITIAL_STATE__=${serialize(pp.initialState)};</script>
          <script src="bundles/vendor.js"></script>
          <script src="bundles/client.js"></script>
        </head>
        <body style="height: 100%; margin: 0; padding: 0;">
          <div id=${env.htmlid} style="display: flex; flex-direction: column; min-height: 100%; overflow-x: hidden;">${html}</div>
        </body>
      </html>
    `;
  }
}
