---
title: "Installing a Rack"
order: 100
---

A [Rack](/docs/rack) is installed into your AWS account to manage your infrastructure and provision applications.

<div class="block-callout block-show-callout type-info" markdown="1">
In order to install a Rack you will first need to create temporary AWS credentials. Check out the [IAM policy](/docs/iam-policy) for instructions on setting up the necessary permissions.
</div>

Once launched, installation will take approximately 10 minutes to complete.

## Installing from Console

This is the recommended method for installing a Rack.

* Browse to the [Convox Console](https://console.convox.com/).
* Choose the desired Organization from the dropdown in the top navigation.
* Click **Add a Rack** and then **Install New Rack**.
* Choose a name for your Rack, and select the desired AWS region.
  - See [Supported AWS Regions](/docs/supported-aws-regions) for list of regions currently supported.
* Enter your AWS credentials.
* Click **Install Convox**.

## Installing from the CLI

Run `convox install --help` to see the available command line options.

<div class="block-callout block-show-callout type-info" markdown="1">
Note: Running `convox install` automatically logs you into the newly created Rack.
</div>

To install a Rack via the CLI, run `convox install` with your desired options:

<pre class="terminal">
<span class="command">convox install</span>
...

Success. Try `convox apps`.
</pre>

### Options

#### Installing in a specific region

You may optionally specify a region other than the default of `us-east-1` by exporting the `AWS_DEFAULT_REGION` or `AWS_REGION` environment variables or using the `--region` flag:

<pre class="terminal">
<span class="command">convox install --region=us-east-1</span>
...

Success. Try `convox apps`.
</pre>


## Installing into an existing VPC

See our [VPC doc](/docs/vpc-configurations#installing-into-an-existing-vpc) for more information.


## How do I uninstall a Rack?

You can uninstall a Rack by running `convox uninstall`:

```
$ convox uninstall <stack-name> <region> [credentials.csv]
```

<div class="block-callout block-show-callout type-info" markdown="1">
`stack-name` will correspond to the name of the Rack as shown in `convox rack`:

```
$ convox rack --rack personal/example
Name     example
Status   running
Version  20161102160040
Region   us-east-1
Count    3
Type     t2.small

```
</div>

For more details on uninstall a Rack, see [Uninstalling Convox](https://convox.com/docs/uninstalling-convox/).
