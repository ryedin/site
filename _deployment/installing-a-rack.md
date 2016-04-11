---
title: "Installing a Rack"
order: 100
---

In order to install a Rack into your AWS account you will first need to create temporary AWS credentials. See [Creating an IAM User](/docs/creating-an-iam-user) for instructions.

<div class="block-callout block-show-callout type-info" markdown="1">
Installation will take approximately 10 minutes to complete.
</div>

## Installing from Console

* Choose the desired Organization from the dropdown in the top navigation.
* Click **Add a Rack** and then **Install New Rack**
* Choose a name for your Rack and select the desired AWS region.
* Enter your AWS credentials
* Click **Install Convox**

## Installing from the CLI

* Run `convox install --help` to see the available command line options.
* Run `convox install` with your desired options to begin the installation.
