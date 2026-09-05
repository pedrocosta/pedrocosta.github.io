# Kubernetes

## Baseado em

https://docs.k3s.io/quick-start

https://dev.to/olymahmud/resolving-the-k3s-config-file-permission-denied-error-27e5

https://www.jeffgeerling.com/blog/2022/quick-hello-world-http-deployment-testing-k3s-and-traefik/

## TO DO

https://calje.medium.com/running-a-kubernetes-cluster-on-raspberry-pi-with-k3s-cheap-low-power-fully-functional-9e2cc50ba64f

## create user

    adduser pedrocosta
    usermod -aG sudo pedrocosta
    su - pedrocosta

## install fail2ban

    sudo apt install fail2ban

## install k3s

    curl -sfL https://get.k3s.io | sh -

    export KUBECONFIG=~/.kube/config

    mkdir -p ~/.kube

    # Copy the raw configuration content to the local kubeconfig file
    sudo k3s kubectl config view --raw > "$KUBECONFIG"

    # Secure the file by setting permissions
    chmod 600 "$KUBECONFIG"

    nano .bashrc

    # add at the end    
    export KUBECONFIG=~/.kube/config 
    
    source ~/.bashrc

    kubectl get nodes

    nano index.html

    <html>
        <head>
            <title>Hello World!</title>
        </head>
        <body>Hello World!</body>
    </html>

    kubectl create configmap hello-world --from-file index.html

    sudo mkdir /usr/share/nginx

    sudo chown pedrocosta /usr/share/nginx

    mkdir /usr/share/nginx/html

    nano hello-world.yml
    
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
     name: hello-world
     annotations:
       ingressClassName: "traefik"
    spec:
     rules:
     - http:
        paths:
        - path: /
        pathType: Prefix
        backend:
            service:
            name: hello-world
            port:
                number: 80
    ---
    apiVersion: v1
    kind: Service
    metadata:
    name: hello-world
    spec:
    ports:
    - port: 80
        protocol: TCP
    selector:
    app:  hello-world
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: hello-world-nginx
    spec:
    selector:
    matchLabels:
        app: hello-world
    replicas: 3
    template:
    metadata:
        labels:
        app: hello-world
    spec:
        containers:
        - name: nginx
        image: nginx
        ports:
        - containerPort: 80
        volumeMounts:
        - name: hello-world-volume
            mountPath: /usr/share/nginx/html
        volumes:
        - name: hello-world-volume
        configMap:
            name: hello-world

    kubectl apply -f hello-world.yml
    
    curl localhost:80