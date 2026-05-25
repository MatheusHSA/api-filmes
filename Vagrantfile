# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/jammy64"

    # Configuração da VM1
    config.vm.define "vm1" do |vm1|
        vm1.vm.hostname = "vm1-testes"

        vm1.vm.network "private_network", ip: "192.168.56.10"

        vm1.vm.provider "virtualbox" do |v|
            v.memory = 1024
            v.cpus = 1
            v.name = "VM1_Testes_Filmes"
        end
    end

    # Configuração da VM2
    config.define "vm2" do |vm2|
        vm2.vm.hostname = "vm2-backend"

        vm2.vm.network "private_network", ip: "192.168.56.20"

        # Sincroniza a pasta do projeto com a pasta dentro da VM
        vm2.vm.synced_folder ".", "/home/vagrant/vagrant_data"

        vm2.vm.provider "virtualbox" do |v|
            v.memory = 512
            v.cpus = 1
            v.name = "VM2_Backend_Filmes"
        end

        # Instalação das dependências
        vm2.vm.provision "shell", inline: <<-SHELL
            echo "=== Atualizando pacotes do sistema ==="
            sudo apt-get update -y

            echo "=== Instalando Node.js ==="
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt.get install -y nodejs

            echo "=== Entrando na pasta sincronizada e instalando as dependencias da API ==="
            cd /home/vagrant/vagrant_data
            npm install

            echo "=== Infraestrutura pronta! Para rodar o servidor: cd vagrant_data && npm start ==="
        SHELL
    end
end