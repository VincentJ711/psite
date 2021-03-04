import { Grid, } from '@material-ui/core';
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
  wmsLink: string;
}

export class Root extends React.Component<IRootProps, {}> {
  render() {
    return (
        <Shell strict>
          <Inner dmLink={ this.props.dmLink } wmsLink={ this.props.wmsLink }/>
        </Shell>
    );
  }
}

class Inner extends React.Component<IInnerProps, {}> {
  state: IInnerState = {};

  render() {
    return (
        <>
          <div className={ styles.container }>
            <img className={ styles.portrait } src='/images/me.jpg' alt='portrait'/>
            <h2 className={ styles.name }>vincent</h2>
            <p className={ styles.attrCont }>
              <span className={ styles.attrHeart }>♥</span>
              <span className={ styles.attrName }> fruit, hiking, coding</span>
              <span className={ styles.attrHeart }>♥</span>
            </p>
            <h2>
              <a href='https://github.com/VincentJ711' target='_blank'>
                <i className={ 'fab fa-github ' + styles.icon }/>
              </a>
              <a href='https://linkedin.com/in/vincent-sevilla-01238718b' target='_blank'>
                <i className={ 'fab fa-linkedin-in ' + styles.icon }/>
              </a>
              <a href='https://stackoverflow.com/users/7929314/vincent?tab=profile' target='_blank'>
                <i className={ 'fab fa-stack-overflow ' + styles.icon }/>
              </a>
            </h2>
          </div>
          <Grid container direction='row'>
            <Grid item sm={ 2 } md={ 3 } xl={ 4 }/>
            <Grid item sm={ 8 } md={ 6 } xl={ 4 } className={ styles.mainContainer }>
              <h1 className={ styles.sectionHeaders }>about me</h1>
              <p className={ styles.paras }>
                I am a full-stack Java software developer with recent experience
                building multi-tiered web applications. I also have quite a bit
                of experience with Kotlin, Node.js/Typescript/React and Python.
                This last year, I graduated from UCSD with a degree in Mathematics
                & Computer Science. While at university, I was lucky enough to
                tutor students in programming. This experience taught me the
                importance of clear communication and how to lead. I enjoy working
                with other people and hope to lead a software team one day.
              </p>
              <h1 className={ styles.sectionHeaders }>projects</h1>
              <p className={ styles.paras }>
                Besides what you see here, I've written web scrapers,
                chrome plugins, bots for games, scripts for working with
                Raspberry Pi peripherals, scripts to deploy Elasticsearch
                clusters to Compute Engine and I've even published a couple
                npm packages.

                Something interesting to note is that a good number of my web
                apps are now hosted on a Raspberry Pi that's sitting behind an
                Nginx reverse proxy, including this personal website!
              </p>
              <h2 className={ styles.sectionHeaders }>
                <a className={ styles.projectLink } href={ this.props.wmsLink } target='_blank'>
                  <i className={ 'fas fa-link ' + styles.linkIcon }/>
                  wm-scraper
                </a>
              </h2>
              <p className={ styles.paras }>
                This is a Spring Boot/React application that helps you find
                cannabis related items in the southern California area. It
                scrapes real data from Weedmaps each day to be used in queries
                by the frontend. This was created as a way to easily
                search for items across all shops/deliveries in a geographic area.
                Weedmaps does not currently have this functionality.
              </p>
              <h2 className={ styles.sectionHeaders }>
                <a
                    className={ styles.projectLink }
                    href='https://github.com/VincentJ711/anki-step-images' target='_blank'
                >
                  <i className={ 'fas fa-link ' + styles.linkIcon }/>
                  anki-step-images
                </a>
              </h2>
              <p className={ styles.paras }>
                This Python based project is an add-on for Anki, the open source
                flashcard system. This add-on allows you to create image
                carousels in your Anki flashcards. These carousels are useful
                for when you want to learn things that require multiple steps.
              </p>
              <div className={ styles.imageWrapper }>
                <img src='images/knot-demo.gif'/>
              </div>
              <h2 className={ styles.sectionHeaders }>
                <a
                    className={ styles.projectLink }
                    href='https://github.com/VincentJ711/hex-puzzle' target='_blank'
                >
                  <i className={ 'fas fa-link ' + styles.linkIcon }/>
                  hex-puzzle
                </a>
              </h2>
              <p className={ styles.paras }>
                This is one of the first cool things I made (2014). It's written in C++
                since that's the only language I was familiar with at the time.
                It's a visual hex puzzle generator/solver!
              </p>
              <video className={ styles.video } width='100%' height='350' controls>
                <source src='videos/hex-puzzle.mp4' type='video/mp4'/>
                Your browser does not support the video tag.
              </video>
              <h2 className={ styles.sectionHeaders }>
                <a className={ styles.projectLink } href={ this.props.dmLink } target='_blank'>
                  <i className={ 'fas fa-link ' + styles.linkIcon }/>
                  donut man
                </a>
              </h2>
              <p className={ styles.paras }>
                This is a web app for a donut shop I used to work at. While
                I was there, I noticed their current website was outdated. I
                wanted to make them a website for practice and my resume.
                It's a Node backend serving a React front end that is
                rendered on the server side for SEO. It uses Firebase to store
                employee auth info/the main content for each page. The
                point of this was to make it so employees could login during a
                shift and update the menu so customers always had a
                real time status of what donuts were in stock. The auth system
                I built included an entire permissions system so every
                task required permission set by the owner.
              </p>
              <h1>contact</h1>
              <p className={ styles.paras }>
                The best place to reach out to me is via
                my <a href='https://linkedin.com/in/vincent-sevilla-01238718b' target='_blank'>
                LinkedIn page
              </a> but you can also email me at <a href='mailto:vincentj711@gmail.com'>
                vincentj711@gmail.com
              </a>.
              </p>
              <p className={ styles.paras + ' ' + styles.siteSrc }>
                <a href='https://github.com/VincentJ711/psite' target='_blank'>
                  source for this site
                </a>
              </p>
            </Grid>
            <Grid item sm={ 2 } md={ 3 } xl={ 4 }/>
          </Grid>
        </>
    );
  }
}

const styles = {
  siteSrc: style({
    marginTop: 50,
    marginBottom: 100,
    textAlign: 'center',
  }),
  video: style({
    marginTop: 32,
    marginBottom: 32,
  }),
  sectionHeaders: style({
    marginTop: 32,
  }),
  paras: style({
    lineHeight: 2,
    fontSize: 16,
  }),
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
  imageWrapper: style({
    textAlign: 'center',
  }),
};
