FROM node:10-buster

WORKDIR /root/psite

COPY package.json .
RUN npm i

ENV NODE_ENV=production

COPY tslint.json ./
COPY tsconfig.json ./
COPY gulpfile.js ./

COPY public public
RUN rm -rf public/bundles
RUN ./node_modules/.bin/gulp bvendor --prod

COPY src src
RUN ./node_modules/.bin/gulp flatten --prod
RUN ./node_modules/.bin/gulp bclient --prod

RUN npm run test
CMD ./node_modules/.bin/gulp on
