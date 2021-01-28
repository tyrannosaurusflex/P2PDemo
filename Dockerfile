FROM node:dubnium-alpine

WORKDIR /app

COPY app/package.json package.json

COPY app/package-lock.json package-lock.json

COPY app/tsconfig.json tsconfig.json

RUN npm ci

COPY app/src/ src/

COPY app/resources/ /app/resources/

RUN npm run build

RUN npm prune --production

ENTRYPOINT ["node", "build/app.js"]