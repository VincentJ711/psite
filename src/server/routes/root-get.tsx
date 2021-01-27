import { Request, Response, } from 'express';
import * as React from 'react';
import { Root, } from '../../client/components/root';
import { IInitialState, } from '../../client/entry';
import { env, } from '../env';
import { Page, } from '../page';

export class RootGet {
  static handler(req: Request, res: Response) {
    if (!RootGet.dmLink) {
      RootGet.dmLink = env.dmanLink;
      RootGet.wmsLink = env.wmscraperLink;
    }

    const iState: IInitialState = {
      dmLink: RootGet.dmLink,
      wmsLink: RootGet.wmsLink,
    };

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(Page.asString({
      ele: <Root wmsLink={RootGet.wmsLink} dmLink={RootGet.dmLink} />,
      initialState: iState,
      title: 'vincent',
    }));
  }

  private static dmLink = '';
  private static wmsLink = '';
}
