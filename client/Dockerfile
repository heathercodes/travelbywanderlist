FROM node:stretch-slim

WORKDIR /app

COPY . .

RUN cd /app/client && npm i && npm run build
RUN cd /app/server && npm i && npm run build

FROM node:stretch-slim

WORKDIR /app

COPY --from=0 /app/client/dist /app/client
COPY --from=0 /app/server/dist /app/server
COPY --from=0 /app/server/package*.json /app/server/

RUN cd /app/server/ && npm i --production

EXPOSE 9000

CMD ["node", "/app/server/index.js"]