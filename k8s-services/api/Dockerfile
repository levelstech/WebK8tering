FROM node:12-alpine3.14

WORKDIR /usr/src/app

ENV PORT=5000

COPY package.json /usr/src/app/
RUN npm install

COPY server.js /usr/src/app

EXPOSE $PORT
CMD [ "npm", "start" ]
