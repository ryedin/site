---
title: "Volumes"
order: 600
---

You can mount volumes from the host instance into your application Processes.

## Shared Filesystem

Convox creates a network filesystem that is shared among all of the instances in your Rack. It is mounted at `/volumes` on each instance. You can use this with [Docker host volume mounting](https://docs.docker.com/v1.11/engine/userguide/containers/dockervolumes/#mount-a-host-directory-as-a-data-volume) to persist files in your Processes across restarts and to share files between Processes.

## Example: WordPress

[WordPress](https://wordpress.com/) is a popular PHP blogging platform. It expects a persistent filesystem for storing themes, plugins, and media uploads. Unfortunately, Rack Processes are stateless and disposable by default.

To work around this, you can persist files on the instance network filesystem and mount them into the Process as shown in the following example `docker-compose.yml`.

```
web:
  image: wordpress:4.5.2-apache
  ports:
    - 80:80
  volumes:
    - /volumes/wordpress:/var/www/html
```

Now, any files that are written to `/var/www/html` in the container will be persisted in `/volumes/wordpress` on all Rack instances.
