---
title: "Scaling"
order: 800
---

Convox allows you to scale your application's concurrency, memory allocation, and the resources available in the underlying Rack.

### Scaling an application

#### Concurrency

```
$ convox scale web --count=4
NAME  DESIRED  RUNNING  MEMORY
web   2        1        256
```

#### Memory

```
$ convox scale web --memory=1024
NAME  DESIRED  RUNNING  MEMORY
web   2        1        1024
```

#### Scaling down unused services

Sometimes you want to run a service like redis in a container locally, but when you've deployed to your production rack, you have an external data store like ElastiCache or RDS. In this case, you can scale redis down and destroy the ELB which was created:

```
$ convox scale redis --count=-1
NAME  DESIRED  RUNNING  MEMORY
redis   -1        1        256
```

Note: If you scale this service back up, the ELB will be recreated, but will have a different domain name associated with it. If you want to scale a service down, but keep the ELB, you can set `--count=0`.

### Scaling the Rack

You can define both the type and count of instances being run in your Rack.

```
$ convox rack scale --type=m4.xlarge --count=3
Name     demo
Status   updating
Version  20160409181028
Count    3
Type     m4.xlarge
```

#### Autoscale

Your Rack can scale its own instance count based on the needs of the containers it provisions. To use this command, set the `Autoscale` parameter:

```
$ convox rack params set Autoscale=Yes
```
