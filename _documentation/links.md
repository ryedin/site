---
title: "Linking Containers"
---

Convox enables developers to link containers by declaring associations in the `docker-compose.yml` manifest. Links are created by injecting a URL of the linked container into other process environments.

This avoids the need for your application to interface with configuration services, key value stores, or name servers simply to discover other containers on the network. Discovered links are perfect for inter-container communication within a VPC or to have a development service that is discovered just like a production service.

To link containers, use the `link` keyword and the `ports` keyword in your manifest. The URLs are auto-configured using the port you've declared and the information Convox has about your system.

For example, given the following `docker-compose.yml`:

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
  image: convox/postgres
  ports:
    - 5432
```

Since a port is set for the `database` process, Convox knows to create a load balancer for that container.

Because Convox knows the network location of this load balancer, it can create and export an environment variable with the appropriate host and port settings in both development and production. The variable name is based on the process name. In this example, the variable generated for the `database` process is `DATABASE_URL`.

The generated URL is of the form `<scheme>://<username>:<password>@<host>:<port>/<path>`

The `scheme`, `username`, `password`, and `path` are all configured by special environment
variables defined in the `Dockerfile`. These environment variables are:

* `LINK_SCHEME`
* `LINK_USERNAME`
* `LINK_PASSWORD`
* `LINK_PATH`

See the [convox/postgres](https://github.com/convox/postgres/blob/497d14d4ef0b7e5c176cbf9c5c0e4063b81d0f03/Dockerfile#L15-L17) and [convox/redis](https://github.com/convox/redis/blob/9b56f5553ce6dd0a2f72d76b752f1dded287f109/Dockerfile#L10-L13) Dockerfiles for examples.

When a process declares a link, the linked container (`database` in our example) must expose exactly one port. Exposing less than one is considered an error. Exposing more than one means Convox cannot (and does not) create a URL, but is not considered an error.

