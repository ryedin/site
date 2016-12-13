---
title: Building a Heroku App with Docker
permalink: /guide/heroku/docker/
---

There are two strategies for building an Heroku app with Docker tools.

The preferred method is to [write a Dockerfile from scratch](/guide/heroku#dependencies). Migrating an app to a standard Ubuntu image, and simple directives to install system and language dependencies will make it very easy to maintain going forward.

However, some apps may depend on properties of the Heroku runtime and buildpacks. In this case you can use a `heroku/cedar` base image that matches the Heroku runtime and run the buildpacks directly:

```Dockerfile
FROM heroku/cedar

RUN cd /tmp && git clone https://github.com/heroku/heroku-buildpack-python

WORKDIR /app

COPY . /app

RUN /tmp/heroku-buildpack-python/bin/compile /app /tmp/cache
```

With this approach there are some buildpack behaviors to be aware of:

* Vendoring everything under `/app`
* [Transforming and/or "Monkey patching" the app code](https://devcenter.heroku.com/articles/buildpack-api#bin-compile)
* [Caching build artifacts](https://devcenter.heroku.com/articles/buildpack-api#caching)
* Setting addition environment through [profile scripts](https://devcenter.heroku.com/articles/buildpack-api#profile-d-scripts)
* [Running multiple buildpacks](https://devcenter.heroku.com/articles/buildpack-api#composing-multiple-buildpacks)
