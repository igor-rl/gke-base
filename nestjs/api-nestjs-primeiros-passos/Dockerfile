FROM node:18.6.0-alpine3.16 as dev
RUN apk add --no-cache bash git

WORKDIR /home/node/app
COPY package*.json ./

RUN npm install -g @nestjs/cli^9.0.0 --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18.6.0-alpine3.16 as prod
RUN apk add --no-cache bash git

ARG NODE_ENV =production 
ENV NODE_ENV =${ NODE_ENV }

WORKDIR /home/node/app 

COPY ./package.json ./

COPY ./tsconfig.json ./

RUN npm install --production

COPY . .

COPY --from=dev /home/node/app/dist ./dist

CMD ["node", "dist/main"]