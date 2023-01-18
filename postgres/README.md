# BANCO DE DADOS NO GOOGLE CLOUD

<p>

![vscode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![doker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![kubernets](https://img.shields.io/badge/kubernetes-326ce5.svg?&style=for-the-badge&logo=kubernetes&logoColor=white)
![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![nestjs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
</p>

<p>Este guia de estudo exemplifica como criar um serviço de bancos de dados voltado para ambiente de desenvolvimento e de produção. O banco de dados utiliazado é o postgreSQL. Siga as instruções desse guia para criar um serviço de banco de dados no google cloud para armazernar e acessar seus dados localmente ou num provedor de nuvem.<br>

## ÍNDICE
<li><a href="">Instalando as dependências</a></li>
<li><a href="">Banco de dados local com Docker - desenvolvimento</a></li>
<li><a href="">Banco de dados Kubernetes - desenvolvimento</a></li>
<li><a href="">Banco de dados Google SQL - produção</a></li>

<hr>

### 1) Requisitos
> instale o <a href="visual studio code">visual studio code</a>

> siga as instruções <a href="https://github.com/codeedu/wsl2-docker-quickstart">deste tutorial</a> para fazer a instalação do wsl e docker no windows.

### <li>Instalar o nodejs e o npm</li>
<ul>
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>sudo apt-get install curl</code><br><code>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash</code><br><code>nvm install --lts</code><br><code>nvm install node</code><br><code></code></pre>
    </div>
    Verificar a versão do node:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>node --version</code></pre>
    </div>
    Verificar a versão do npm:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>npm --version</code></pre>
    </div>
</ul>

### <li> ZSHELL (opcional)</li>
<p> O zsh é uma ferramenta facilitadora que ajuda a formatar e armazenar o histórico de comandos para o terminal do linux. A instalação é um pouco complexa e você pode perder alguns minutos nisso. Mas vale o investimento. Você vai ganhar muito em performace e produtividade ao programar.</p>

> <a href="https://www.youtube.com/watch?v=7kZODMP8bs0&ab_channel=HansM.Boron">vídeo explicativo</a> <br>
> <a href="https://github.com/ohmyzsh/ohmyzsh">OhMyZsh</a> <br>
> <a href="https://github.com/zdharma/zi#installation">Zinit</a> <br>
> <a href="https://github.com/ohmyzsh/ohmyzsh/wiki/Themes">Temas</a> <br>


### <li> Kubernetes</li>
> Instale o <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/">kubernets.</a>

### <li> Kind</li>
> Instalar o <a href="https://kind.sigs.k8s.io/">KIND</a> (kubernetes in docker).