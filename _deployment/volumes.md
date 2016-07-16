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
web:
  volumes:
    - /my/shared/data
```

<div class="block-callout block-show-callout type-info" markdown="1">
You can also specify the volume in the `host:container` format, e.g. `/foo:/my/container/path`.
</div>

## Example: WordPress

[WordPress](https://wordpress.com/) is a popular PHP blogging platform. It expects a persistent filesystem for storing themes, plugins, and media uploads. You can persist this data by specifying a shared volume at `/var/www/html`:

```
web:
  image: wordpress:4.5.2-apache
  ports:
    - 80:80
  volumes:
    - /var/www/html
```

This configuration will work with both `convox start` and `convox deploy`. Files written to `/var/www/html` will be persisted and shared between Processes of the same type.
