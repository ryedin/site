---
title: "Automate"
permalink: /guide/automate/
---

## Setting up a workflow for automatic deployment

Let's say we want to deploy an updated version of our app automatically each time we push to the master branch of our [GitHub repo](https://github.com/convox-examples/convox-guide/).

In [Console](https://console.convox.com/), click the Workflows tab. Click the "Create Workflow" button to get started.

![](/assets/images/docs/workflows/tab.png)

Give the Workflow a unique, recognizable name.


## Auto-scaling

Your Rack can scale its own instance count based on the needs of the containers it provisions. To use this command, set the `Autoscale` parameter:

  $ convox rack params set Autoscale=Yes

## Further reading

- [Scaling](/docs/scaling) in the Convox documentation
- [Workflows](/docs/workflows/) in the Convox documentation
