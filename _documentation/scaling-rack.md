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
