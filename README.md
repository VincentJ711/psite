# psite
This is the repo for my personal website which can be found [here](https://vincentjs.com/). It's a react app served by a node backend.

## prerequesites
You need node.js. I used v10 during development. Next, install the dependencies with npm and generate the vendor.js bundle file.
```
npm i
npm run gulp bvendor
```

## development
have gulp running in the background for your changes (files under `src`) to automatically take effect
```
npm run gulp
```
if you need to add a browser dependency, add its npm package name to the vendor array in `gulpfile.js` and regenerate the vendor bundle file.
```
npm run gulp bvendor
```

## deployment
```
npm run deploy
```