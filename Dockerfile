FROM node:16

RUN apt-get update

RUN mkdir -p /usr/src/app

ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN yarn install 

COPY . /usr/src/app

# RUN yarn build

EXPOSE 3000

CMD [ "yarn","start" ]