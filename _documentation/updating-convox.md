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
  <h3>Rack Downtime</h3>
  <p>Most updates do not cause the EC2 instances in your Rack to get rebooted; however, when this happens you may experience brief downtime on your Rack API. This will not affect running applications.</p>
</div>

<div class="block-callout block-show-callout type-warning">
  <h3>App Downtime</h3>
  <p>You can avoid downtime in your apps by running at least two instances of any process that you wish to stay available during Rack updates.</p>
</div>
