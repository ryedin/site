---
title: Private Registries
---

Convox apps are composed of one or more processes that run inside Docker containers.

In most cases, the Docker images that make up your app are either public images pulled from [Docker Hub](https://hub.docker.com/) or custom images that are built from your codebase. In some cases, however, you might want to pull an image from a private registry.

For example, you might have a private fork of a popular image – like [postgres](https://hub.docker.com/_/postgres/) – in your Docker Hub account. You can specify this image in `docker-compose.yml` so that your app will use it:

    database:
      image: yourname/postgres

But when you try to deploy, Convox will return an error:

    $ convox deploy
    Deploying yourapp
    Creating tarball... OK
    Uploading... OK
    RUNNING: docker pull yourname/postgres
    Pulling repository docker.io/yourname/postgres
    time="2016-01-29T21:22:15Z" level=fatal msg="Error: image yourname/postgres:latest not found"
    ERROR: exit status 1

## Adding a registry

To fix this, give Convox the necessary server and credentials info via the `convox registries add` command:

Continuing with our Docker Hub example, the command would be:

    $ convox registries add https://index.docker.io/v1/
    Username: yourname
    Password:
    Done.

You will be prompted for your username and password. Once the registry has been added, you can now pull private images:

    $ convox deploy
    Deploying test
    Creating tarball... OK
    Uploading... OK
    RUNNING: docker pull yourname/postgres
    latest: Pulling from yourname/postgres

## Removing a registry

To remove private registry info, use the `convox registries remove` command. To remove Docker Hub in our example the command would be:

    $ convox registries remove https://index.docker.io/v1/
    Done.
