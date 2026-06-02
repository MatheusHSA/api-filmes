# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/jammy64"

    # Configuração da VM1
    config.vm.define "vm1" do |vm1|
        vm1.vm.hostname = "vm1-ansible"

        vm1.vm.network "private_network", ip: "192.168.56.10"

        vm1.vm.provider "virtualbox" do |v|
            v.memory = 1024
            v.cpus = 1
            v.name = "VM1_Ansible_Control"
        end

        vm1.vm.provision "shell", inline: <<-SHELL
            echo "=== Instalando Ansible na VM1 ==="
            sudo apt-get update -y
            sudo apt-get install -y software-properties-common
            sudo apt-add-repository --yes --update ppa:ansible/ansible
            sudo apt-get install -y ansible git

            mkdir -p /home/vagrant/ansible
            chown -R vagrant:vagrant /home/vagrant/ansible
        SHELL
    end

    # Configuração da VM2
    config.vm.define "vm2" do |vm2|
        vm2.vm.hostname = "vm2-backend"

        vm2.vm.network "private_network", ip: "192.168.56.20"

        vm2.vm.provider "virtualbox" do |v|
            v.memory = 512
            v.cpus = 1
            v.name = "VM2_Backend_Filmes"
        end
    end
end