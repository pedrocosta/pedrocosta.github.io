# UBUNTU Install Scripts

## Create upgrade script

    cat <<EOF >upgrade.sh
    sudo apt --update --autoremove full-upgrade -y
    flatpak upgrade -y
    sudo snap refresh
    sudo determinate-nixd upgrade
    nix profile upgrade --all
    EOF
    chmod +x upgrade.sh
    ./upgrade.sh

## Install flatpak with flathub

    sudo apt install -y flatpak gnome-software-plugin-flatpak
    flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
    reboot

## Install Determinate Nix

    # Procurar: nix search nixpkgs <PACOTE>
    # Correr: nix run nixpkgs#<PACOTE>
    # Instalar: nix profile add nixpkgs#<PACOTE>
    # Atualizar: sudo determinate-nixd upgrade; nix profile upgrade --all
    # Limpar: nix-collect-garbage -d; nix profile wipe-history
    
    # nix-shell -p tplay
    # nix profile add nixpkgs#tplay
    
    sudo apt install -y curl
    curl -fsSL https://install.determinate.systems/nix | sh -s -- install
    # use Nix without rebooting
    . /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh
    # install and run fortune and neo-cowsay
    nix profile add nixpkgs#neo-cowsay nixpkgs#fortune
    fortune | cowthink

## Install podman and podman-compose

    sudo apt install -y podman podman-compose

## Install Multipass

    # Launch an instance (by default you get the current Ubuntu LTS): multipass launch --name foo
    # Run commands in that instance, try running bash (logout or ctrl-d to quit): multipass exec foo -- lsb_release -a
    # See your instances: multipass list
    # Stop and Start instances: multipass start foo bar
    # Stop and Start instance: multipass start foo
    # Clean up what you don't need: multipass delete bar; multipass purge
    # Find alternate images to launch: multipass find

    sudo snap install multipass

## Install Brave browser

curl -fsS https://dl.brave.com/install.sh | sh

## Install tplay

    # Update: cargo install tplay --force
    # Use: tplay https://www.youtube.com/watch?v=dQw4w9WgXcQ  --char-map " ░▒▓█"

    sudo apt install curl
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    sudo apt install libssl-dev ffmpeg libavfilter-dev libavdevice-dev libavformat-dev libavcodec-dev libswscale-dev libasound2-dev yt-dlp libmpv-dev clang
    cargo install tplay

## Private keys and git

    # Copiar id_ed25519.pub e id_ed25519 para ~/.ssh e depois:
    # chmod 600 .ssh/id_ed25519
    # ssh-add
    # sudo apt install -y git
    # git clone git@github.com:pedrocosta/ubuntu.git
    
    # git config --global user.email "eng.pedrocosta@gmail.com"
    # git config --global user.name "Pedro Costa"
    # git add .
    # git commit -a -m "descrição do que mudou"
    # git push
