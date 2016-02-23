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
