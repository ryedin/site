---
title: "Deploying to Convox"
order: 200
---

You have a few options for building and deploying your applications to Convox.

## Automatic Builds

You can easily configure [Console](https://console.convox.com) to build and deploy your application when changes are pushed to your main repository. See [Workflows](/docs/workflows) for more information.

## CLI

* Go to the directory that contains your application.
* Type `convox switch <org>/<rack>` to select the Rack that contains the application to deploy.
* Type `convox deploy --app <appname>`
