const browserify = require('browserify');
const bSync = require('browser-sync');
const buffer = require('vinyl-buffer');
const cache = require('gulp-cached');
const cp = require('child_process');
const gulp = require('gulp');
const gulpWatch = require('gulp-watch');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const proxy = require('http-proxy-middleware');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const tap = require('gulp-tap');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const waitOn = require('wait-on');
const webpack = require('webpack');
const yargs = require('yargs');

let bs;
let serverProcess;
const prod = !!yargs.argv.prod;
const appconfig = require('./.app.config.json');
const project = ts.createProject('tsconfig.json', { isolatedModules: true });
const serverFile = path.join(__dirname, '/dist/server/entry.js');
const clientInFile = path.join(__dirname, '/dist/client/entry.js');
const clientOutFile = path.join(__dirname, '/public/bundles/client.js');

// this is where you should place a dependency that needs to be bundled for the browser
const vendorBundler = browserify(undefined, {
  'require': [
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
  optimization: { minimize: prod },
  externals: [ nodeExternals() ],
  resolve: { extensions: ['.js', '.json'] }
});

async function watchHelper() {
  const res = await flatten();

  if (res.clientChanged) {
    await bundleClient();
  }

  if (res.clientChanged || res.serverChanged) {
    await off();
    await on();

    if (bs) {
      bs.reload();
    } else {
      console.log('initializing browser sync...');
      bs = bSync.create();
      bs.init(null, { proxy: `http://localhost:${appconfig.port}` });
    }
  }
}

async function watch() {
  await new Promise(async() => {
    gulpWatch(['src/**/*.*'], watchHelper);
    await watchHelper();
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
  if (prod) {
    // reduces the bundle size for vendor.js
    process.env.NODE_ENV = 'production';
  }

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
    resources: [ `http://localhost:${appconfig.port}/status` ],
    delay: 0,
    interval: 50,
    timeout: 20000,
    window: 1
  });
};

async function off() {
  if (serverProcess) {
    serverProcess.kill();
  }
};

gulp.task('default', [ 'watch' ]);
gulp.task('watch', watch);
gulp.task('flatten', flatten);
gulp.task('bvendor', bundleVendor);
gulp.task('bclient', bundleClient);
gulp.task('on', on);
gulp.task('off', off);
