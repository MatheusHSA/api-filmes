[![Docker Hub](https://badgen.net/badge/DockerHub/api-filmes/blue?icon=docker)](https://hub.docker.com/r/matheushsamorim/api-filmes)

# API de Filmes - Projeto GitFLow
- [x] Rota GET implementada e integrada
- [x] Rota POST implementada e integrada
### WorkFLow Escolhido: GitFLow
Utilizei o GitFlow para isolar o desenvolvimento de novas rotas em branches de feature, garantindo que a branch principal de desenvolvimento (develop) só recebesse o código testado.
## Status Final: Pronto para Entrega

## Infraestrutura como Código (IaC) com Vagrant

Este projeto possui suporte a provisionamento automatizado de infraestrutura de desenvolvimento utilizando **Vagrant** e **VirtualBox**.

### Pré-requisitos
Antes de iniciar, garanta que você possui instalado na sua máquina host:
1. [VirtualBox](https://www.virtualbox.org/)
2. [Vagrant](https://www.vagrantup.com/)

### Como executar a infraestrutura

1. Abra o terminal na raiz do projeto e inicialize as máquinas virtuais:
   ```bash
   vagrant up

2. Após o término do processo, verifique o status das VMs para confirmar  que estão rodando:
   ```bash
   vagrant status

#### Inicializando o Backend na VM2

1. Acesse a VM2 via SSH:
   ```bash
   vagrant ssh vm2

2. Entre na pasta sincronizada e inicie a aplicação:
   ```bash
   cd vagrant_data
   npm start

(A aplicação continuará rodando enquanto este terminal permanecer aberto)

#### Como testar a rota GET a partir da VM1

1. Abra um **novo terminal** na sua máquina física, acesse a pasta do projeto e conecte-se na VM1:
   ```bash
   vagrant ssh vm1

2. De dentro do terminal da VM1, utilize o curl para testar a rota GET de listagem de filmes da VM2:
   ```bash
   curl [http://192.168.56.20:8080/filmes](http://192.168.56.20:8080/filmes)

3. Se tudo estiver correto, a VM1 receberá com sucesso a resposta em formato JSON contendo a lista de filmes processada pelo backend da VM2.

#### Para desligar e destruir o ambiente:

   ```bash
   vagrant halt
   vagrant destroy