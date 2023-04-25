FROM node:18-alpine as build

ADD . /usr/src/app

WORKDIR /usr/src/app

RUN npm ci && npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev \
   && mkdir .cache \
   && mkdir .config

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8181

CMD ["npm", "run", "start"]
