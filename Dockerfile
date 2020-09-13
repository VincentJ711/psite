FROM node:10-buster

WORKDIR /root/psite

COPY package.json .
RUN npm i
COPY public public
COPY dist dist
COPY gulpfile.js .

ENV NODE_ENV=production
CMD npm run gulp on