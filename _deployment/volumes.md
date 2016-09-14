---
title: "Volumes"
order: 600
---

You can use volumes to share data between Processes of the same type. This is useful for applications like Wordpress or Jenkins that need to persist data to the filesystem.

## Shared Filesystem

Convox uses a network filesystem backed by EFS that is shared among all of the instances in your Rack. You can use this in conjunction with volume directives to persist files across restarts and to share data between Processes of the same type.

## Sharing Data

You can mount a shared volume by specifying an entry in the `volumes:` section of your `docker-compose.yml`: 

```
services:
  web:
    volumes:
      - /my/shared/data
```

<div class="block-callout block-show-callout type-info" markdown="1">
You can also specify the volume in the `host:container` format, e.g. `/foo:/my/container/path`.
</div>

## Persistence

When your `docker-compose.yml` declares a volume with the single-path format, the volume will be persisted across container runs of the same process type. The path where these volumes persist differs depending on whether you are running your apps locally or deployed in a Rack.

### Persistence for local containers

Local apps running via `convox start` mount their volumes from the local file system. More specifically, the volumes are persisted at `~/.convox/volumes/`.

The path structure looks like this:

```
~/.convox/volumes/<app-name>/<service-name>/<container-path>
~/.convox/volumes/example-app/web/my/shared/data
```

### Persistence for deployed containers

Deployed apps running in a Rack mount their volumes from the file system of EC2 instances in the Convox cluster. More specifically, the volumes are persisted at `/volumes/` on the EC2 instances, which have mounted that volume from EFS to share it across the cluster. Going back in the other direction, the persisted volume is mounted from EFS to cluster instances, and then from those cluster instances into the relevant containers.

The path structure looks like this:

```
/volumes/<rack-name>-<app-name>/<service-name>/<container-path>
/volumes/production-example-app/web/my/shared/data
```

## Example: WordPress

[WordPress](https://wordpress.com/) is a popular PHP blogging platform. It expects a persistent filesystem for storing themes, plugins, and media uploads. You can persist this data by specifying a shared volume at `/var/www/html`:

```
services:
  web:
    image: wordpress:4.5.2-apache
    ports:
      - 80:80
    volumes:
      - /var/www/html
```

This configuration will work with both `convox start` and `convox deploy`. Files written to `/var/www/html` will be persisted and shared between Processes of the same type.
