---
title: "Deploying to Convox"
order: 200
---

You have a few options for building and deploying your applications to Convox.

## Automatic Builds

You can easily configure [Console](https://console.convox.com) to build and deploy your application when changes are pushed to your main repository.

* Choose your desired Organization.
* Click on the **Integrations** tab and ensure that your Organization is linked to a GitHub or GitLab account.
* Click on **Racks** and again on the Rack that contains the application you would like automatically deploy.
* Click the **Link** button next to the application.
* Configure the settings for this automated build and click **Link**.

## CLI

* Go to the directory that contains your application.
* Type `convox switch <org>/<rack>` to select the Rack that contains the application to deploy.
* Type `convox deploy --app <appname>`
