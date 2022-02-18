FROM node:16 AS development

WORKDIR /app

COPY . .

RUN npm i && npm run build

ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}

EXPOSE 9000

CMD ["node", "/app/server.ts"]
