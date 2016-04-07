---
title: "Running Locally"
order: 200
---

## Background

Most production servers run Linux but a large majority of professional developers prefer to work on a Mac, or on Windows. While it is possible to work on most modern programming languages in any operating system, this discrepancy can lead to subtle bugs that are not noticed until an application reaches production.

Linux containers solve many of these issues, allowing us to fully specify a working artifact and then run it easily on both your local development machine and production. Convox uses containers under the hood to ensure that your development environment is identical to production.

We believe a development environment should have these properties:

#### Declarative

Your application's structure and environment should be fully enumerated in a manifest of some kind.

#### Exhaustive

Any changes from the default environment should be fully specified. Anything not specified should not be available to the running system.

#### Reproducible

Deterministic builds, common runtimes, and explicit environments ensure that code running succesfully in development will also run successfully and predictably in production.

## Manifests

Convox infers information about your application from two files:

#### Dockerfile

This file documents the steps necessary to build your application into an executable artifact.

#### docker-compose.yml

This file describes the structure of your application and how the pieces connect to each other.

## CLI

#### convox init

As mentioned above, Convox apps can use a `Dockerfile` and `docker-compose.yml` to describe how to build and run your application.

If you do not yet have these files the `convox init` command will inspect your application and attempt to generate them for you.

#### convox start

Convox supports a [Docker][docker]-based local development workflow via the `convox start`
[CLI][cli] command.

`convox start` builds and runs your application locally.

    $ cd ~/example-app
    $ convox start
    RUNNING: docker build -t knexsfvjdc ~/example-app
    Sending build context to Docker daemon 8.192 kB
    Step 0 : FROM ruby:2.2.2
     ---> 9664620d4c2a
    Step 1 : EXPOSE 3000
     ---> Running in d2894bf8d64b
    ...
    web    | docker run -i --name example-app-web -p 5000:3000 procfile/web sh -c ruby web.rb
    web    | [2015-09-18 06:16:53] INFO  WEBrick 1.3.1
    web    | [2015-09-18 06:16:53] INFO  ruby 2.2.2 (2015-04-13) [x86_64-linux]
    web    | == Sinatra (v1.4.6) has taken the stage on 3000 for development with backup from WEBrick
    web    | [2015-09-18 06:16:53] INFO  WEBrick::HTTPServer#start: pid=7 port=3000

To exit `convox start` press `Ctrl+C`.

`convox start` gives you fast setup and teardown and an environment identical to production with a single command.

## Manifests (continued)

Let's take a look at the manifest, the build instructions, and the environment
and how they interact in the context of the [Convox Sinatra Example](https://github.com/convox-examples/sinatra).

#### docker-compose.yml

The `docker-compose.yml` looks like this:

    web:
      build: .
      command: bin/web
      environment:
        - MYSERVICE_API_KEY
        - RACK_ENV=development
      ports:
        - 3000:3000
      links:
        - postgres
        - redis
    worker:
      build: .
      command: bin/worker
      environment:
        - RACK_ENV=development
      links:
        - postgres
        - redis
    redis:
      image: convox/redis
    postgres:
      image: convox/postgres


Each top level key defines the processes necessary to run your application.

This particular manifest describes four processes: `web`, `worker`, `postgres`, and `redis`.

The `postgres` and `redis` processes are defined as images. These will be pulled from [Docker Hub][docker-hub] as necessary.

The `web` and `worker` processes have a `build` key which instructs `convox start` to build an image using the `Dockerfile` in the specified directory.

The `environment` key declares environment variables for this process. Defaults can be specified. Any variable with no value (such as `MYSERVICE_API_KEY`) must be declared in your local environment to start the application succesfully (see the section on `.env` below for more details)

The `ports` key declares the ports that a process wishes to expose to traffic. These ports are defined in pairs, the externally facing port and the port on which the process is listening.

The `links` key defines dependencies on other processes named in this file. `convox start` sets environment variables so that a process can find its links. See [Linking][linking] for more details.

#### Dockerfile

    FROM gliderlabs/alpine:3.2

    RUN apk-install ruby ruby-bundler ruby-io-console ruby-kgio ruby-pg ruby-raindrops ruby-unicorn

    WORKDIR /app

    # cache bundler
    COPY Gemfile /app/Gemfile
    COPY Gemfile.lock /app/Gemfile.lock
    RUN bundle install

    # copy the rest of the app
    COPY . /app

    ENTRYPOINT ["bundle", "exec"]
    CMD ["bin", "web"]

It describes the steps you need to build and run a unix process.

The `FROM` declaration specifies the base image. It is most common to start with a minimal operating system like `gliderlabs/alpine` or a language-specific image such as `rails`.

`COPY` (and `ADD`, not shown here) commands move files from the local directory into the image. 

`RUN` executes the given command in the context of the image.

`ENTRYPOINT` and `CMD` control the default command that is executed via `docker run`. `ENTRYPOINT` will be prepended to any command run on this image. `CMD` is the default command to run.

For more information on how to write Dockerfiles, see the [Docker user guide][docker-ug] and the [Dockerfile reference][dockerfile-ref].

#### .env

You can specify the local environment for your application by specifying values in a file name `.env`

    MYSERVICE_API_KEY=foobarbazqux

<div class="block-callout block-show-callout type-warning" markdown="1">
Make sure you add the `.env` file to your `.gitignore` and `.dockerignore` files so that its secrets are not accidentally published.
</div>

[cli]: /docs/getting-started
[docker]: https://docs.docker.com/installation/
[compose]: https://docs.docker.com/compose/
[foreman]: https://github.com/ddollar/foreman
[docker-run]: https://docs.docker.com/docker/
[docker-hub]: https://hub.docker.com/
[compose-conf]: https://docs.docker.com/compose/yml
[dockerfile-ref]: http://docs.docker.com/reference/builder/
[docker-ug]: https://docs.docker.com/userguide/dockerimages/#building-an-image-from-a-dockerfile
[dev-prod]: http://12factor.net/dev-prod-parity
[12fac-oneoff]: http://12factor.net/admin-processes
[docker-links]: https://docs.docker.com/userguide/dockerlinks/
[rack-github]: https://github.com/convox/rack
[issues-github]: https://github.com/convox/convox.github.io/issues/new
