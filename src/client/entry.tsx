import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Root, } from './components/root';
import { env, } from './env';

export interface IInitialState {
  dmLink: string;
  wmsLink: string;
}

const initialState: IInitialState = (window as any).__INITIAL_STATE__;

document.addEventListener('DOMContentLoaded', _e => {
  if (window.location.pathname !== '/') {
    throw Error('unrecognized location');
  }

  const muiStyles = document.getElementById(env.muicssid);
  const customStyles = document.getElementById(env.tscssid);

  if (muiStyles) {
    muiStyles.parentElement?.removeChild(muiStyles);
  }

  if (customStyles) {
    customStyles.parentElement?.removeChild(customStyles);
  }

  ReactDom.hydrate(
      <Root wmsLink={initialState.wmsLink} dmLink={initialState.dmLink}/>,
      document.getElementById(env.htmlid)
  );
});
