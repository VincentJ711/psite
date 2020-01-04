const prod = !!require('yargs').argv.prod;
const waitOn = require('wait-on');
const proxy = require('http-proxy-middleware');
const bs = require('browser-sync').create();
const cp = require('child_process');
const tap = require('gulp-tap');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cache = require('gulp-cached');
const gulp = require('gulp');
const gulpWatch = require('gulp-watch');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const appconfig = require('./.app.config.json');
const project = ts.createProject('tsconfig.json', { isolatedModules: true });
const serverFile = path.join(__dirname, '/dist/server/entry.js');
const serverPort = appconfig.devPort;
let serverProcess;
const clientInFile = path.join(__dirname, '/dist/client/entry.js');
const clientOutFile = path.join(__dirname, '/public/bundles/client.js');
const vendorBundler = browserify(undefined, {
  'require': [
    // '@material-ui/icons/CompareArrows',
    '@material-ui/core',
    'jss',
    'react-dom',
    'react-jss',
    'react',
    'typestyle'
  ]
});
const clientBundler = webpack({
  entry: clientInFile,
  output: {
    path: path.dirname(clientOutFile),
    filename: path.basename(clientOutFile)
  },
  optimization: {
    minimize: prod
  },

  // makes it so u dont bundle node modules but u make require statements
  // for them in the browser. this is absolutely necessary.
  externals: [nodeExternals()],

  resolve: {
    // necessary. i think it has to do with imports w/ no extension ie '../ts-file'
    extensions: ['.js', '.json']
  }
});

if (prod) {
  // reduces the bundle size for vendor.js
  process.env.NODE_ENV = 'production';
}

async function watch() {
  async function helper() {
    const res = await flatten();

    if (res.clientChanged) {
      await bundleClient();
    }

    if (res.clientChanged || res.serverChanged) {
      await off();
      await on();
      bs.reload();
    }
  }

  await new Promise(async() => {
    gulpWatch(['src/**/*.*'], helper);
    await helper();
    bs.init(null, { proxy: `http://localhost:${serverPort}` });
  });
}

async function flatten() {
  let ret = {};

  await new Promise(res => {
    gulp.src(['src/**/*.tsx', 'src/**/*.ts'])
        .pipe(cache())
        .pipe(tap((file, t) => {
          if (file.path.indexOf('src/server') !== -1) {
            ret.serverChanged = true;
          } else if (file.path.indexOf('src/client') != -1) {
            ret.clientChanged = true;
          }
        }))
        .pipe(sourcemaps.init())
        .pipe(project())
        // shorten stack traces
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
        .pipe(gulp.dest('dist'))
        .on('finish', res);
  });

  return ret;
};

async function bundleVendor() {
  await new Promise(res => {
    vendorBundler.bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('public/bundles'))
        .on('finish', res);
  });
}

async function bundleClient() {
  if (!prod) {
    console.warn('WARNING, client.js wont be minified. --prod wasnt given!');
  }

  console.log('bundling client');

  await new Promise(res => {
    clientBundler.run((err, stats) => err ? console.log(err) : res());
  });
}

async function on() {
  serverProcess = cp.spawn('node', [
    '-r',
    'source-map-support/register',
    serverFile
  ]);
  serverProcess.stdout.pipe(process.stdout);
  serverProcess.stderr.pipe(process.stderr);
  await waitOn({
    resources: [ `http://localhost:${serverPort}/status` ],
    delay: 0,
    interval: 50,
    timeout: 20000,
    window: 1
  });
};

async function off() {
  if (serverProcess) {
    serverProcess.kill();
    console.log(`killed pid: ${serverProcess.pid}`);
  }
};

function exec(cmd, wd) {
  return new Promise((resolve, reject) => {
    cp.exec(cmd, {
      cwd: wd,
      maxBuffer: 1024 * 100000
    }, (err, stdout) => err ? reject(err) : resolve(stdout));
  });
};

gulp.task('default', [ 'watch' ]);
gulp.task('watch', watch);
gulp.task('flatten', flatten);
gulp.task('bvendor', bundleVendor);
gulp.task('bclient', bundleClient);
gulp.task('on', on);
gulp.task('off', off);
