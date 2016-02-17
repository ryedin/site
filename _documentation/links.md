---
title: "Linking Containers"
---

Convox enables developers to link containers by declaring associations in the `docker-compose.yml` manifest.
Links are created by injecting env vars for the linked container into other process environments.


This avoids the need for your application to interface with configuration services, key value stores, or name servers simply to discover other containers on the network.
Discovered links are perfect for inter-container communication within a VPC or to have a development service that is discovered just like a production service.

To link containers, use the `link` keyword and the `ports` keyword in your manifest.
The URLs are auto-configured using the port you've declared and the information Convox has about your system.

## Discovering links

For example, the following `docker-compose.yml` "just works" with Convox.
There is no need to explicitly set a `DATABASE_URL` for the web container: it is discovered in local development and production.

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

The discovered URL is of the form `<scheme>://<username>:<password>@<host>:<port><path>`

A port is set for the `database` process, so Convox knows to create a load balancer for that container.

Because Convox knows the network location of this load balancer, it can create and export an environment variable with the appropriate host and port settings in both development and production.
The variable name is based on the process name.
In this example, the variable generated for the `database` process is `DATABASE_URL`.

In addition to the link URL, the various URL components are also set as environment variables.

For example, a linked process named `redis` will set the following ENV variables in a container:

- `REDIS_URL`
- `REDIS_SCHEME`
- `REDIS_HOST`
- `REDIS_PORT`
- `REDIS_PATH`
- `REDIS_USERNAME`
- `REDIS_PASSWORD`

Here is what those actually look like against the `convox/redis` image:

Locally:

```bash
$ docker exec -it 57025814486e env | grep REDIS
REDIS_HOST=172.17.0.1
REDIS_PASSWORD=password
REDIS_PATH=/0
REDIS_PORT=6379
REDIS_SCHEME=redis
REDIS_URL=redis://:password@172.17.0.1:6379/0
REDIS_USERNAME=
```

And in production:

```bash
$ convox exec 14acdea0774d env | grep REDIS
REDIS_HOST=internal-node-example-redis-i-191910196.us-east-1.elb.amazonaws.com
REDIS_PASSWORD=password
REDIS_PATH=/0
REDIS_PORT=6379
REDIS_SCHEME=redis
REDIS_URL=redis://:password@internal-node-example-redis-i-191910196.us-east-1.elb.amazonaws.com:6379/0
REDIS_USERNAME=
```

## Configuring URLs

The `scheme`, `username`, `password`, and `path` are all configured by special environment
variables defined in the `Dockerfile` or `docker-compose.yml`.
These environment variables are:

* `LINK_SCHEME`
* `LINK_USERNAME`
* `LINK_PASSWORD`
* `LINK_PATH`

See the [convox/redis](https://github.com/convox/redis/blob/9b56f5553ce6dd0a2f72d76b752f1dded287f109/Dockerfile#L10-L13) Dockerfile for an example.

Most images will *not* have these environment variables set.
In that case, you can do the following:

```yaml
web:
  build: .
  command: bin/web
  ports:
    - 80:80
    - 443:80
  environment:
    - RAILS_ENV=development
    - DATABASE_URL
  volumes:
    - .:/app
  links:
    - database
database:
  image: convox/postgres
  environment:
    - LINK_SCHEME=postgres
    - LINK_PASSWORD=password2
    - LINK_USERNAME=postgres
    - POSTGRES_PASSWORD=password2
  ports:
    - 5432
```

This `docker-compose.yml` shows how you to use convox linking to configure the `DATABASE_URL` convox creates.

The `convox/postgres` image allows you to set the `POSTGRES_PASSWORD` to configure the database server.
Setting `LINK_PASSWORD` to the same value ensures that password is used for the URL in convox linking:

```bash
$ docker exec rails-nginx-web env | grep DATABASE
DATABASE_HOST=172.17.0.1
DATABASE_PASSWORD=foo
DATABASE_PATH=
DATABASE_PORT=5432
DATABASE_SCHEME=postgres
DATABASE_URL=postgres://postgres:foo@172.17.0.1:5432
DATABASE_USERNAME=postgres
```

## Ports

When a process declares a link, the linked container (`database` in our example) needs to expose at least one port so convox can construct a URL.
Exposing zero ports is not considered an error, but no URL will be constructed.

When multiple ports are specified, the first one in the list of ports is used to configure the linked URL.
