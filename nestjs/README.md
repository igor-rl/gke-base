### API RESTFULL - PRIMEIROS PASSOS COM NESTJS

![vscode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![kubernets](https://img.shields.io/badge/kubernetes-326ce5.svg?&style=for-the-badge&logo=kubernetes&logoColor=white)
![nestjs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

<p>Este guia de estudo exemplifica como criar um projeto nestjs de uma API Restfull. A aplicação 'nestjs-primeiros-passos' fornece todos os passos iniciais para criar uma api restfull e configurações avançadas utilizando o nestjs. Dentre os assuntos abordados, esse guia contém, por exemplo, as configurações de ambiente para se conectar com o banco de dados postgreSQL, produzir a documentação da aplicação com o swagger e fazer o deploy da aplicação no GKE do Google Cloud. Você pode testar a aplicação produzida com este material clicando <a href="#">aqui</a>.</p>

<p>Esse material faz parte da estrutura do projeto 'ARQUIVOS BASE PARA IMPLANTAR UM PROJETO NO GKE' produzido por Igor Lage.</p>

<hr>

### Índice
<ul>
<li><a href="#requisitos-do-sistema-de-desenvolvimento">Requisitos do sistema de desenvolvimento</a></li>
<li><a href="#criando-o-projeto">Criando o projeto</a></li>
<li><a href="#configurações-do-ambiente-de-desenvolvimento">Configurações do ambiente de desenvolvimento</a></li>
<ul>
  <li><a href="#compilador-opcional">Compilador</a></li>
  <li><a href="#docker">Docker</a></li>
  <li><a href="#nestcli">Nest/cli</a></li>
</ul>
<li><a href="#configurações-de-acesso-ao-postgresql">Configurações de acesso ao PostgreSQL</a></li>
<li><a href="#primeiro-teste-com-docker">Primeiro teste com docker</a></li>
<li><a href="#adicionando-cors-e-a-documentação-swagger">Adicionando CORS e a documentação SWAGGER</a></li> <!--  -->
<li><a href="#">Primeiro teste local - desenvolvimento</a></li> <!-- .env e sobe app angular front-->
<li><a href="#">Login</a></li> <!--  -->
<li><a href="#">JWT, autenticação e autorização</a></li>
<li><a href="#">Gerar documentação da API com Swagger</a></li>
<li><a href="#">Vincular a API com o front-end desenvolvido com Angular</a></li>
<li><a href="#">Teste local final - desenvolvimento</a></li> <!-- .env e sobe app angular front-->
<li><a href="#">Teste em container com Docker - desenvolvimento</a></li> <!-- .env automático, pvc local -->
<li><a href="#">Implantar a aplicação no Google kubernetes Engine - produção</a></li> <!-- .env automático, pvc no google -->
</ul>
<hr>

### Requisitos do sistema de desenvolvimento
<ul>
<li><a href="visual studio code">Visual studio code</a></li>
<li><a href="https://learn.microsoft.com/pt-br/windows/wsl/install">Subsistema do Windows para Linux</a></li>
<li><a href="https://docs.docker.com/engine/install/ubuntu/">Docker Engine</a></li>
<li><a href="https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl">Nodejs e npm</a></li>
<li><a href="https://www.youtube.com/watch?v=7kZODMP8bs0&ab_channel=HansM.Boron">Zshell (opcional)</a>
<li><a href="https://www.npmjs.com/package/vim">Vim</a>
<li><a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/">kubernets</a></li>
<li><a href="https://cloud.google.com/sdk/docs/install#deb">gcloud cli</a></li>
</ul>
<hr>

### Criando o projeto
<ul>

<p>Instale o <a href="https://docs.nestjs.com/cli/overview">Nest CLI</a> no seu ambiente de desenvolvimento:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>npm i -g @nestjs/cli</code></pre>
</div>

<p>Crie o projeto:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>nest new nestjs-primeiros-passos</code></pre>
</div>

<p>Inicie a aplicação localmente:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>npm run start:dev</code></pre>
</div>

<p>Pronto! Você já pode acessar a api em <a href="http://localhost:3000">http://localhost:3000</a>. Você também pode fazer o primeiro teste da sua api rodando o comando abaixo. Em ambos os casos você deve receber o retorno "Hello World!".</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>curl http://localhost:3000</code></pre>
</div>
</ul>
<hr>

### Configurações do ambiente de desenvolvimento
<ul>
    <p>Neste guia, não vamos fazer os testes localmente. Vamos subir nossas aplicações em containers utilizando os recursos do Docker Engine e docker-compose. Isso vai nos ajudar a simular a aplicação o mais próximo o possível do ambiente de produção. Assim, vamos ver em tempo real como ela vai se comportar quando estiver implantada num provedor de nuvem.</p>
    Pare a execução local da api 'nestjs-primeiros-passos':</p>
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate">ctn + C</pre>
    </div>

### <li>Compilador (opcional)</li>

<p>Inclua as configurações abaixo no arquivo <i>tsconfig.json</i> para que o compilador de desenvolvimento não reinicialize ao identificar modificações nos arquivos da node_modules, dist e .docker. Ele monitorará apenas as alterações na pasta src.</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate">vim tsconfig.json<code></code></pre>
</div>

<Altere>Altere o código como à seguir:<p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate">{
  "compilerOptions": {
    ...,
    ...,
  },
  <code>"include": ["src"],
  "exclude": [
    "node_modules",
    "dist",
    ".docker"
  ]</code>
}</pre>
</div>

### <li>Docker</li>

<p>Na raiz do projeto, crie o arquivo <i>Dockerfile</i>.<p/>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate">vim Dockerfile<code></code></pre>
</div>

<p>Dentro deste arquivo, insira os comandos:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>FROM node:18.6.0-alpine3.16 as dev
RUN apk add --no-cache bash git
<br>
WORKDIR /home/node/app
COPY package*.json ./
<br>
RUN npm install -g @nestjs/cli^9.0.0 --legacy-peer-deps
<br>
COPY . .
<br>
RUN npm run build
<br>
FROM node:18.6.0-alpine3.16 as prod
RUN apk add --no-cache bash git
<br>
ARG NODE_ENV =production 
ENV NODE_ENV =${ NODE_ENV }
<br>
WORKDIR /home/node/app 
<br>
COPY ./package.json ./
<br>
COPY ./tsconfig.json ./
<br>
RUN npm install --production
<br>
COPY . .
<br>
COPY --from=dev /home/node/app/dist ./dist
<br>
CMD ["node", "dist/main"]</code></pre>
</div>
Uma observação importante é que, no arquivo Dockerfile, a versão @nestjs instalada deve ser a mesma que a especificada no arquivo package.json em "devDependencies": {"@nestjs/cli": "[versão]"}. No na fase de criação deste projeto, a versão 

<p>Para evitar subir arquivos desnecessários para nosso repositório do docker, criaremos o arquivo <i>.dockerignore</i></p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate">vim .dockerignore<code></code></pre>
</div>

<p>Agora inclua em .dockerignore as seguintes pastas e arquivos que serão ignorados ignorados:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code># compiled output
/dist
/node_modules
.env
/.docker/postgres/pgdata
<br># Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
<br># OS
.DS_Store
<br># Tests
/coverage
/.nyc_output
<br># IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace
<br># IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json</code></pre>
</div>


<p>Na raiz do projeto, crie o arquivo <i>docker-compose.yaml</i>.
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate">vim docker-compose.yaml<code></code></pre>
</div>

<p>Dentro deste arquivo, insira as configurações do container da aplicação e do banco de dados PostgreSQL :</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>version: '3'
version: '3'
services:
  app:
    container_name: api_nestjs_primeiros_passos
    build: .
    entrypoint: ./.docker/entrypoint.sh
    ports:
      - 3000:3000
    environment:
      INSTANCE_HOST: "postgres"
      DB_PORT: 5432
      DB_PASS: pgpass
      DB_USER: postgres
      DB_NAME: "nestjs_primeiros_passos"
    volumes:
      - .:/home/node/app
    depends_on:
      - postgres
<br>
  postgres:
    image: postgres:12
    container_name: postgresql
    restart: always
    tty: true
    environment:
      POSTGRES_PASSWORD: pgpass
      POSTGRES_DB: "nestjs_primeiros_passos"
    volumes:
      - ./.docker/postgres/pgdata:/var/lib/postgresql/data

</code></pre>
</div>

A pasta <i>.docker</i> irá armazenar o arquivo <i>entypoint.sh</i> e armazenará o volume do banco de dados postgres para não perdermos os dados quando o container for finalizado.
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate">vim .docker/entrypoint.sh<code></code></pre>
</div>
Insira os comando abaixo no arquivo entrypoint.sh:
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>#!/bin/sh
<br>
npm install
<br>
npm run start:dev
<br>
npm run migration:run</code></pre>
</div>
    
<p>Para evitar a falha de permissão de acesso para o docker, execute o comando:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>chmod +x .docker/entrypoint.sh</code></pre>
</div>

</ul>

### <li>Nest/cli</li>
<ul>

<p>Para facilitar a execussão dos comandos @nest/cli, vamos adicionar alguns scripts no arquivo <i>package.json</i>.</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>vim package.json</code></pre>
</div>
<p>Insira os comandos:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>{
  ...,
  ...,
  ...,
  "scripts": {
    ...,
    ...,
    ...,
    "typeorm": "ts-node ./node_modules/typeorm/cli",
    "migration:create": "yarn typeorm migration:create src/migrations/$npm_config_name",
    "migration:generate": "yarn typeorm migration:generate src/migrations/$npm_config_name -d typeorm.config.ts",
    "migration:run": "yarn typeorm migration:run -d typeorm.config.ts",
    "migration:revert": "yarn typeorm migration:revert -d typeorm.config.ts",
    "subscriber:create": "yarn typeorm subscriber:create src/subscribers/$npm_config_name"
  },
  ...,
  ...,
  ...,
}</code></pre>
</div>

</ul>

</ul>

<hr>

### Configurações de acesso ao PostgreSQL
<ul>

<p>Para que a API nestjs seja capaz de recuperar os dados de conexão e se conectar ao banco de dados postgreSQL, precisamos instalar as seguintes dependências:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>npm install @nestjs/typeorm @nestjs/config pg typeorm --save</code></pre>
</div>

<p>Agora podemos inserir as configurações de conexão no arquivo <i>app.modules.ts</i> da nossa aplicação. Para isso execute o comando:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>vim src/app.module.ts</code></pre>
</div>
Substitua todo o conteúdo do arquivo por:
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
<br><br>
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: process.env.INSTANCE_HOST,
          port: process.env.DB_PORT,
          database: process.env.DB_NAME,
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          entities: [__dirname + '/**/*entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          subscribes: [__dirname + '/subscribs/*{.ts,.js}'],
          extra: {
            charset: 'utf8mb4_unicode_ci',
          },
          synchronize: false,
          logging: false
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
</code></pre>
</div>

<p>O typeorm é a ferramenta que vamos utilizar para auxiliar a criação de objetos voltados para o banco de dados. Ele precisa de um arquivo próprio de comunicação com o banco. Para isso, execute o comando:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>vim typeorm.config.ts</code></pre>
</div>
Insira no arquivo as seguintes configurações de conexão:
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
<br>
dotenv.config();
<br>
export default new DataSource({
  type: 'postgres',
  host: process.env.INSTANCE_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [__dirname + '/src/**/entities/*{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  subscribers: [__dirname + '/src/subscribers/*{.ts,.js}']
} as DataSourceOptions);
</code></pre>
</div>

<p>Por ultimo, vamos criar um arquivo <i>Dockerfile</i> que será o responsável por configurar a imagem postgres e o usuário padrão:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>vim .docker/postgres/Dockerfile</code></pre>
</div>
Insira no arquivo as seguintes configurações:
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>FROM postgres:11
<br>
RUN usermod -u 1000 postgres
</code></pre>
</div>


</ul>

### Primeiro teste com docker
<ul>    
<p>Tudo prontos. Já podemos subir o container com a imagem da nossa API e ver o primeiro teste de cominicação. Mas primeiro precisamos dar permissão para que o container da nossa aplicação possa alterar os arquivos locais. Depois podemos subir nossa aplicação:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>sudo chmod +x ./.docker/entrypoint.sh && sudo chmod -R 777 .</code></pre>
</div>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>docker-compose up</code></pre>
</div>
</ul>

### Adicionando CORS e a documentação SWAGGER
<ul>
<p>O cors é uma configuração que limita requisições da API apenas vindas de urls expecíficas. A documentação Swagger facilita a visualização e os testes da API. Para adicionar esses serviços, primeiro instale as dependências:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>npm i express-basic-auth @nestjs/swagger</code></pre>
</div>
<p>Agora para configurar o cors e a documentação swagger, substituia o código do arquivo <i>main.ts</i>...</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>vim src/main.ts</code></pre>
</div>
<p>... por:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
<br>
const SWAGGER_ENVS = ['local', 'dev', 'staging'];
<br>
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
<br>
  app.enableCors(
    { 
      origin: ['https://betterjavacode.com', 'https://www.google.com'],
      methods: ['POST', 'PUT', 'DELETE', 'GET']
    }
  );
<br>
  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    app.use(['/docs', '/docs-json'], basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }));
<br>
    const config = new DocumentBuilder()
    .setTitle('Hostwit API Loja Virtual')
    .setVersion('1.0')
    .addTag('Auth', 'Recursos relacionados a autenticação.')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    
    .setDescription('<h3>API de recursos relacionados à <i>Api Nestjs Primeiros Passos</i> desenvolvida por Igor Lage.</h3><br><hr><h3>Baixe a documentação para insuminia</h3><a href="https://insomnia.rest/run/?label=My%20API&uri=http%3A%2F%2Flocalhost%3A3000%2Fapi-json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a><hr><h3>Explanação</h3><p>Esta API faz parte de uma gama de recursos complexos e que operam entre si para gerenciar e armazenar dados dos aplicativos desenvolvidos pela Hostwit.<br><i>Data de implantação: 2023</i><br><i>Desenvolvedor responsável: Igor Lage</i></p><hr><h3>Atorização é necessária para ter acesso à recursos específicos.</h3>')
    .build();
<br>
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
<br>
  await app.listen(process.env.PORT || 3000)
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`See the documentation on: ${await app.getUrl()}/docs`);
  console.log(`Download documentation from: ${await app.getUrl()}/docs-json`);
<br>
}
bootstrap();</code></pre>
</div>

<p>Para acessar a documentação swagger, acesse: <a>http://localhost:3000</a>.

</ul>

### 
<ul>
</ul>

### 
<ul>
</ul>

### 
<ul>
</ul>

### 
<ul>
</ul>

### 
<ul>
</ul>

