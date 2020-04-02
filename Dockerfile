FROM node:stretch-slim

WORKDIR /app
COPY . ./

RUN npm i
RUN npm run setup

CMD npm start