FROM node as build-container

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

ARG configuration=production

RUN npm run build -- --outputPath=./dist/out --configuration $configuration

FROM nginx

COPY --from=build-container /app/dist/out/ /usr/share/nginx/html

COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

