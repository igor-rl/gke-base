### API RESTFULL - PRIMEIROS PASSOS COM NESTJS

![vscode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![doker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
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
  <li><a href="#">Compilador</a></li>
  <li><a href="#">Docker</a></li>
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
<li><a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/">kubernets</a></li>
<li><a href="https://cloud.google.com/sdk/docs/install#deb">gcloud cli</a></li>
</ul>
<hr>

### Criando o projeto
<ul>
    Instale o <a href="https://docs.nestjs.com/cli/overview">Nest CLI</a> no seu ambiente de desenvolvimento:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>npm i -g @nestjs/cli</code></pre>
    </div>
    Crie o projeto:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>nest new nestjs-primeiros-passos</code></pre>
    </div>
    Inicie a aplicação localmente:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>npm run start:dev</code></pre>
    </div>
    Pronto! Você já pode acessar a api em <a href="http://localhost:3000">http://localhost:3000</a>. Você também pode fazer o primeiro teste da sua api rodando o comando abaixo. Em ambos os casos você deve receber o retorno "Hello World!".
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>curl http://localhost:3000</code></pre>
    </div>
</ul>
<hr>

### Configurações do ambiente de desenvolvimento
<ul>
    <p>Neste guia, não vamos fazer os testes localmente. Vamos subir nossas aplicações em containers utilizando os recursos do Docker Engine e docker-compose. Isso vai nos ajudar a simular a aplicação o mais próximo o possível do ambiente de produção. Assim, vamos ver em tempo real como ela vai se comportar quando estiver implantada num provedor de nuvem.</p>
    Pare a execução local da api 'nestjs-primeiros-passos':
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate">ctn + C</pre>
    </div></p>

### <li>Compilador (opcional)</li>
<p>Inclua as configurações abaixo no arquivo <i>tsconfig.json</i> para que o compilador de desenvolvimento não reinicialize ao identificar modificações nos arquivos da node_modules, dist e .docker. Ele monitorará apenas as alterações na pasta src.</p>
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>{
  "compilerOptions": {
    ...,
    ...,
  },
  "include": ["src"],
  "exclude": [
    "node_modules",
    "dist",
    ".docker"
  ]
}</code></pre>
    </div>

### <li>Docker</li>
    <p>Na raiz do projeto, crie o arquivo docker-compose.yaml. Dentro deste arquivo, insira o manifesto:</p>
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>version: '3.8'
services:
  api:
    container_name: "hrm_api_${NODE_ENV}"
    image: "hrm_api_${NODE_ENV}"
    environment:
      - NODE_ENV:${NODE_ENV}
    build:
      context: ./app
      target: "${NODE_ENV}"
      dockerfile: Dockerfile
    entrypoint: ["npm", "run", "start:${NODE_ENV}"]
    env_file:
      - .env
    ports:
      - 9229:9229
    networks:
      - nesjs-network
    volumes:
      - ./app:/usr/src/app
      - /usr/src/app/node_modules
    restart: unless-stopped
networks:
  nesjs-network:</code></pre>
    </div>
    Na raiz do projeto, crie o arquivo .env que conterá todas as nossas variáveis de ambiente:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>NODE_ENV=dev</code></pre>
    </div>
    Na raiz do projeto, crie o arquivo .Dockerfile e insira os seguintes comandos no arquivo:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>NODE_ENV=dev</code></pre>
    </div>
    Para evitar subir arquivos desnecessários para nosso repositório do docker, crie o arquivo .dockerignore na raiz do projeto, copie e cole dentro dele o texto abaixo:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code># compiled output
/dist
/node_modules
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
!.vscode/extensions.json
<br># secrets
.env</code></pre>
    </div>
</ul>

</ul>
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

