import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Root, } from './components/root';
import { env, } from './env';

export interface IInitialState {
  dmLink: string;
  wmsLink: string;
}

const istate: IInitialState = (window as any).__INITIAL_STATE__;

document.addEventListener('DOMContentLoaded', _e => {
  const path = window.location.pathname;
  let ele: JSX.Element;

  if (path === '/') {
    ele = <Root wmsLink={istate.wmsLink} dmLink={istate.dmLink}/>;
  } else {
    throw Error('unrecognized location');
  }

  ReactDom.hydrate(ele as any, document.getElementById(env.htmlid));
});
