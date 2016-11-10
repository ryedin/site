---
title: Rack
permalink: /guide/rack/
phase: deploy
---

## What is Rack?

A Rack is secure cloud environment. It is a collection of a VPC, VM and Container cloud services that are configured to run your app images and services.

It's a self-contained, network-isolated cluster of computing resources that represent the best security, reliability, and maintenance properties available.

Convox installs a rack into your AWS account, then helps you manage it via the `convox` CLI and web console. You can deploy one or more applications to a Rack.

You don't have to worry about the underlying infrastructure, but if you do look under the hood, you'll find a simple open-source system that packages up the best practices of cloud infrastructure management.

You can find more detailed information in [our documentation](https://convox.com/docs/rack/).

## Why would you want to use Rack?

Deploying an application on AWS requires quite a few moving parts. Rack is our attempt to abstract these components into a cohesive, reliable whole that works for most applications.

A Rack enables you to deploy and run your app in the cloud in a way that is secure and scalable.

Since all Rack components are installed in your own AWS account, you can always add extras if needed.

## Installing a rack

You can install a Rack from the [web console](https://console.convox.com/) or the `convox` CLI.

Provisioning a Rack requires AWS credentials with sufficient IAM permissions. You may optionally specify a region other than the default of `us-east-1` by exporting the `AWS_DEFAULT_REGION` or `AWS_REGION` environment variables or using the `--region` flag:

<pre class="terminal">
<span class="command">convox install --region=us-east-1</span>
...

Success. Try `convox apps`.
</pre>

This will take approximately 10 minutes while AWS configures all the cloud services in your Rack.

For details, see [installing a Rack](https://convox.com/docs/installing-a-rack/) in the Convox docs.

## How do I start using a Rack?

Once you've installed a Rack, navigate to the directory that contains your application.

Type `convox switch <org>/<rack>` to select the Rack that contains the application.

## How do I update a Rack?

You can update your Rack by running `convox rack update`.

## What commands do I need to run to use a Rack with the example app?

### `convox doctor`

We haven't implemented any deploy checks in `doctor` yet, so there's nothing to see here for now.

## How do I uninstall a Rack?

You can uninstall a rack by running `convox uninstall`:

```
$ convox uninstall <stack-name> <region> [credentials.csv]
```

<!--
TODO: Add 'convox uninstall' output.
-->
