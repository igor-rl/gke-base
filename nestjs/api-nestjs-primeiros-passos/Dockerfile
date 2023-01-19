FROM node:18.6.0-alpine3.16 as dev
RUN apk add --no-cache bash git

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g @nestjs/cli --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18.6.0-alpine3.16 as prod
RUN apk add --no-cache bash git

ARG NODE_ENV =production 
ENV NODE_ENV =${ NODE_ENV }

WORKDIR /usr/src/app 

COPY ./package.json ./

COPY ./tsconfig.json ./

RUN npm install --production

COPY . .

COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]