# Monolithic

## create upgrade file

    nano upgrade.sh
    
    ---
    #!/bin/bash
    sudo apt update
    sudo apt upgrade -y
    sudo apt autoremove -y
    ---
    
    chmod +x upgrade.sh
    ./upgrade.sh

## instalar o fail2ban

    sudo apt install fail2ban

## instalar o nginx com certbot 

Baseado em: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04

    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d 962555000.xyz
    sudo chown -R pedrocosta:pedrocosta /var/www/html

    # colocar na pasta  /var/www/html o que se quiser 

## instalar o agate gemini server

A partir de: https://github.com/mbrubeck/agate
Baseado em: https://yaky.dev/2022-07-15-setup/

    wget https://github.com/mbrubeck/agate/releases/download/v3.3.21/agate.x86_64-unknown-linux-gnu.gz
    gunzip agate.x86_64-unknown-linux-gnu.gz
    sudo mv agate.x86_64-unknown-linux-gnu /usr/local/bin/agate
    sudo chmod +x /usr/local/bin/agate 
    sudo nano /etc/systemd/system/agate.service
    
    ---
    [Unit]
    Description=Agate Gemini Server
    After=network.target

    [Service]
    Type=simple
    ExecStart=agate --hostname 962555000.xyz --content /var/gemini --lang en-US
    Restart=always
    RestartSec=3
    SyslogIdentifier=agate

    [Install]
    WantedBy=multi-user.target
    ---
    
    sudo mkdir /var/gemini
    sudo chown -R pedrocosta:pedrocosta /var/gemini

    # colocar em /var/gemini o que se quiser

    sudo ufw allow 1965
    sudo systemctl daemon-reload
    sudo systemctl enable agate
    sudo systemctl start agate

## instalar o gophernicus

Baseado em: https://github.com/gophernicus/gophernicus/blob/master/INSTALL.md
Ou: https://lowendbox.com/blog/running-a-gopher-server-on-a-vps-retro-internet-with-modern-tools/

    sudo apt install gcc make
    git clone -b 3.1.1 https://github.com/gophernicus/gophernicus.git
    cd gophernicus
    ./configure --listener=systemd  --hostname=962555000.xyz
    make
    sudo make install
    sudo ufw allow 70/tcp
    sudo chown -R pedrocosta:pedrocosta /var/gopher

    # colocar em /var/gopher o que se quiser

    sudo systemctl enable gophernicus.socket
    sudo systemctl start gophernicus.socket

## TO DO

    $ sudo nano /etc/default/gophernicus
    
    ---
    OPTIONS=-r /srv/gopher -p 70 -h pedrocosta.dpdns.org
    ---

    $ sudo nano /etc/systemd/system/gophernicus.service
    
    ---
    [Unit]
    Description=Gophernicus Gopher Server
    After=network.target
    [Service]
    ExecStart=/usr/sbin/gophernicus -r /srv/gopher
    User=pedrocosta
    Group=pedrocosta
    Restart=on-failure
    [Install]
    WantedBy=multi-user.target
    ---