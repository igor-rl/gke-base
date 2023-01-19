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
</ul>
<li><a href="#">Banco de dados POstgreSQL</a></li>
<li><a href="#">Criando CRUD produtos</a></li> <!--  -->
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
  <pre class="notranslate"><code>FROM node:18.6.0-alpine3.16
<br>
RUN apk add --no-cache bash git
<br>
RUN npm install -g @nestjs/cli
<br>
RUN touch /home/node/.bashrc | echo "PS1='\w\$ '" >> /home/node/.bashrc
<br>
WORKDIR /home/node/app
<br>
COPY ./package.json ./
<br>
COPY ./tsconfig.json ./
<br>
RUN npm install
<br>
COPY . .
<br>
RUN npm run build
<br>
CMD ["npm", "run", "start"]</code></pre>
</div>

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

<p>Dentro deste arquivo, insira as configurações do container da aplicação e do banco de dados PosgreSQL :</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate"><code>version: '3'
services:
  app:
    build: .
    entrypoint: .docker/entrypoint.sh
    ports:
      - 3000:3000
    volumes:
      - ./:/home/node/app
    depends_on:
      - postgres<br><br>
  postgres:
    image: postgres:latest
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_PASSWORD: pgpass
      POSTGRES_USER: postgres
      POSTGRES_DB: "nestjs_primeiros_passos"
      PG_DATA: /var/lib/postgresql/data
    volumes:
      - ./pgdata/data:/var/lib/postgresql/data
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
  <pre class="notranslate">chmod +x .docker/entrypoint.sh<code></code></pre>
</div>

</ul>

### <li>Comandos do @nest/cli</li>
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
}
</ul>

</ul>

### Banco de dados PostgreSQL

<ul>
  <p>O nosso banco de dados </p>
</ul>

    
<p>Tudo prontos. Já podemos subir o container com a imagem da nossa API:</p>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
  <pre class="notranslate">docker-compose up<code></code></pre>
</div>

<hr>

### Configurações de ambiente
<ul>
<p>A API 'nestjs-primeiros-passos' é a interface responsável por enviar os comando para fazer o CRUD (do inglês - criar, ler, atualizar e deletar) dos dados do nosso banco de dados postgreSQL e retornar o status da solicitação. O próximo passo é criar o banco de dados.</p>

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

### 
<ul>
</ul>
