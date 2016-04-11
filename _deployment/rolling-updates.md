---
title: "Rolling Updates"
order: 400
---

When a Release is promoted for an application it will be gracefully rolled into production using the following steps for each process type on your application:

#### Starting a new process

* A new Process will be started on the desired Release.
* If the Process [exposes ports](/docs/port-mapping) it will be added to the appropriate load balancer.

#### Health check

* If the Process exposes ports Convox will attempt to open a successful connection to the Process.
* If the Process does not expose ports it will be assumed healthy once started.

#### Stopping an old process

* One Process running the previous Release will be stopped.

#### Repeat

* These steps will be repeated until the application is running entirely on the new Release.
