---
title: "Uninstalling Convox"
---

At any time you can easily remove your Convox Apps, Racks and all the related AWS resources. In order to uninstall a Rack you will first need to create temporary AWS credentials. See [Creating an IAM User](/docs/creating-an-iam-user/) for instructions.

<div class="block-callout block-show-callout type-info" markdown="1">
Uninstall will take approximately 10 minutes to complete.
</div>

## Delete Services

First delete any services you may have created:

    $ convox services
    NAME             TYPE        STATUS
    convox-events    webhook     running
    postgres-7943    postgres    running
    redis-2611       redis       running

    $ convox services delete convox-events
    Deleting mysql-3785... DELETING

    $ convox services delete postgres-7943
    Deleting postgres-7943... DELETING

    $ convox services delete redis-2611
    Deleting redis-2611... DELETING

<div class="block-callout block-show-callout type-warning" markdown="1">
These actions can cause an unrecoverable loss of data.
</div>

## Delete Apps

Next delete any apps you may have created:

    $ convox apps
    APP    STATUS
    rails  running

    $ convox apps delete rails
    Deleting rails... DELETING

<div class="block-callout block-show-callout type-warning" markdown="1">
These actions will cause an unrecoverable loss of data like app images, environment variables, and resources load balancers and their hostnames.
</div>

## Uninstalling Rack from the CLI

Finally you can delete the Rack. This will prompt you for temporary AWS credentials:

    $ convox rack
    Name     staging
    Status   running
    Version  20160507151256
    Region   us-east-1
    Count    3
    Type     t2.medium

    $ convox uninstall --stack-name=staging --region=us-east-1
    AWS Access Key ID:
    AWS Secret Access Key:

    Uninstalling Convox...
    ...
    Successfully uninstalled.

<div class="block-callout block-show-callout type-warning" markdown="1">
This action will cause an unrecoverable loss of data like build and release info.
</div>