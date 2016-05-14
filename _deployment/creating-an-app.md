---
title: "Creating an application"
order: 150
---

An ECS service is created for your [application](/docs/preparing-an-application). 

## CLI

* Go to the directory that contains your application.
* Run `convox switch <org>/<rack>` to select the Rack that contains the application to deploy.
* Run `convox apps create --help` to see the available command line options.
* Run `convox apps create --app <appname>` to create the application
* Run `convox apps` to list the current apps in the Rack
