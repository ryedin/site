---
title: "Installing a Rack"
order: 100
---

A [Rack](/docs/rack) is installed into your AWS account to manage your infrastructure and provision applications. In order to install a Rack you will first need to create temporary AWS credentials. Check out the [IAM policy](/docs/iam-policy) for instructions on setting up the necessary permissions.

<div class="block-callout block-show-callout type-info" markdown="1">
Installation will take approximately 10 minutes to complete.
</div>

## Installing from Console

* Choose the desired Organization from the dropdown in the top navigation.
* Click **Add a Rack** and then **Install New Rack**.
* Choose a name for your Rack, and select the desired AWS region.
  - See [Supported AWS Regions](/docs/supported-aws-regions) for list of regions currently supported.
* Enter your AWS credentials.
* Click **Install Convox**.

## Installing from the CLI

* Run `convox install --help` to see the available command line options.
* Run `convox install` with your desired options to begin the installation.

## Installing into an existing VPC

By default, Convox Rack installations create a new VPC with subnets in two or three (when available) Availability Zones in your chosen AWS Region. If you'd like to install a Convox Rack into an existing VPC, we recommend allocating a /24 block subnet in each of three Availability Zones.

To install a Rack into an existing VPC, you'll need to provide the VPC ID and the CIDRs of the subnets into which Convox should be installed.

    convox install \
      --existing-vpc <VPC ID> \
      --vpc-cidr <VPC CIDR> \
      --subnet-cidrs <comma-separated CIDRs>

For example:

    convox install \
      --existing-vpc "vpc-abcd1234" \
      --vpc-cidr "10.0.0.0/16" \
      --subnet-cidrs "10.0.1.0/24,10.0.2.0/24,10.0.3.0/24"

### Finding the VPC ID and VPC CIDR

You can find your VPC ID and CIDR in the [AWS VPC console](https://console.aws.amazon.com/vpc). Navigate to "Your VPCs" and look in the "VPC ID" and "VPC CIDR" columns.

### Choosing suitable CIDR blocks

Your existing VPC has a CIDR block, and each of your existing subnets has its own CIDR block within that larger VPC block. From the remaining addresses in your VPC CIDR block, you'll need to create an additional subnet in each Availability Zone in which you'd like to run Convox instances. At the moment, Convox requires three subnets with /24 CIDR blocks to give your Convox installation 254 addresses per subnet—plenty of room for typical scaling needs.

Because [VPCs cannot be resized](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Subnets.html#VPC_Sizing), if your VPC does not have room for these three additional /24 CIDR blocks, you'll need to create a larger VPC and migrate your instances to it.

## Installing a private Rack into an existing VPC

Installing a private Rack into an existing VPC requires specifying a couple more options. You'll need to pass the `--private` option to `convox install` as well as a set of CIDRS for three private subnets using the `--private-cidrs` option. For example:

    convox install \
      --private \
      --existing-vpc "vpc-abcd1234" \
      --vpc-cidr "10.0.0.0/16" \
      --subnet-cidrs "10.0.1.0/24,10.0.2.0/24,10.0.3.0/24" \
      --private-cidrs "10.0.4.0/24,10.0.5.0/24,10.0.6.0/24"

Keep in mind that you will need to create six /24 CIDR block subnets: three public, and three private.
