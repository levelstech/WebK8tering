FROM node:12-alpine

WORKDIR /usr/src/app

ENV PORT=1234

COPY package.json /usr/src/app/
RUN npm install

COPY server.js /usr/src/app

EXPOSE $PORT
CMD [ "npm", "start" ]
