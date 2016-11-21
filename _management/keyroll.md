---
title: "Keyroll"
order: 350
---

Keyroll generates and replaces the EC2 keypair used for SSH. Under the hood, this safely replaces an entire cluster with new instances and new SSH keys.

## How to roll keys

Keyroll can be launched via the Convox CLI command `convox instances keyroll` or from the Convox Console.

## Under the hood

Keyroll triggers a CloudFormation update that performs a rolling replacement of all of the Rack's instances.  

**Note:** If the CloudFormation update fails and rolls back, the SSH keys in console will have already been updated, so `convox instances ssh` won't work at all until you do a successful keyroll.

## Avoid downtime

In order for an app to avoid downtime during an instance keyroll, the app must have at least three running processes per service. This is an unfortunate side effect of how autoscale groups terminate instances based on the desired count in one shot.

At the end of a keyroll stack update, CloudFormation sets an autoscale group's desired count back to its original value. At that point, the autoscale group takes over and notices it has an excesses of instances and starts to terminate as many instances as needed to satisfy the desired count.

With the removal of multiple instances from the ECS cluster and a process count of two, downtime could be experienced if the ASG happens to choose two instances that happen to be running both processes of a given app.

We've talked about various solutions with AWS, who we hope will fix this so ECS handles it properly. The problem is addressed in [this GitHub issue](https://github.com/aws/amazon-ecs-agent/issues/130) (upvotes here would help!).

Another solution would be to allow for customized ASG behavior surrounding how instances are terminated. Unfortunately, according to AWS support, it doesn't seem this will happen anytime soon.

## See also

- [API Keys](/docs/api-keys)
- For information on accessing your instances via SSH, see [Debugging](/docs/debugging).
