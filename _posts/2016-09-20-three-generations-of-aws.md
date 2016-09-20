---
title: The Three Generations of AWS
subtitle: Instances, Tasks and Functions
author: Noah Zoschke
twitter: nzoschke
---

When building a new system on AWS we are faced with an architecture choice:

* Build AMIs, and run **EC2 Instances** behind an ELB
* Build Docker images, and run **ECS Tasks** behind an ALB
* Build Node, Python or Java project zip files, and run **Lambda Functions** behind an API Gateway

EC2, ECS and Lambda represent three generations of AWS services rolled out over the past decade. Instances, Tasks and Functions are the primary building blocks in these three generations respectively.

While each architecture can lead to success, and real-world systems will use some of each, ECS Tasks are the best architecture to target right now.

<!--more-->

## Why Not Lambda Functions?

Lambda Functions are the newest technology, and get a lot of buzz right now as “the future of cloud computing.” The properties of real-time function invocation, per-request billing and zero server management are impossible to beat.

But the constraints of Lambda pose tough challenges. Right now, you can not use Lambda and API Gateway if you need HTTP/2, have jobs that take more than 5 minutes to run, or have processes that need more than 5GB of memory.

The constraints are acceptable, and even desirable for chat bots and simple APIs, but not for the traditional business PHP and Rails systems out there.

Lambda does represent the future of the cloud. AWS will continue working over the next decade to remove server management and to drastically lower our bills.

But right now, Lambda can’t fully replace the need for Instances due to its constraints. And ECS offers similar reductions in server management and cost without the tough tradeoffs.

## Why Not EC2 Instances?

EC2 Instances are the oldest technology, now 10 years old, and are considered the tried-and-true form of cloud computing. The properties of API based provisioning and management, and hourly pricing are what killed the traditional hosting model.

But managing apps on EC2 Instances leaves a lot to be desired. You need to pick a server operating system, use a configuration management tool like Chef to install dependencies for your app, and use an image tool like Packer to build an AMI.

A deploy that needs to build AMIs and boot VMs takes at least a few minutes. In the age of continuous delivery we want deploys that take a few seconds.

## Why EC2 Instances?

That said, we can't use Lambda Functions for everything, so we still need to utilize Instances somehow...

EC2 Instances are extremely flexible, so numerous strategies for faster deployment times exist. A common technique is to use a tool like Ansible to SSH into every instance and pull a new version of code then restart the app server. But now we’re using bespoke scripts to mutate instances which add to the failure scenarios.

A cutting-edge technique is to install our own container orchestration software like Docker Swarm or Apache Mesos to coordinate starting and stopping processes across a cluster of EC2 instances. Big companies like Google and Twitter have proven this model of scheduling work across a cluster of generic Instances.

EC2 Instances with container orchestration **is** the best practice. 

This explains why there is heated competition in the orchestration software space, and why AWS launched their EC2 Container Service (ECS).

If we install Swarm or Mesos we're responsible for operating the software. We need to keep an orchestration service up 100% of the time, so Instances can always check in and see if they need to start or stop processes. If we use ECS, we delegate that responsibility to Amazon.


## Why ECS Tasks?

ECS Tasks are young technology, but container orchestration is a modern best practice of cloud computing. The properties of packaging our apps, including the operating system, into a standard Image format, then scheduling containers across a cluster of “dumb” instances is a huge efficiency improvement over older EC2 Instance strategies.

Containers are faster to build and faster to boot than Instances. A single Instance can run multiple container workloads, which offers less operating system overhead and less instances to maintain and pay for. Orchestration coordinates fast deploys and failure recovery alike.

The most important distinction about ECS is that it’s a managed service.

Amazon provides an “ECS Optimized AMI” that has the right server operating system, Docker server pre-configured. AWS is responsible for keeping the ECS APIs up and running so instances can always connect to it to ask for more work. AWS is responsible for writing the open-source ecs-agent that runs on every instance.

Because AWS built the entire stack, we can trust its quality, and trust that AWS will support it through tickets if things don't work right.

It’s also important to understand that AWS considers Tasks a first-class primitive of the entire AWS platform. Tasks can be configured to assume an IAM role, register with a load balancer, and to log to a CloudWatch Log Group.

This year we saw two new services, Elastic File System (EFS) and Application Load Balancer (ALB) which complement ECS very well.

In many ways, Tasks already have more platform features out of the box than EC2 Instances ever did.

I expect continual platform improvements around Tasks, like improved auditing and billing over the next years. I also expect reduced effort for cluster management.

So with ECS Tasks, we’re responsible for providing an arbitrary Docker Image and Amazon is responsible for everything else to keep it running forever.

## In Conclusion

EC2 Instances are too raw, requiring lots of customization to support an app. Lambda Functions are too constrained, disallowing traditional apps. ECS Tasks are just right, offering a simple way to package and run any application, while still relying on AWS to operate everything for us.

If you’re building a modern real-world system on AWS, an architecture based around ECS Tasks is the best choice.

---

At Convox, we have been using ECS in production for our services and our customers services for more than 18 months. If you want an easy way use ECS, the [Convox tutorial](https://convox.com/docs/) will get your app running in minutes.

For more cloud architecture discussion, follow [@nzoschke](https://twitter.com/nzoschke) and [@goconvox](https://twitter.com/goconvox) on Twitter.
