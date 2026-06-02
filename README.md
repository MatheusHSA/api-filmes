[![Docker Hub](https://badgen.net/badge/DockerHub/api-filmes/blue?icon=docker)](https://hub.docker.com/r/matheushsamorim/api-filmes)

# API de Filmes - Projeto GitFlow

Este projeto consiste em uma API desenvolvida em Node.js para gerenciamento de filmes, integrada com práticas modernas de Gestão de Configuração, CI/CD, Infraestrutura como Código (IaC) e Gerenciamento de Configuração Automatizado.

---

## Pipeline de CI/CD (GitHub Actions)

O repositório está configurado com uma esteira de automação no GitHub Actions que executa os seguintes passos:
* **Build da Imagem:** Disparado em qualquer branch a cada commit para garantir a integridade do código.
* **Publish no DockerHub:** Executado automaticamente apenas quando mudanças são mescladas na branch principal (`master`), gerando uma nova versão da imagem Docker.

---

## Infraestrutura como Código (IaC) e Gerenciamento de Configuração

Esta aplicação utiliza uma arquitetura de provisionamento automatizado dividida em duas camadas: **Vagrant** para a criação das máquinas virtuais e **Ansible** para a configuração do ambiente e deploy contínuo.

### Arquitetura do Ambiente
* **VM1 (192.168.56.10):** Nó de Controle (Control Node). Possui o Ansible instalado e gerencia o ambiente remoto. Configurada com 1024 MB de Memória e 1 vCPU.
* **VM2 (192.168.56.20):** Nó Gerenciado (Managed Node). Servidor oficial que hospedará o backend da API de Filmes. Configurada com 512 MB de Memória e 1 vCPU.

---

### Como Executar e Validar a Infraestrutura

#### Pré-requisitos
Certifique-se de ter instalado em sua máquina física (Host):
1. VirtualBox
2. Vagrant

#### Passo 1: Inicializar as Máquinas Virtuais
Abra o terminal na raiz do projeto e execute o comando para erguer a infraestrutura:
> vagrant up

*Este comando criará ambas as VMs no VirtualBox com as configurações de CPU/Memória especificadas e instalará o Ansible automaticamente dentro da VM1.*

#### Passo 2: Configurar o Acesso SSH na VM1 (Nó de Controle)
O Ansible precisa acessar a VM2 sem a necessidade de digitação manual de senhas. Para configurar essa relação de confiança:

1. Acesse a VM1 via SSH:
   > vagrant ssh vm1

2. Mova a pasta de configurações do Ansible para o diretório local do usuário:
   > cp -r /vagrant/ansible /home/vagrant/
   > cd /home/vagrant/ansible

3. Gere um par de chaves SSH (Apenas pressione ENTER em todas as confirmações que aparecerem na tela, sem digitar nada):
   > ssh-keygen -t rsa

4. Transfira a chave utilizando a pasta compartilhada como ponte:
   > cp /home/vagrant/.ssh/id_rsa.pub /vagrant/chave_vm1.pub
   > exit

5. Acesse a VM2 pelo seu computador para importar a chave:
   > vagrant ssh vm2
   > mkdir -p /home/vagrant/.ssh
   > cat /vagrant/chave_vm1.pub >> /home/vagrant/.ssh/authorized_keys
   > chmod 700 /home/vagrant/.ssh
   > chmod 600 /home/vagrant/.ssh/authorized_keys
   > rm /vagrant/chave_vm1.pub
   > exit

#### Passo 3: Executar o Playbook do Ansible
Entre novamente na VM1, acesse a pasta e dispare o comando para iniciar o provisionamento automatizado da API na VM2:
> vagrant ssh vm1
> cd /home/vagrant/ansible
> ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i hosts configura-node.yaml

*O Ansible se conectará na VM2, atualizará o sistema, instalará o Node.js 20, o Git, criará os diretórios seguros, clonará o repositório atualizado do GitHub e instalará todas as dependências do backend automaticamente.*

#### Passo 4: Inicializar e Testar a API de Filmes
1. Para colocar a API para rodar, acesse a VM2:
   > ssh vagrant@192.168.56.20
   > cd /var/www/api-filmes
   > npm start

2. Para testar a comunicação entre as redes, volte ao terminal da **VM1** e faça uma requisição simulada usando curl apontando para o IP privado da VM2:
   > curl http://192.168.56.20:8080/api/filmes

---

#### Desligamento do Ambiente
Para interromper a execução ou limpar as instâncias do seu computador após os testes:
* **vagrant halt** -> Desliga as máquinas virtuais salvando o estado atual.
* **vagrant destroy** -> Remove completamente as máquinas do VirtualBox, liberando espaço em disco.
