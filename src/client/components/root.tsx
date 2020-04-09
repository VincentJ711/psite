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
            <h1 className={styles.sectionHeaders}>about me</h1>
            <p className={styles.paras}>
              I'm a recent graduate from UCSD with a B.S. in Math-Computer Science. 
              I enjoy hiking, eating, and coding. I code most often in 
              Node.js/Typescript but Python/Java are definitely not 
              strangers to me. I'm currently in #quarantine here in San Diego 
              brushing up on my CS fundamentals. Please reach out to me if you'd 
              like to schedule an interview. I'm actively looking for a job in 
              Software/Web Development.
            </p>
            <h1 className={styles.sectionHeaders}>projects</h1>
            <p className={styles.paras}>
              Besides what you see here, I've written web scrapers, 
              chrome plugins, bots for games, scripts for working with 
              Raspberry PI peripherals, scripts to deploy Elasticsearch 
              clusters to Compute Engine and I've even published a couple
              npm packages. The next project I'm thinking about working on is 
              a simple website to compare state/country COVID-19 data.
            </p>
            <h2 className={styles.sectionHeaders}>
              <a className={styles.projectLink} href={this.props.wmsLink} target='_blank'>
                <i className={'fas fa-link ' + styles.linkIcon}></i>
                wm-scraper
              </a>
            </h2>
            <p className={styles.paras}>
              This is an application that helps you find cannabis related
              items in the southern California area. It's a spring-boot Java
              web app serving a React frontend. Java was picked for its GC
              AND more importantly since its memory footprint is much lower
              than dynamically typed languages like Python and Node.js.
              <br/><br/>
              The design is fairly straightforward. Socal data is scraped
              everyday from Weedmaps through Firebase functions deployed
              in regions around the world. The scrape is http triggered by
              a cronjob set @ cron-job.org. Once the scrape function is triggered,
              it determines what Weedmaps listings are in Socal. These listings
              are then divided amongst several worker functions where their data 
              is scraped, parsed, and stored in Firestore. Another cronjob is set
              to go off later that triggers a combine function which combines the
              scraped data in Firestore into a single data file hosted on GCS.
              This data file is then loaded into the JVM heap for search queries
              from the frontend. One advantage to this design is that scraping
              is only done once a day over about 30mins. Another advantage is
              since the worker scrape functions are deployed in different regions,
              they are guaranteed to have different ip's which reduces the chance
              of any scrape failing due to rate limiting.
            </p>
            <h2 className={styles.sectionHeaders}>
              <a className={styles.projectLink} href='https://github.com/VincentJ711/wm-scraper-py' target='_blank'>
                <i className={'fas fa-link ' + styles.linkIcon}></i>
                wm-scraper-py
              </a>
            </h2>
            <p className={styles.paras}>
              This was my final project for a class I took. It's a Python CLI
              app that lets you search for cannabis related items sourced from
              Weedmaps. More specifically, it has two commands. A scrape command
              and a query command. Once you scrape a geographic area, you can
              query for items in that area. Scrapes take time because of the
              http requests, while queries are quick since the scraped dataset
              is loaded from disk into RAM. This project was the motivation for
              the other wm-scraper project you see on this page. While this was
              good enough for me to find what I was looking for, it's not user
              friendly to the 99% of humans that don't know how to use the command
              line, let alone code. Hence the reason why I made the other
              project.
            </p>
            <video className={styles.video} width='100%' height='350' controls>
              <source src='videos/wm-scraper-py.mp4' type='video/mp4'/>
              Your browser does not support the video tag.
            </video>
            <h2 className={styles.sectionHeaders}>
              <a className={styles.projectLink} href={this.props.dmLink} target='_blank'>
                <i className={'fas fa-link ' + styles.linkIcon}></i>
                donut man
              </a>
            </h2>
            <p className={styles.paras}>
              This is a web app for a donut shop I used to work at. While I was
              there, I noticed their current website was outdated. I wanted to
              try and make them a website for practice, my resume, and hopefully
              a little coin if the owner wanted to use it. Unfortunately, he
              didn't want to use it because he said he was going to use an
              advertising company in the near future that would include a website
              in their deal. Nevertheless, this was solid practice and I learned
              a lot from the build.
              <br/><br/>
              It's a Node backend serving a React front end. It uses Firebase to
              store employee auth info/the main content for each page. The point
              of this was to make it so employees could login during a shift and
              update the menu so customers always had a realtime status of what
              donuts were in stock. The auth system I built included an entire
              permissions system so every task required permission set by the 
              admin (owner). 
              <br/><br/>
              One huge motivation for this project was an idea I wanted to
              implement. I thought it would be cool to have a line cam, a
              camera posted outside looking at the line. It would take stills
              every minute and upload them to the web server so anyone could
              see how long the line was at any point in the day. You should
              know this isn't a regular donut shop. The line can get incredibly
              long (1hr wait times) for hot donuts. In my opinion, a line cam
              would've increased business by spreading customers out during the
              day. I used to sit at home craving donuts but didn't want to go
              because I thought the line would be long. If I had a way to check
              the line length every hour, I would've been able to go once the
              line died down. Anyway, I implemented the line cam with a Raspberry
              Pi Zero W mounted in a fake security camera housing. It was taking
              stills every minute for about a month before it stopped which is
              why the last image you see is from September. I haven't had the
              time to investigate why it stopped.
            </p>
            <h2 className={styles.sectionHeaders}>
              <a className={styles.projectLink} href='https://github.com/VincentJ711/hex-puzzle' target='_blank'>
                <i className={'fas fa-link ' + styles.linkIcon}></i>
                hex-puzzle
              </a>
            </h2>
            <p className={styles.paras}>
              This is one of the first cool things I made. It's written in C++
              since that's the only language I "knew" at the time. I know the
              source code isn't great, but that's because I was a beginner.
            </p>
            <video className={styles.video} width='100%' height='350' controls>
              <source src='videos/hex-puzzle.mp4' type='video/mp4'/>
              Your browser does not support the video tag.
            </video>
            <h1>contact</h1>
            <p className={styles.paras}>
              The best place to reach out to me is via
              my <a href='https://linkedin.com/in/vincent-sevilla-01238718b' target='_blank'>
                LinkedIn page
              </a> but you can also email me at <a href='mailto:vincentj711@gmail.com'>
                vincentj711@gmail.com
              </a>.
            </p>
            <p className={styles.paras + ' ' + styles.siteSrc}>
              <a href='https://github.com/VincentJ711/psite' target='_blank'>
                source for this site
              </a>
            </p>
          </Grid>
          <Grid item sm={2} md={3} xl={4}/>
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
};
