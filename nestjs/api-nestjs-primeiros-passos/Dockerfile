FROM node:18.6.0-alpine3.16

RUN apk add --no-cache bash git

RUN npm install -g @nestjs/cli

RUN touch /home/node/.bashrc | echo "PS1='\w\$ '" >> /home/node/.bashrc

WORKDIR /home/node/app

COPY ./package.json ./

COPY ./tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

RUN npm run migration:run