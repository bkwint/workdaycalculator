FROM node:18-alpine

ADD . /usr/src/app

WORKDIR /usr/src/app

RUN npm ci \
  && npm run build \
  && rm Dockerfile \
  && rm README.md \
  && rm -rf ./src \
  && rm tsconfig.json \
  && rm webpack.config.js \
  && mkdir .cache \ 
  && mkdir .config

EXPOSE 8181

CMD ["npm", "run", "start"]