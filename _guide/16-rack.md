---
title: Rack
permalink: /guide/rack/
phase: deploy
---

## What is Rack?

A rack is a cluster of EC2 instances across which your app processes run.

It's a self-contained, network-isolated cluster of computing resources that represent the best security, reliability, and maintenance properties available.

Convox installs a rack into your AWS account, then helps you manage itvia the `convox` CLI and web console. You can deploy one or more applications to a Rack.

You don't have to worry about the underlying infrastructure, but if you do look under the hood, you'll find a simple open-source system that packages up the best practices of cloud infrastructure management.

You can find more detailed information in [our documentation](https://convox.com/docs/rack/).

## Why would you want to use Rack?

Deploying an application on AWS requires quite a few moving parts. Rack is our attempt to abstract these components into a cohesive, reliable whole that works for most applications.

Since all Rack components are installed in your own AWS account, you can always add extras if needed.

## Installing a rack

You can install a Rack from the [web console](https://console.convox.com/) or the `convox` CLI.

For details, see [installing a Rack](https://convox.com/docs/installing-a-rack/) in the Convox docs.

## How do I start using a Rack?

Once you've installed a Rack, navigate to the directory that contains your application.

Type `convox switch <org>/<rack>` to select the Rack that contains the application.


## What commands do I need to run to use a Rack with the example app?

## `convox doctor`

We haven't implemented any deploy checks in `doctor` yet, so there's nothing to see here for now.
