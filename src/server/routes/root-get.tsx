import { Request, Response, } from 'express';
import { SheetsRegistry, } from 'jss';
import * as React from 'react';
import { Root, } from '../../client/components/root';
import { IInitialState, } from '../../client/entry';
import { env, } from '../env';
import { Page, } from '../page';

export class RootGet {
  static handler(req: Request, res: Response) {
    if (!RootGet.dmLink) {
      const port = env.deployed ? '' : `:${env.port}`;
      RootGet.dmLink = `${req.protocol}://${env.dmanSubdomain}.${req.hostname}${port}`;
      RootGet.wmsLink = `${req.protocol}://${env.wmscraperSubdomain}.${req.hostname}${port}`;
    }

    const iState: IInitialState = {
      dmLink: RootGet.dmLink,
      wmsLink: RootGet.wmsLink,
    };

    const registry = new SheetsRegistry();

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(Page.asString({
      ele: <Root
        wmsLink={RootGet.wmsLink}
        dmLink={RootGet.dmLink}
        sheetManager={new Map()}
        registry={registry}
      />,
      initialState: iState,
      registry,
      title: 'vincent',
    }));
  }

  private static dmLink = '';
  private static wmsLink = '';
}
