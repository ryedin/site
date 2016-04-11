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