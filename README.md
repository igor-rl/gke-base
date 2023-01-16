# ARQUIVOS BASE PARA IMPLANTAR UM PROJETO NO GKE

<p>

![vscode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![doker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![kubernets](https://img.shields.io/badge/kubernetes-326ce5.svg?&style=for-the-badge&logo=kubernetes&logoColor=white)
</p>

<p> Este é um guia de estudo que integra diferentes configurações de uso do kubernetes para implantar aplicações diversas em um provedor de nuvem. Este guia se baseia em uma aplicação impantada no Kubernetes Engine do Google Cloud.
Esse guia contém as seguintes configurações:<br>
    <li>probe</li>
    <li>metrics-server</li>
    <li>configuração de recursos</li>
    <li>HPA (Horizontal pod autoscale)</li>
    <li>Fortio</li>
    <li>Statefulsets</li>
    <li>Volumes persistentes</li>
    <li>Ingress</li>
    <li>cert-manager</li>
    <li>cluster-issuer</li>
</p>

<hr>

### 1) Instalando as dependências
<p>O primeiro passo é instalar as dependências necessárias para implantar o projeto. Caso o seu sistema operacional seja o windows, será necessário instalar o serviço de wsl (subsistema do linux no windows) para conseguir manipular os containers no seu sistema operacional. Mas se você vai utilizar linux ou macOS, basta instalar o dockerhub em seu sistema operacional.
</p>

> instale o <a href="visual studio code">visual studio code</a>

> siga as instruções <a href="https://github.com/codeedu/wsl2-docker-quickstart">deste tutorial</a> para fazer a instalação do wsl e docker no windows.

### <li>Instalar o nodejs e o npm</li>
<ul>
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>sudo apt-get install curl</code><br><code>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash</code><br><code>nvm install --lts</code><br><code>nvm install node</code><br><code></code></pre>
    </div>
    Verificar a versão do node
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>node --version</code></pre>
    </div>
    Verificar a versão do npm
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
> instale o <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/">kubernets</a>

### <li> Kind</li>
> instalar o <a href="https://kind.sigs.k8s.io/">KIND</a> (kubernetes in docker)

### <li> Metrics-server</li>
> Permite o escalonamento automático em http para ambiente de desenvolvimento. Baixe o arquivo de download:
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml</code></pre>
</div>

> Renomeie o arquivo "components.yaml" para "metrics-server.yaml".<br>
> Pesquise por "- --kubelet-use-node-status-port" e insira abaixo dele o comando:
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>- --kubelet-insecure-tls</code></pre>
</div>

> Aplique e verifique a instalação do metrics executando o comando abaixo e procure pelo service "kube-system/metrics-server"
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>kubectl apply -f metrics.yaml<br>
kubectl get apiservices</code></pre>
</div>

> Se o status estiver "true", parabéns! Você insttalou o  metrics-server com sucesso.

### <li> HPA</li>
> O próximo passo é iniciar o serviço do hpa (horizontal pod Autoscaler). Em produção os fornecedores de hospedagem em nuvem já possuem ferramentas para autosccaale dos pods.
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>kubectl apply -f hpa.yaml<br>
kubectl get hpa</code></pre>
</div>

### <li> Fortio</li>
> O fortio é um plugin que pode ser usado para testar o tráfego do sua aplicação. Suba em um container e faça as configurações. Use a <a href="https://github.com/fortio/fortio">documentação</a> para setar as configurações.
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
    <pre class="notranslate"><code>kubectl run -it fortio --rm --image=fortio/fortio -- load -qps 800 -t 120s -c 70 "http://nome_do_service/healthz"<br>
watch kubectl get hpa</code></pre>
</div>

<hr>

### 2) Iniciando os serviços
<ul>
    Iniciar o docker
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>sudo service docker start</code></pre>
    </div>
    login no dockerhub
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker login</code></pre>
    </div>
    Criando um Cluster
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kind create cluster --name lojavirtual</code></pre>
    </div>
</ul>

<hr>

### 3) Implantar o projeto
<ul>
    Deploy da aplicação em desenvolvimento:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl apply -f k8s/</code></pre>
    </div>
    O arquivo deploy é o responsável por configurar os deploys, pods, services, secrets e volumes persistentes. Para ver o status de todo o projeto execute o comando:
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl get --all</code></pre>
    </div>

</ul>

<hr>

# Implantar projeto no GKE
> <a href="https://cloud.google.com/sdk/docs/install#deb">gcloud cli</a>
<ul>
    inicie os serviços do gcloud
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>gcloud init</code></pre>
    </div>
    selecione um projeto do gcloud
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>gcloud container clusters get-credentials cluster_name --region cluster_region --project project_name</code></pre>
    </div>
    implemente o projeto no cluster gcloud
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl apply -f k8s/</code></pre>
    </div>
</ul>

> <a href="https://github.com/kubernetes/ingress-nginx/blob/main/docs/deploy/index.md">ingress-nginx</a>
<ul>
    recupere o id externo do ingress
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl get service ingress-nginx-controller --namespace=ingress-nginx</code></pre>
    </div>
</ul>

> <a href="https://cert-manager.io/docs/installation/kubectl/">cert-manager</a>
<ul>
    permissão para p gcloud
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl create clusterrolebinding cluster-admin-binding \<br>
--clusterrole=cluster-admin \<br>
--user=$(gcloud config get-value core/account)</code></pre>
    </div>
    implemente o arquivo cert-maneger
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl apply -f k8s/cert-manager.yaml</code></pre>
    </div>
    verificar se os pods estão ativos
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl get pods -n cert-manager</code></pre>
    </div>
    aplicar as configurações do cluster-issuer
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl apply -f k8s/cluster-issuer.yaml</code></pre>
    </div>
    aplicar as configurações do ingress.yaml
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl apply -f k8s/ingress.yaml</code></pre>
    </div>
    recuperar certificados e aguardar status = true
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl get certificates</code></pre>
    </div>
    detalhar certificado
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl describe certificate nome_do_certificado</code></pre>
    </div>
</ul>



<hr>

### COMANDOS ÚTEIS

### <li>Kubernetes</li>
<ul>
    Verificando a aplicação
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl get all</code></pre>
    </div>
    Verificar os pods
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl get pods</code></pre>
    </div>
    Vericar os serviços
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl get services</code></pre>
    </div>
    Ver todos os endpoints
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl get endpointslices</code></pre>
    </div>
    Verificar logs
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl logs pod/nome_do_pod -f</code></pre>
    </div>
    Aplicar o deploy e verificar os pods em watch
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl apply -f k8s && watch -n1 kubectl get pods</code></pre>
    </div>
    Executar o bash em um pod
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl exec -it pod/nome_do_pod bash</code></pre>
    </div>
    excluir volume persistente (pv e pvc)
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl patch pvc nome_do_pvc -p '{"metadata":{"finalizers":null}}'
kubectl delete pvc nome_do_pvc</code></pre>
    </div>
<div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl patch pv nome_do_pv -p '{"metadata":{"finalizers":null}}'
kubectl delete pvc nome_do_pv</code></pre>
    </div>
    entrar no cluster
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl cluster-info --context kind-nome_do_cluster</code></pre>
    </div>
    verificar recursos utilizados por um pod
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>kubectl top pod pod_name</code></pre>
    </div>
</ul>

### <li>Docker</li>
<ul>
    rodar o arquivo dockerfile
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker-compose up</code></pre>
    </div>
    criar imagem para dockerhub
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker build -t usuario-docker/nome_da_imagem:0.0.0 .</code></pre>
    </div>
    subir a imagem para o seu dockerhub
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker push usuario-docker/nome_da_imagem:0.0.0</code></pre>
    </div>
    criar um container em uma porta específica e indicar uma porta local de acesso
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker run -d -p 8080:80 nome_da_imagem</code></pre>
    </div>
    * -d = criar container sem afetar o terminal
    <br>
    <br>
    ver as imagens ativas
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker ps</code></pre>
    </div>
    lista de todas as imagens
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>doker image l</code></pre>
    </div>
    espelhar tudo do diretório atual na imagem docker
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker run -d -v $(pwd):/home/node/app -p 8000:3000 <imagem></code></pre>
    </div>
    pesquisar uma imagem
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>doker image ls | grep string_a_pesquisar</code></pre>
    </div>
    parar execussão de um container
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker stop id_do_container</code></pre>
    </div>
    Remover containers
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker rm -v ex-pagamento-app ex-pagamento-db</code></pre>
    </div>
    Remover imagens
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>docker rmi ex-pagamento-api-app ex-pagamento-api-db</code></pre>
    </div>
</ul>

### <li>Outros</li>
<ul>
    permissão de alteração
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>sudo chmod +x ./.docker/entrypoint.sh</code></pre>
    </div>
    remover arquivos
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>sudo rm -rf .docker .npm-cache/ dist/ node_modules/ package-lock.json schema.gq</code></pre>
    </div>
    resolver inconformidades de versões
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>--legacy-peer-deps</code></pre>
    </div>
    instala o npm-check-updates de forma global
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>npm install -g npm-check-updates </code></pre>
    </div>
    verifica dependências que possuem atualização
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>npm-check-updates</code></pre>
    </div>
    atualiza dependências
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>ncu -u</code></pre>
    </div>
    instala dependências
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>npm install</code></pre>
    </div>
    vim
    <div class="snippet-clipboard-content notranslate position-relative overflow-auto">
        <pre class="notranslate"><code>apt-get update
apt-get install vim
vim nome-arquivo
i
:qw
:q!</code></pre>
    </div>
</ul>