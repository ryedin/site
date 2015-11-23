---
title: "Other Languages"
---

Convox supports any language or framework that can be run in a Docker container, so adding support for your language is primarily an exercise in writing a good Dockerfile. This guide will walk you through the high-level steps of writing a Dockerfile for any language.

## Start with an official image

Start with the official Docker image for your language/framework if it exists. All of the popular ecosystems such as [Go](https://hub.docker.com/_/golang/), [Ruby](https://hub.docker.com/_/ruby/), [Rails](https://hub.docker.com/_/rails/), [Python](https://hub.docker.com/_/python/), and [Node](https://hub.docker.com/_/node/) have official Dockerfiles on [Docker Hub](https://hub.docker.com). Many niche langages such as [Rust](https://hub.docker.com/r/schickling/rust/), [Haskell](https://hub.docker.com/_/haskell/), and [Elixir](https://hub.docker.com/r/nifty/elixir/) also have official or community-supported images.

If no good Dockerfile for your ecosystem exists we recommend starting with the official [Ubuntu](https://hub.docker.com/_/ubuntu/) image and installing the necessary tools yourself.

Reference the image in the FROM directive in the first line of the Dockerfile you're writing.

Example:

    FROM golang:1.5

<div class="block-callout block-show-callout type-info">
  <h3>Onbuild images</h3>
  <p>Many languages offer "onbuild" variants of their official Docker images. These use ONBUILD directives to trigger common tasks in downstream Dockerfiles that inherit from them. While these will work with Convox and can be very convenient to get started, we generally recommend against them, because they result in suboptimal caching behavior which can lead to consistently long build times.</p>
</div>

## Install system dependencies

Most official images will already install any system-level dependencies that are needed. For example, the Ruby image comes with rubygems and bundler already installed.

Install any missing system dependencies using a RUN directive in your Dockerfile. If the image you started from is based on Ubuntu, you can use the `apt-get` tool to install these.

You can also install any system dependencies specifically needed by your app (such as ImageMagick) at this point.

Example:

    RUN apt-get -y update
    RUN apt-get -y install imagemagick --fix-missing

## Copy app code into app directory

The next step is to copy your app code into the Docker image. This can be achieved using the Docker COPY directive. Choose a sensible directory name for this.

Example:

    COPY . /app

This will copy everything in your current directory into the /app directory of the Docker image.

## Set the WORKDIR

From this point forward you'll be operating on the directory in the Docker image that you just copied your files into. To make this easier, set the working directory using Docker's WORKDIR directive:

Example:

    WORKDIR /app

## Build your app

Now we're ready to actually build the app. If you're familiar with [12 factor app](http://12factor.net/) terminology, this corresponds to the [build stage](http://12factor.net/build-release-run). There are 2 main objectives you likely want to accomplish here: resolving app dependencies, and building/publishing static assets. Every ecosystem has its own toolchain for this kind of thing.

For example, in a Rails app, you might run Bundler and execute the asset pipeline:

    RUN bundle install
    RUN rake assets:precompile

You can test building your app image by running `docker build .` at the same directory level as your Dockerfile.

## Compose containers

Once you're successfully building your app image, the next step is to describe how the images that make up your app will be run as containers. You do this using a `docker-compose.yml` file. For more information about how this file works, see "The Manifest(s) (continued) section of [Developing Locally](/docs/developing-locally).

## Boot your app locally

Now that your `Dockerfile` and `docker-compose.yml` are written, try booting your app with the command `convox start`. A properly configured app should boot locally and be available at the specified ports on your Docker host IP.

## Deploy to your Convox Rack

An app that boots locally should boot without error when deployed to a Rack. Follow the [deployment guide](/docs/deploying-to-convox/) to for more info.

## Documentation

When you've perfected your Docker image, please consider sharing what you've learned with the Convox community by submitting a "Getting Started with <language>" guide to the [docs repo](https://github.com/convox/convox.github.io) via pull request.

Add a Markdown file to the `_languages_and_frameworks` directory. A good getting started guide covers the following topics:

- Creating the app
- Writing a `Dockerfile`
- Writing a `docker-compose.yml` file
- Configuring dependencies
- Booting the app localy
- Deploying the app to a Convox Rack

The Convox staff is happy to help you work through these sections and publish a doc that will be of value to the whole community. Please don't hesitate to [ask](https://invite.convox.com).
