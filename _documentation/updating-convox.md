---
title: "Updating Convox"
---

## 1. Update CLI

    $ convox update
    Updating: OK, 20150930010203

## 2. Update Rack

    $ convox rack update
    Name       convox
    Status     updating
    Version    20150930020304
    Count      3
    Type       t2.small

<div class="block-callout block-show-callout type-warning">
  <h3>Instance Replacement</h3>
  <p>Most updates restart the convox API process from a newer <a href="https://hub.docker.com/r/convox/api/">convox/api image</a>. However some updates are system changes that require all the EC2 instances in the Rack to be replaced. Convox executes this slowly -- one instance at a time -- to maintain app, Rack API and Registry availability. Depending on your Rack size, this update could take a significant amount of time.</p>
</div>

<div class="block-callout block-show-callout type-warning">
  <h3>Avoiding App Downtime</h3>
  <p>You must run at least two instances of any process that you wish to stay available during Rack updates that perform instance replacement. This is a best practice, since at any time a single instance could also go offline from unexpected hardware failure.</p>
</div>

## 3. Emergency AMI / Kernel Security Updates

Convox chooses recommended AMIs and a Linux kernel version by following the [ECS-Optimized AMIs](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html) that Amazon publishes.

If you need to update AMIs or the Linux kernel for security reasons you can:

* Contact Convox on Slack, GitHub or support@convox.com to report a security problem. We will help prepare an update that delivers the security fix to everyone.

* Immediately update your Rack to a custom AMI. The custom AMI will need to run the ecs-agent to participate in container management.

```
$ convox rack params set Ami=foo
Updating parameters... OK
```

* Immediately update instance kernels:

```
# install an SSH key if you haven't already

$ convox instances keyroll

# shell into every instance and apply a new kernel through `yum update`

$ convox api get /instances |\
  jq .[].id |\
  xargs -I{} convox instances ssh {} "sudo yum update --disableexcludes=app -y"

# shell into every instance and apply a reboot to pick up the new kernel

$ convox api get /instances |\
  jq .[].id |\
  xargs -I{} convox instances ssh {} "sudo reboot"
```
