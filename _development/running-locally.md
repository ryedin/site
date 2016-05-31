---
title: "Running Locally"
order: 200
---

Convox can boot your application locally using Docker in an environment identical to production.

## Installing Docker

#### OS X

Install the [Docker Toolbox](https://www.docker.com/products/docker-toolbox) to get a local Docker environment.

#### Linux

Install Docker from your application's default package manager.

## Starting the Application

#### convox start

Use `convox start` to build and run your application locally.

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

## Code sync

By default `convox start` will synchronize code between your local filesystem and the container filesystem. Any files or directories that appear in a `COPY` or `ADD` directive in your `Dockerfile` will be synced. This enables local changes to be reflected in the container without a restart. It also enables changes made in the container, such as dynamic code generation, to be synced back to the local filesystem where they can be committed to version control.

If you don't want code sync you can disable it by passing the `--sync=false` option to `convox start`.

## Data persistence

If your app uses a database, you'll find it useful to run a database container locally for development. To persist data for that container between starts, you can use Docker volumes to mount a host directory to the container's data directory. For example, if you're using the `convox/postgres` image, you can persist your data like this:

```yaml
database:
  image: convox/postgres
  ports:
    - 5432
  volumes:
    - /var/lib/example/postgres:/var/lib/postgresql/data
```

It's a good idea to use a host directory outside of the application directory for your data. This ensures your Docker volume won't have unwanted interactions with convox start's built in code syncing. On Linux and Mac the `/var/lib` directory is a good place for this.
