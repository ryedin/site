---
title: Proxy to remote resources
order: 200
---

It's often useful to be able to interact with remote services or resources (e.g. databases) during local development. However, access to those remote services is often rightly restricted to traffic coming from the application itself, rather than from the internet.

In these cases, `convox proxy` and `convox resources proxy` can help by proxying traffic from your local development machine to your app's services via your Rack.

## Access external resources with `convox resources proxy`

When possible, [resources](/docs/about-resources/) are generally configured so they are not accessible from the public internet.  You can get proxy access with the `convox resources proxy` command, e.g.:

```
$ convox resources proxy mysql-4624
```

Under the hood, this creates an HTTP websocket tunnel through your Rack process that talks to your database via a socket on your local machine. In other words, `convox resources proxy` allows you to communicate with your Postgres database (for example) as if it were running on your own machine.


## Access private services with `convox proxy`

`convox proxy` works much the same way as `convox resources proxy` except for internal services (i.e. exposed behind an internal ELB inside a VPC) rather than [external resources](/docs/about-resources).

Note that you can also access services via [`convox exec`](/docs/debugging/#convox-exec).
