---
title: "API Keyroll"
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

We've talked about various solutions with AWS, who we hope will make ECS instance replacement more graceful. The problem is addressed in [this GitHub issue](https://github.com/aws/amazon-ecs-agent/issues/130) (upvotes here would help!).

## See also

- [API Keys](/docs/api-keys)
- For information on accessing your instances via SSH, see [Debugging](/docs/debugging).
