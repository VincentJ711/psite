import { CssBaseline, Grid, } from '@material-ui/core';
import { SheetsRegistry, } from 'jss';
import * as React from 'react';
import { createGenerateClassName, JssProvider, } from 'react-jss';
import { style, } from 'typestyle';

interface IShellProps {
  registry?: SheetsRegistry;
  sheetManager?: Map<any, any>;
  strict?: boolean;
}

export class Shell extends React.Component<IShellProps, any> {
  render() {
    return (
      <JssProvider
        generateClassName={createGenerateClassName()}
        registry={this.props.registry}
      >
        <>
          <CssBaseline/>
          {
            this.props.strict ? this.props.children :
            <div className={styles.container}>
              <Grid container direction='row'>
                <Grid item sm={2} md={3} xl={4}/>
                <Grid item sm={8} md={6} xl={4}>
                  {this.props.children}
                </Grid>
                <Grid item sm={2} md={3} xl={4}/>
              </Grid>
            </div>
          }
        </>
      </JssProvider>
    );
  }
}

const styles = {
  container: style({
    // flex: 1,
    // paddingBottom: 20,
    // paddingTop: 85,
  }),
};
