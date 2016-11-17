---
title: "Automate"
permalink: /guide/automate/
---

You've built an image based on the app you've created. You've deployed that app image and set up an external resource for it to interact with.

In continuing with this image-centric pattern, our next goal is to automate some tasks to be performed on that image.

## Console

Our goal is to trigger a variety of actions by, for example, pushing to the master branch of a GitHub or BitBucket repo.

This is useful for automating various steps in your delivery pipeline, such as:

- triggering a build of an image
- running tests against the image
- promote the image to staging or production

## Webhooks and integrations

You can set up your app to deploy automatically when you push to a specific branch on GitHub or BitBucket, or subscribe to Slack notifications for app events.

For this, you'll need to authorize the relevant third-party applications in the `Integrations` tab of the [Console](https://console.convox.com/).

For details, see the [Webhooks](/docs/webhooks/) documentation.


## Workflows

With workflows, you can automatically build images, port them between racks, run tests and deploy applications based on events such as pull requests and code merges.

Let's say we want to deploy an updated version of our app automatically each time we push to the master branch of our [GitHub repo](https://github.com/convox-examples/convox-guide/).

In [Console](https://console.convox.com/), click the Workflows tab. Click the "Create Workflow" button to get started.

![](/assets/images/docs/workflows/tab.png)

For more information, see the [Workflows](/docs/workflows/) documentation.


## Autoscaling

Your Rack can scale its own instance count based on the needs of the containers it provisions. To use this command, set the `Autoscale` parameter:

    $ convox rack params set Autoscale=Yes

For more information about scaling, see the [Scaling](/docs/scaling) documentation.


## Health checks

See the [Health Checks](/docs/load-balancers/#health-check-options) documentation.


## Scheduled tasks

Convox can set up cron-like recurring tasks on any of your application processes. For details, see the [scheduled tasks](/docs/scheduled-tasks/) documentation.


## Further reading

- [Convox Console](/docs/console/) documentation

