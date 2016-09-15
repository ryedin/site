---
title: "Memcached"
---

## Service Creation

You can create Memcached instances using the `convox services create` command:

    $ convox services create memcached
    Creating memcached-5864 (memcached)... CREATING

This will provision Memcached on Amazon ElastiCache. Creation can take a few minutes. To check the status use `convox services info <service-name>`.

### Additional Options

| Option                            | Description                                         |
| --------------------------------- | --------------------------------------------------- |
| `--instance-type=<instance.type>` | Elasticache instance type\* to use                  |
| `--name=<name>`                   | Name of the service to create                       |
| `--num-cache-nodes=<n>`           | Number of cache nodes the cache cluster should have |
| `--private`                       | Create in private subnets                           |

\* See [Available Elasticache node types](https://aws.amazon.com/elasticache/details/#Available_Cache_Node_Types)

## Service Information

To see relevant info about the Memcached instance, use the `convox services info` command:

    $ convox services info memcached-5864
    Name    memcached-5864
    Status  running
    Exports
      URL: dev-ca-m3z4ik3n7bej.77prpt.cfg.use1.cache.amazonaws.com:11211

## Service Linking

You can add this URL as an environment variable to any application with `convox env set`:

    $ convox env set MEMCACHED_URL='dev-ca-m3z4ik3n7bej.77prpt.cfg.use1.cache.amazonaws.com:11211' --app example-app

## Service Deletion

To delete the service, use the `convox services delete` command:

    $ convox services delete memcached-5864
    Deleting memcached-5864... DELETING

Deleting the service will take several minutes.

<div class="block-callout block-show-callout type-warning" markdown="1">
This action will cause an unrecoverable loss of data.
</div>
