---
title: ALB Is Ready
author: Noah Zoschke
twitter: nzoschke
---

A load balancer is the most important cloud service. A great load balancing strategy means the front door to your application is always online and routing traffic to backends that are healthy and can scale out to meet the load. No load balancing strategy means a single point of failure and overloaded backends.

Seven months ago I covered the AWS [Application Load Balancer (ALB) announcement](https://convox.com/blog/alb/). The [ALB GitHub issue](https://github.com/convox/rack/issues/1373) is one of the most popular feature requests for the Convox platform.

It’s clear that the Elastic Load Balancer (ELB) is old and busted, and ALB is the new hotness.

So I’m happy to announce that Convox now has an ALB path. Check out this new [Getting Started Guide](https://github.com/convox/praxis/blob/master/docs/getting-started.md) to learn how to set up a new version of the platform with a single ALB routing traffic to many apps. This brings the cost of a private, production-ready container cluster down to $35/mo for a handful of apps.

<!--more-->

## Path Based Routing: Not Quite There

The August ALB announcement was exciting. ALB’s content-based routing showed that a single ALB could dynamically forward requests to more than one group of containers dynamically, based on the HTTP request. This is a big improvement over ELB which can only forward all traffic to a fixed set of instances and ports.

But more research and development around ALB showed it wasn’t really ready for total adoption.

ALB routing was path based, meaning different target groups of backends needed to be sub-paths under a single domain:

* [https://myapp.com/](https://myapp.com/) → Jekyll app

* [https://myapp.com/blog](https://myapp.com/blog) → WordPress app

* [https://myapp.com/api](https://myapp.com/api) → Rails app

On top of this, ALB had a limit of **10 URL-based rules**.

The reality of this implementation is that using ALB could require serious changes to our deployments to map everything under a single domain, and that we’d still need multiple ALBs for deployments with more than 10 service types.

Because of these limitations of ALB, we took a conservative approach for Convox and persisted with an ELB strategy, where every set of containers gets it’s own ELB and own hostname. All those ELBs are annoying on the monthly bill, but at least we didn’t have to rewrite our apps.

## Host Based Routing: YES!

Fast forward to the April 2017 announcement: [ALB Adds Support for Host-based Routing and Increased Rules](https://aws.amazon.com/about-aws/whats-new/2017/04/elastic-load-balancing-adds-support-for-host-based-routing-and-increased-rules-on-its-application-load-balancer/).

A single ALB can now route requests to a target group based on the HTTP Host header. On top of this, ALB now supports **75 URL-based rules.** Now we’re talking! A single ALB in a container cluster can do it all…

* [https://myapp.com/](https://myapp.com/) → Nginx app

* [https://blog.myapp.com/](https://myapp.com/blog) → WordPress app

* [https://api.myapp.com/](https://myapp.com/api) → Rails app

* [https://balancer.us-east-1.elb.amazonaws.com](https://balancer.us-east-1.elb.amazonaws.com)/system → Cluster management API

With this enhancement, it’s easy to see how a single ALB can handle the most complex microservice deployments.

## The ALB Plan

The final question for us at Convox is how to migrate the platform from many ELBs to a single ALB. Unfortunately there’s no easy way.

Load balancers and their host names are mission-critical components of any production service. To avoid downtime, changes in this layer require careful maintenance windows for adding a new load balancer, changing DNS, then removing the old load balancer.

It’s literally impossible to do this automatically with zero downtime during an app deploy.

That means ALB represents a breaking architectural change.

So at Convox we’re looking at ALB as this as opportunity to improve the entire platform architecture:

* 1 ALB

* 1 ECS Cluster

* 2+ EC2 Instances

* 75 service types you deploy 

This is one of the biggest improvements to the platform we have ever made. A single ALB can replace countless ELBs, reducing the number of cloud services needed to run our apps.

## Cost Savings

This is also one of the biggest cost improvements to the platform we have ever made.

### Convox 1.0

* t2.small instance ($15 / mo) * 3 → $45 / mo

* 1 management API ELB → $18 / mo

* 1 management Dynamo DB table → $10 / mo

* ELB  * 5 apps → $90 / mo

Total: $163 / mo for 5 apps

### Convox 2.0

* t2.micro instance ($15 / mo) * 2→ $17 / mo

* 1 ALB → $16 / mo

* 1 management SimpleDB table → $1 / mo

Total: $34 / mo for 5 apps

## Try It Out

We’re hard at work finishing up and testing the new ALB architecture as we speak. If you’d like to help us test it, you can check out the [“Praxis” GitHub project](https://github.com/convox/praxis) and follow the [Getting Started Guide](https://github.com/convox/praxis/blob/master/docs/getting-started.md) to deploy your first app behind an ALB.

## Conclusion

AWS is constantly working hard to provide the component services we want to run our app. With the host-based routing feature, it’s clear that ALB is now the best and cheapest way to use AWS.

Convox is constantly evaluating the entire landscape of cloud services so we can leverage the best ones for our platform. It took a bit of patience, but we are now confident that an ALB architecture is the way to go.

It gives us great pleasure to bring these massive price improvements to all our customers with no additional work.

Stay focused on your apps and leave the infrastructure work to us.

Have questions about ALB? Reach out on [Twitter](https://twitter.com/goconvox) or [Slack](http://invite.convox.com/).


