---
title: "About resources"
---

## What is a resource?

Resources behave a lot like services, but are external to your application and which your application communicates with over a network.

## Resource Creation

You can create resources using the `convox services create` command.

This will provision the appropriate AWS service and associate it with your active Convox Rack.

Creation can take up to 15 minutes. To check the status, use `convox services info`. You can also view the resource in the appropriate section of your AWS console (RDS for postgres and mysql, etc).

For advanced creation options, see the documentation for the specific resource type in the sidebar on the left.


## Resource Status and Information

To see relevant info about a resource, use the `convox resources info` command:

    $ convox resources info memcached-5864
    Name    memcached-5864
    Status  running
    Exports
      URL: dev-ca-m3z4ik3n7bej.77prpt.cfg.use1.cache.amazonaws.com:11211

## Accessing the resource 

### Via AWS console

You can view AWS resources in your AWS console. For example, mysql resources are visible in your [RDS Console](https://console.aws.amazon.com/rds/home).

If you don't see what you expect, check that the correct geographic region is active.

### Via proxy

Resources are configured so they are not accessible from the public internet.  You can get proxy access with the `convox resources proxy` command, e.g.:

```
$ convox resources proxy mysql-4624
```

### Resource credentials

You can get the RDS credentials with `convox resources info <resource name>`.
The username and password are contained in `MYSQL_URL`:

```
URL: mysql://app:672ffd60a4eb323gf238ff28508f95@dev-mysql-4624.caujtavicybf.us-east-1.rds.amazonaws.com:3306/app
                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                ^^^^^^^^^^^^
```

## Linking the resource to your app

TODO

### Via environment variables

You can add this URL as an environment variable to any application with `convox env set`:

    $ convox env set MEMCACHED_URL='dev-ca-m3z4ik3n7bej.77prpt.cfg.use1.cache.amazonaws.com:11211' --app example-app

## Resource Deletion

To delete a resource, use the `convox resources delete` command:

    $ convox resources delete memcached-5864
    Deleting memcached-5864... DELETING

Deleting the resource will take several minutes.

<div class="block-callout block-show-callout type-warning" markdown="1">
This action will cause an unrecoverable loss of data.
</div>

