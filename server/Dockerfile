FROM node:stretch-slim

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY ./dist .

EXPOSE 9000

CMD ["node","index.js"]
