FROM node:17-alpine

WORKDIR /usr/src/app

ENV PORT=5000

COPY package.json /usr/src/app/
RUN npm install

COPY server.cjs /usr/src/app

EXPOSE $PORT
CMD [ "npm", "start" ]
