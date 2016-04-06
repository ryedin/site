---
title: "Port Mapping"
---

Convox offers total control over what ports your application will bind to locally and ports are exposed to the Internet. You explicitly configure port mappings for you app in the `docker-compose.yml` manifest.

A `convox start` uses this configuration to set up port mapping and forwarding to the local Docker environment and containers.

A `convox deploy` uses this configuration to create and configure an ECS Service, ELB and Listener, all managed through CloudFormation.

The behavior of Convox is controlled through the `ports` declaration in your `docker-compose.yml`.

## External Ports

Entries containing two ports, e.g. `- 80:5000` are considered externally-facing ports. 

During `convox start` your application will be available at your Docker host on port **80** and forward traffic to the container on port **5000**.

During `convox deploy` an internet-facing load balancer will be created listening on port **80** and forwarding traffic to the containers on port **5000**.


```yaml
web:
  image: httpd
  ports:
    - 80:80
```


## Internal Ports

Entries containing a single port, e.g. `- 5000` are considered internally-facing ports.

During `convox start` your application will be available at your Docker host on port *5000* and forward traffic to the container on port **5000**.

During `convox deploy` a VPC-only load balancer will be created listening internally on port **5000** and forwarding traffic to the containers on port **5000**.

```yaml
api:
  build: .
  ports:
    - 5000
```

## Linking

Internal ports can be used for simple service discovery. In the example below the web processes would receive an `API_URL` environment variable pointing at the load balancer fronting the `api` containers. For more information see [Linking Containers](http://convox.com/docs/links/).

```yaml
web:
  image: httpd
  ports:
    - 80:80
  links:
    - api
api:
  build: .
  ports:
    - 5000
```
