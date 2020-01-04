import {
  Grid,
} from '@material-ui/core';
import { SheetsRegistry, } from 'jss';
import * as React from 'react';
import { style, } from 'typestyle';
import { Shell, } from './shell';

interface IInnerProps {
  dmLink: string;
  wmsLink: string;
}

interface IInnerState {
}

interface IRootProps {
  dmLink: string;
  registry?: SheetsRegistry;
  sheetManager?: Map<any, any>;
  wmsLink: string;
}

export class Root extends React.Component<IRootProps, {}> {
  render() {
    return (
      <Shell
        strict
        registry={this.props.registry}
        sheetManager={this.props.sheetManager}
      >
        <Inner dmLink={this.props.dmLink} wmsLink={this.props.wmsLink}/>
      </Shell>
    );
  }
}

class Inner extends React.Component<IInnerProps, {}> {
  state: IInnerState = { };

  render() {
    return (
      <>
        <div className={styles.container}>
          <img className={styles.portrait} src='/images/me.jpg'/>
          <h2 className={styles.name}>vincent</h2>
          <p className={styles.attrCont}>
            <span className={styles.attrHeart}>♥</span>
            <span className={styles.attrName}> fruit, hiking, coding</span>
            <span className={styles.attrHeart}>♥</span>
          </p>
          <h2>
            <a href='https://github.com/VincentJ711' target='_blank'>
              <i className={'fab fa-github ' + styles.icon}></i>
            </a>
            <a href='https://linkedin.com/in/vincent-sevilla-01238718b' target='_blank'>
              <i className={'fab fa-linkedin-in ' + styles.icon}></i>
            </a>
            <a href='https://stackoverflow.com/users/7929314/vincent?tab=profile' target='_blank'>
              <i className={'fab fa-stack-overflow ' + styles.icon}></i>
            </a>
          </h2>
        </div>
        <Grid container direction='row'>
          <Grid item sm={2} md={3} xl={4}/>
          <Grid item sm={8} md={6} xl={4} className={styles.mainContainer}>
            <h1>about me</h1>
            <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
            <h1>projects</h1>
            <p>i have many others not shown here...</p>
            <h2>
              <a className={styles.projectLink} href={this.props.wmsLink} target='_blank'>
                <i className={'fas fa-link ' + styles.linkIcon}></i>
                wm-scraper
              </a>
            </h2>
            <p>project descript...</p>
            <h2>
              <a className={styles.projectLink} href='https://github.com/VincentJ711/wm-scraper-py' target='_blank'>
                <i className={'fas fa-link ' + styles.linkIcon}></i>
                wm-scraper-py
              </a>
            </h2>
            <p>project descript...</p>
            <h2>
              <a className={styles.projectLink} href={this.props.dmLink} target='_blank'>
                <i className={'fas fa-link ' + styles.linkIcon}></i>
                donut man
              </a>
            </h2>
            <p>project descript...</p>
            {
              // <h2>
              //   <a className={styles.projectLink} href='https://google.com' target='_blank'>
              //     <i className={'fas fa-link ' + styles.linkIcon}></i>
              //    hex-puzzle
              //   </a>
              // </h2>
              // <p>project descript...</p>
            }
            <h1>contact</h1>
          </Grid>
          <Grid item sm={2} md={3} xl={4}/>
        </Grid>
      </>
    );
  }
}

const styles = {
  projectLink: style({
    textDecoration: 'none',
  }),
  linkIcon: style({
    paddingRight: 8,
    fontSize: 16,
  }),
  mainContainer: style({
    margin: 8,
  }),
  icon: style({
    color: 'orange',
    fontSize: 20,
    padding: '0px 10px 0px 10px',
  }),
  container: style({
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgb(36,36,36)',
  }),
  portrait: style({
    width: 175,
    borderRadius: '3%',
    margin: '20px 0px 0px 0px !important',
  }),
  name: style({
    color: 'rgba(255,255,255,0.86)',
  }),
  attrCont: style({
    padding: 4,
  }),
  attrName: style({
    color: 'rgba(255,255,255,0.56)',
    paddingRight: 8,
  }),
  attrHeart: style({
    color: 'orange',
  }),
};
