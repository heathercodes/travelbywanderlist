FROM node:stretch-slim

WORKDIR /app

COPY ./client/dist /app/client/dist/
COPY ./server /app/server/
COPY ./package*.json /app/

RUN npm i --production
RUN cd /app/server/ && npm i --production && npm run build

EXPOSE 9000

CMD ["node", "/app/server/dist/index.js"]