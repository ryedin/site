---
title: "Linking Containers"
---

Convox enables developers to link containers by declaring the associations in the manifest.
Convox links containers by injecting a URL of the linked container into other process environments.

This avoids the need for your application to
interface with configuration services, key value stores, and name servers
simply to discover other containers on the network.

To link containers, you use the `link` keyword and the `ports` keyword in your manifest.
The URLs are auto-configured using the port you've declared and the information Convox has
about your system.

Given the following manifest:


```bash
web:
  image: rails
  ports:
    - 80:80
  environment:
    - DATABASE_URL
  links:
    - database
database:
  image: postgres
  ports:
    - 5432
```

When you export a `port` in the `database` image, it tells convox to create a load balancer
for that container.

Because Convox knows the network location of this load balancer, it can create a `DATABASE_URL`
env var with the appropriate host and port settings in both development and production.

This URL is of the form `<scheme>://<username>:<password>@<host>:<port>/<path>`

When a process declares a link, the linked container (`database` in our example) must expose
exactly one port. Exposing less than one is considered an error. Exposing more than one means
Convox cannot (and does not) create a URL, but is not considered an error.

The `scheme`, `username`, `password`, and `path` are all configured by inspecting the running
container. This means convox discovered links are perfect for inter-container communication
within a VPC or to have a development service that is discovered just like a production service.
