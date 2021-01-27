import { CssBaseline, Grid, } from '@material-ui/core';
import * as React from 'react';
import { style, } from 'typestyle';

interface IShellProps {
  strict?: boolean;
}

export class Shell extends React.Component<IShellProps, any> {
  render() {
    return (
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
