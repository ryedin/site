---
title: "Rolling Updates"
order: 400
---

When a Release is promoted, new processes are gracefully rolled out into production.

If there are errors starting new processes, new processes are not verified as healthy, or the rollout doesn't complete in 10 minutes, an automatic rollback is performed.

The number of new processes started at a time is configurable so large apps can be fully rolled out in 10 minutes.

Rollouts and rollbacks do not cause any service downtime.

#### Rollout

A rollout coordinates starting new processes in a way that maintains service uptime and capacity. The basic flow is:

* Start 1 new process
* Verify new process is healthy
* Stop 1 old process
* Repeat for all processes in the formation

#### Automatic Rollback

If there are errors starting new processes, new processes are not verified as healthy, or the rollout doesn't complete in 10 minutes, an automatic rollback is performed. This will result in a `rollback` or `failed` state for the app:

```
$ convox apps info
Name       httpd
Status     rollback

$ convox apps info
Name       httpd
Status     failed
```

#### Health Checks

If the Process does not [expose ports](/docs/port-mapping) it is considered healthy if it starts and doesn't immediately exit or crash.

If the Process [exposes ports](/docs/port-mapping) is it considered healthy after it:

* Registers behind a load balancer
* Passes a network connection health check

Common causes for not passing health checks are:

* The cluster does not have sufficient memory or CPU resources available to start a new process
* The cluster does not have sufficient instances where a new process port is not already reserved by an older release
* A process crashes immediately after starting due to a problem in the latest code
* A process takes too long to initialize its server and therefore fails a network health check

#### Configuring Deployment Parameters

The health check URL and timeout can be configured for apps that take longer to boot:


```yaml
version: '2'
  services:
    web:
      labels:
        - convox.health.path=/_health
        - convox.health.port=5000
        - convox.health.timeout=3
      ports:
        - 443:5000
```

The number of new processes to start can be configured for apps that need to start many processes within the 10m timeout:

```yaml
version: '2'
  services:
    web:
      build: .
      image: convox/rails
      labels:
      	- convox.deployment.maximum=300
```

You can add extra Rack capacity to support the extra processes during rollout.

```bash
$ convox rack scale --count 10
```
