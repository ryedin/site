---
title: "Builds"
order: 250
---

A Build artifact is created when you deploy or build your application.

## Creating a Build

You can simply build your application by running `convox build` from the top-level directory:

```
$ convox build
```

When you run this command the following steps are executed:

- The Convox CLI builds a tarball from all the files in your project (except the ones specified in `.dockerignore`)
- The CLI uploads the tarball to your Rack
- The Rack extracts the tarball and reads `docker-compose.yml`
- Docker images are built or pulled as specified by `docker-compose.yml`
- The images are tagged and pushed into your Rack's private Amazon ECR registry
- Build metadata is saved to the Rack
- A new [release](/docs/releases) is created from the build and its metadata is saved too

The newly created release will not be promoted (made active) until you run `convox releases promote <release ID>`.

If you'd like to build your app and promote the release in a single step, you can run `convox deploy` rather than `convox build`.

## Inspecting Builds

Run `convox builds` to see a list of builds for your application.

Run `convox builds info <build ID>` to see the logs for a particular build.

## Automatic Builds

You can configure Convox Console to automatically build or deploy your app when it detects changes to your code repo. See [Deploying to Convox](/docs/deploying-to-convox) for more info.

## Moving Builds

It's possible to export a build from one app and import it to another app, even if the apps are on different Racks.

To move a build, first export it:

```
$ convox builds export <build ID> -a <appname> > build.tgz
```

You can then import the build into another app, even on a different Rack:

```
convox builds import -a <appname> < build.tgz
```

You can even pipe these commands together directly:

```
$ convox builds export <build ID> -a <app1> --rack <rack1> | convox builds import -a <app2> --rack <rack2>
```
