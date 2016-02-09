---
title: "Scaling Rack Capacity"
---

Your Convox Rack is a set of instances, each with a fixed amount of memory (i.e. 2.0 GB on a t2.small). You can alter the capacity of your Rack with `convox rack scale`.

    $ convox rack
    Name       convox
    Status     running
    Version    20150930020304
    Count      3
    Type       t2.small

    $ convox rack scale --count 5 --type t2.medium
    Name       convox
    Status     updating
    Version    20150930020304
    Count      5
    Type       t2.medium


<div class="block-callout block-show-callout type-warning">
  <h3>Instance Replacement</h3>
  <p>Changing the instance type requires all the EC2 instances in the Rack to be replaced, however this is designed to be a safe operation. See the <a href="/docs/updating-convox">updating convox guide</a> for more information about app and Rack API availability during instance replacement.</p>
</div>