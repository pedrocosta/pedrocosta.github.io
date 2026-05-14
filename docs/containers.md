# Containers

## add user

    adduser pedrocosta
    usermod -aG sudo pedrocosta
    su - pedrocosta

## install mosh

    sudo apt install mosh
    sudo ufw allow 22/tcp && sudo ufw allow 60000:61000/udp
    mosh pedrocosta@2555000.xyz

## install fail2ban

    sudo apt install fail2ban

## install docker

    # Add Docker's official GPG key:
    sudo apt update
    sudo apt install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update

    sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    sudo groupadd docker

    sudo usermod -aG docker $USER

    exit

## install agate

    mkdir gemini

    cd gemini

    mkdir certificate

    cd certificate

    nano openssl.cnf
    [req]
    distinguished_name = req_distinguished_name 
    x509_extensions = v3_req 
    prompt = no
    [req_distinguished_name] 
    CN = 2555000.xyz
    [v3_req]
    keyUsage = critical, digitalSignature, keyEncipherment
    extendedKeyUsage = serverAuth 
    subjectAltName = @alt_names
    [alt_names] 
    DNS.1 = 2555000.xyz 
    DNS.2 = localhost
    IP.1 = 134.255.219.239
    IP.2 = 127.0.0.1 

    openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes -keyout key.pem -out cert.pem -config openssl.cnf

    chmod 600 key.pem cert.pem

    cd ..

    nano docker-compose.yml
    version: '3.8'
    services:
    agate:
        image: ghcr.io/mbrubeck/agate:latest
        container_name: agate_gemini
        restart: unless-stopped
        ports:
        - "1965:1965"
        volumes:
        - ./content:/gmi
        - ./certificate:/certs
        command: ["--hostname", "2555000.xyz"]

    mkdir content

    nano content/index.gmi
    ``` Ascii art: 2555000.xyz
    ___ ___ ___ ___ ___ ___ ___               
    |_  |  _|  _|  _|   |   |   |  _ _ _ _ ___ 
    |  _|_  |_  |_  | | | | | | |_|_'_| | |- _|
    |___|___|___|___|___|___|___|_|_,_|_  |___|
                                    |___|    
    ```

    sudo apt install docker-compose

    docker-compose up -d

    # access gemini://2555000.xyz

## install gopher

    mkdir gopher

    cd gopher

    mkdir content

    nano gophermap
    !Welcome to Gophernicus!
    #
    # $ figlet -f 'Small Slant' 2555000.xyz
    #
    ___ ___ ___ ___ ___ ___ ___               
    |_  |  _|  _|  _|   |   |   |  _ _ _ _ ___ 
    |  _|_  |_  |_  | | | | | | |_|_'_| | |- _|
    |___|___|___|___|___|___|___|_|_,_|_  |___|
                                    |___|    
    #
    # Shamelessly lifted from Apache 1.3...
    #

    If you can see this, it means that the installation of Gophernicus
    on this system was successful. You may now add content to this
    directory and replace this page.
    #
    # Real-time configuration output (WOO!)
    #
    Generic information:
    =echo "    your ip address: $REMOTE_ADDR"
    =echo "    server time....: $(date)"
    =echo "    server uptime..: $(uptime | sed 's/.*up *\([^,]*\), .*/\1/')"
    =echo "    server version.: $SERVER_VERSION \"$SERVER_CODENAME\""
    =echo "    server platform: $SERVER_ARCH"
    =echo "    description....: $SERVER_DESCRIPTION"
    Server configuration:
    =echo "    config file....: $(for FILE in /etc/sysconfig/gophernicus /etc/default/gophernicus /Library/LaunchDaemons/org.gophernicus.server.plist /boot/common/settings/network/services /lib/systemd/system/gophernicus\@.service /etc/xinetd.d/gophernicus /etc/inetd.conf; do if [ -f $FILE ]; then echo $FILE; break; fi; done)"
    =echo "    server hostname: $SERVER_HOST"
    =echo "    root directory.: $DOCUMENT_ROOT"
    =echo "    running as user: $(whoami)"
    =echo "    output charset.: $GOPHER_CHARSET"
    =echo "    output width...: $COLUMNS characters"
    *

    nano env.list
    DISABLE_FOOTER=true

    nano start.sh
    docker run --name gophernicus  --hostname 2555000.xyz --env-file env.list -p 70:70 -d --rm -v /home/pedrocosta/gopher/content:/var/gopher joshkaiju/gophernicus

    nano stop.sh
    docker stop gophernicus

    chmod +x *.sh

    ./start.sh

    --

    sudo apt install lynx

    lynx gemini://2555000.xyz
    # q para quit

    lynx gopher://2555000.xyz
    # q para quit

## open firewall ports

    sudo ufw add 22
    sudo ufw allow 1965
    sudo ufw allow 70
    sudo ufw enable

## install figlet

    sudo apt install figlet

    git clone https://github.com/imegeek/figlet-fonts

    #git clone https://github.com/xero/figlet-fonts

    sudo mv figlet-fonts/* /usr/share/figlet/

    sudo rm -r figlet-fonts/

    figlet -f Rectangles 2555000.xyz

## install nginx

    mkdir -p nginx/content

    cd nginx

    nano content/index.html
    <html>
    <head>
        <title>2555000.xyz</title>
    </head>
    <body>
        <div class="container">
        <pre>
    ___ ___ ___ ___ ___ ___ ___               
    |_  |  _|  _|  _|   |   |   |  _ _ _ _ ___ 
    |  _|_  |_  |_  | | | | | | |_|_'_| | |- _|
    |___|___|___|___|___|___|___|_|_,_|_  |___|
                                    |___|    
        </pre>
        </div>
    </body>
    </html>

    --

    sudo apt update

    sudo apt install certbot

    sudo certbot certonly --webroot --webroot-path /home/pedrocosta/nginx/content -d 2555000.xyz
    eng.pedrocosta@gmail.com
    Y
    Y

    sudo mkdir -p /etc/letsencrypt/ssl

    sudo cp -r -L /etc/letsencrypt/live/2555000.xyz/fullchain.pem /etc/letsencrypt/ssl/

    sudo cp -r -L /etc/letsencrypt/live/2555000.xyz/privkey.pem /etc/letsencrypt/ssl/

    nano docker-compose.yml
    services:
    nginx:
        container_name: nginx
        image: nginx:latest
        restart: unless-stopped
        ports:
        - "443:443"
        - "80:80"
        volumes:
        - ./nginx.conf:/etc/nginx/conf.d/nginx.conf
        - ./content/:/usr/share/nginx/html
        - /etc/letsencrypt/live/2555000.xyz/fullchain.pem:/etc/nginx/ssl/fullchain.pem
        - /etc/letsencrypt/live/2555000.xyz/privkey.pem:/etc/nginx/ssl/privkey.pem

    nano nginx.conf
    server {
        listen 80 default_server;
        server_name _;
        return 301 https://$host$request_uri;
    }
    server {
        listen [::]:443 ssl;
        listen 443 ssl; 
        root /usr/share/nginx/html;
        index index.html index.php index.htm index.nginx-debian.html;
        error_log  /var/log/nginx/error.log;
        access_log /var/log/nginx/access.log;
        server_name 2555000.xyz www.2555000.xyz;
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        error_page 404 /index.html;
    #    location / { 
    #        try_files $uri $uri/ /index.php?$query_string;
    #    }
    }

    nano start.sh
    docker run --name gophernicus  --hostname 2555000.xyz -p 70:70 -d --rm -v /home/pedrocosta/gopher/content:/var/gopher joshkaiju/gophernicus

    nano stop.sh
    docker stop gophernicus

    chmod +x *.sh

    ./start.sh

    --

    http://2555000.xyz

    https://2555000.xyz

## brincadeiras com o protocolo gemini

    cd gemini/content

    while true; do { echo -ne "20 text/gemini\r\n"; cat index.gmi; } | ncat -l -p 1966 --ssl --ssl-cert /home/pedrocosta/gemini/certificate/cert.pem --ssl-key /home/pedrocosta/gemini/certificate/key.pem; done

    # para ver noutro terminal
    echo "gemini://2555000.xyz:1966" | ncat ‑‑ssl 2555000.xyz 1966
    #pode ter de se confiar manualmente no certificado

## install jq and get iss position

    sudo apt install jq

    curl -s http://api.open-notify.org/iss-now.json | jq

## install asciiworld

    mkdir asciiworld

    nano Dockerfile
    FROM alpine:3.22.2
    RUN apk add git make musl-dev pkgconfig gcc gd-dev shapelib-dev && \
        git clone https://uninformativ.de/git/asciiworld.git && \
        cd asciiworld && \
        make && \
        apk del git make musl-dev pkgconfig gcc  && \
        chmod +x asciiworld
    WORKDIR /asciiworld
    CMD ["sh"]

    nano build.sh
    docker build -t asciiworld:latest .

    nano run.sh
    docker run --rm --name asciiworld -i -t asciiworld ./asciiworld $1

    chmod +x *.sh

    ./build.sh

    ./run.sh

    #ver parametros do asciiworld em https://www.uninformativ.de/git/asciiworld/file/README.html

    # testar com parâmetros:
    ./run.sh "-s -S"

    --

    nano showdata.sh
    #!/bin/bash
    echo -e "20 text/gemini\r\n"
    # set Gemini formating for ASCII
    echo -e "\`\`\`"
    ./run.sh "-w 80 -h 25 -s -S"
    echo -e "\`\`\`"

    chmod +x showdata.sh

    while true; do ./showdata.sh  | ncat -l -p 1966 --ssl --ssl-cert /home/pedrocosta/gemini/certificate/cert.pem --ssl-key /home/pedrocosta/gemini/certificate/key.pem; done

    # para ver noutro terminal
    echo "gemini://2555000.xyz:1966" | ncat ‑‑ssl 2555000.xyz 1966

    --

    continuar a testar conforme: https://www.makerspace-online.com/twins/

## TO DO

    https://dev.to/kingyou/automating-https-with-docker-nginx-certbot-2ein
    
    https://www.programonaut.com/setup-ssl-with-docker-nginx-and-lets-encrypt/

    para renovar manualmente fiz no servidor: sudo certbot certonly --force-renewal --webroot --webroot-path /home/pedrocosta/nginx/content -d 2555000.xyz
    
    gopher com restart (docker compose)

    asciimap no container do gemini
    
    https://github.com/mkamarin/Hugo-2-Gopher-and-Gemini
